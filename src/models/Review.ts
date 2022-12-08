export interface Review {
    id: string;
    type: string;
    reviewText: string;
    restaurantId: string;
    userName: string;
    userId: string;
    createDate: string;
    rating: number;
    imgs: string;
}

export function mapToReview(review: any) {
    const { id, type, review_text,
        restaurant_id, user_id, user_name,
        rating, create_date, imgs } = review;
    return {
        id,
        type,
        reviewText: review_text,
        restaurantId: restaurant_id,
        userId: user_id,
        userName: user_name,
        createDate: create_date,
        rating,
        imgs
    } as Review;
}