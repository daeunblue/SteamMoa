package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.Banner;
import com.ssafy.backend.db.entity.MainpageDTO;
import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.repository.BannerRepository;
import com.ssafy.backend.db.repository.game.GameRepository;
import com.ssafy.backend.db.repository.party.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("mainpageService")
public class MainpageServiceImpl implements MainpageService{
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private GameRepository gameRepository;

    @Override
    public MainpageDTO getMainpage() {
        MainpageDTO resultItem = new MainpageDTO();
        Pageable pageable = PageRequest.of(0, 15);

        // 배너
        List<Banner> banners = bannerRepository.findAll();
        banners.forEach(Banner->resultItem.addBanners(Banner));

        // 파티
        List<Party> parties = partyRepository.findAllPartyByFilter("", null, "", "3", pageable);
        System.out.println("파티 사이즈: "+parties.size());
        parties.forEach(Party->resultItem.addParties(Party));

        // 기획상품

        List<Game> templist;
        templist = gameRepository.findAllMultiGameForBests();
        while(resultItem.getBests().size() < 15) {
            Game tempgame = templist.get((int) (Math.random() * templist.size()));
            if(resultItem.getBests().contains(tempgame))
                continue;
            resultItem.addBests(tempgame);
        }
        templist = gameRepository.findAllMultiGameForFrees();
        while(resultItem.getFrees().size() < 15) {
            Game tempgame = templist.get((int) (Math.random() * templist.size()));
            if(resultItem.getFrees().contains(tempgame))
                continue;
            resultItem.addFrees(templist.get((int) (Math.random() * templist.size())));
        }
        templist = gameRepository.findAllMultiGameForToday();
        while(resultItem.getToday().size() < 15) {
            Game tempgame = templist.get((int) (Math.random() * templist.size()));
            if(resultItem.getToday().contains(tempgame))
                continue;
            resultItem.addToday(templist.get((int) (Math.random() * templist.size())));
        }

        return resultItem;
    }
}
