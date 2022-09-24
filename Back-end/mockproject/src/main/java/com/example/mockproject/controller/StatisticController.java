package com.example.mockproject.controller;

import com.example.mockproject.dto.StatisticDto;
import com.example.mockproject.dto.YearStatisticDto;
import com.example.mockproject.service.StatisticService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RequestMapping("admin")
@RestController
public class StatisticController {

    private final StatisticService statisticService;

    public StatisticController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @GetMapping("/statistic")
    public List<StatisticDto> getStatisticByDate(@RequestParam(value = "startDate") String startDate,
                                                 @RequestParam(value = "endDate") String endDate) {
        return statisticService.getStatisticByDate(startDate, endDate);
    }

    @GetMapping("/statistic/year")
    public List<YearStatisticDto> getStatisticByYear(@RequestParam(value = "year") String year) {
        return statisticService.getStatisticByYear(year);
    }
}
