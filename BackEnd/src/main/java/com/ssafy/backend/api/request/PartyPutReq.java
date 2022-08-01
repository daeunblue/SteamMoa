package com.ssafy.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 파티 수정 API ([PUT] /api/moazone/) 요청에 필요한 리퀘스트 바디 정의.
 */
@Data
@ApiModel("PartyPutRequest")
public class PartyPutReq {

	@ApiModelProperty(name="파티 설명", example="party_description")
	String party_description;

	@ApiModelProperty(name="외부 소통 링크(디스코드 등)", example="chat_link")
	String chat_link;

	@ApiModelProperty(name="파티 성향 태그", example="partyTags")
	String[] partyTags;

	@ApiModelProperty(name="파티 유저 목록", example="partyUsers")
	String[] partyUsers;

	@ApiModelProperty(name="파티 진행 상태", example="party_status")
	String party_status;
}
