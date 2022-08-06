package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.Puser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PuserRepository extends JpaRepository<Puser, Long> {
    Puser findByUserAndParty(User user, Party party);
    List<Puser> findAllByUser(User user);
}
