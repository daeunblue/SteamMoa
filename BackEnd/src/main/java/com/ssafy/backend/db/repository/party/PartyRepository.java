package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.party.Party;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long>, PartyCustomRepository {
    Party findByPartyId(Long partyId);

}
