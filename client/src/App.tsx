import React, { useState } from 'react';
import { Home } from './components/Home';
import { TripPlanner } from './components/TripPlanner';
import { LogOut } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setIsLoggedIn(true);
      setShowLoginForm(false);
      setCurrentPage('planner');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setIsLoggedIn(true);
      setShowSignupForm(false);
      setCurrentPage('planner');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span 
                className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent cursor-pointer" 
                onClick={() => setCurrentPage('home')}
              >
                World Explorer
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setShowLoginForm(true);
                      setShowSignupForm(false);
                    }}
                    className="px-4 py-2 text-teal-600 hover:text-teal-800"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowSignupForm(true);
                      setShowLoginForm(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full hover:from-teal-700 hover:to-emerald-700 transform transition-all duration-200 hover:scale-105"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-500 hover:text-red-700 flex items-center space-x-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && <Home onGetStarted={() => isLoggedIn ? setCurrentPage('planner') : setShowSignupForm(true)} />}
        {currentPage === 'planner' && isLoggedIn && <TripPlanner />}
      </main>

      {(showLoginForm || showSignupForm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => {
                setShowLoginForm(false);
                setShowSignupForm(false);
                setError('');
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              {showLoginForm ? 'Welcome Back' : 'Join the Adventure'}
            </h2>
            <form onSubmit={showLoginForm ? handleLogin : handleSignup} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl hover:from-teal-700 hover:to-emerald-700 transform transition-all duration-200 hover:scale-105"
              >
                {showLoginForm ? 'Login' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;