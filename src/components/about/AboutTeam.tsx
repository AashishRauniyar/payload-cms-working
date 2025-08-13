import React from 'react'

const AboutTeam = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      specialization: 'Internal Medicine & Nutrition',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
      bio: '15+ years in clinical practice with expertise in preventive medicine and nutritional therapy.',
      credentials: ['MD, Internal Medicine', 'Board Certified', 'Nutrition Specialist'],
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Research Director',
      specialization: 'Pharmacology & Clinical Research',
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
      bio: 'PhD in Pharmacology with 12+ years researching supplement efficacy and safety.',
      credentials: ['PhD, Pharmacology', 'Clinical Research', 'FDA Consultant'],
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Wellness Expert',
      specialization: 'Integrative Health & Wellness',
      image:
        'https://images.unsplash.com/photo-1594824835319-d3c87de8e8f4?auto=format&fit=crop&w=300&q=80',
      bio: 'Naturopathic doctor specializing in holistic wellness and lifestyle medicine.',
      credentials: ['ND, Naturopathic Medicine', 'Certified Wellness Coach', 'Herbal Medicine'],
    },
    {
      name: 'Dr. James Thompson',
      role: 'Senior Reviewer',
      specialization: 'Sports Medicine & Fitness',
      image:
        'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=300&q=80',
      bio: 'Sports medicine physician with expertise in performance nutrition and supplements.',
      credentials: ['MD, Sports Medicine', 'Team Physician', 'Performance Nutrition'],
    },
  ]

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Health Experts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of healthcare professionals brings decades of experience in medicine,
            nutrition, and wellness research.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4">{member.specialization}</p>
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Credentials:</h4>
                <ul className="space-y-1">
                  {member.credentials.map((credential, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-center">
                      <svg
                        className="w-3 h-3 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Trust Our Experts?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Board Certified</h4>
                <p className="text-sm text-gray-600">
                  All our doctors are board-certified in their specialties
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Proven Experience</h4>
                <p className="text-sm text-gray-600">
                  Decades of combined clinical and research experience
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Independent Reviews</h4>
                <p className="text-sm text-gray-600">
                  Unbiased analysis free from commercial influence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTeam
