from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
import os

# Create a blueprint for authentication routes
auth_blueprint = Blueprint('auth', __name__)

# Step 2: Connect to MongoDB (using a URI from an environment variable or default to localhost)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)

# Step 3: Define your database and users collection
db = client["trip-planner"]  # Change "your_database" to your desired database name
users_collection = db["users"]

# Step 4: Register endpoint
@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 400

    # Hash the password using scrypt
    hashed_password = generate_password_hash(password, method="scrypt")
    
    # Insert new user document
    users_collection.insert_one({
        "email": email,
        "password": hashed_password
    })
    
    return jsonify({"message": "User registered successfully"}), 201

# Step 5: Login endpoint
@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Retrieve user from MongoDB
    user = users_collection.find_one({"email": email})
    
    if not user:
        return jsonify({"error": "User not found"}), 401
    
    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid password"}), 401
    
    return jsonify({"message": "Login successful"}), 200
