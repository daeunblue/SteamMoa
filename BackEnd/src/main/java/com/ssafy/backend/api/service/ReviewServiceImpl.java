package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.ReviewPostReq;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.review.Review;
import com.ssafy.backend.db.repository.ReviewRepository;
import com.ssafy.backend.db.repository.UserRepository;
import com.ssafy.backend.db.repository.game.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GameRepository gameRepository;
    @Override
    public boolean createReview(ReviewPostReq reviewPostReq) {
        Review review = new Review();
        try{
            review.setUser(userRepository.findByUserServiceId(reviewPostReq.getUserServiceId()).get());
            review.setGame(gameRepository.findByGameId(reviewPostReq.getGameId()));
            review.setReviewContent(reviewPostReq.getReviewContent());
            review.setReviewScore(reviewPostReq.getReviewScore());
            return true;
        }catch (Exception e){ // 예외처리 해야할 부분
            return false;
        }
    }
}
