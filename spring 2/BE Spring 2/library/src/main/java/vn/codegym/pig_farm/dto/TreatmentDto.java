package vn.codegym.pig_farm.dto;

import org.jetbrains.annotations.Range;
import vn.codegym.pig_farm.entity.Pig;

import javax.validation.constraints.*;
import java.time.LocalDate;

/**
 * create class TreatmentDto
 * @author TuongTK
 * @Date 09/09/2022
 */
public class TreatmentDto {
    private Integer id;

    private LocalDate date;

    @NotBlank(message = "khong duoc de trong")
//    @Size(min = 3, max = 50)
    private String doctor;


    @NotBlank(message = "khong duoc de trong")
//    @Size(min = 4, max = 50)
    private String diseases;


    @NotBlank(message = "khong duoc de trong")
//    @Size(min = 3, max = 50)
    private String medicine;

    @NotNull

    private Integer amount;

    private Boolean isDeleted;
    @NotNull
    private Pig pig;

    public TreatmentDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getDiseases() {
        return diseases;
    }

    public void setDiseases(String diseases) {
        this.diseases = diseases;
    }

    public String getMedicine() {
        return medicine;
    }

    public void setMedicine(String medicine) {
        this.medicine = medicine;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Pig getPig() {
        return pig;
    }

    public void setPig(Pig pig) {
        this.pig = pig;
    }
}