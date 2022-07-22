package com.ssafy.steammoa.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

/**
 * 알림 모델 정의.
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Notice{
    // 알림 식별자 PK
    @Id
    @Column(name = "notice_id")
    @GeneratedValue
    private Long id;

    // 연관관계 FK 설정해줘야함
    @Column(name = "user_service_id", nullable = false)
    private Long userId;

    @Column(name = "notice_content", nullable = false)
    private String content;

    @Column(name = "notice_type", nullable = false)
    private String type;

    @Column(name = "is_read")
    @ColumnDefault("false")
    private boolean isRead;


}
