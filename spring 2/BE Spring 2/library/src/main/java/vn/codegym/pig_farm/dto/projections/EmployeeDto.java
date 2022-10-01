package vn.codegym.pig_farm.dto.projections;

import java.time.LocalDate;
public interface EmployeeDto {
        Integer getId();

        String getCode();

        String getNameEmployee();

        String getGender();

        String getImage();

        String getIdCard();

        LocalDate getBirthDay();

        Boolean getIsDeleted();

        Integer getUserId();

        String getUserName();

        String getPassWord();

        String getEmail();

        String getCreationDate();

        String getRoleName();


}
