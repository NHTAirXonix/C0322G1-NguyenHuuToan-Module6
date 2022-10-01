package vn.codegym.pig_farm.dto.projections;

import java.time.LocalDate;

/**
 * Create by ThuanT
 * Date create: 08/09/2022
 * interface: TreatmentDto
 *
 * @return
 */
public interface TreatmentDto {
    Integer getId();

    Integer getAmount();

    LocalDate getDate();

    String getDiseases();

    String getDoctor();

    String getMedicine();

    String getPigCode();

    String getPigstyCode();


}
