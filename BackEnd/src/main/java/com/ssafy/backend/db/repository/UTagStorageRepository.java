package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.UTagStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 유저 태그 저장소 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UTagStorageRepository extends JpaRepository<UTagStorage, Long> {
}