package com.spring.restaurant.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order extends PublicData{

    @Column(name = "price")
    private int price;

    @Column(name = "image")
    private String img;

    @Column(name = "description")
    @Lob // string too long
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_Category")
    private Category category;
}