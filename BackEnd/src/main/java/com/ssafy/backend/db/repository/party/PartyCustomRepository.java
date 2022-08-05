package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.party.Party;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PartyCustomRepository {

    List<Party> findAllPartyByFilter(String searchString, String[] tags, String partyStatus, String sortString, Pageable pageable);
    int findAllPartyByFilter(String searchString, String[] tags, String partyStatus, String sortString);

}
