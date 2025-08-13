// import React from 'react'
// import { Star, DollarSign, ClipboardList, ShieldCheck, ExternalLink } from 'lucide-react'

// interface RatingItem {
//   label: string
//   score: number
//   iconType: 'star' | 'dollar' | 'clipboard' | 'shield'
// }

// interface HighlightItem {
//   text: string
// }

// interface BrandHighlightsTableProps {
//   title?: string
//   overallRating?: number
//   productImage?: {
//     url: string
//     alt: string
//   }
//   productName?: string
//   buyNowText?: string
//   buyNowLink?: string
//   ratings?: RatingItem[]
//   highlights?: HighlightItem[]
//   backgroundColor?: 'none' | 'white' | 'gray' | 'blue' | 'gradient'
//   disableInnerContainer?: boolean
//   className?: string
// }

// const iconMap = {
//   star: <Star className="w-6 h-6 text-blue-500" />,
//   dollar: <DollarSign className="w-6 h-6 text-green-500" />,
//   clipboard: <ClipboardList className="w-6 h-6 text-purple-500" />,
//   shield: <ShieldCheck className="w-6 h-6 text-sky-500" />,
// }

// export const BrandHighlightsTable: React.FC<BrandHighlightsTableProps> = ({
//   title = 'How Does Our Product Rate?',
//   overallRating = 4.5,
//   productImage,
//   productName = 'Our Product',
//   buyNowText = 'SHOP NOW',
//   buyNowLink = '#',
//   ratings = [],
//   highlights = [],
//   backgroundColor = 'gradient',
//   disableInnerContainer,
//   className,
// }) => {
//   // Replace [Product] with actual product name in title
//   const displayTitle = title.replace(/\[Product\]/g, productName)

//   const backgroundClasses = {
//     none: '',
//     white: 'bg-white',
//     gray: 'bg-gray-50',
//     blue: 'bg-blue-50',
//     gradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
//   }

//   const content = (
//     <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl max-w-7xl mx-auto">
//       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-8 text-gray-800 leading-tight">
//         {displayTitle}
//       </h2>

//       {/* Overall Rating Banner */}
//       <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white text-center py-4 sm:py-5 lg:py-6 rounded-xl mb-6 sm:mb-8 shadow-lg relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-pink-400/10 animate-pulse"></div>
//         <div className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
//           <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-yellow-300 fill-current animate-bounce" />
//           <span className="text-base sm:text-lg lg:text-xl font-medium">Overall Rating:</span>
//           <span className="font-bold text-xl sm:text-2xl lg:text-3xl">{overallRating}</span>
//           <span className="text-base sm:text-lg lg:text-xl opacity-90">/5</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
//         {/* Product Image and Buy Button */}
//         <div className="lg:col-span-3 flex flex-col items-center space-y-4 sm:space-y-6">
//           <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
//             {productImage?.url ? (
//               <img
//                 src={productImage.url}
//                 alt={productImage.alt || productName}
//                 className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
//               />
//             ) : (
//               <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
//                 <span className="text-gray-400 text-sm text-center">Product Image</span>
//               </div>
//             )}
//           </div>
//           <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center text-gray-800">
//             {productName}
//           </h3>

//           {/* Ultra Attractive Buy Now Button */}
//           <a
//             href={buyNowLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group relative inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-sm sm:text-base lg:text-lg rounded-full shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-[0_20px_50px_rgba(245,101,101,0.5)] active:scale-95 overflow-hidden cursor-pointer"
//           >
//             {/* Animated background layers */}
//             <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

//             {/* Shimmer effect */}
//             <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

//             {/* Pulsing ring */}
//             <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-80 group-hover:animate-ping transition-all duration-300"></div>

//             {/* Glow effect */}
//             <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500"></div>

//             {/* Content */}
//             <span className="relative z-20 flex items-center space-x-2 sm:space-x-3 font-extrabold tracking-wide">
//               <span className="group-hover:animate-bounce">{buyNowText}</span>
//               <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 group-hover:translate-x-1 group-hover:scale-125 group-hover:rotate-12" />
//             </span>

//             {/* Sparkle effects */}
//             <div className="absolute top-1 right-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300 delay-100"></div>
//             <div className="absolute bottom-2 left-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300 delay-300"></div>
//           </a>
//         </div>

//         {/* Ratings Section */}
//         <div className="lg:col-span-5 space-y-1">
//           <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 flex items-center">
//             <Star className="w-6 h-6 text-yellow-500 mr-2 fill-current" />
//             Product Ratings
//           </h3>
//           <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 shadow-sm">
//             {ratings && ratings.length > 0 ? (
//               ratings.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-gray-100 last:border-none transition-all duration-300 hover:bg-gradient-to-r hover:from-white hover:to-blue-50 hover:rounded-lg hover:px-4 hover:shadow-sm group"
//                 >
//                   <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-sm border-2 border-gray-100 group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300">
//                     {iconMap[item.iconType] || iconMap.star}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800 text-sm sm:text-base">{item.label}</p>
//                   </div>
//                   <div className="flex items-center space-x-2 sm:space-x-3">
//                     <div className="flex text-yellow-400">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
//                             i < Math.floor(item.score)
//                               ? 'fill-current text-yellow-400'
//                               : 'stroke-current text-gray-300'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <span className="font-bold text-lg sm:text-xl text-gray-800">
//                         {item.score}
//                       </span>
//                       <span className="text-gray-500 text-sm">/5</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 py-8 sm:py-12">
//                 <Star className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//                 <p className="text-lg font-medium">No ratings available</p>
//                 <p className="text-sm">Add ratings to display them here</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Brand Highlights Section - Enhanced CTA */}
//         <div className="lg:col-span-4">
//           <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 sm:p-6 rounded-2xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
//             {/* Decorative background */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>

