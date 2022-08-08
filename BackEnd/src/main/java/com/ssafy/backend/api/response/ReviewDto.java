package com.ssafy.backend.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDto {
    Long reviewId;
    Double reviewScore;
    String reviewContent;
    Long userId;
}
