package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartyDTO;

import java.util.List;

public interface PartyService {

    List<Party> getPartyList();

    PartyDTO getPartyDetail(Long party_id);
}
