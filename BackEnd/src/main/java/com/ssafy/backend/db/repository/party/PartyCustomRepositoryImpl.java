package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.party.Party;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class PartyCustomRepositoryImpl implements PartyCustomRepository {

    @Autowired
    EntityManager em;

    @Override
    public List<Party> findAllPartyByFilter(String searchString, String[] tags, String partyStatus, String sortString, Pageable pageable) {
        return null;
    }
}
