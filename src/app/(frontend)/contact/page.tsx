import React from 'react'
import {
  ContactHero,
  ContactForm,
  ContactInfo,
  ContactNewsletter,
  ContactFAQ,
} from '@/components/contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - HealthScopeDaily | Get In Touch With Health Experts',
  description:
    'Contact HealthScopeDaily for questions, feedback, or collaboration opportunities. Get expert health advice and support from our team of professionals.',
  keywords: 'contact health experts, HealthScopeDaily support, health questions, feedback',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <ContactFAQ />
      <ContactNewsletter />
    </div>
  )
}
