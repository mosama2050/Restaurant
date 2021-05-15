package com.spring.restaurant.model;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class CategoryOrder extends BaseEntity{
    @Column(name = "name")
    private String name;

    @Column(name = "data_create")
    @CreationTimestamp
    private Date dataCreate;

    @Column(name = "data_update")
    @UpdateTimestamp
    private Date dataupdate;

}
