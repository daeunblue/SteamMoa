package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.UserRegisterPostReq;
import com.ssafy.backend.api.request.UserUpdatePutReq;
import com.ssafy.backend.db.entity.UserTag;
import com.ssafy.backend.db.entity.follow.Follow;
import com.ssafy.backend.db.repository.UTagStorageRepository;
import com.ssafy.backend.db.repository.UserTagRepository;
import com.ssafy.backend.db.repository.follow.FollowRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
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
    UserTagRepository userTagRepository;

    @Autowired
    UTagStorageRepository uTagStorageRepository;

    @Autowired
    FollowRepository followRepository;

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
            user.setUserPoint(36.5);
            System.out.println("회원 가입 가능");
        }else{
            System.out.println("아이디 중복!");
            return false;
        }

        user.setUserName(userRegisterInfo.getUser_name());
        userRepository.save(user);

        return true;

    }

    @Override
    @Transactional
    public Map<String,Object> getUserInfoByUserId(String userServiceId) {
        Map<String, Object> result = new HashMap<>();
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        System.out.println("조회 시작");
        User user = userRepository.findByUserServiceId(userServiceId).get();
        System.out.println("user.getuserId() : "+user.getUserId());
        result.put("user",user);
        if(user.getUserId() == null){
            System.out.println("아이디 에 해당하는 사용자 없음");
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

    @Override
    @Transactional
    public boolean deleteUser(String userServiceId) {  // 예외처리 해야함 나중에 추후에
        try{
            userRepository.delete(userRepository.findByUserServiceId(userServiceId).orElseThrow(()-> new ChangeSetPersister.NotFoundException()));
            System.out.println("사용자 삭제 요청 성공!");
            return true;
        }catch (Exception e){
            System.out.println("존재하지 않는 사용자 삭제 요청 -> 에러임!");
            return false;
        }
    }

    @Override
    @Transactional
    public boolean updateUser(Long userId, UserUpdatePutReq userUpdatePutReq) {
        try{
            User user = userRepository.findById(userId).get();

            // userName 수정
            user.setUserName(userUpdatePutReq.getUserName());

            // userTags 수정
            for (UserTag ut: user.getUTagLists()) {
                userTagRepository.delete(ut);
            }
            user.setUTagLists(new ArrayList<>());

            UserTag userTag;
            for (String tag:userUpdatePutReq.getUserTags()) {
                userTag = new UserTag();
                userTag.setUTagStorage(uTagStorageRepository.findById(Long.parseLong(tag)).get());
                userTagRepository.save(userTag);
                System.out.println(userTag.getUTagStorage().getContent());
                user.addUTagLists(userTag);
            }

            // 비밀번호 수정
            user.setPassword(passwordEncoder.encode(userUpdatePutReq.getUserPassword()));


            userRepository.save(user);
            System.out.println(user.getUserName());
            System.out.println("User 수정 요청 성공");

            return true;
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("User 수정 요청 실패");
            return false;
        }
    }

    @Override
    @Transactional
    public boolean followUser(String followerUserId, String followingUserId) {
        boolean result = followRepository.existsByFollowerUserIdAndFollowingUserId(followerUserId, followingUserId);
        System.out.println("result : "+ result);

        // 이전 동일한 구독 이력이 있는지 확인
        // 있다면 -> 그냥 반환
        // 없다면 -> 구독 테이블 업데이트
        if(result){
            System.out.println("이미 구독했습니다.");
            return false;
        }else{
            Follow follow = new Follow();
            follow.setFollowerUserId(followerUserId);
            follow.setFollowingUserId(followingUserId);
            System.out.println(follow.toString());
            followRepository.save(follow);
            return true;
        }

//        try{
//
//        }catch (NoSuchElementException e){
//
//        }
    }

    @Override
    @Transactional
    public boolean unFollowUser(String followingUserId, String follwerUserId) {
        boolean result = followRepository.existsByFollowerUserIdAndFollowingUserId(follwerUserId, followingUserId);

        if(result){
            Follow follow = followRepository.findByFollowerUserIdAndFollowingUserId(follwerUserId, followingUserId).get();
            followRepository.delete(follow);
            return true;
        }
        return false;
    }

}

