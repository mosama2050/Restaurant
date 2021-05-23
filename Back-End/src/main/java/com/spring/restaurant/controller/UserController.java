package com.spring.restaurant.controller;


import antlr.BaseAST;
import com.spring.restaurant.dto.LoginResponse;
import com.spring.restaurant.model.User;
import com.spring.restaurant.service.AuthoritiesService;
import com.spring.restaurant.service.TokenService;
import com.spring.restaurant.dto.JwtLogin;
import com.spring.restaurant.service.impl.UserserviceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping
@AllArgsConstructor
// http://localhost:8080
public class UserController {

    private final TokenService tokenService;
    private final UserserviceImpl userService;
    private final AuthoritiesService authoritiesService;
    private final PasswordEncoder passwordEncoder;

    // http://localhost:8080/login
    @PostMapping("/login")
    public LoginResponse logIn(@RequestBody JwtLogin jwtLogin){
        return tokenService.login(jwtLogin);
    }

    // http://localhost:8080/sigup
    @PostMapping("/signup")
    public void createUser(@RequestBody JwtLogin jwtLogin){
        User user = new User();
        user.setEmail(jwtLogin.getEmail());
        user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
        user.setActive(1);
        user.getAuthorities().add(authoritiesService.getAuthorities().get(0));
        userService.addUser(user);
    }
}