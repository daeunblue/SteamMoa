package com.ssafy.backend.db.entity;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GamelistDTO;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartylistDTO;
import com.ssafy.backend.db.entity.tactic.Tactic;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IntegratedSearch_TacticDTO extends Tactic {
    private String userServiceId;
    private String gameName;
    private String gameImgPath;

    public IntegratedSearch_TacticDTO(Tactic t) {
        super(t.getTacticId(), t.getTacticTitle(), t.getTacticContent(), t.getUser(), t.getGame());
        this.userServiceId = t.getUser().getUserServiceId();
        this.gameName = t.getGame().getName();
        this.gameImgPath = t.getGame().getImgpath();
    }
}
