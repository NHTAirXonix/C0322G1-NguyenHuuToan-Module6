package vn.codegym.pig_farm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.codegym.pig_farm.dto.projections.TreatmentDto;
import vn.codegym.pig_farm.entity.Pig;
import vn.codegym.pig_farm.entity.Treatment;

import java.time.LocalDate;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Integer> {
    /**
     * Create by ThuanT
     * Date create: 08/09/2022
     * write query for method findAllTreatment
     *
     * @return
     */

    @Query(value = "SELECT t.id, t.amount, t.date, t.diseases, t.doctor, t.is_deleted, t.medicine,p.code as pigCode, pt.code as pigstyCode" + " FROM Treatment t JOIN pig p ON t.pig_id = p.id" + " JOIN pigsty pt ON p.pigsty_id = pt.id " + "where t.is_deleted = 0 and pt.code like :keySearch order by `id` desc ", nativeQuery = true, countQuery = "select count(*) from(SELECT t.id, t.amount, t.date, t.diseases, t.doctor, t.is_deleted, t.medicine, p.code as pigCode, pt.code as pigstyCode" + " FROM Treatment t " + " JOIN pig p ON t.pig_id = p.id" + " JOIN pigsty pt ON p.pigsty_id = pt.id " + " where t.is_deleted = 0 and pt.code like :keySearch order by `id` desc  ) as abc  ")
    Page<TreatmentDto> getAllTreatment(Pageable pageable, @Param("keySearch") String keySearch);


    /**
     * Create by ThuanT
     * Date create: 08/09/2022
     * write query for method delete By Id Treatment
     *
     * @param id
     * @return
     */
    @Modifying
    @Transactional
    @Query(value = "update Treatment T set t.is_deleted = 1 where T.id = :id", nativeQuery = true)
    void deleteByIdTreatment(@Param("id") int id);

    /**
     * create by TuongTK
     * date: 08/09/2022
     * write query for method save
     *
     * @param id
     * @param date
     * @param doctor
     * @param diseases
     * @param medicine
     * @param amount
     * @param pig
     */
    @Modifying
    @Transactional
    @Query(value = "insert into treatment(id, `date`, doctor, diseases, medicine, amount, pig_id, is_deleted) " + " values (:id, :date, :doctor, :diseases, :medicine, :amount, :pig_id, 0);", nativeQuery = true)
    void save(@Param("id") Integer id, @Param("date") LocalDate date, @Param("doctor") String doctor, @Param("diseases") String diseases, @Param("medicine") String medicine, @Param("amount") Integer amount, @Param("pig_id") Pig pig);

    /**
     * Create by ThuanT
     * Date create: 09/09/2022
     * write query for method find By Id Treatment
     *
     * @param id
     * @return
     */

    @Query(value = "SELECT t.id, t.amount, t.date, t.diseases, t.doctor, t.is_deleted, t.medicine,p.code as pigCode, pt.code as pigstyCode" + " FROM Treatment t JOIN pig p ON t.pig_id = p.id" + " JOIN pigsty pt ON p.pigsty_id = pt.id " + "where t.is_deleted = 0 and t.id like :id", nativeQuery = true, countQuery = "select count(*) from(SELECT t.id, t.amount, t.date, t.diseases, t.doctor, t.is_deleted, t.medicine, p.code as pigCode, pt.code as pigstyCode" + " FROM Treatment t " + " JOIN pig p ON t.pig_id = p.id" + " JOIN pigsty pt ON p.pigsty_id = pt.id " + " where t.is_deleted = 0 and t.id =  :id) as abc ")
    TreatmentDto findByIdTreatment(@Param("id") int id);

}