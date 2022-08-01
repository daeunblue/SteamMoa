package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.Pstatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PstatusRepository extends JpaRepository<Pstatus, Long> {

}
