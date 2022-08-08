package com.ssafy.backend.db.entity;

import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartyPlayerDTO;
import com.ssafy.backend.db.entity.party.PartyTag;
import com.ssafy.backend.db.entity.party.Puser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/*
    응답용 DTO.
    알림 발송 전용.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDTO {
    private Long noticeId;
    private String userServiceId;
    private Long partyId;
    private String partyName;
    private String gameName;
    private String noticeTime;
    private boolean noticeIsRead;
}
