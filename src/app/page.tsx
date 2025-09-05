import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Section */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl">
              <span className="text-3xl">🏫</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              School Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform education management with our comprehensive platform. 
              <span className="text-blue-400 font-semibold"> Add schools</span>, 
              <span className="text-purple-400 font-semibold"> manage data</span>, and 
              <span className="text-pink-400 font-semibold"> explore directories</span> with ease.
            </p>
          </div>
          
          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            <Link
              href="/addSchool"
              className="group relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-6 shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-300">
                  <span className="text-2xl">➕</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Add New School
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Create comprehensive school profiles with detailed information, 
                  image uploads, and instant validation for accurate data entry.
                </p>
                <div className="mt-6 flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                  Get Started
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link
              href="/showSchools"
              className="group relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-6 shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Explore Schools
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Discover schools with advanced search, filtering, and beautiful 
                  card layouts. Find exactly what you're looking for in seconds.
                </p>
                <div className="mt-6 flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                  Explore Now
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Features Section */}
          <div className="animate-fade-in-up animation-delay-1000">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Why Choose Our Platform?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "📱", title: "Responsive Design", desc: "Perfect on any device" },
                  { icon: "🖼️", title: "Image Upload", desc: "High-quality photo support" },
                  { icon: "✅", title: "Form Validation", desc: "Real-time error checking" },
                  { icon: "🔍", title: "Smart Search", desc: "Find schools instantly" },
                  { icon: "🗄️", title: "Secure Database", desc: "MySQL with SSL encryption" },
                  { icon: "🎨", title: "Modern UI/UX", desc: "Beautiful, intuitive interface" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "100%", label: "Free to Use" },
              { number: "24/7", label: "Always Available" },
              { number: "∞", label: "Unlimited Schools" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
