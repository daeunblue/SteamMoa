package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.party.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuserRepository extends JpaRepository<Party, Long> {

}
