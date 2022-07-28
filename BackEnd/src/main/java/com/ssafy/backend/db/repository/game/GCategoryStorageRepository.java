package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Gamegenre;
import com.ssafy.backend.db.entity.game.Gcategorystorage;
import com.ssafy.backend.db.entity.game.Ggenrestorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GCategoryStorageRepository extends JpaRepository<Gcategorystorage, Long> {
    Gcategorystorage findByCategoryId(Long categoryId);

    Gcategorystorage findByCategory(String category);

}
