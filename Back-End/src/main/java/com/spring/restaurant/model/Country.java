package com.spring.restaurant.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name ="country")
public class Country extends PublicData{
    @Column(name = "code")
    private String code; // EG

    @OneToMany(mappedBy = "country")
    private Set<State> states;
  }