import React from 'react'

const AboutTestimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Wellness Enthusiast',
      content:
        'HealthScopeDaily has been my go-to resource for reliable health information. Their reviews are thorough and I trust their recommendations completely.',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      location: 'California, USA',
    },
    {
      name: 'Dr. Robert Kim',
      role: 'Family Physician',
      content:
        'As a healthcare provider, I often recommend HealthScopeDaily to my patients. Their evidence-based approach and expert reviews are invaluable.',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80',
      location: 'New York, USA',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Fitness Coach',
      content:
        'The supplement reviews on HealthScopeDaily have helped me guide my clients toward effective, safe products. Outstanding work!',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      location: 'Texas, USA',
    },
    {
      name: 'James Wilson',
      role: 'Health Blogger',
      content:
        "I've been following HealthScopeDaily for years. Their commitment to transparency and scientific accuracy is unmatched in the industry.",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      location: 'Florida, USA',
    },
    {
      name: 'Lisa Chen',
      role: 'Nutrition Student',
      content:
        "HealthScopeDaily's detailed analyses have been incredibly helpful for my studies. The scientific approach they take is exactly what I need.",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      location: 'Washington, USA',
    },
    {
      name: 'Michael Thompson',
      role: 'Retired Teacher',
      content:
        'At my age, making the right health choices is crucial. HealthScopeDaily gives me the confidence to make informed decisions.',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      location: 'Oregon, USA',
    },
  ]

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Readers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the millions of people who trust HealthScopeDaily for their health decisions
            and information needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

              {/* Content */}
              <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
              <div className="flex justify-center mt-2">{renderStars(5)}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Reviews</div>
              <div className="text-sm text-gray-500 mt-2">Verified Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              <div className="text-sm text-gray-500 mt-2">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
              <div className="text-sm text-gray-500 mt-2">Always Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Thousands of Satisfied Readers</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start making informed health decisions today with our expert reviews and
              evidence-based recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Free
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTestimonials
