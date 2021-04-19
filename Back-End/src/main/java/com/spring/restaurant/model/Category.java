package com.spring.restaurant.model;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@NoArgsConstructor
 
@Entity
@Table(name = "category")
public class Category extends CategoryOrder {

}