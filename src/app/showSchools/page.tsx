'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  image: string;
  email_id: string;
  created_at: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schools');
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      } else {
        setError('Failed to fetch schools');
      }
    } catch {
      setError('An error occurred while fetching schools');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === '' || school.city.toLowerCase() === filterCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const uniqueCities = [...new Set(schools.map(school => school.city))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-800">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-800 mb-4">{error}</p>
          <button
            onClick={fetchSchools}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6 shadow-2xl">
              <span className="text-3xl">🏫</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              School Directory
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Discover and explore schools in your area with our comprehensive directory
            </p>
            <Link
              href="/addSchool"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">➕</span>
              Add New School
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-12 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="search" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <span className="text-blue-500">🔍</span>
                <span>Search Schools</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by school name or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input w-full px-4 py-4 pl-12 rounded-xl shadow-sm focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-gray-400 text-xl">🔍</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="cityFilter" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <span className="text-blue-500">🏙️</span>
                <span>Filter by City</span>
              </label>
              <div className="relative">
                <select
                  id="cityFilter"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="form-input w-full px-4 py-4 pr-12 rounded-xl shadow-sm focus:outline-none appearance-none"
                >
                  <option value="">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-400 text-xl">🏙️</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <p className="text-gray-700 font-medium">
              <span className="text-blue-600 font-bold">{filteredSchools.length}</span> of{' '}
              <span className="text-purple-600 font-bold">{schools.length}</span> schools found
            </p>
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
              <div className="text-8xl mb-6 animate-float">🏫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No schools found</h3>
              <p className="text-gray-600 mb-8">
                {searchTerm || filterCity 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'No schools have been added yet. Be the first to add a school!'
                }
              </p>
              {!searchTerm && !filterCity && (
                <Link
                  href="/addSchool"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="mr-2">➕</span>
                  Add First School
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSchools.map((school, index) => (
              <div
                key={school.id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={school.image}
                    alt={school.name}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-school.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <span className="text-blue-600 text-lg">🏫</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {school.name}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-500 text-lg flex-shrink-0">📍</span>
                      <span className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{school.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-500 text-lg flex-shrink-0">🏙️</span>
                      <span className="text-gray-600 text-sm font-medium">{school.city}, {school.state}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-500 text-lg flex-shrink-0">📧</span>
                        <span className="text-gray-600 truncate">{school.email_id}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-500 text-lg flex-shrink-0">📞</span>
                        <span className="text-gray-600 font-medium">{school.contact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
