package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.UserRegisterPostReq;
import com.ssafy.backend.db.entity.Follow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@Transactional(readOnly = true)
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public boolean createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장. -> 추후에 SpringSecurity 적용하고 사용해야함
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getUser_service_pw()));
        log.debug(passwordEncoder.encode(userRegisterInfo.getUser_service_pw()));
        log.debug(user.getPassword());

        System.out.println("인코더"+passwordEncoder.encode(userRegisterInfo.getUser_service_pw()));
        System.out.println("user 내부"+user.getPassword());
        boolean serviceIdValidate = checkServiceIdDuplicate(userRegisterInfo.getUser_service_id());
        boolean steamIdValidate = checkSteamIdDuplicate(userRegisterInfo.getUser_steam_id());

        if(!steamIdValidate && !serviceIdValidate){ // 두 경우를 다르게 볼것인지 프론트와 합의해야함 (코드 중복이 생기므로 이 부분도 개선해야함)
            user.setUserSteamId(userRegisterInfo.getUser_steam_id());
            user.setUserServiceId(userRegisterInfo.getUser_service_id());
            System.out.println("모든 아이디 중복 아님");
        }else{
            System.out.println("아이디 중복!");
            return false;
        }
//        log.debug("id 중복 검사 통과");
//        System.out.println("아이디 중복체크 검사 통과");

        user.setUserName(userRegisterInfo.getUser_name());
        userRepository.save(user);

        return true;

    }

    @Override
    @Transactional
    public Map<String,Object> getUserInfoByUserId(String userServiceId) {
        Map<String, Object> result = new HashMap<>();
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        User user = userRepository.findByUserServiceId(userServiceId).get();
//        System.out.println("user.getuserId() : "+user.getUserId());
        result.put("user",user);
        if(user.getUserId() == null){
            System.out.println("아이디 에 해당하는 사용자 없음");
        }else{
            System.out.println("반환값 없음");
            result.put("user", user);
        }
        return result;
    }

    @Override
    public User getUserByUserId(String userId) {
        User user = userRepository.findByUserServiceId(userId).get();
        return user;
    }


    @Override
    @Transactional
    public List<Follow> getFollowByUserId(Long userId) {
        List<Object> fList = userRepository.findAllByUserId(userId).get();
        log.debug("getFollowByUserId"+fList.toString());
        return null;
    }

    @Override
    @Transactional
    public boolean checkSteamIdDuplicate(String userSteamId) {
        boolean result = userRepository.existsByUserSteamId(userSteamId);// 스팀 아이디 중복체크 -> false : 회원가입 불가능
        return result;
    }

    @Override
    @Transactional
    public boolean checkServiceIdDuplicate(String userServiceId) {
        // 서비스 아이디 중복체크 -> false : 회원가입 불가능
        /* 추가해야하는 기능 : 글자 + 숫자 + 특수문자 유효성 검사 기능 추가해야함 (비밀번호에도 적용)*/
        boolean result = userRepository.existsByUserServiceId(userServiceId);
        return result;
    }

    @Override
    public boolean isEqualUserIdPw(String serviceId, String servicePw) {
        User user = userRepository.findByUserServiceId(serviceId).get();
//        if(user.getPassword());
        return false;
    }
}
