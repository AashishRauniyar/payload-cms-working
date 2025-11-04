import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Daily Health Supplement | Your Privacy Matters',
  description:
    'Read Daily Health Supplement\'s privacy policy to understand how we collect, use, and protect your personal information. Your privacy and data security are our top priorities.',
  keywords: 'privacy policy, data protection, personal information, daily health supplement, privacy rights',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Daily Health Supplement is committed to protecting your privacy and providing a safe online experience.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Effective Date: July 1, 2022
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
            <div className="space-y-4 text-gray-700">
              <p>Daily Health Supplement ("we", "us", "our") is committed to protecting your privacy and providing a safe online experience for all of our users. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.dailyhealthsupplement.com" className="text-blue-600 hover:text-blue-800 underline">www.dailyhealthsupplement.com</a> (the "Site").</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you interact with our Site, such as when you subscribe to our newsletter, participate in surveys or contests, or contact us for support. This information may include:</p>
                <ul className="list-disc list-inside mt-3 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Mailing address</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Non-Personal Information</h3>
                <p>We also collect non-personal information automatically as you navigate through the Site. This information may include:</p>
                <ul className="list-disc list-inside mt-3 space-y-2">
                  <li>Browser type</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Internet service provider</li>
                  <li>Pages visited</li>
                  <li>Referring URL</li>
                  <li>Time and date of visits</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>We use the information we collect in the following ways:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>To personalize your experience and deliver content and product offerings relevant to your interests.</li>
                <li>To improve our website in order to better serve you.</li>
                <li>To administer a contest, promotion, survey, or other site feature.</li>
                <li>To send periodic emails regarding your order or other products and services.</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Disclosure of Your Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Affiliate Links and Advertising</h2>
            <div className="space-y-4 text-gray-700">
              <p>Daily Health Supplement participates in affiliate marketing programs, which means we may earn commissions on editorially chosen products purchased through our links to retailer sites. These affiliate links do not influence our editorial content, and we only recommend products we genuinely believe in.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Links</h2>
            <div className="space-y-4 text-gray-700">
              <p>Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Security of Your Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Consent</h2>
            <div className="space-y-4 text-gray-700">
              <p>By using our Site, you consent to our website's privacy policy.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to Our Privacy Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <div className="space-y-4 text-gray-700">
              <p>If you have any questions regarding this Privacy Policy, you may contact us using the information below:</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Email:</strong> <a href="mailto:info@dailyhealthsupplement.com" className="text-blue-600 hover:text-blue-800 underline">info@dailyhealthsupplement.com</a></p>
                <p><strong>Address:</strong> 65 Main Street, New York, NY 10009, USA/Canada</p>
                <p><strong>Phone (Toll Free):</strong> <a href="tel:+18661212589" className="text-blue-600 hover:text-blue-800 underline">+1 (866) 121-2589</a></p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
