package ch.segginger.damian.seggiothek.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {


    @GetMapping("/hello")
    public String hello(){
        return "Hello";
    }
}
