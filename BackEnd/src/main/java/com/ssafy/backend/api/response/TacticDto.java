package com.ssafy.backend.api.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TacticDto {
    Long tacticId;
    String tacticTitle;
    String tacticContent;
    Long userId;
    Long gameId;
}
