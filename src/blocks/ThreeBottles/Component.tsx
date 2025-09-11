// import React from 'react'
// import { getMediaUrl as buildMediaUrl } from '@/utilities/getMediaUrl'

// type Product = {
//   name: string
//   rating: number
//   media?:
//     | {
//         url?: string
//       }
//     | number
//     | null
//   color?: 'blue' | 'red' | 'gray'
//   ing?: string
//   benefits?: string
//   csat?: string
// }

// interface ThreeBottlesProps {
//   h1?: string
//   h2?: string
//   h3?: string
//   bg?: 'white' | 'gray'
//   products?: Product[]
//   disableInnerContainer?: boolean
//   className?: string
// }

// const getMediaUrl = (media: Product['media']): string => {
//   if (!media) return ''
//   if (typeof media === 'number') return ''
//   const url = media?.url || ''
//   return buildMediaUrl(url)
// }

// const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
//   const fullStars = Math.floor(rating)
//   const hasHalfStar = rating % 1 !== 0
//   return (
//     <div className="flex items-center gap-1 justify-center">
//       {[...Array(5)].map((_, i) => (
//         <span
//           key={i}
//           className={`text-lg ${
//             i < fullStars
//               ? 'text-yellow-400'
//               : i === fullStars && hasHalfStar
//                 ? 'text-yellow-400'
//                 : 'text-gray-300'
//           }`}
//         >
//           ★
//         </span>
//       ))}
//       <span className="ml-2 text-white font-semibold text-lg">{rating}</span>
//     </div>
//   )
// }

// const PlaceholderBottle: React.FC<{ color?: 'blue' | 'red' | 'gray' }> = ({ color = 'blue' }) => {
//   const colorClass =
//     color === 'red' ? 'bg-red-600' : color === 'gray' ? 'bg-gray-900' : 'bg-blue-500'
//   const accentClass =
//     color === 'red' ? 'bg-red-500' : color === 'gray' ? 'bg-gray-700' : 'bg-blue-400'
//   const capClass = color === 'red' ? 'bg-gray-800' : 'bg-gray-200'

//   return (
//     <div className="w-24 h-32 rounded-lg relative overflow-hidden flex items-center justify-center">
//       <div className={`absolute inset-0 ${colorClass} rounded-lg`} />
//       <div
//         className={`absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 ${capClass} rounded-full`}
//       />
//       <div
//         className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-16 ${accentClass} rounded`}
//       />
//     </div>
//   )
// }

// export const ThreeBottles: React.FC<ThreeBottlesProps> = (props) => {
//   const DEFAULT_PRODUCTS: Product[] = [
//     {
//       name: 'Virectin',
//       rating: 4.5,
//       color: 'blue',
//       ing: 'L-Arginine, Zinc, Fenugreek, Tongkat Ali, Epimedium',
//       benefits: 'Supports overall vitality, stamina, and wellness',
//       csat: 'High, with many repeat customers',
//     },
//     {
//       name: 'Prime Potence',
//       rating: 4.3,
//       color: 'red',
//       ing: 'Ginseng, Tribulus Terrestris Extract, Horny Goat Weed etc.',
//       benefits: 'May increase your confidence and overall mood',
//       csat: 'Generally positive, varies by user',
//     },
//     {
//       name: 'Male Extra',
//       rating: 4.2,
//       color: 'gray',
//       ing: 'L-Arginine HCL, Cordyceps, L-Methionine, etc.',
//       benefits: 'Supports circulation and physical health.',
//       csat: 'Satisfactory, generally positive feedback',
//     },
//   ]

//   const {
//     h1 = "2025'S TOP MALE",
//     h2 = 'ENHANCEMENT',
//     h3 = 'SUPPLEMENTS',
//     bg = 'white',
//     products,
//     disableInnerContainer,
//     className,
//   } = props

//   const productList: Product[] =
//     Array.isArray(products) && products.length > 0 ? products.slice(0, 3) : DEFAULT_PRODUCTS

//   const content = (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex items-start gap-8 mb-8">
//         <div className="flex-shrink-0">
//           <div className="text-3xl font-bold text-black leading-tight">
//             {h1}
//             <br />
//             {h2}
//             <br />
//             {h3}
//           </div>
//         </div>

//         {/* Product Images */}
//         <div className="flex gap-12 items-center flex-1 justify-center">
//           {productList.map((product, idx) => {
//             const mediaUrl = getMediaUrl(product.media)
//             return (
//               <div className="text-center" key={idx}>
//                 <div className="w-32 h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center border">
//                   {mediaUrl ? (
//                     <img
//                       src={mediaUrl}
//                       alt={product.name}
//                       className="max-h-36 max-w-28 object-contain"
//                     />
//                   ) : (
//                     <PlaceholderBottle color={product.color} />
//                   )}
//                 </div>
//                 <div className="font-semibold text-lg">{product.name}</div>
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* Comparison Table */}
//       <div className="w-full">
//         {/* Header Row */}
//         <div className="flex bg-green-500 text-white">
//           <div className="w-1/4 p-4 font-semibold text-lg">What To Look For</div>
//           {productList.map((p, i) => {
//             const rating = Number.isFinite(p?.rating)
//               ? Math.max(0, Math.min(5, Number(p.rating)))
//               : 0
//             return (
//               <div className="w-1/4 p-4 text-center" key={`rating-${i}`}>
//                 <StarRating rating={rating} />
//               </div>
//             )
//           })}
//         </div>

//         {/* Main Ingredients Row */}
//         <div className="flex border-b border-gray-300 bg-blue-50">
//           <div className="w-1/4 p-4 font-semibold">Main Ingredients</div>
//           {productList.map((p, i) => (
//             <div className="w-1/4 p-4 text-center text-sm" key={`ing-${i}`}>
//               {p.ing || ''}
//             </div>
//           ))}
//         </div>

