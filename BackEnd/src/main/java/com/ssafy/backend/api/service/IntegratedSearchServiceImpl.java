package com.ssafy.backend.api.service;

import com.ssafy.backend.api.response.*;
import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.Puser;
import com.ssafy.backend.db.entity.tactic.Tactic;
import com.ssafy.backend.db.entity.user.User;
import com.ssafy.backend.db.repository.tactic.TacticRepository;
import com.ssafy.backend.db.repository.user.UserRepository;
import com.ssafy.backend.db.repository.game.GameRepository;
import com.ssafy.backend.db.repository.party.PartyRepository;
import com.ssafy.backend.db.repository.party.PuserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("integratedSearchService")
public class IntegratedSearchServiceImpl implements IntegratedSearchService{
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