//             <div className="relative z-10">
//               <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 flex items-center">
//                 <div className="p-2 bg-blue-500 rounded-full mr-3 shadow-lg">
//                   <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                 </div>
//                 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Brand Highlights
//                 </span>
//               </h3>

//               {highlights && highlights.length > 0 ? (
//                 <ul className="space-y-3 sm:space-y-4">
//                   {highlights.map((point, idx) => (
//                     <li
//                       key={idx}
//                       className="flex items-start space-x-3 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 transition-all duration-300 hover:shadow-lg hover:bg-white/90 hover:border-blue-200 hover:-translate-y-1 group"
//                     >
//                       <div className="flex-shrink-0 mt-1">
//                         <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
//                       </div>
//                       <span className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-300">
//                         {point.text}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="text-center text-gray-500 py-8 sm:py-12">
//                   <ShieldCheck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//                   <p className="text-lg font-medium">No highlights available</p>
//                   <p className="text-sm">Add brand highlights to showcase key features</p>
//                 </div>
//               )}

//               {/* Call-to-action enhancement */}
//               {highlights && highlights.length > 0 && (
//                 <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200/50 backdrop-blur-sm">
//                   <p className="text-center text-sm text-gray-600 font-medium">
//                     ✨ Premium quality guaranteed with these exclusive features
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

//   if (disableInnerContainer) {
//     return (
//       <section className={`py-16 px-4 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
//         {content}
//       </section>
//     )
//   }

//   return (
//     <section className={`py-16 px-4 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
//       <div className="max-w-7xl mx-auto">{content}</div>
//     </section>
//   )
// }

import React from 'react'
import { Star, DollarSign, ClipboardList, ShieldCheck, ExternalLink } from 'lucide-react'

interface RatingItem {
  label: string
  score: number
  iconType: 'star' | 'dollar' | 'clipboard' | 'shield'
}

interface HighlightItem {
  text: string
}

interface BrandHighlightsTableProps {
  title?: string
  overallRating?: number
  productImage?: {
    url: string
    alt: string
  }
  productName?: string
  buyNowText?: string
  buyNowLink?: string
  ratings?: RatingItem[]
  highlights?: HighlightItem[]
  backgroundColor?: 'none' | 'white' | 'gray' | 'blue' | 'gradient'
  disableInnerContainer?: boolean
  className?: string
}

const iconMap = {
  star: <Star className="w-5 h-5 text-blue-500" />,
  dollar: <DollarSign className="w-5 h-5 text-green-500" />,
  clipboard: <ClipboardList className="w-5 h-5 text-purple-500" />,
  shield: <ShieldCheck className="w-5 h-5 text-blue-500" />,
}

export const BrandHighlightsTable: React.FC<BrandHighlightsTableProps> = ({
  title = 'How Does Our Product Rate?',
  overallRating = 4.5,
  productImage,
  productName = 'Our Product',
  buyNowText = 'SHOP NOW',
  buyNowLink = '#',
  ratings = [],
  highlights = [],
  backgroundColor = 'white',
  disableInnerContainer,
  className,
}) => {
  // Replace [Product] with actual product name in title
  const displayTitle = title.replace(/\[Product\]/g, productName)

  const backgroundClasses = {
    none: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  }

  const content = (
    <div className="max-w-6xl mx-auto bg-white">
      {/* Overall Rating Banner */}
      <div className="bg-blue-500 text-white text-center py-3 mb-8">
        <div className="flex items-center justify-center space-x-2">
          <Star className="w-5 h-5 text-white fill-current" />
          <span className="text-lg font-semibold">Overall Rating: {overallRating}</span>
        </div>
      </div>

      <div className="px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image and Buy Button */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-xs">
              {productImage?.url ? (
                <img
                  src={productImage.url}
                  alt={productImage.alt || productName}
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm text-center">Product Image</span>
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold text-center text-gray-800">{productName}</h3>

            <a
              href={buyNowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{buyNowText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Ratings Section */}
          <div className="space-y-4">
            {ratings && ratings.length > 0 ? (
              ratings.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-gray-200 last:border-none"
                >
                  <div className="flex items-center space-x-3">
                    {iconMap[item.iconType] || iconMap.star}
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{item.score}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No ratings available</p>
              </div>
            )}
          </div>

          {/* Brand Highlights Section */}
          <div className="bg-gray-50 p-6 rounded">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6" />
              <span>Brand Highlights</span>
            </h3>

            {highlights && highlights.length > 0 ? (
              <ul className="space-y-3">
                {highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-gray-600 mt-2">-</span>
                    <span className="text-gray-700 leading-relaxed">{point.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No highlights available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return (
      <section className={`py-8 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
        {content}
      </section>
    )
  }

  return (
    <section className={`py-8 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
      {content}
    </section>
  )
}
