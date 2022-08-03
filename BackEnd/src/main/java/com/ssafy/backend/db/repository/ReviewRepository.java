package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.review.Review;
import com.ssafy.backend.db.entity.tactic.Tactic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

}
