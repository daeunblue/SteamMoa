package com.ssafy.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class NoticeList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nlist_id")
    private Long id;

    @Column(name = "nlist_ctime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date cTime; // 알림 생성 시간

    @ManyToOne
    @JoinColumn(name = "notice_id")
    private Notice notice;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
