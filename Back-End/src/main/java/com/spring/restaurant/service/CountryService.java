package com.spring.restaurant.service;

import com.spring.restaurant.deo.CountryRepository;
import com.spring.restaurant.model.Country;

import java.util.List;

public interface CountryService {
    List<Country> getAllCountry();
}
