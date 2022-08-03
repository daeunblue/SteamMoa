package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository @Transactional
public class GameCustomRepositoryImpl implements GameCustomRepository {

    @Autowired
    EntityManager em;

    @Override
    public List<Game> findAllMultiGameByFilter(String name, String[] tag, Pageable pageable) {

        // 쿼리문 생성
        String sql = "select *\n" +
                "from\n" +
                "(select distinct gamecategory.game_id\n" +
                "from\n" +
                "(select game_id\n" +
                "from gamecategory\n" +
                "where gamecategory.category_id = 1) as gamecategory\n" +
                "left join gamegenre\n" +
                "on gamecategory.game_id = gamegenre.game_id\n" +
                "left join ggenrestorage\n" +
                "on gamegenre.genre_id = ggenrestorage.genre_id\n";

        if(tag.length != 0){
            sql += "where \n";
            for (int i = 0; i < tag.length; i++) {
                sql += "ggenrestorage.genre like \'" + tag[i] + "\'\n";
                if(i != tag.length-1)
                    sql += "or \n";
            }
        }

        sql +=  ") as gamegenre\n" +
                "inner join game\n" +
                "on gamegenre.game_id = game.game_id\n" +
                "where game.game_name like \'%" + name + "%\' and game.game_price != -1";

        Query query = em.createNativeQuery(sql, Game.class);
        List<Game> gamelist = query
                .setMaxResults(pageable.getPageSize())
                .setFirstResult(pageable.getPageSize()*pageable.getPageNumber())
                .getResultList();
        return gamelist;
    }
    @Override
    public List<Game> findAllMultiGameByOnlyName(String name){
        // 쿼리문 생성
        String sql = "select * from game inner join gamecategory on game.game_id = gamecategory.game_id where gamecategory.category_id = 1 and game.game_price != -1 and game.game_name like \'%" + name + "%\'";
        Query query = em.createNativeQuery(sql, Game.class);
        List<Game> gamelist = query.getResultList();
        return gamelist;
    }

    @Override
    public int findAllMultiGameByFilter(String name, String[] tag) {

        // 쿼리문 생성
        String sql = "select *\n" +
                "from\n" +
                "(select distinct gamecategory.game_id\n" +
                "from\n" +
                "(select game_id\n" +
                "from gamecategory\n" +
                "where gamecategory.category_id = 1) as gamecategory\n" +
                "left join gamegenre\n" +
                "on gamecategory.game_id = gamegenre.game_id\n" +
                "left join ggenrestorage\n" +
                "on gamegenre.genre_id = ggenrestorage.genre_id\n";

        if(tag.length != 0){
            sql += "where \n";
            for (int i = 0; i < tag.length; i++) {
                sql += "ggenrestorage.genre like \'" + tag[i] + "\'\n";
                if(i != tag.length-1)
                    sql += "or \n";
            }
        }

        sql +=  ") as gamegenre\n" +
                "inner join game\n" +
                "on gamegenre.game_id = game.game_id\n" +
                "where game.game_name like \'%" + name + "%\' and game.game_price != -1";

        Query query = em.createNativeQuery(sql, Game.class);
        List<Game> gamelist = query.getResultList();
        return gamelist.size();
    }
}
