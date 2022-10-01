package vn.codegym.pig_farm.dto.projections;

import java.time.LocalDate;

public interface AdvertisementDto {

    Integer getId();

    String getTitle();

    LocalDate getSubmittedDate();

    String getTimeExistence();

    String getImage();
}
