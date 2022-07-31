package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PtagStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PtagStorageRepository extends JpaRepository<Party, Long> {
    PtagStorage findByContent(String content);
}
