package com.spring.restaurant.service.impl;
import com.spring.restaurant.deo.CountryRepository;
import com.spring.restaurant.model.Country;
import com.spring.restaurant.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    private CountryRepository countryRepository;

    @Autowired
    public CountryServiceImpl(CountryRepository countryRepository) {
        this. countryRepository = countryRepository;
    }
    public List<Country> getAllCountry(){
        return countryRepository.findAll();
    }
}
