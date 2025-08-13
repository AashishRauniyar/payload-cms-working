import React from 'react'
import Link from 'next/link'

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="text-gray-500 font-medium">About Us</span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                About HealthScopeDaily
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering Your <span className="text-blue-600">Health Journey</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're a team of healthcare professionals, researchers, and wellness experts
                dedicated to providing evidence-based reviews and guidance to help you make informed
                decisions about your health and wellness.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Expert Contributors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
                <div className="text-gray-600">People Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                <div className="text-gray-600">Products Reviewed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">2024</div>
                <div className="text-gray-600">Founded</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#team"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
              >
                <span>Meet Our Team</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="#mission"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
              >
                Our Mission
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80"
                alt="HealthScopeDaily team of health professionals"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Trusted Reviews</p>
                  <p className="text-xs text-gray-600">Expert Verified</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Evidence-Based</p>
                  <p className="text-xs text-gray-600">Science Backed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
