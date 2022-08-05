package com.ssafy.backend.db.entity;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GamelistDTO;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartylistDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MainpageDTO {
    private List<Banner> banners = new ArrayList<>();
    private List<PartylistDTO> parties = new ArrayList<>();
    private List<GamelistDTO> bests = new ArrayList<>();
    private List<GamelistDTO> frees = new ArrayList<>();
    private List<GamelistDTO> today = new ArrayList<>();

    public void addBanners(Banner banner){
        banners.add(banner);
    }
    public void addParties(Party party){
        parties.add(new PartylistDTO(party));
    }
    public void addBests(Game game){
        bests.add(new GamelistDTO(game));
    }
    public void addFrees(Game game){
        frees.add(new GamelistDTO(game));
    }
    public void addToday(Game game){
        today.add(new GamelistDTO(game));
    }
}
