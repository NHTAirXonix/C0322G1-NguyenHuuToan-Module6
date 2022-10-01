package vn.codegym.pig_farm.dto;

import vn.codegym.pig_farm.entity.Pigsty;

import java.time.LocalDate;

public class PigDto {
    private Integer id;
    //    @NotBlank
//    @Pattern(regexp = "^(ML)[0-9]{2,4}$", message = "Code phải có dạng MlXXX")
    private String code;

    private LocalDate dateIn;

    private LocalDate dateOut;

    //    @NotBlank(message = "Không được để trống")
    private String status;

    //    @Length(min = 1, max = 100, message = "Tối thiểu 1 ký tự và lớn nhất 3 ký tự.")
//    @NotBlank(message = "Không được để trống")
    private Double weight;

    private Pigsty pigsty;

    private Boolean isDeleted;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getDateIn() {
        return dateIn;
    }

    public void setDateIn(LocalDate dateIn) {
        this.dateIn = dateIn;
    }

    public LocalDate getDateOut() {
        return dateOut;
    }

    public void setDateOut(LocalDate dateOut) {
        this.dateOut = dateOut;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Pigsty getPigsty() {
        return pigsty;
    }

    public void setPigsty(Pigsty pigsty) {
        this.pigsty = pigsty;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}