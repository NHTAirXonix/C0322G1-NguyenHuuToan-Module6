package vn.codegym.pig_farm.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


/**
 * Created by: HoangDT
 * Date created: 08/09/2022
 * Entity: Storage
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "storage")
    @JsonIgnore
    private List<Food> foods;

    @Column(columnDefinition = "VARCHAR(30)")
    private String foodType;

    private Double amount;

    @Column(columnDefinition = "VARCHAR(15)")
    private String unit;

    @Column(columnDefinition = "DATE")
    private LocalDate date;


    @Column(columnDefinition = "BIT(1) DEFAULT 0")
    private Boolean isDeleted;
}
