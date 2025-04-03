import React from 'react';
import { Compass, Globe, Map, Mountain, Palmtree, Sunrise } from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
}

export const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="World Travel"
          className="w-full h-[600px] object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent rounded-2xl flex items-center justify-center">
          <div className="text-white max-w-3xl px-4">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Explore the World's
              <span className="block bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Hidden Treasures
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Let AI craft your perfect adventure, from ancient ruins to pristine beaches
            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full text-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-10 h-10 text-teal-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3">Global Adventures</h3>
          <p className="text-gray-600">Discover hidden gems and iconic landmarks across continents</p>
        </div>

        <div className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Compass className="w-10 h-10 text-teal-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3">Personalized Routes</h3>
          <p className="text-gray-600">AI-crafted itineraries tailored to your travel style</p>
        </div>

        <div className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Map className="w-10 h-10 text-teal-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3">Smart Planning</h3>
          <p className="text-gray-600">Effortlessly organize your perfect adventure</p>
        </div>
      </div>

      <div className="mt-20 bg-white rounded-2xl shadow-lg p-12">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Discover Every Corner of the World</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50">
            <Mountain className="w-8 h-8 text-teal-600" />
            <div className="text-left">
              <h3 className="font-semibold">Mountain Peaks</h3>
              <p className="text-gray-600">Scale majestic heights</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50">
            <Palmtree className="w-8 h-8 text-teal-600" />
            <div className="text-left">
              <h3 className="font-semibold">Tropical Paradise</h3>
              <p className="text-gray-600">Relax on pristine beaches</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50">
            <Sunrise className="w-8 h-8 text-teal-600" />
            <div className="text-left">
              <h3 className="font-semibold">Cultural Wonders</h3>
              <p className="text-gray-600">Experience local traditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};