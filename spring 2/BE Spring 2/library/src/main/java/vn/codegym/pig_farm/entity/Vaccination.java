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
public class Vaccination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String date;

    private Integer amount;

    @Column(columnDefinition = "VARCHAR(45)")
    private String vaccineType;

    @Column(columnDefinition = "VARCHAR(45)")
    private String vaccinatedPerson;

    @Column(columnDefinition = "VARCHAR(255)")
    private String note;


    @Column(columnDefinition = "BIT(1) default 0 ")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "pigsty_id", referencedColumnName = "id")
    private Pigsty pigsty;
}
