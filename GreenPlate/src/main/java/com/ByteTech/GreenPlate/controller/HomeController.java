package com.ByteTech.GreenPlate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class HomeController {

    @RequestMapping("/contact")
    public String index(){
        return  "index.html";
    }
}
