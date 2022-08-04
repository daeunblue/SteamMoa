package com.ssafy.backend.db.entity;

import com.ssafy.backend.db.entity.game.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MainpageGamelistDTO {
    private Long gameId;
    private String gameImg;

    public MainpageGamelistDTO(Game game) {
        this.gameId = game.getGameId();
        this.gameImg = game.getImgpath();
    }
}
