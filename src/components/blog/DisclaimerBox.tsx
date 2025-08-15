import React from 'react'

const DisclaimerBox = () => {
  return (
    <div className="disclaimer-box">
      <p className="disclaimer-text">
        We independently research, review, and recommend the best products. Healthcare professionals
        review articles for medical accuracy. When you buy through our links, we may earn a
        commission.{' '}
        <a href="/process" className="disclaimer-link">
          Read more about our process for evaluating brands and products.
        </a>
      </p>
    </div>
  )
}

export default DisclaimerBox
