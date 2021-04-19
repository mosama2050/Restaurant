package com.spring.restaurant.model;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order extends CategoryOrder{
    private int price;
    private String img;
    private String description;
}