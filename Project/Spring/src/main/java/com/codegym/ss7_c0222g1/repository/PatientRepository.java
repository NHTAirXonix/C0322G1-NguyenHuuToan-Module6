package com.codegym.ss7_c0222g1.repository;

import com.codegym.ss7_c0222g1.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface PatientRepository extends JpaRepository<Patient,Integer> {

    @Query(value = "select * from patient ", nativeQuery = true)
    List<Patient> findAllC();

    @Modifying
    @Query(value = "update patient set patient_name = :name where patient_id = :id", nativeQuery = true)
    void updateC(@Param("id") Integer id,@Param("name") String name);

    @Modifying
    @Query(value = "insert into patient (patient_id, patient_code, patient_name) values (:id, :code, :name)", nativeQuery = true)
    void saveC(@Param("id") Integer id, @Param("code") String code, @Param("name") String name);
}
