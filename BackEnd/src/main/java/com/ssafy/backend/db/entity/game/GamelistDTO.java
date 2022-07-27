package com.ssafy.backend.db.entity.game;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/*
    게임 리스트 조회, 게임 리스트 검색 API를 통해 게임 리스트를 보낼 때 사용할 DTO이다.
 */
@Getter
@Setter
public class GamelistDTO {
    private Long gameId;
    private String gameName;
    private List<String> gameTags;
    private String gameImgpath;
    private int gameReviewScore;
    private int gamePrice;

    public GamelistDTO() {
    }

    public GamelistDTO(Game g) {
        this.gameId = g.getGameId();
        this.gameName = g.getName();
        this.gameTags = new ArrayList<>();
        this.gameImgpath = g.getImgpath();
        this.gameReviewScore = 100; // Dummy Value
        this.gamePrice = g.getPrice();

        for (Gamegenre gameGenre : g.getGamegenres())
            gameTags.add(gameGenre.getGenre().getGenre());
    }
}
