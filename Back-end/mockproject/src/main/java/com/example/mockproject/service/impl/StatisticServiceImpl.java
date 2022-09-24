package com.example.mockproject.service.impl;

import com.example.mockproject.dto.StatisticDto;
import com.example.mockproject.dto.YearStatisticDto;
import com.example.mockproject.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticServiceImpl implements StatisticService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<StatisticDto> getStatisticByDate(String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate).minusDays(1);
        LocalDate end = LocalDate.parse(endDate).plusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String startStr = formatter.format(start);
        String endStr = formatter.format(end);
        String query = "CALL make_analysis(?, ?)";
        List<StatisticDto> result = jdbcTemplate.query(query, new BeanPropertyRowMapper(StatisticDto.class), startStr, endStr);
        //push to result days in range with total = 0
        List<StatisticDto> result2 = new ArrayList<>();
        LocalDate start2 = LocalDate.parse(startDate);
        LocalDate end2 = LocalDate.parse(endDate).plusDays(1);;
        for (LocalDate date = start2; date.isBefore(end2); date = date.plusDays(1)) {
            StatisticDto statisticDto = new StatisticDto();
            statisticDto.setDate(date);
            statisticDto.setTotal(0.0);
            result2.add(statisticDto);
        }
        for (StatisticDto statisticDto: result2) {
            for (StatisticDto statisticDto1: result) {
                if (statisticDto.getDate().isEqual(statisticDto1.getDate())) {
                    statisticDto.setTotal(statisticDto1.getTotal());
                }
            }
        }
        return result2;
    }

    @Override
    public List<YearStatisticDto> getStatisticByYear(String year){
        String query = "CALL make_year_analysis(?)";
        List<YearStatisticDto> result = jdbcTemplate.query(query, new BeanPropertyRowMapper(YearStatisticDto.class), year);
        //push to result months in that year with total = 0
        List<YearStatisticDto> result2 = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            YearStatisticDto yearStatisticDto = new YearStatisticDto();
            //generate 0 after month below 10
            String month = i < 10 ? "0" + i : String.valueOf(i);
            yearStatisticDto.setDate(year + "-" + month);
            yearStatisticDto.setTotal(0.0);
            result2.add(yearStatisticDto);
        }
        for (YearStatisticDto yearStatisticDto: result2) {
            for (YearStatisticDto yearStatisticDto1: result) {
                if (yearStatisticDto.getDate().equals(yearStatisticDto1.getDate())) {
                    yearStatisticDto.setTotal(yearStatisticDto1.getTotal());
                }
            }
        }
        return result2;
    }
}
