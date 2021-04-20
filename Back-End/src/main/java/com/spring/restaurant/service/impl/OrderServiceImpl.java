package com.spring.restaurant.service.impl;

import com.spring.restaurant.deo.OrderRepository;
import com.spring.restaurant.model.Order;
import com.spring.restaurant.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> getAllOrders() {
        log.info("get all orders");
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersByIdCategories(Long id) {
        return orderRepository.findByCategoryId(id);
    }

}
