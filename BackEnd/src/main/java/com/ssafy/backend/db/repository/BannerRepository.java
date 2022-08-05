package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Banner;
import com.ssafy.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 배너 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
}