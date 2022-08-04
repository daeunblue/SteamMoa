package com.ssafy.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;

@Builder
@NoArgsConstructor
@Data
@ApiModel("userDto")
public class UserDto {

    @ApiModelProperty(name="유저 식별자", example="123")
    private long userId;           // 유저 식별자 (PK)

    @ApiModelProperty(name="유저 서비스 아이디", example="user_service_id")
    private String userServiceId;  // 서비스 아이디

    @ApiModelProperty(name="유저 매너 점수", example="36.5")
    private double userPoint;      // 매너 점수

    public UserDto(long userId, String userServiceId, double userPoint) {
        this.userId = userId;
        this.userServiceId = userServiceId;
        this.userPoint = userPoint;
    }
//    private String authToken; // 사용자 인증 정보 토큰
}
