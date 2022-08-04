package com.ssafy.backend.db.repository.follow;

import com.ssafy.backend.db.entity.follow.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 구독 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existByFollowerIdAndFollowingId (String FollwerUserId, String FollowingUserId);
}
