package com.spring.restaurant.service.impl;

import com.spring.restaurant.deo.StateRepository;
import com.spring.restaurant.service.StateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StateServiceImpl  implements StateService {
    private StateRepository stateRepository;

    @Autowired
    public StateServiceImpl(StateRepository stateRepository) {
        this. stateRepository = stateRepository;
    }
}
