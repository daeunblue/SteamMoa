package com.ssafy.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 유저 정보 수정 API ([PUT] /api/user/profie) 요청에 필요한 리퀘스트 바디 정의.
 */
@Data
@ApiModel("UserUpdatePutRequest")
public class UserUpdatePutReq {
	@ApiModelProperty(name="유저 ID", example="사용자 이름")
	String user_name;

}
