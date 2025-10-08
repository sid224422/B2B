// Rating utility functions

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-green-600';
  if (rating >= 4.0) return 'text-lime-600';
  if (rating >= 3.5) return 'text-yellow-600';
  if (rating >= 3.0) return 'text-orange-600';
  return 'text-red-600';
}

export function getRatingBackgroundColor(rating: number): string {
  if (rating >= 4.5) return 'bg-green-500';
  if (rating >= 4.0) return 'bg-lime-500';
  if (rating >= 3.5) return 'bg-yellow-500';
  if (rating >= 3.0) return 'bg-orange-500';
  return 'bg-red-500';
}

export function getStarRating(rating: number): {
  fullStars: number;
  halfStar: boolean;
  emptyStars: number;
} {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return {
    fullStars,
    halfStar,
    emptyStars,
  };
}

export function getRatingDistribution(reviews: Array<{ rating: number }>): {
  [key: number]: number;
} {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  reviews.forEach(review => {
    const roundedRating = Math.round(review.rating);
    if (roundedRating >= 1 && roundedRating <= 5) {
      distribution[roundedRating as keyof typeof distribution]++;
    }
  });
  
  return distribution;
}

export function getRatingPercentages(reviews: Array<{ rating: number }>): {
  [key: number]: number;
} {
  const distribution = getRatingDistribution(reviews);
  const total = reviews.length;
  
  if (total === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  return {
    1: (distribution[1] / total) * 100,
    2: (distribution[2] / total) * 100,
    3: (distribution[3] / total) * 100,
    4: (distribution[4] / total) * 100,
    5: (distribution[5] / total) * 100,
  };
}

export function getAverageRating(reviews: Array<{ rating: number }>): number {
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

export function getRatingSummary(reviews: Array<{ rating: number }>): {
  average: number;
  count: number;
  distribution: { [key: number]: number };
  percentages: { [key: number]: number };
} {
  return {
    average: getAverageRating(reviews),
    count: reviews.length,
    distribution: getRatingDistribution(reviews),
    percentages: getRatingPercentages(reviews),
  };
}

export function validateRating(rating: number): boolean {
  return rating >= 1 && rating <= 5 && Number.isInteger(rating);
}

export function getRatingLabel(rating: number): string {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  if (rating >= 3.0) return 'Fair';
  if (rating >= 2.5) return 'Poor';
  return 'Very Poor';
}

export function getRatingEmoji(rating: number): string {
  if (rating >= 4.5) return '⭐⭐⭐⭐⭐';
  if (rating >= 4.0) return '⭐⭐⭐⭐';
  if (rating >= 3.5) return '⭐⭐⭐';
  if (rating >= 3.0) return '⭐⭐';
  return '⭐';
}
