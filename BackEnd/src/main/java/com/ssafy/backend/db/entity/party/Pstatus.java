package com.ssafy.backend.db.entity.party;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="pstatus")
public class Pstatus {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="pstatus_id")
    private Long pstatusId;

    // 양방향 일대일
    @OneToOne(mappedBy = "pstatus")
    @JsonManagedReference
    @JoinColumn(name="party_id")
    private Party party;

    @Column(name="pstatus_content")
    private String content;
}
