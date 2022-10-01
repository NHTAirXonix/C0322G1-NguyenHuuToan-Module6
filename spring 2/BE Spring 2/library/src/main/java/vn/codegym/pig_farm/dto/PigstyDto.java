package vn.codegym.pig_farm.dto;

import lombok.Data;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class PigstyDto implements Validator {
    private Integer id;

    @NotNull
    @NotEmpty
    private String creationDate;

    private String code;

    private Integer typePigs;

    private String buildDate;

    @Max(value = 20, message = "không được lớn hơn 20 cá thể")
    @Min(value = 1, message = "không được nhỏ hơn 20 cá thể")
    private Integer maxNumber;

    private Boolean isDeleted;

    private EmployDto employee;

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

    }
}