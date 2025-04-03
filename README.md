# AI Trip Planner

An intelligent trip planning application that helps users create personalized travel itineraries using artificial intelligence.

## Features

- AI-powered trip planning
- Personalized travel recommendations
- Interactive itinerary management
- Smart travel suggestions based on preferences

## Prerequisites
- React + tailwindcss + vite
- Python 3.8 or higher
- pip (Python package installer)
- MongoDB 

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Arch-777/Ai-Trip-Planner.git
cd Ai-Trip-Planner
```

2. Install the required dependencies:
```bash
cd server
pip install -r requirements.txt
```
3. Install the front end dependencies:
```bash
cd client
npm install
```
4. add api key to .env file in /server
```bash
GEMINI_API_KEY= your_api_key
```

if any error occurs 
```bash
npm run audit
npm audit fix
npm audit fix --force
```
## Running the Application

1. Start the backend in flask:
```bash
cd server
python app.py
```
2. Start Frontend in react:
```bash
cd client
npm run dev
```

3. Open your web browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
Ai-Trip-Planner/
├── /client
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── /types
│   │   ├── app.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── README.md
├── /server
│   ├── /venv
│   ├── /database
|       ├── db.py
│   ├── /services
│   ├── app.py
│   └── requirements.txt
|
├── .gitignore
└── README.md
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## Contributors

- [Om Sakhare](https://github.com/arch-777)
- [Riya Divekar](https://github.com/riyadivekar)
- [Chetas Mohite](https://github.com/CSM4416)

