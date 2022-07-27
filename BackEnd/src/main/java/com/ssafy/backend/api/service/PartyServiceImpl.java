package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartyDTO;
import com.ssafy.backend.db.repository.party.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class PartyServiceImpl implements PartyService{

    @Autowired
    private PartyRepository partyRepository;

    @Override
    public List<Party> getPartyList() {
        return partyRepository.findAll();
    }

    @Override
    public PartyDTO getPartyDetail(Long party_id) {
        PartyDTO partyDetail = new PartyDTO(partyRepository.findByPartyId(party_id));
        return partyDetail;
    }
}
