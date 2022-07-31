package com.ssafy.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 파티 생성 API ([POST] /api/moazone/) 요청에 필요한 리퀘스트 바디 정의.
 */
@Data
@ApiModel("PartyPostRequest")
public class PartyPostReq {
	@ApiModelProperty(name="게임 ID", example = "game_id")
	String game_id;

	@ApiModelProperty(name="파티 이름", example="party_title")
	String party_title;

	@ApiModelProperty(name="파티 최대 인원", example="max_player")
	String max_player;

	@ApiModelProperty(name="파티 설명", example="party_description")
	String party_description;

	@ApiModelProperty(name="게임 플레이 약속 시간", example="start_time")
	String start_time;

	@ApiModelProperty(name="외부 소통 링크(디스코드 등)", example="chat_link")
	String chat_link;

	@ApiModelProperty(name="파티 성향 태그", example="partyTags")
	String[] partyTags;

	@ApiModelProperty(name="파티장 유저 ID", example="user_id")
	String user_id;


}
