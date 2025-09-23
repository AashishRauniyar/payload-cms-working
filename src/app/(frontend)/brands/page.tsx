import { FeaturedBrands, BrandSlider } from '@/components/brands'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top Health & Wellness Brands | Expert Reviews & Rankings',
  description:
    'Discover top health and wellness brands with expert, science-backed reviews. Transparent ratings, in-depth analysis, and trusted recommendations.',
  openGraph: {
    title: 'Top Health & Wellness Brands - Trusted Reviews',
    description: 'Explore blue/green-themed rankings, brand comparisons, and expert insights.',
    type: 'website',
  },
}

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500" />
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                Trusted, science-backed brand evaluations
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Find the best health & wellness brands for real results
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                Independent reviews, transparent criteria, and up-to-date rankings to help you
                choose confidently.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 transition"
                >
                  Explore top brands
                </a>
                <a
                  href="#how-we-rate"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-700/20 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 hover:bg-blue-700/30 transition"
                >
                  How we rate
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-white/90">
              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-3xl font-bold">250+</p>
                <p className="text-sm">Brands analyzed</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-3xl font-bold">1,200+</p>
                <p className="text-sm">Ingredients reviewed</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-3xl font-bold">50k+</p>
                <p className="text-sm">User signals</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-3xl font-bold">Updated</p>
                <p className="text-sm">Monthly rankings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we rate */}
      <section id="how-we-rate" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How we rate brands</h2>
            <p className="mt-3 text-gray-600">
              A consistent framework focused on quality, transparency, and real-world outcomes.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Scientific backing</h3>
              <p className="mt-2 text-sm text-gray-600">Evidence-based ingredients and published research.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Ingredient quality</h3>
              <p className="mt-2 text-sm text-gray-600">Dosage accuracy, purity, and sourcing transparency.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Results & outcomes</h3>
              <p className="mt-2 text-sm text-gray-600">Real user feedback and measurable benefits.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h6M7 16h10" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Label transparency</h3>
              <p className="mt-2 text-sm text-gray-600">Clear claims, third-party testing, and safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & slider */}
      <section id="featured" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Editor’s picks</h2>
              <p className="mt-2 text-gray-600">Standout brands chosen by our review team.</p>
            </div>
            <a href="#compare" className="hidden md:inline-flex items-center text-blue-700 font-semibold hover:text-blue-800">
              Compare top brands →
            </a>
          </div>
          <div className="mt-8">
            <FeaturedBrands />
          </div>
          <div className="mt-12">
            <BrandSlider />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Browse by category</h2>
          <p className="mt-2 text-gray-600 text-center">Find the right fit faster.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              'Multivitamins',
              'Protein & Performance',
              'Omega & Heart Health',
              'Gut & Probiotics',
              'Sleep & Stress',
              'Skin, Hair & Nails',
              'Men’s Health',
              'Women’s Health',
            ].map((label) => (
              <a
                key={label}
                href="#"
                className="rounded-full bg-white text-gray-800 ring-1 ring-gray-200 hover:ring-blue-300 hover:text-blue-700 px-4 py-2 text-sm font-medium transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Compare CTA */}
      <section id="compare" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-green-500 px-8 py-10 text-white shadow-sm">
            <div className="md:flex md:items-center md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold">Compare brands side-by-side</h3>
                <p className="mt-2 text-white/90">
                  See ingredients, dosing, certifications, and value at a glance.
                </p>
              </div>
              <a
                href="#featured"
                className="mt-6 md:mt-0 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 transition"
              >
                Start comparing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Frequently asked questions</h2>
          <div className="mt-8 space-y-4">
            {[
              {
                q: 'How often are rankings updated?',
                a: 'We refresh rankings monthly, incorporating new studies, reformulations, and user signals.',
              },
              {
                q: 'Do you accept sponsored placements?',
                a: 'No. Our reviews are editorially independent and based on transparent criteria.',
              },
              {
                q: 'What if a brand changes ingredients?',
                a: 'Ingredient changes trigger a re-review to ensure our data stays accurate.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl bg-white p-6 ring-1 ring-gray-100">
                <p className="font-semibold text-gray-900">{item.q}</p>
                <p className="mt-2 text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-8 text-blue-900">
            <h3 className="text-xl font-bold">Stay updated with new brand reviews</h3>
            <p className="mt-2 text-blue-800/80">No spam. Only meaningful insights and rankings.</p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
