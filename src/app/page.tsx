import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="text-6xl mb-6">🏫</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            School Management Platform
          </h1>
          <p className="text-xl text-gray-800 mb-12 max-w-2xl mx-auto">
            A comprehensive platform for managing school information. Add new schools, 
            upload images, and browse through the complete directory with search and filter capabilities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/addSchool"
              className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Add New School
              </h3>
              <p className="text-gray-800 text-sm">
                Create and submit new school entries with comprehensive information including images
              </p>
              <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="/showSchools"
              className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                View Schools
              </h3>
              <p className="text-gray-800 text-sm">
                Browse and search through all registered schools with advanced filtering options
              </p>
              <div className="absolute inset-0 bg-green-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
          
          <div className="mt-16 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-800">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Responsive Design
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Image Upload
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Form Validation
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Search & Filter
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                MySQL Database
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Modern UI/UX
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
