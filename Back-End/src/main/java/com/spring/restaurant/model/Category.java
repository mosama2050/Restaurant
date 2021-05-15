package com.spring.restaurant.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Data
@NoArgsConstructor

@Entity
@Table(name = "category")
public class Category extends CategoryOrder {
    @JsonIgnore
    @OneToMany(mappedBy = "category") // name of opject
    private Set<Order> orders;

    @Column(name = "categorylogo")
    private String logo;

    @Column(name = "name")
    private String name;

}