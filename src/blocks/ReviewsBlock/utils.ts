// Random name generation utilities for ReviewsBlock

export const maleNames = [
  'James',
  'Robert',
  'John',
  'Michael',
  'William',
  'David',
  'Richard',
  'Joseph',
  'Thomas',
  'Christopher',
  'Charles',
  'Daniel',
  'Matthew',
  'Anthony',
  'Mark',
  'Donald',
  'Steven',
  'Paul',
  'Andrew',
  'Joshua',
  'Kenneth',
  'Kevin',
  'Brian',
  'George',
  'Timothy',
  'Ronald',
  'Jason',
  'Edward',
  'Jeffrey',
  'Ryan',
  'Jacob',
  'Gary',
  'Nicholas',
  'Eric',
  'Jonathan',
  'Stephen',
  'Larry',
  'Justin',
  'Scott',
  'Brandon',
  'Benjamin',
  'Samuel',
  'Gregory',
  'Alexander',
  'Patrick',
  'Frank',
  'Raymond',
  'Jack',
  'Dennis',
  'Jerry',
]

export const femaleNames = [
  'Mary',
  'Patricia',
  'Jennifer',
  'Linda',
  'Elizabeth',
  'Barbara',
  'Susan',
  'Jessica',
  'Sarah',
  'Karen',
  'Lisa',
  'Nancy',
  'Betty',
  'Helen',
  'Sandra',
  'Donna',
  'Carol',
  'Ruth',
  'Sharon',
  'Michelle',
  'Laura',
  'Kimberly',
  'Deborah',
  'Dorothy',
  'Emily',
  'Emma',
  'Madison',
  'Olivia',
  'Hannah',
  'Abigail',
  'Isabella',
  'Samantha',
  'Ashley',
  'Sophia',
  'Amanda',
  'Stephanie',
  'Nicole',
  'Melissa',
  'Brenda',
  'Amy',
  'Anna',
  'Rebecca',
  'Virginia',
  'Kathleen',
  'Pamela',
  'Martha',
  'Debra',
  'Rachel',
  'Carolyn',
  'Janet',
]

export const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
  'Perez',
  'Thompson',
  'White',
  'Harris',
  'Sanchez',
  'Clark',
  'Ramirez',
  'Lewis',
  'Robinson',
  'Walker',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green',
  'Adams',
  'Nelson',
  'Baker',
  'Hall',
  'Rivera',
  'Campbell',
  'Mitchell',
  'Carter',
  'Roberts',
]

export const sampleReviewTexts = [
  "Struggling with stubborn weight that won't budge no matter what you try? You're not alone millions are searching for safe, effective, all-natural solutions designed for real people, not fitness influencers. Is the latest hype around NitriLean supplement justified, or just more empty promises? This NitriLean Review dives deep offering stats, doctor-formulated insight, and genuine user outcomes. In this Review, you'll see how people claim significant weight loss with an all natural blend Reviews also point to smoother energy and genuine ingredient transparency.",

  "I was skeptical at first, but after trying this product for 3 months, I can honestly say it's been life-changing. The natural ingredients work synergistically to boost metabolism without the jitters. I've lost 25 pounds and feel more energetic than I have in years. The best part is that it doesn't feel like a crash diet - it's sustainable and fits perfectly into my daily routine.",

  "As someone who has tried countless weight loss solutions, I was hesitant to try another supplement. However, the science-backed formula and transparent ingredient list convinced me to give it a shot. After 8 weeks, I've noticed significant improvements in my energy levels and overall well-being. The weight loss has been steady and healthy - exactly what I was looking for.",

  "This product exceeded my expectations! I've been using it for 4 months now and have lost 30 pounds. What I love most is that it doesn't just help with weight loss - it also improves my sleep quality and reduces my cravings for unhealthy foods. The customer service team is also fantastic and very responsive to questions.",

  "I've been on my weight loss journey for over a year, trying different approaches with limited success. This supplement was recommended by a friend, and I'm so glad I tried it. The natural formula is gentle on my stomach, and I've seen consistent results. I'm down 22 pounds and feeling more confident than ever.",

  "Initially, I was concerned about trying another weight loss supplement, but the positive reviews and money-back guarantee gave me confidence. After 12 weeks, I can confidently say this product works. I've lost 18 pounds, my energy levels are through the roof, and I feel healthier overall. Highly recommend to anyone looking for a natural solution.",
]

// Generate random name based on gender
export const generateRandomName = (gender: 'male' | 'female'): string => {
  const firstNames = gender === 'male' ? maleNames : femaleNames
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

// Generate random age between 25-65
export const generateRandomAge = (): number => {
  return Math.floor(Math.random() * (65 - 25 + 1)) + 25
}

// Generate random rating (weighted towards 4-5 stars)
export const generateRandomRating = (): number => {
  const weights = [1, 2, 5, 15, 25] // 1★, 2★, 3★, 4★, 5★
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  let random = Math.random() * totalWeight

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return i + 1
    }
  }
  return 5 // fallback
}

// Get random review text
export const generateRandomReviewText = (): string => {
  return sampleReviewTexts[Math.floor(Math.random() * sampleReviewTexts.length)]
}

// Generate random profile image option
export const generateRandomProfileImage = (gender: 'male' | 'female'): string => {
  const options =
    gender === 'male'
      ? ['male-1', 'male-2', 'male-3', 'auto']
      : ['female-1', 'female-2', 'female-3', 'auto']

  return options[Math.floor(Math.random() * options.length)]
}

// Generate a complete random review
export const generateRandomReview = () => {
  const gender = Math.random() > 0.5 ? 'female' : 'male'

  return {
    name: generateRandomName(gender),
    gender,
    age: generateRandomAge(),
    profileImage: generateRandomProfileImage(gender),
    rating: generateRandomRating(),
    reviewText: generateRandomReviewText(),
  }
}

// Generate multiple sample reviews
export const generateSampleReviews = (count: number = 4) => {
  return Array.from({ length: count }, () => generateRandomReview())
}
