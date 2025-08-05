import React from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface ProsConsItem {
  point: string
}

interface ProsConsBlockProps {
  title?: string
  prosTitle: string
  consTitle: string
  pros: ProsConsItem[]
  cons: ProsConsItem[]
  style: 'default' | 'stacked' | 'cards'
  backgroundColor: 'none' | 'gray' | 'blue' | 'green'
}

export const ProsConsBlock: React.FC<ProsConsBlockProps> = ({
  title,
  prosTitle,
  consTitle,
  pros,
  cons,
  style,
  backgroundColor,
}) => {
  const backgroundClasses = {
    none: '',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
  }

  const containerClasses = {
    default: 'grid md:grid-cols-2 gap-8',
    stacked: 'space-y-8',
    cards: 'grid md:grid-cols-2 gap-6',
  }

  const prosCardClasses = {
    default: 'bg-white rounded-lg p-6 border-l-4 border-green-500',
    stacked: 'bg-white rounded-lg p-6 border-l-4 border-green-500',
    cards: 'bg-white rounded-xl p-6 shadow-lg border border-green-100',
  }

  const consCardClasses = {
    default: 'bg-white rounded-lg p-6 border-l-4 border-red-500',
    stacked: 'bg-white rounded-lg p-6 border-l-4 border-red-500',
    cards: 'bg-white rounded-xl p-6 shadow-lg border border-red-100',
  }

  return (
    <section className={`py-12 px-4 ${backgroundClasses[backgroundColor]}`}>
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            {title}
          </h2>
        )}
        
        <div className={containerClasses[style]}>
          {/* Pros Section */}
          <div className={prosCardClasses[style]}>
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-2xl font-semibold text-green-700">
                {prosTitle}
              </h3>
            </div>
            <ul className="space-y-4">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">
                    {pro.point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons Section */}
          <div className={consCardClasses[style]}>
            <div className="flex items-center mb-6">
              <XCircle className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-2xl font-semibold text-red-700">
                {consTitle}
              </h3>
            </div>
            <ul className="space-y-4">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">
                    {con.point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}