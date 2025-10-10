'use client'
import React, { useState } from 'react';
import { Star, StarHalf, Shield, Award, TrendingUp, CheckCircle, Eye, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import Image from 'next/image';

type RatingSize = 'sm' | 'md' | 'lg';

type Criterion = {
  title: string;
  category: string;
  rating: number;
  evidence: string;
  description: string;
  id: string;
};

type ActionButton = {
  label: string;
  style: 'primary' | 'secondary';
  id: string;
};

export type TopOurChooseProps = {
  className?: string;
  disableInnerContainer?: boolean;
  title?: string;
  productName?: string;
  productImage?: unknown;
  overallRating?: number;
  ratings?: Criterion[];
  buttons?: ActionButton[];
  backgroundColor?: string;
};

export const TopOurChoose: React.FC<TopOurChooseProps> = ({
  className,
  disableInnerContainer, // unused but accepted for API consistency
  title,
  productName: productNameProp,
  productImage, // unused in this implementation
  overallRating: overallRatingProp,
  ratings: ratingsProp,
  buttons: buttonsProp,
  backgroundColor, // unused in this implementation
}) => {
  const [hoveredCriterion, setHoveredCriterion] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Using your component's data structure
  const overallRating = typeof overallRatingProp === 'number' ? overallRatingProp : 4.3;
  const productName = productNameProp || "Primal RX Gummies";
  
  // Default ratings data following your structure
  const ratingsDataDefault: Criterion[] = [
    {
      title: 'Support for Claims',
      category: 'Support for Claims',
      rating: 4,
      evidence: 'Gold Star Evidence',
      description: 'Strong clinical backing with peer-reviewed studies',
      id: 'support',
    },
    {
      title: 'Ingredient Safety',
      category: 'Ingredient Safety',
      rating: 5,
      evidence: 'Strong Evidence',
      description: 'Generally recognized as safe with minimal side effects',
      id: 'safety',
    },
    {
      title: 'Value for the Price',
      category: 'Value for the Price',
      rating: 4.5,
      evidence: 'Good Evidence',
      description: 'Competitive pricing compared to similar premium products',
      id: 'value',
    },
    {
      title: 'Projected Efficacy',
      category: 'Projected Efficacy',
      rating: 4,
      evidence: 'Strong Evidence',
      description: 'Expected results based on ingredient profiles and dosages',
      id: 'efficacy',
    },
  ];

  const ratingsData = ratingsProp && ratingsProp.length ? ratingsProp as Criterion[] : ratingsDataDefault;

  // Default buttons following your structure
  const buttonsDefault: ActionButton[] = [
    {
      label: 'Shop Now',
      style: 'primary',
      id: 'shop'
    },
    {
      label: 'Read Review',
      style: 'secondary',
      id: 'review'
    }
  ];

  const buttons = buttonsProp && buttonsProp.length ? buttonsProp as ActionButton[] : buttonsDefault;

  const StarRating: React.FC<{
    rating: number;
    size?: RatingSize;
    color?: string;
    interactive?: boolean;
    criterionIndex?: number | null;
  }> = ({ rating, size = 'sm', color = 'text-yellow-400', interactive = false, criterionIndex = null }) => {
    const sizeClasses = {
      sm: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
      md: 'w-4 h-4 sm:w-5 sm:h-5',
      lg: 'w-5 h-5 sm:w-6 sm:h-6',
    };

    const starSize = sizeClasses[size];
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const isHovered = interactive && hoveredCriterion === criterionIndex;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={`${starSize} transition-all duration-300 cursor-pointer
              ${isHovered
                ? 'fill-yellow-500 text-yellow-500 transform scale-110 drop-shadow-lg'
                : `${color} fill-current hover:fill-yellow-500 hover:text-yellow-500`
              }`}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className={`${starSize} relative`}>
            <Star className={`${starSize} text-gray-300 absolute transition-all duration-300`} />
            <StarHalf
              className={`${starSize} transition-all duration-300 absolute cursor-pointer
                ${isHovered
                  ? 'fill-yellow-500 text-yellow-500 transform scale-110 drop-shadow-lg'
                  : `${color} fill-current hover:fill-yellow-500 hover:text-yellow-500`
                }`}
            />
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={`${starSize} text-gray-300 transition-all duration-300 cursor-pointer
              ${isHovered ? 'text-gray-400 transform scale-110' : 'hover:text-gray-400'}`}
          />
        );
      }
    }

    return <div className="flex gap-0.5">{stars}</div>;
  };

  const getEvidenceIcon = (evidence: string | undefined, isHovered: boolean = false) => {
    const baseClasses = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 transform flex-shrink-0';

    switch (evidence?.toLowerCase()) {
      case 'gold star evidence':
        return (
          <div className={`${baseClasses} ${isHovered ? 'bg-blue-500 scale-110 shadow-lg' : 'bg-blue-400'}`}>
            <Star className={`w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
          </div>
        );
      case 'limited evidence':
        return (
          <div className={`${baseClasses} ${isHovered ? 'bg-gray-500 scale-110 shadow-lg' : 'bg-gray-400'}`}></div>
        );
      case 'strong evidence':
        return (
          <div className={`${baseClasses} ${isHovered ? 'bg-green-600 scale-110 shadow-lg' : 'bg-green-500'}`}></div>
        );
      case 'good evidence':
        return (
          <div className={`${baseClasses} ${isHovered ? 'bg-blue-600 scale-110 shadow-lg' : 'bg-blue-500'}`}></div>
        );
      default:
        return <div className={`${baseClasses} bg-gray-300`}></div>;
    }
  };

  const getCriterionIcon = (title?: string) => {
    const key = (title || '').toLowerCase()
    switch (key) {
      case 'support for claims':
        return Award;
      case 'ingredient safety':
        return Shield;
      case 'value for the price':
        return CheckCircle;
      case 'projected efficacy':
        return TrendingUp;
      default:
        return CheckCircle;
    }
  };

  const getCriterionColor = (title?: string) => {
    const key = (title || '').toLowerCase()
    switch (key) {
      case 'support for claims':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'ingredient safety':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'value for the price':
        return 'from-blue-600/20 to-blue-700/20 border-blue-600/30';
      case 'projected efficacy':
        return 'from-green-500/20 to-green-600/20 border-green-500/30';
      default:
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
    }
  };

  const getProgressColor = (title?: string) => {
    const key = (title || '').toLowerCase()
    switch (key) {
      case 'support for claims':
        return 'from-blue-400 to-blue-500';
      case 'ingredient safety':
        return 'from-green-400 to-emerald-400';
      case 'value for the price':
        return 'from-blue-500 to-blue-600';
      case 'projected efficacy':
        return 'from-green-400 to-green-500';
      default:
        return 'from-blue-400 to-blue-500';
    }
  };

  return (
    <div className={`${className ? className + ' ' : ''}max-w-5xl mx-auto px-3 py-4 sm:px-4 md:px-6 bg-white`}>
      {/* Compact Header Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg mb-3 sm:mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 items-center">
          
          {/* Product Image - Real image */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 max-w-[10rem] sm:max-w-[12rem] mx-auto relative">
              <Image
                src="/media/okkkk.png"
                alt={`${productName} product image`}
                fill
                sizes="(max-width: 640px) 10rem, (max-width: 768px) 12rem, 12rem"
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          {/* Product Info - Compact */}
          <div className="sm:col-span-1 md:col-span-2 space-y-2 sm:space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span className="text-green-700 text-xs sm:text-sm font-medium">Premium Quality</span>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent leading-tight">
                {title || productName}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-1.5 sm:mt-2 line-clamp-2">
                Advanced daily supplement with scientifically-backed ingredients for optimal health support.
              </p>
            </div>

            {/* Overall Rating - Responsive */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between bg-gray-100 rounded-lg p-2 sm:p-2.5 gap-2 xs:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <StarRating rating={overallRating} />
                <span className="text-base sm:text-lg font-bold text-blue-600">{overallRating}</span>
                <span className="text-gray-600 text-xs sm:text-sm">Overall</span>
              </div>
              <div className="flex gap-1.5 sm:gap-2 w-full xs:w-auto">
                {buttons.map((button, index) => (
                  <button
                    key={button.id || index}
                    className={`font-semibold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm flex-1 xs:flex-initial whitespace-nowrap ${
                      button.style === 'primary'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {button.style === 'primary' ? (
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    ) : (
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    )}
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analysis Header */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg mb-3 sm:mb-4">
        <div
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            Performance Analysis
          </div>
          <div className={`transform transition-all duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:scale-110'}`}>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/* Compact Ratings Grid - Collapsible */}
      {isExpanded && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg mb-3 sm:mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {ratingsData.map((rating, index) => {
            const Icon = getCriterionIcon(rating.title);
            const colorClasses = getCriterionColor(rating.title);
            const progressColor = getProgressColor(rating.title);
            
            return (
              <div 
                key={rating.id || index}
                className={`bg-gradient-to-r ${colorClasses} rounded-lg sm:rounded-xl p-2.5 sm:p-3 border hover:scale-105 transition-transform cursor-pointer bg-white shadow-md`}
                onMouseEnter={() => setHoveredCriterion(index)}
                onMouseLeave={() => setHoveredCriterion(null)}
              >
                <div className="flex items-start sm:items-center justify-between mb-2 sm:mb-2.5 gap-2">
                  <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                    {getEvidenceIcon(rating.evidence, hoveredCriterion === index)}
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-1">{rating.title}</div>
                      <p className="text-gray-600 text-[10px] sm:text-xs line-clamp-1">{rating.evidence}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="hidden sm:block">
                      <StarRating
                        rating={rating.rating}
                        size="sm"
                        interactive={true}
                        criterionIndex={index}
                      />
                    </div>
                    <p className="text-gray-800 font-bold text-xs sm:text-sm mt-1 sm:mt-0">{rating.rating}/5</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-300 rounded-full h-2 sm:h-2.5 mb-1.5 sm:mb-2">
                  <div 
                    className={`bg-gradient-to-r ${progressColor} h-2 sm:h-2.5 rounded-full transition-all duration-500`}
                    style={{width: `${(rating.rating/5) * 100}%`}}
                  ></div>
                </div>

                {/* Description - Always visible on mobile, hover on desktop */}
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  hoveredCriterion === index ? 'max-h-20 sm:max-h-12 opacity-100' : 'max-h-20 sm:max-h-0 opacity-100 sm:opacity-0'
                }`}>
                  <div className="text-[10px] sm:text-xs text-blue-700 bg-blue-50 px-1.5 sm:px-2 py-1 rounded italic leading-relaxed">
                    {rating.description}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Compact Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <div className="text-sm sm:text-base font-bold text-white">Ready to optimize your health?</div>
            <p className="text-white text-xs sm:text-sm mt-0.5" style={{color:'white'}}>Join thousands who trust {productName}</p>
          </div>
          <div className="flex gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button className="bg-white text-blue-600 font-semibold py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm flex-1 sm:flex-initial whitespace-nowrap">
              Best Price
            </button>
            <button className="bg-transparent border border-white text-white font-semibold py-2 px-3 sm:px-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-xs sm:text-sm flex-1 sm:flex-initial whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default PrimalRXRedesign;