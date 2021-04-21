package com.spring.restaurant.service.impl;


import com.spring.restaurant.deo.CategoryRepository;
import com.spring.restaurant.model.Category;
import com.spring.restaurant.service.CategoryService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@Service
@Log4j2
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
//    private static final Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> allCategories() {
        log.info("allCategories method");
        return categoryRepository.findAll();
    }
}
