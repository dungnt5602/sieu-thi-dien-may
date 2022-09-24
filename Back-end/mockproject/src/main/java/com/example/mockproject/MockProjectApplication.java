package com.example.mockproject;

import com.example.mockproject.model.entity.Product;
import com.example.mockproject.service.ProductService;
import com.example.mockproject.service.RecommendService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MockProjectApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(MockProjectApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
