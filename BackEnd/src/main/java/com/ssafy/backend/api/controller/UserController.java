package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.request.UserFollowPostReq;
import com.ssafy.backend.api.request.UserUpdatePutReq;
import com.ssafy.backend.api.response.UserRes;
import com.ssafy.backend.api.service.UserService;
import com.ssafy.backend.common.auth.SsafyUserDetails;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.api.response.UserDto;
import com.ssafy.backend.db.entity.UserTag;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.Map;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 * http://localhost:8080/swagger-ui.html
 **/
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {
    @Autowired
    UserService userService;


    /* 토큰 인증 처리 필요 */
    @GetMapping("/profile/{user_service_id}")
    @ApiOperation(value = "회원 조회", notes = "<strong>사용자 아이디</strong>를 통해 회원 정보 조회.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends Map<String,Object>> getUserInfo(@PathVariable("user_service_id") String userServiceId) {

        Map<String, Object> result = new HashMap<>();

        try {
            User user = (User) userService.getUserInfoByUserId(userServiceId).get("user");
//            System.out.println(user.toString());
            UserDto userDto = new UserDto();
            //builder 패턴 적용해야함
            userDto.setUserId(user.getUserId());
            userDto.setUserServiceId(user.getUserServiceId());
            userDto.setUserPoint(user.getUserPoint());
            for (UserTag tag:user.getUTagLists()) {
                System.out.println(tag.getUTagStorage().getContent());
                userDto.addUserTags(tag.getUTagStorage().getContent());
            }
            result.put("user",userDto);
            result.put("message","Success");
        } catch (Exception e) { // 에러코드 정리해서 처리해야할 부분
            result.put("message","Fail");
            e.printStackTrace();
            return ResponseEntity.status(403).body(result);
        }
        return ResponseEntity.status(200).body(result);
    }

    @PutMapping("/profile")
    @ApiOperation(value = "회원 정보 수정", notes = "<strong>회원 정보 수정 </strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserRes> updateUserInfo(@ApiIgnore Authentication authentication, @RequestBody UserUpdatePutReq userUpdatePutReq) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        Map<String, Object> result = new HashMap<>();

        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userDetails.getUser();
            String userServiceId = user.getUserServiceId();
            userService.updateUser(user.getUserId(), userUpdatePutReq);
            result = userService.getUserInfoByUserId(userServiceId);
        } catch (Exception e) {
            e.printStackTrace();
            return (ResponseEntity<? extends UserRes>) ResponseEntity.badRequest();
        }

        User user = (User) result.get("user");

        return ResponseEntity.ok(UserRes.of(200, "회원 정보 조회 성공", user.getUserId(), user.getUserServiceId(), user.getUserPoint(), user.getUTagLists()));

    }

    // Authentication 추가해야하는 API
    @PostMapping("/follow")
    @ApiOperation(value = "유저 팔로우 추가", notes = "user_service_id에 해당하는 유저를 팔로우")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends Map<String, Object>> followUser(@RequestBody UserFollowPostReq userFollowPostReq){
        Map<String, Object> resultMap = new HashMap<>();

        String FollowingUserId = userFollowPostReq.getFollowingUserId();
        String FollowUserId = userFollowPostReq.getFollowerUserId();
        boolean result = userService.followUser(FollowingUserId, FollowUserId);

        if(result){
            resultMap.put("message","Success");
            return ResponseEntity.status(200).body(resultMap);
        }else{
            resultMap.put("message","Fail");
            return ResponseEntity.status(400).body(resultMap);
        }
    }



    // Authentication 추가해야하는 API
    @DeleteMapping("/unfollow")
    @ApiOperation(value = "유저 팔로우 삭제", notes = "user_service_id에 해당하는 유저를 언팔로우")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends Map<String, Object>> unFollowUser(@RequestBody UserFollowPostReq userFollowPostReq){
        Map<String, Object> resultMap = new HashMap<>();

        String FollowingUserId = userFollowPostReq.getFollowingUserId();
        String FollowUserId = userFollowPostReq.getFollowerUserId();
        boolean result = userService.unFollowUser(FollowingUserId, FollowUserId);

        if(result){
            resultMap.put("message","Success");
            return ResponseEntity.status(200).body(resultMap);
        }else{
            resultMap.put("message","Fail");
            return ResponseEntity.status(400).body(resultMap);
        }
    }
}

