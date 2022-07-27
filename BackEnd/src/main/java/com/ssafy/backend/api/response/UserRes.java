package com.ssafy.backend.api.response;

import com.ssafy.backend.db.entity.Follow;
import com.ssafy.backend.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

/**
 * 회원 본인 정보 조회 API ([GET] /api/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Data
@ApiModel("UserResponse")
public class UserRes extends BaseResponseBody{
    Map<String, Object> response = new HashMap<>();

	@ApiModelProperty(name="User")
    UserDto userDto;


    public static UserRes of(Integer statusCode, String message, UserDto userDto){
        UserRes res = new UserRes();
        res.setUserDto(userDto);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }


}
