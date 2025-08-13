import React from 'react'

const AboutMission = () => {
  return (
    <section id="mission" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Making Health Information{' '}
                <span className="text-green-600">Accessible & Trustworthy</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At HealthScopeDaily, we believe everyone deserves access to reliable, evidence-based
                health information. Our mission is to bridge the gap between complex medical
                research and practical wellness decisions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We carefully review and analyze health products, supplements, and wellness solutions
                to provide you with unbiased, expert-backed recommendations that you can trust.
              </p>
            </div>

            {/* Mission Points */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Evidence-Based Reviews
                  </h3>
                  <p className="text-gray-600">
                    Every recommendation is backed by scientific research and expert analysis.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Process</h3>
                  <p className="text-gray-600">
                    Our review methodology is open, honest, and free from commercial bias.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Impact</h3>
                  <p className="text-gray-600">
                    Empowering millions to make informed health decisions with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=600&q=80"
                alt="Health research and medical documents"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-8 left-8 right-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">Expert Reviewed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Research</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMission
