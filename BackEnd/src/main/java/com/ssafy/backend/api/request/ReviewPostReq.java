package com.ssafy.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 리뷰글 생성 API ([POST] /api/reviews) 요청에 필요한 리퀘스트 바디 정의.
 */

@Data
@ApiModel("ReviewPostReq")
public class ReviewPostReq {
    @ApiModelProperty(name="유저 서비스 ID", example="1")
    String userServiceId;

    @ApiModelProperty(name="게임 식별자 ID", example="1")
    Long gameId;

    @ApiModelProperty(name="리뷰 타이틀", example="리뷰 제목")
    Double reviewScore;

    @ApiModelProperty(name="리뷰 내용", example="리뷰 내용")
    String reviewContent;
}
