from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask_cors import CORS
import networkx as nx
from ortools.constraint_solver import routing_enums_pb2, pywrapcp
from database.db import auth_blueprint

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(auth_blueprint, url_prefix='/auth')

def initialize_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in the .env file")
    genai.configure(api_key=api_key)

def tsp_tw_optimizer(locations, travel_times, time_windows):
    """Solves the TSP with Time Windows using OR-Tools."""
    manager = pywrapcp.RoutingIndexManager(len(locations), 1, 0)
    routing = pywrapcp.RoutingModel(manager)

    def distance_callback(from_index, to_index):
        return travel_times[manager.IndexToNode(from_index)][manager.IndexToNode(to_index)]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    routing.AddDimension(transit_callback_index, 0, 100000, True, "Time")
    time_dimension = routing.GetDimensionOrDie("Time")
    
    for i, (start, end) in enumerate(time_windows):
        index = manager.NodeToIndex(i)
        time_dimension.CumulVar(index).SetRange(start, end)
    
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    solution = routing.SolveWithParameters(search_parameters)
    
    if solution:
        return [manager.IndexToNode(solution.Value(routing.NextVar(i))) for i in range(routing.Size())]
    return []

def generate_itinerary(destination, noofdays, preferences, season, budget):
    """Generates an itinerary using Gemini API with optimized route planning."""
    # Mock locations and travel times (In practice, use Google Maps API)
    locations = ["Start", "Place A", "Place B", "Place C", "End"]
    travel_times = [[0, 10, 20, 30, 40],
                    [10, 0, 15, 25, 35],
                    [20, 15, 0, 10, 20],
                    [30, 25, 10, 0, 10],
                    [40, 35, 20, 10, 0]]
    time_windows = [(0, 100), (10, 50), (20, 60), (30, 70), (40, 80)]
    
    optimized_order = tsp_tw_optimizer(locations, travel_times, time_windows)
    optimized_places = [locations[i] for i in optimized_order]
    
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = f"""
    Generate a detailed travel itinerary for {destination} with optimized travel order:
    {', '.join(optimized_places)}.
    Travel total days: {noofdays}.
    Season: {season}.
    Budget: {budget}.
    Preferences: {preferences}.
    
    The itinerary should include:
    - Morning, afternoon, and evening activities
    - Food recommendations
    - Nearby attractions
    - Time slots for each activity
    - generat tips for user in the end in bold text
    - add weather information for the destination
    
    Generate in normal string format text.
    ont show extra text like "Here is the itinerary" or anything else.
    """
    response = model.generate_content(prompt)
    return response.text

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary_api():
    data = request.json
    destination = data.get('destination')
    noofdays = data.get('noofdays')
    preferences = data.get('preferences')
    season = data.get('season')
    budget = data.get('budget')

    if not all([destination, noofdays, preferences, season, budget]):
        return jsonify({"error": "All fields are required: destination, noofdays, preferences, season, budget"}), 400

    itinerary = generate_itinerary(destination, noofdays, preferences, season, budget)
    return jsonify({"itinerary": itinerary})



if __name__ == "__main__":
    initialize_gemini()
    app.run(debug=True, host='0.0.0.0', port=8000)
