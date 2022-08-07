package com.ssafy.backend.db.entity;

import com.ssafy.backend.api.response.UserDto;
import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GamelistDTO;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartylistDTO;
import com.ssafy.backend.db.entity.party.Puser;
import com.ssafy.backend.db.entity.review.Review;
import com.ssafy.backend.db.entity.tactic.Tactic;
import com.ssafy.backend.db.repository.party.PartyRepository;
import com.ssafy.backend.db.repository.party.PuserRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IntegratedSearch_UserDTO {
    private Long userId;
    private String userName;
    private String userServiceId;
    private double userPoint;
    private List<String> userTags = new ArrayList<>();
    private List<PartylistDTO> userParties = new ArrayList<>();

    public IntegratedSearch_UserDTO(User u) {
        this.userId = u.getUserId();
        this.userName = u.getUserName();
        this.userServiceId = u.getUserServiceId();
        this.userPoint = u.getUserPoint();
        for(UserTag userTag: u.getUTagLists())
            this.userTags.add(userTag.getUTagStorage().getContent());
    }
}
