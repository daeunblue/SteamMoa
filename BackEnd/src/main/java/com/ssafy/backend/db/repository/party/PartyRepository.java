package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.Puser;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.servlet.http.Part;
import java.util.List;
import java.util.Optional;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long>, PartyCustomRepository {
    Party findByPartyId(Long partyId);
    Party findByPusersContains(Puser puser);
    Optional<List<Party>> findAllByGame(Game game);

    Optional<List<Party>> findTop8ByGame(Game game);
}
