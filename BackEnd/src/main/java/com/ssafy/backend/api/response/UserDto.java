package com.ssafy.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

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

    @ApiModelProperty(name="사용자 태그 목록", example="[\"즐겜\", \"생존겜 러버\"]")
    private List<String> userTags=new ArrayList<>();

    public UserDto(long userId, String userServiceId, double userPoint, List<String> userTags) {
        this.userId = userId;
        this.userServiceId = userServiceId;
        this.userPoint = userPoint;
        for (String tag:userTags) {
            this.userTags.add(tag);
        }
    }

    public void addUserTags(String userTag){
        this.userTags.add(userTag);
    }

//    private String authToken; // 사용자 인증 정보 토큰
}
