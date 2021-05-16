package com.spring.restaurant.service.impl;

import com.spring.restaurant.deo.UserRepository;
import com.spring.restaurant.dto.UserPrincipal;
import com.spring.restaurant.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserserviceImpl implements  UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return userPrincipal;
    }
}
