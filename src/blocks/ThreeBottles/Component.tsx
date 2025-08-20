import React from 'react'
import { getMediaUrl as buildMediaUrl } from '@/utilities/getMediaUrl'

type Product = {
  name: string
  rating: number
  media?:
    | {
        url?: string
      }
    | number
    | null
  color?: 'blue' | 'red' | 'gray'
  ing?: string
  benefits?: string
  csat?: string
}

interface ThreeBottlesProps {
  h1?: string
  h2?: string
  h3?: string
  bg?: 'white' | 'gray'
  products?: Product[]
  disableInnerContainer?: boolean
  className?: string
}

const getMediaUrl = (media: Product['media']): string => {
  if (!media) return ''
  if (typeof media === 'number') return ''
  const url = media?.url || ''
  return buildMediaUrl(url)
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  return (
    <div className="flex items-center gap-1 justify-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${
            i < fullStars
              ? 'text-yellow-400'
              : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-white font-semibold text-lg">{rating}</span>
    </div>
  )
}

const PlaceholderBottle: React.FC<{ color?: 'blue' | 'red' | 'gray' }> = ({ color = 'blue' }) => {
  const colorClass =
    color === 'red' ? 'bg-red-600' : color === 'gray' ? 'bg-gray-900' : 'bg-blue-500'
  const accentClass =
    color === 'red' ? 'bg-red-500' : color === 'gray' ? 'bg-gray-700' : 'bg-blue-400'
  const capClass = color === 'red' ? 'bg-gray-800' : 'bg-gray-200'

  return (
    <div className="w-24 h-32 rounded-lg relative overflow-hidden flex items-center justify-center">
      <div className={`absolute inset-0 ${colorClass} rounded-lg`} />
      <div
        className={`absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 ${capClass} rounded-full`}
      />
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-16 ${accentClass} rounded`}
      />
    </div>
  )
}

export const ThreeBottles: React.FC<ThreeBottlesProps> = (props) => {
  const DEFAULT_PRODUCTS: Product[] = [
    {
      name: 'Virectin',
      rating: 4.5,
      color: 'blue',
      ing: 'L-Arginine, Zinc, Fenugreek, Tongkat Ali, Epimedium',
      benefits: 'Supports overall vitality, stamina, and wellness',
      csat: 'High, with many repeat customers',
    },
    {
      name: 'Prime Potence',
      rating: 4.3,
      color: 'red',
      ing: 'Ginseng, Tribulus Terrestris Extract, Horny Goat Weed etc.',
      benefits: 'May increase your confidence and overall mood',
      csat: 'Generally positive, varies by user',
    },
    {
      name: 'Male Extra',
      rating: 4.2,
      color: 'gray',
      ing: 'L-Arginine HCL, Cordyceps, L-Methionine, etc.',
      benefits: 'Supports circulation and physical health.',
      csat: 'Satisfactory, generally positive feedback',
    },
  ]

  const {
    h1 = "2025'S TOP MALE",
    h2 = 'ENHANCEMENT',
    h3 = 'SUPPLEMENTS',
    bg = 'white',
    products,
    disableInnerContainer,
    className,
  } = props

  const productList: Product[] =
    Array.isArray(products) && products.length > 0 ? products.slice(0, 3) : DEFAULT_PRODUCTS

  const content = (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-start gap-8 mb-8">
        <div className="flex-shrink-0">
          <div className="text-3xl font-bold text-black leading-tight">
            {h1}
            <br />
            {h2}
            <br />
            {h3}
          </div>
        </div>

        {/* Product Images */}
        <div className="flex gap-12 items-center flex-1 justify-center">
          {productList.map((product, idx) => {
            const mediaUrl = getMediaUrl(product.media)
            return (
              <div className="text-center" key={idx}>
                <div className="w-32 h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center border">
                  {mediaUrl ? (
                    <img
                      src={mediaUrl}
                      alt={product.name}
                      className="max-h-36 max-w-28 object-contain"
                    />
                  ) : (
                    <PlaceholderBottle color={product.color} />
                  )}
                </div>
                <div className="font-semibold text-lg">{product.name}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="w-full">
        {/* Header Row */}
        <div className="flex bg-green-500 text-white">
          <div className="w-1/4 p-4 font-semibold text-lg">What To Look For</div>
          {productList.map((p, i) => {
            const rating = Number.isFinite(p?.rating)
              ? Math.max(0, Math.min(5, Number(p.rating)))
              : 0
            return (
              <div className="w-1/4 p-4 text-center" key={`rating-${i}`}>
                <StarRating rating={rating} />
              </div>
            )
          })}
        </div>

        {/* Main Ingredients Row */}
        <div className="flex border-b border-gray-300 bg-blue-50">
          <div className="w-1/4 p-4 font-semibold">Main Ingredients</div>
          {productList.map((p, i) => (
            <div className="w-1/4 p-4 text-center text-sm" key={`ing-${i}`}>
              {p.ing || ''}
            </div>
          ))}
        </div>

        {/* Key Benefits Row */}
        <div className="flex border-b border-gray-300">
          <div className="w-1/4 p-4 bg-cyan-100 font-semibold">Key Benefits</div>
          {productList.map((p, i) => (
            <div className="w-1/4 p-4 text-center text-sm" key={`benefit-${i}`}>
              {p.benefits || ''}
            </div>
          ))}
        </div>

        {/* Customer Satisfaction Row */}
        <div className="flex border-b border-gray-300">
          <div className="w-1/4 p-4 bg-gray-50 font-semibold">Customer Satisfaction</div>
          {productList.map((p, i) => (
            <div className="w-1/4 p-4 text-center text-sm" key={`csat-${i}`}>
              {p.csat || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const bgClass = bg === 'gray' ? 'bg-gray-50' : 'bg-white'

  if (disableInnerContainer) {
    return <section className={`${bgClass} ${className || ''}`}>{content}</section>
  }

  return <section className={`${bgClass} ${className || ''}`}>{content}</section>
}

export default ThreeBottles
