package com.spring.restaurant.service;

import com.spring.restaurant.model.Order;

import java.util.List;

public interface OrderService {
      List<Order> getAllOrders();
      public List<Order> getOrdersByIdCategories(Long id);
      List<Order> getOrdersByKey(String name);
      Order getOrder(Long id);
}