//         {/* Key Benefits Row */}
//         <div className="flex border-b border-gray-300">
//           <div className="w-1/4 p-4 bg-cyan-100 font-semibold">Key Benefits</div>
//           {productList.map((p, i) => (
//             <div className="w-1/4 p-4 text-center text-sm" key={`benefit-${i}`}>
//               {p.benefits || ''}
//             </div>
//           ))}
//         </div>

//         {/* Customer Satisfaction Row */}
//         <div className="flex border-b border-gray-300">
//           <div className="w-1/4 p-4 bg-gray-50 font-semibold">Customer Satisfaction</div>
//           {productList.map((p, i) => (
//             <div className="w-1/4 p-4 text-center text-sm" key={`csat-${i}`}>
//               {p.csat || ''}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )

//   const bgClass = bg === 'gray' ? 'bg-gray-50' : 'bg-white'

//   if (disableInnerContainer) {
//     return <section className={`${bgClass} ${className || ''}`}>{content}</section>
//   }

//   return <section className={`${bgClass} ${className || ''}`}>{content}</section>
// }

// export default ThreeBottles

import React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type Product = {
  name: string
  rating: number
  media?: MediaType | number | null
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

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const decimal = rating - fullStars
  const hasPartialStar = decimal > 0
  const emptyStars = 5 - fullStars - (hasPartialStar ? 1 : 0)

  // Convert decimal to percentage for gradient
  const fillPercentage = Math.round(decimal * 100)

  return (
    <div className="flex items-center gap-1 justify-center">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}

      {/* Partial star - shows exact percentage fill */}
      {hasPartialStar && (
        <svg key="partial" className="w-4 h-4 text-amber-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient
              id={`partial-fill-${rating}`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="20"
              y1="0"
              y2="0"
            >
              <stop offset={`${fillPercentage}%`} stopColor="#fbbf24" />
              <stop offset={`${fillPercentage}%`} stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#partial-fill-${rating})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}

      <span className="ml-2 text-white font-medium text-sm">{rating}</span>
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
    <div className="w-20 h-28 relative overflow-hidden flex items-center justify-center mx-auto">
      <div className={`absolute inset-0 ${colorClass}`} />
      <div className={`absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 ${capClass}`} />
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-16 ${accentClass}`} />
    </div>
  )
}

export const ThreeBottles: React.FC<ThreeBottlesProps> = (props) => {
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
    Array.isArray(products) && products.length > 0 ? products.slice(0, 3) : []

  const content = (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-16">
        <div className="flex-shrink-0">
          <h1 className="text-5xl font-white text-blue-600 leading-tight tracking-tight">
            {h1}
            <br />
            <span className="text-blue-600">{h2}</span>
            <br />
            <span className="text-3xl text-blue-600">{h3}</span>
          </h1>
          <div className="w-16 h-1 bg-blue-600 mt-4"></div>
        </div>

        {/* Simplified Product Images */}
        <div className="flex gap-24 items-center flex-1 justify-center">
          {productList.map((product, idx) => (
            <div className="text-center" key={idx}>
              {/* Simple image container with light background */}
              {/* increase image size */}
              <div className="w-40 h-48 rounded-lg flex items-center justify-center mb-4 ">
                {product.media && typeof product.media === 'object' ? (
                  <Media
                    resource={product.media}
                    alt={product.name}
                    // increase image size
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <PlaceholderBottle color={product.color} />
                )}

                {/* #1 badge for first product */}
                {idx === 0 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    #1
                  </div>
                )}
              </div>

              {/* Product name */}
              <div className="font-bold text-lg text-gray-900">{product.name}</div>
              <div className="text-sm text-gray-500 mt-1">Premium Formula</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-gray-200 bg-white">
        {/* Header Row */}
        <div className="bg-blue-600 text-gray-900">
          <div className="flex">
            <div className="w-1/4 p-5 font-bold text-lg border-r text-white border-blue-700">
              What To Look For
            </div>
            {productList.map((p, i) => {
              const rating = Number.isFinite(p?.rating)
                ? Math.max(0, Math.min(5, Number(p.rating)))
                : 0
              return (
                <div
                  className="w-1/4 p-5 text-center border-r border-blue-700 text-white last:border-r-0"
                  key={`rating-${i}`}
                >
                  <div className="font-bold mb-3 text-white">{p.name}</div>
                  <StarRating rating={rating} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Ingredients Row */}
        <div className="bg-blue-50 border-b border-gray-200">
          <div className="flex">
            <div className="w-1/4 p-5 font-semibold text-gray-900 bg-blue-100 border-r border-gray-200">
              Main Ingredients
            </div>
            {productList.map((p, i) => (
              <div
                className="w-1/4 p-5 text-center text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                key={`ing-${i}`}
              >
                {p.ing || ''}
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits Row */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <div className="w-1/4 p-5 font-semibold text-gray-900 bg-gray-50 border-r border-gray-200">
              Key Benefits
            </div>
            {productList.map((p, i) => (
              <div
                className="w-1/4 p-5 text-center text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                key={`benefit-${i}`}
              >
                {p.benefits || ''}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Satisfaction Row */}
        <div>
          <div className="flex">
            <div className="w-1/4 p-5 font-semibold text-gray-900 bg-green-50 border-r border-gray-200">
              Customer Satisfaction
            </div>
            {productList.map((p, i) => (
              <div
                className="w-1/4 p-5 text-center text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                key={`csat-${i}`}
              >
                {p.csat || ''}
              </div>
            ))}
          </div>
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
