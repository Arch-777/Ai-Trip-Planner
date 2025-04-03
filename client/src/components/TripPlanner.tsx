import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Sun, Loader, Globe, Compass, IndianRupee, Download, LogIn } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { AuthModal } from './AuthModal';

interface TripPlan {
  destination: string;
  days: string;
  itinerary: string;
  itineraryMarkdown: string;
}

export const TripPlanner: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [preference, setPreference] = useState('');
  const [budget, setBudget] = useState('');
  const [season, setSeason] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const itineraryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Travel Planner AI';
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          noofdays: days,
          preferences: preference,
          season,
          budget,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const data = await response.json();
      setGeneratedPlan({
        destination,
        days,
        itinerary: data.itinerary,
        itineraryMarkdown: data.itinerary
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    if (!itineraryRef.current) return;
    
    const opt = {
      margin: 1,
      filename: `${generatedPlan?.destination}-itinerary.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(itineraryRef.current).save();
    } catch (err) {
      setError('Failed to generate PDF');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Plan Your Adventure
        </h2>
        <p className="text-gray-600">Let AI craft your perfect journey</p>
      </div>

      {!isAuthenticated ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 flex items-center space-x-2 transition-colors mx-auto"
          >
            <LogIn className="w-5 h-5" />
            <span>Login to Start Planning</span>
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleGenerate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <Globe className="w-4 h-4 mr-2 text-teal-600" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Where to?"
                    required
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                    Number of Days
                  </label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="How long?"
                    required
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <Compass className="w-4 h-4 mr-2 text-teal-600" />
                    Travel Style
                  </label>
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose your style</option>
                    <option value="historical">Historical</option>
                    <option value="devotional">Devotional</option>
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="relaxation">Relaxation</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <IndianRupee className="w-4 h-4 mr-2 text-teal-600" />
                    Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your budget</option>
                    <option value="budget">Budget (₹)</option>
                    <option value="moderate">Moderate (₹₹)</option>
                    <option value="luxury">Luxury (₹₹₹)</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <Sun className="w-4 h-4 mr-2 text-teal-600" />
                    Season
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">When are you traveling?</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full text-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Crafting Your Journey...</span>
                    </>
                  ) : (
                    'Create My Adventure'
                  )}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          
          {generatedPlan && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-teal-800">
                  Your {generatedPlan.destination} Itinerary
                </h3>
                <button
                  onClick={generatePDF}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
              
              <div ref={itineraryRef} className="space-y-8">
                {generatedPlan.itinerary.split('\n\n**Day').map((section: string, index: number) => {
                  if (index === 0) return null; // Skip first empty section
                  const [header, ...content] = section.split('\n\n*');
                  return (
                    <div key={index} className="border-l-4 border-teal-500 pl-4">
                      <h4 className="text-xl font-semibold text-teal-800 mb-4">
                        Day {header.replace(/[*]/g, '')}
                      </h4>
                      {content.map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-6">
                          {item.split('\n').map((line: string, lineIndex: React.Key | null | undefined) => {
                            const cleanLine = line.replace(/^\*?\s*/, '');
                            if (cleanLine.startsWith('**')) {
                              return (
                                <p key={lineIndex} className="font-semibold text-gray-800 mb-2">
                                  {cleanLine.replace(/\*\*/g, '')}
                                </p>
                              );
                            }
                            return (
                              <p key={lineIndex} className="text-gray-600 mb-2">
                                {cleanLine}
                              </p>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        type="login"
      />
    </div>
  );
};