package vn.codegym.pig_farm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.codegym.pig_farm.dto.projections.VaccinationDto;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.entity.Vaccination;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Transactional
public interface VaccinationRepository extends JpaRepository<Vaccination, Integer> {

    /**
     * @param pageable
     * @param name
     * @return List Vaccination, status 200
     * @function (Query to display all Vaccination and search and pageable)
     * @creator TamLT
     * @date-create 08/09/2022
     */


    @Query(value = "select v.id , v.amount , v.date , v.vaccinated_person as vaccinatedPerson , v.vaccine_type as vaccineType , p.`code` as pigstyCode " +
            " from vaccination v " +
            " join pigsty p on v.pigsty_id = p.id " +
            " where (v.vaccinated_person like :name or p.`code` like :name) and v.is_deleted =0 order by id desc ", nativeQuery = true,
            countQuery = "select count(*) from(select v.id , v.amount , v.date , v.vaccinated_person as vaccinatedPerson , v.vaccine_type as vaccineType , p.`code` as pigstyCode" +
                    " from vaccination v" +
                    " join pigsty p on v.pigsty_id = p.id" +
                    " where (v.vaccinated_person like :name or p.`code` like :name) and v.is_deleted =0 order by id desc) as abc ")

    Page<VaccinationDto> getAllListVaccination(Pageable pageable, @Param("name")String name);

    /**
     * @param id
     * @return Delete Vaccination, status 200
     * @function (Query to delete Vaccination)
     * @creator TamLT
     * @date-create 08/09/2022
     */
    @Modifying
    @Query(value = "update vaccination set is_deleted =1 where id =:id", nativeQuery = true)
    void delete(@Param("id") Integer id);

    @Query(value = "select * from vaccination where id=:id", nativeQuery = true)
    Optional<VaccinationDto> findIdVaccination(@Param("id") Integer id);

    @Query(value="select * from vaccination", nativeQuery=true)
    List<Vaccination> getAll();


    /**
     * @function (Query to create vaccination)
     * @creator DamTN
     * @date-create 08/09/2022
     */
    @Modifying
    @Transactional
    @Query(value = "insert into vaccination(amount, `date`, is_deleted, note, vaccinated_person, vaccine_type, pigsty_id)" +
            "value (:amount, :date, 0, :note, :vaccinatedPerson, :vaccineType, :pigstyCode)", nativeQuery=true)
    void createVaccination(@Param("amount") Integer amount,
                           @Param("date") String date,
                           @Param("note") String note,
                           @Param("vaccinatedPerson") String vaccinatedPerson,
                           @Param("vaccineType") String vaccineType,
                           @Param("pigstyCode") Pigsty pigstyCode);
}
