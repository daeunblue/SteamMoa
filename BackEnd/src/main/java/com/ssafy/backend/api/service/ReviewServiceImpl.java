package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.ReviewPostReq;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.review.Review;
import com.ssafy.backend.db.repository.ReviewRepository;
import com.ssafy.backend.db.repository.UserRepository;
import com.ssafy.backend.db.repository.game.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GameRepository gameRepository;
    @Override
    public boolean createOrUpdateReview(ReviewPostReq reviewPostReq) {
        Review review = new Review();
        Long gameId = reviewPostReq.getGameId();
        String userServiceId = reviewPostReq.getUserServiceId();

        Optional<Review> optionalReview = reviewRepository.findByGameGameIdAndUserUserServiceId(gameId, userServiceId);
        try{
            // 사용자가 이미 해당 게임에 리뷰를 작성했는지 확인하기.
            if(optionalReview.isPresent()){
                review = optionalReview.get();
                System.out.println("이미 해당 리뷰에 대해 작성했습니다.");
                review.setReviewContent(reviewPostReq.getReviewContent());
                review.setReviewScore(reviewPostReq.getReviewScore());
                reviewRepository.save(review);
            }else{
                System.out.println("작성한적 없음");
                review.setReviewContent(reviewPostReq.getReviewContent());
                review.setReviewScore(reviewPostReq.getReviewScore());
                review.setUser(userRepository.findByUserServiceId(reviewPostReq.getUserServiceId()).get());
                review.setGame(gameRepository.findByGameId(reviewPostReq.getGameId()));
                reviewRepository.save(review);
            }
            return true;
        }catch (Exception e){ // 예외처리 해야할 부분
            return false;
        }
    }

    @Override
    public List<Review> findReviewByUserServiceId(String userServiceId) {
        List<Review> list = new ArrayList<>();
        list = reviewRepository.findAllByUserUserServiceId(userServiceId).get();


        return list;
    }

    @Override
    public boolean existReview(Long reviewId) {
        boolean result = reviewRepository.existsByReviewId(reviewId);

        if(result) return true;
        else return false;

    }

    @Override
    public boolean deleteReview(Long reviewId) {
        reviewRepository.delete(reviewRepository.findByReviewId(reviewId).get());
        try{
//            reviewRepository.delete(reviewRepository.findByReviewId(reviewId).get());
//            return true;
        }catch (Exception e){
            return false;
        }
        return true;
    }


}
