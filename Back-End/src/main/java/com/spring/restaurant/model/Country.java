package com.spring.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "country")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Country extends PublicData{
    @Column(name = "code")
    private String code; // EG


    @JsonIgnore
    @OneToMany(mappedBy = "country")
    private Set<State> states;
  }