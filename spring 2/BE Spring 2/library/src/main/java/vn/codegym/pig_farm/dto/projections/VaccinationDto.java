package vn.codegym.pig_farm.dto.projections;

public interface VaccinationDto {
    Integer getId();

    String getDate();

    String getPigstyCode();

    String getVaccinatedPerson();

    String getVaccineType();

    Integer getAmount();
}
