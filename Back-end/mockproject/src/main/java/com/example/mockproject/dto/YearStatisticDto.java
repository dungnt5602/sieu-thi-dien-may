package com.example.mockproject.dto;

import com.example.mockproject.converter.YearMonthDateAttributeConverter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Convert;
import java.time.YearMonth;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class YearStatisticDto {

    private String date;

    private Double total;
}
