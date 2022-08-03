package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.ReviewPostReq;
import com.ssafy.backend.db.entity.review.Review;

import java.util.List;

public interface ReviewService {
    boolean createOrUpdateReview(ReviewPostReq reviewPostReq);

    List<Review> findReviewByUserServiceId(String userServiceId);

    boolean existReview(Long reviewId);

    boolean deleteReview(Long reviewId);

}
