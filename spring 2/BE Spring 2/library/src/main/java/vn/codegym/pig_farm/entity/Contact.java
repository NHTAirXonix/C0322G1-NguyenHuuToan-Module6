package vn.codegym.pig_farm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(45)")
    private String name;

    @Column(columnDefinition = "VARCHAR(45)")
    private String email;

    @Column(columnDefinition = "VARCHAR(45)")
    private String phone;

    @Column(columnDefinition = "VARCHAR(45)")
    private String address;

    @Column(columnDefinition = "VARCHAR(255)")
    private String content;

    @Column(columnDefinition = "DATE")
    private LocalDate date;


    @Column(columnDefinition = "BIT(1) default 0")
    private Boolean isDeleted;
}
