package vn.codegym.pig_farm.dto;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.entity.Storage;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


public class FoodDto implements Validator {

    private Integer id;

    @NotNull(message = "*Không được để trống!")
    @Min(0)
    private Double amount;

    @NotBlank(message = "*Không được để trống!")
    private String unit;


    @NotNull(message = "*Không được để trống!")
    private Storage storage;

    @NotNull(message = "*Không được để trống!")
    private Pigsty pigsty;

    private Boolean isDeleted;

    public FoodDto() {
    }

    public FoodDto(Integer id, Double amount, String unit, Storage storage, Pigsty pigsty, Boolean isDeleted) {
        this.id = id;
        this.amount = amount;
        this.unit = unit;
        this.storage = storage;
        this.pigsty = pigsty;
        this.isDeleted = isDeleted;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
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

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

    }
}
