package com.example.BreastCancerDetection.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String homeControl(){
        return "this is home controller breast cancer detection system";
    }
}
