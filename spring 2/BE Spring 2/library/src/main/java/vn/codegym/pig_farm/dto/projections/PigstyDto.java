package vn.codegym.pig_farm.dto.projections;


import java.time.LocalDate;

public interface PigstyDto {
    Integer getId();
    String getCode();
    LocalDate getCreationDate();
    LocalDate getBuildDate();
    Integer getMaxNumber();
    String getEmployeeCode();
    String getEmployeeName();

    Integer getTypePigs();

    Boolean getIsDeleted();
}
