package com.ssafy.backend.db.repository.party;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.party.Party;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

    /*
        /api/moazone?name=게임이름&genre=장르1&genre=장르2&status=1&sort=1

        필터링: 게임 이름, 파티 상태, 게임 장르
        정렬: 파티 생성 최근순 (디폴트), 마감 날짜 가까운 순, 게임 이름 순

        status
        모집 중: 1
        모집 완료: 2
        플레이 중: 3
        플레이 완료: 4
        모집 실패: 5

        sort
        파티 생성 최근순: 1
        파티 생성 오래된순: 2
        마감 날짜 가까운 순: 3
        게임이름순: 4
     */
public class PartyCustomRepositoryImpl implements PartyCustomRepository {

    @Autowired
    EntityManager em;

    @Override
    public List<Party> findAllPartyByFilter(String searchString, String[] tag, String partyStatus, String sortString, Pageable pageable) {
        // 쿼리문 생성
        String sql = "select * from";

        sql +=  "(select gamegenre.game_id\n" +
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
                "where game.game_name like \'%" + searchString + "%\' and game.game_price != -1 ) as game\n" +
                "inner join party\n" +
                "on party.game_id = game.game_id\n";

        if (sortString.equals("1"))
            sql += "order by party.write_time";
        else if(sortString.equals("2"))
            sql += "order by desc party.write_time";
        else if(sortString.equals("3"))
            sql += "order by party.start_time";
        else if(sortString.equals("4"))
            sql += "order by party.game_id";

        Query query = em.createNativeQuery(sql, Party.class);
        List<Party> partylist = query.getResultList();
        List<Party> partylist_status = new ArrayList<>();
        for (Party p: partylist) {
            if(p!= null && p.getStatus().equals(partyStatus))
                partylist_status.add(p);
        }
        return partylist_status;
    }

        @Override
        public int findAllPartyByFilter(String searchString, String[] tag, String partyStatus, String sortString) {
            // 쿼리문 생성
            String sql = "select * from";

            sql +=  "(select gamegenre.game_id\n" +
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
                    "where game.game_name like \'%" + searchString + "%\' and game.game_price != -1 ) as game\n" +
                    "inner join party\n" +
                    "on party.game_id = game.game_id\n";

            if (sortString.equals("1"))
                sql += "order by party.write_time";
            else if(sortString.equals("2"))
                sql += "order by desc party.write_time";
            else if(sortString.equals("3"))
                sql += "order by party.start_time";
            else if(sortString.equals("4"))
                sql += "order by party.game_id";

            Query query = em.createNativeQuery(sql, Party.class);
            List<Party> partylist = query.getResultList();
            List<Party> partylist_status = new ArrayList<>();
            for (Party p: partylist) {
                if(p!= null && p.getStatus().equals(partyStatus))
                    partylist_status.add(p);
            }
            return partylist_status.size();
        }
}
