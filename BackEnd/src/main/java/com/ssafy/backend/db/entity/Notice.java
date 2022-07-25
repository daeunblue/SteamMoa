package com.ssafy.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private Long noticeId;

    // 연관관계 FK 설정해줘야함
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "notice_content", nullable = false)
    private String noticeContent;

    @Column(name = "notice_type", nullable = false)
    private String noticeType;

    @Column(name = "is_read")
    @ColumnDefault("false")
    private boolean isRead;

    @OneToMany(mappedBy = "notice")
    private List<NoticeList> nLists = new ArrayList<>();
}
