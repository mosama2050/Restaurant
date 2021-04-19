package com.spring.restaurant.model;
import lombok.*;
import javax.persistence.Table;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order")
public class Order extends CategoryOrder{

    @Column(name = "price")
    private int price;
    @Column(name = "image")
    private String img;
    @Column(name = "description")
    private String description;
}