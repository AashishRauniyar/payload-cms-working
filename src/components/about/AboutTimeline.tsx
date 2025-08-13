import React from 'react'

const AboutTimeline = () => {
  const timelineEvents = [
    {
      year: '2020',
      title: 'The Vision',
      description:
        'Founded with a mission to make health information accessible and trustworthy for everyone.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: 'blue',
    },
    {
      year: '2021',
      title: 'Expert Team Assembly',
      description:
        'Recruited leading healthcare professionals and researchers to build our expert review panel.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      color: 'green',
    },
    {
      year: '2022',
      title: 'First 100 Reviews',
      description:
        'Published our first 100 comprehensive product reviews, establishing our reputation for thorough analysis.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: 'purple',
    },
    {
      year: '2023',
      title: '1 Million Readers',
      description:
        'Reached our first million readers, becoming a trusted source for health information worldwide.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      color: 'orange',
    },
    {
      year: '2024',
      title: 'Innovation & Growth',
      description:
        'Launched advanced review methodology and expanded to cover broader wellness categories.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      ),
      color: 'red',
    },
    {
      year: '2025',
      title: 'Future Vision',
      description:
        'Continuing to innovate in health information delivery and expanding our global impact.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: 'indigo',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Journey
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From a small team of passionate health advocates to a trusted global resource for
            evidence-based health information.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const colorClasses = getColorClasses(event.color)
              const isEven = index % 2 === 0

              return (
                <div key={index} className="relative flex items-center">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div
                      className={`w-12 h-12 ${colorClasses.bg} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}
                    >
                      <div className={colorClasses.text}>{event.icon}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 ml-auto'}`}>
                    <div
                      className={`bg-white rounded-xl shadow-lg p-6 border ${colorClasses.border} hover:shadow-xl transition-shadow duration-300`}
                    >
                      <div className={`text-2xl font-bold ${colorClasses.text} mb-2`}>
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Us on Our Journey</h3>
            <p className="text-gray-600 mb-6">
              Be part of our mission to make health information accessible and trustworthy for
              everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe to Updates
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTimeline
