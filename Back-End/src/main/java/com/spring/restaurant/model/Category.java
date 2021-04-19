package com.spring.restaurant.model;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Data
@NoArgsConstructor

@Entity
@Table(name = "category")
public class Category extends CategoryOrder {

    @OneToMany(mappedBy = "category") // name of opject
    private Set<Order> orders;
}