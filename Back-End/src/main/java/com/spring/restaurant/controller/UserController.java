package com.spring.restaurant.controller;


import com.spring.restaurant.dto.LoginResponse;
import com.spring.restaurant.service.TokenService;
import com.spring.restaurant.dto.JwtLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping
// http://localhost:8080
public class UserController {

    private TokenService tokenService;

    @Autowired
    public UserController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    // http://localhost:8080/login
    @PostMapping("/login")
    public LoginResponse logIn(@RequestBody JwtLogin jwtLogin){
        return tokenService.login(jwtLogin);
    }
}