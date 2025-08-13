'use client'

import React from 'react'

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'contact@healthscopedaily.com',
      action: 'mailto:contact@healthscopedaily.com',
      color: 'blue',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 6pm EST',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'green',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: '123 Health Street, Wellness City, HC 12345',
      action: '#',
      color: 'purple',
    },
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c3.629-.167 5.652-2.182 5.817-5.817C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123C19.833 2.245 17.815.228 14.183.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 4.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We're here to help and answer any question you might have. Choose the best way to reach
            us below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer"
              onClick={() => {
                if (method.action.startsWith('mailto:') || method.action.startsWith('tel:')) {
                  window.location.href = method.action
                }
              }}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  method.color === 'blue'
                    ? 'bg-blue-100 text-blue-600'
                    : method.color === 'green'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-purple-100 text-purple-600'
                }`}
              >
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <p
                className={`font-semibold group-hover:underline ${
                  method.color === 'blue'
                    ? 'text-blue-600'
                    : method.color === 'green'
                      ? 'text-green-600'
                      : 'text-purple-600'
                }`}
              >
                {method.value}
              </p>
            </div>
          ))}
        </div>

        {/* Office Hours & Social */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Office Hours */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Office Hours</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="font-semibold text-gray-900">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="font-semibold text-gray-900">Saturday</span>
                <span className="text-gray-600">10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="font-semibold text-gray-900">Sunday</span>
                <span className="text-red-600">Closed</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-800 text-sm">
                <strong>Response Time:</strong> We typically respond to all inquiries within 24
                hours during business days.
              </p>
            </div>
          </div>

          {/* Social Media & Additional Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m0 0h4a2 2 0 012 2v2M7 4H3a2 2 0 00-2 2v2m18 0v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0H2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Follow Us</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Stay connected with us on social media for the latest health tips, product reviews,
              and wellness insights.
            </p>

            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Trusted by 50,000+ readers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Expert-reviewed content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Updated daily content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
