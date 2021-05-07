package com.spring.restaurant.service;

import com.spring.restaurant.dto.PurchaseRequest;
import com.spring.restaurant.dto.PurchaseResponse;

public interface PurchaseService {
     PurchaseResponse addRequestOrder(PurchaseRequest purchases);
}