package com.ssafy.backend.api.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "리뷰 API", tags = {"Review"})
@RestController
@RequestMapping("/api/review")
@Slf4j
public class ReviewController {
}
