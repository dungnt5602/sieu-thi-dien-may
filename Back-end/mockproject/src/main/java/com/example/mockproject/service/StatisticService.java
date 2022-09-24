package com.example.mockproject.service;

import com.example.mockproject.dto.StatisticDto;
import com.example.mockproject.dto.YearStatisticDto;

import java.util.List;

public interface StatisticService {

    List<StatisticDto> getStatisticByDate(String startDate, String endDate);

    List<YearStatisticDto> getStatisticByYear(String year);
}
