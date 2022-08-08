package com.ssafy.backend.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDto {
    Long reviewId;
    Double reviewScore;
    String reviewContent;
    String userServiceId;
    LocalDateTime currentDate;
}
