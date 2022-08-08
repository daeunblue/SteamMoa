package com.ssafy.backend.api.service;

import com.ssafy.backend.api.response.MainpageDTO;

import java.util.Map;

public interface MainpageService {
    MainpageDTO getMainpage();

    Map<String,Object> getIntegratedSearch(String type, String keyword);
}
