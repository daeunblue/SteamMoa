package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.UserRegisterPostReq;
import com.ssafy.backend.db.entity.Follow;
import com.ssafy.backend.db.entity.User;

import java.util.List;
import java.util.Map;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
    boolean createUser(UserRegisterPostReq userRegisterInfo);

    Map<String, Object> getUserByUserId(String userId);
    List<Follow> getFollowByUserId(Long userId);

    // 유효성 검사
    boolean checkSteamIdDuplicate(String steamId);
    boolean checkServiceIdDuplicate(String serviceId);
}
