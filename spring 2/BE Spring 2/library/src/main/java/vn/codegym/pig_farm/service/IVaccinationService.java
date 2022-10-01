package vn.codegym.pig_farm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.pig_farm.dto.projections.VaccinationDto;
import vn.codegym.pig_farm.entity.Vaccination;

import java.util.List;
import java.util.Optional;
public interface IVaccinationService {
    /**
     * @param pageable
     * @param name
     * @return List Vaccination, status 200
     * @function (display all Vaccination and search)
     * @creator TamLT
     * @date-create 08/09/2022
     */

    Page<VaccinationDto> getAll(Pageable pageable, String name);

    /**
     * @param ids
     * @return Delete Vaccination, status 200
     * @function (Delete Vaccination and search)
     * @creator TamLT
     * @date-create 08/09/2022
     */

    void delete(Integer[] ids);

    Optional<VaccinationDto> findByIdVac(Integer id);

    List<Vaccination> findAll();

    /**
     * @return Create Vaccination, status 200
     * @function (Create vaccination schedule)
     * @creator DamTN
     * @date-create 08/09/2022
     */
    void saveVaccination(Vaccination vaccination);

}
