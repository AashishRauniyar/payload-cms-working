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

export const TopOurChoose: React.FC = () => {
  const [hoveredCriterion, setHoveredCriterion] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Using your component's data structure
  const overallRating = 4.3;
  const productName = "Primal RX Gummies";
  
  // Default ratings data following your structure
  const ratingsData: Criterion[] = [
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

  // Default buttons following your structure
  const buttons: ActionButton[] = [
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

  const StarRating: React.FC<{
    rating: number;
    size?: RatingSize;
    color?: string;
    interactive?: boolean;
    criterionIndex?: number | null;
  }> = ({ rating, size = 'sm', color = 'text-yellow-400', interactive = false, criterionIndex = null }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
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
    const baseClasses = 'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform';

    switch (evidence?.toLowerCase()) {
      case 'gold star evidence':
        return (
          <div className={`${baseClasses} ${isHovered ? 'bg-blue-500 scale-110 shadow-lg' : 'bg-blue-400'}`}>
            <Star className={`w-3 h-3 fill-white text-white transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
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

  const getCriterionIcon = (title: string) => {
    switch (title.toLowerCase()) {
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

  const getCriterionColor = (title: string) => {
    switch (title.toLowerCase()) {
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

  const getProgressColor = (title: string) => {
    switch (title.toLowerCase()) {
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
    <div className="max-w-5xl mx-auto p-4 bg-white">
      {/* Compact Header Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-lg mb-4">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          
          {/* Product Image - Real image */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 max-w-48 mx-auto relative">
              <Image
                src="/media/okkkk.png"
                alt={`${productName} product image`}
                fill
                sizes="(max-width: 768px) 12rem, 12rem"
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          {/* Product Info - Compact */}
          <div className="md:col-span-2 space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-green-700 text-sm font-medium">Premium Quality</span>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                {productName}
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Advanced daily supplement with scientifically-backed ingredients for optimal health support.
              </p>
            </div>

            {/* Overall Rating - Inline */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2.5">
              <div className="flex items-center gap-2">
                <StarRating rating={overallRating} />
                <span className="text-lg font-bold text-blue-600">{overallRating}</span>
                <span className="text-gray-600 text-sm">Overall</span>
              </div>
              <div className="flex gap-2">
                {buttons.map((button, index) => (
                  <button
                    key={button.id || index}
                    className={`font-semibold py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm ${
                      button.style === 'primary'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {button.style === 'primary' ? (
                      <ShoppingCart className="w-4 h-4 inline mr-1" />
                    ) : (
                      <Eye className="w-4 h-4 inline mr-1" />
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
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-lg mb-4">
        <div
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            Performance Analysis
          </div>
          <div className={`transform transition-all duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:scale-110'}`}>
            <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/* Compact Ratings Grid - Collapsible */}
      {isExpanded && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ratingsData.map((rating, index) => {
            const Icon = getCriterionIcon(rating.title);
            const colorClasses = getCriterionColor(rating.title);
            const progressColor = getProgressColor(rating.title);
            
            return (
              <div 
                key={rating.id || index}
                className={`bg-gradient-to-r ${colorClasses} rounded-xl p-3 border hover:scale-105 transition-transform cursor-pointer bg-white shadow-md`}
                onMouseEnter={() => setHoveredCriterion(index)}
                onMouseLeave={() => setHoveredCriterion(null)}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    {getEvidenceIcon(rating.evidence, hoveredCriterion === index)}
                    <Icon className="w-4 h-4 text-gray-700" />
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">{rating.title}</div>
                      <p className="text-gray-600 text-xs">{rating.evidence}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StarRating
                      rating={rating.rating}
                      size="sm"
                      interactive={true}
                      criterionIndex={index}
                    />
                    <p className="text-gray-800 font-bold text-sm">{rating.rating}/5</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${progressColor} h-2 rounded-full transition-all duration-500`}
                    style={{width: `${(rating.rating/5) * 100}%`}}
                  ></div>
                </div>

                {/* Description on hover */}
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  hoveredCriterion === index ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded italic">
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-base font-bold text-white">Ready to optimize your health?</div>
            <p className="text-white text-sm" style={{color:'white'}}>Join thousands who trust {productName}</p>
          </div>
          <div className="flex gap-2.5">
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm">
              Best Price
            </button>
            <button className="bg-transparent border border-white text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default PrimalRXRedesign;