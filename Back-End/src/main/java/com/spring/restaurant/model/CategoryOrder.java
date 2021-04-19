package com.spring.restaurant.model;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class CategoryOrder extends BaseEntity{
    @Column(name = "name")
    private String name;
}
