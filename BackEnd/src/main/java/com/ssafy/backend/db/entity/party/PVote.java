package com.ssafy.backend.db.entity.party;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.backend.db.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="pvote")
public class PVote {
    // 특정 유저가 특정 파티에 대한 평가를 했는지 확인하는 테이블
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="pvote_id")
    private Long pvoteId;

    @Column(name = "party_id")
    private Long partyId;

    @Column(name = "user_service_id")
    private String userServiceId;

}
