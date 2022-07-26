//package com.ssafy.backend.api.response;
//
//import com.ssafy.backend.db.entity.Follow;
//import com.ssafy.backend.db.entity.User;
//import com.ssafy.backend.common.model.response.BaseResponseBody;
//import com.ssafy.backend.db.entity.User;
//
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
//import lombok.Data;
//import lombok.Getter;
//import lombok.Setter;
//
///**
// * 회원 본인 정보 조회 API ([GET] /api/users/{user_id}) 요청에 대한 응답값 정의.
// */
////@Getter
////@Setter
//@Data
//@ApiModel("UserResponse")
//public class UserRes{
//	@ApiModelProperty(name="User")
//	User profile  = new User();
//
//	@ApiModelProperty(name="follow")
//	Follow follow = new Follow();
//
////	@ApiModelProperty(name = "tacticList")
//	// 게시글 리스트, 리뷰 리스트, 파티리스트
//
//	public UserRes(User user) {
//		UserRes res = new UserRes(user);
//
//		res.setProfile(user);
//		return res;
//	}
//}
