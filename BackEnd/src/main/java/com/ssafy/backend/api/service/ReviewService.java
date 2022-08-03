package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.ReviewPostReq;

public interface ReviewService {
    boolean createReview(ReviewPostReq reviewPostReq);

    
}
