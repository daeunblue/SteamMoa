package com.ssafy.backend.api.response;

import com.ssafy.backend.db.entity.Follow;
import com.ssafy.backend.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

/**
 * 회원 본인 정보 조회 API ([GET] /api/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Data
@NoArgsConstructor
@ApiModel("UserResponse")
public class UserRes extends BaseResponseBody{
//    Map<String, Object> response = new HashMap<>();

    @ApiModelProperty(name="사용자 인증 번호", example="1")
    private Long userId;

    @ApiModelProperty(name="사용자 아이디", example="user_service_id")
    private String userServiceId;


    @ApiModelProperty(name="사용자 아이디", example="user_service_id")
    private Double userPoint;

    public static UserRes of(Integer statusCode, String message, Long userId, String userServiceId, Double userPoint){
        UserRes res = new UserRes();
        res.setUserId(userId);
        res.setUserServiceId(userServiceId);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserPoint(userPoint);
        return res;
    }



}
