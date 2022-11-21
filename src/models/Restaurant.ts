export interface Restaurant {
    id: string;
    type: string;
    name: string;
    description: string;
    location: string;
    avgRating: number;
    totalRatings: number;
    logo: string;
}

export function mapToRestaurant(restaurant: any) {
    const { id, type, restaurant_name,
        description, location, avg_rating,
        total_ratings, logo } = restaurant;
    return {
        id: id,
        type: type,
        name: restaurant_name,
        description: description,
        location: location,
        avgRating: avg_rating,
        totalRatings: total_ratings,
        logo: logo
    };
}