package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.UserRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.UserRepository;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUser_service_id());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장. -> 추후에 SpringSecurity 적용하고 사용해야함
        // user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setPassword(userRegisterInfo.getUser_service_pw());
        user.setName(userRegisterInfo.getUser_name());
        user.setSteamId(userRegisterInfo.getUser_steam_id());
        user.setImgPath(userRegisterInfo.getUser_img_path());
        user.setImgName(userRegisterInfo.getUser_img_nm());
        return userRepository.save(user);

    }

    @Override
    public User getUserByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        User user = userRepository.findByUserId(userId).get();
        return user;
    }
}
