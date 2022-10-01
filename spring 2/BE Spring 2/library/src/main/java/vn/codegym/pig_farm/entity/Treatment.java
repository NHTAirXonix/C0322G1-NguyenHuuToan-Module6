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
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "DATE")
    private LocalDate date;

    @Column(columnDefinition = "VARCHAR(50)")
    private String doctor;

    @Column(columnDefinition = "VARCHAR(255)")
    private String diseases;

    @Column(columnDefinition = "VARCHAR(50)")
    private String medicine;

    private Integer amount;


    @Column(columnDefinition = "BIT(1) DEFAULT 0")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "pig_id", referencedColumnName = "id")
    private Pig pig;
}
