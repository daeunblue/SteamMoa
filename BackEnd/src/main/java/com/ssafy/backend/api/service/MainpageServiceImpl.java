package com.ssafy.backend.api.service;

import com.ssafy.backend.api.response.*;
import com.ssafy.backend.db.entity.banner.Banner;
import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.Puser;
import com.ssafy.backend.db.entity.tactic.Tactic;
import com.ssafy.backend.db.entity.user.User;
import com.ssafy.backend.db.repository.banner.BannerRepository;
import com.ssafy.backend.db.repository.tactic.TacticRepository;
import com.ssafy.backend.db.repository.user.UserRepository;
import com.ssafy.backend.db.repository.game.GameRepository;
import com.ssafy.backend.db.repository.party.PartyRepository;
import com.ssafy.backend.db.repository.party.PuserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("mainpageService")
public class MainpageServiceImpl implements MainpageService{
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private PuserRepository puserRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TacticRepository tacticRepository;


    @Override
    public MainpageDTO getMainpage() {
        MainpageDTO resultItem = new MainpageDTO();
        Pageable pageable = PageRequest.of(0, 15);

        // 배너
        List<Banner> banners = bannerRepository.findAll();
        banners.forEach(Banner->resultItem.addBanners(Banner));

        // 파티
        List<Party> parties = partyRepository.findAllPartyByFilter("", null, new String[]{"1"}, "1", pageable);
        System.out.println("파티 사이즈: "+parties.size());
        parties.forEach(Party->resultItem.addParties(Party));
        if(resultItem.getParties().size() > 20){
            resultItem.setParties(resultItem.getParties().subList(0, 20));
        }

        // 기획상품
        List<Game> templist;
        List<Game> randlist;

        // Bests
        templist = gameRepository.findAllMultiGameForBests();
        while(resultItem.getBests().size() < 15) {
            Game tempgame = templist.get((int) (Math.random() * templist.size()));
            if(resultItem.getBests().contains(tempgame))
                continue;
            resultItem.addBests(tempgame);
        }

        // Frees
        templist = gameRepository.findAllMultiGameForFrees();
        while(resultItem.getFrees().size() < 15) {
            Game tempgame = templist.get((int) (Math.random() * templist.size()));
            if(resultItem.getFrees().contains(tempgame))
                continue;
            resultItem.addFrees(templist.get((int) (Math.random() * templist.size())));
        }

        // Today
        templist = gameRepository.findAllMultiGameForToday();
        while(resultItem.getToday().size() < 15) {
            Game tempgame = templist.get((int) (Math.random() * templist.size()));
            if(resultItem.getToday().contains(tempgame))
                continue;
            resultItem.addToday(templist.get((int) (Math.random() * templist.size())));
        }

        // Hots
        templist = gameRepository.findAllMultiGameForHots();
        randlist = gameRepository.findTop15MultiGameForRandom();
        for(int i = 0; i < 15; i++) {
            if(i < templist.size())
                resultItem.addHots(templist.get(i));
            else
                resultItem.addHots(randlist.get(i));
        }

        // Picks
        templist = gameRepository.findAllMultiGameForPicks();
        randlist = gameRepository.findTop15MultiGameForRandom();
        for(int i = 0; i < 15; i++) {
            if(i < templist.size())
                resultItem.addPicks(templist.get(i));
            else
                resultItem.addPicks(randlist.get(i));
        }

        return resultItem;
    }

    @Override
    public Map<String,Object> getIntegratedSearch(String type, String keyword) {
        Map<String,Object> resultmap = new HashMap<>();

        if(type.equals("user")){
            List<IntegratedSearch_UserDTO> integratedSearchUserDTOList = new ArrayList<>();
            User theUser = userRepository.findByUserServiceId(keyword).orElse(null);
            List<User> users = userRepository.findAllByUserServiceIdContains(keyword).orElse(null);

            if(theUser != null) {
                IntegratedSearch_UserDTO temp_user = new IntegratedSearch_UserDTO(theUser);
                for(Puser puser: puserRepository.findTop3ByUserOrderByPuserIdDesc(theUser).orElse(null)){
                    temp_user.getUserParties().add(new PartylistDTO(puser.getParty()));
                }
                integratedSearchUserDTOList.add(temp_user);
                if(users != null)
                    users.remove(theUser);
            }

            if(users != null) {
                for(User user: users) {
                    IntegratedSearch_UserDTO temp_user = new IntegratedSearch_UserDTO(user);
                    for(Puser puser: puserRepository.findTop3ByUserOrderByPuserIdDesc(user).orElse(null)){
                        temp_user.getUserParties().add(new PartylistDTO(puser.getParty()));
                    }
                    integratedSearchUserDTOList.add(temp_user);
                }
            }

            resultmap.put("users", integratedSearchUserDTOList);
        }
        else if(type.equals("content")){
            IntegratedSearch_ContentDTO integratedSearchContentDTO = new IntegratedSearch_ContentDTO();
            Game theGame = gameRepository.findByName(keyword).orElse(null);
            List<Game> games = gameRepository.findTop8ByNameContains(keyword).orElse(null);


            if(theGame != null) {
                integratedSearchContentDTO.getGames().add(new GamelistDTO(theGame));
                for(Party party: partyRepository.findTop8ByGame(theGame).orElse(null))
                    integratedSearchContentDTO.getParties().add(new PartylistDTO(party));
                for(Tactic tactic: tacticRepository.findTop8ByGameGameId(theGame.getGameId()).orElse(null))
                    integratedSearchContentDTO.getTactics().add(new IntegratedSearch_TacticDTO(tactic));

                if(games != null)
                    games.remove(theGame);
            }

            if(games != null) {
                for(Game game: games) {
                    integratedSearchContentDTO.getGames().add(new GamelistDTO(game));
                    for(Party party: partyRepository.findTop8ByGame(game).orElse(null))
                        integratedSearchContentDTO.getParties().add(new PartylistDTO(party));
                    for(Tactic tactic: tacticRepository.findTop8ByGameGameId(game.getGameId()).orElse(null))
                        integratedSearchContentDTO.getTactics().add(new IntegratedSearch_TacticDTO(tactic));
                }
            }

            resultmap.put("contents", integratedSearchContentDTO);
        }
        else
            resultmap.put("message", "fail: wrong searching type");

        return resultmap;
    }
}
