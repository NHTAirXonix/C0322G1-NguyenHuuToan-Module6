package com.codegym.ss7_c0222g1.repository;

import com.codegym.ss7_c0222g1.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord,Integer> {

    @Query(value = "select * from medical_record where delete_status = 1", nativeQuery = true)
    List<MedicalRecord> findAllC();

    @Modifying
    @Query(value = "update  medical_record set delete_status = 0 where medical_id = :id", nativeQuery = true)
    void removeByIdC(@Param("id") Integer id);

    @Query(value = "select * from medical_record where delete_status = 1 and medical_id = :id", nativeQuery = true)
    MedicalRecord findByIdC(@Param("id") Integer id);

    @Modifying
    @Query(value = "update  medical_record set day_end = :dayEnd, day_start = :dayStart, doctor = :doctor, reason = :reason, resolve = :resolve where medical_id = :id", nativeQuery = true)
    void updateC(@Param("id") Integer id,
                 @Param("dayEnd") String dayEnd,
                 @Param("dayStart") String dayStart,
                 @Param("doctor") String doctor,
                 @Param("reason") String reason,
                 @Param("resolve") String resolve );

    @Modifying
    @Query(value = "insert into medical_record (medical_id, day_end, day_start, delete_status, doctor, medical_code, reason, resolve, patient_id) values (:medical_id, :day_end, :day_start, :delete_status, :doctor, :medical_code, :reason, :resolve, :patient_id)", nativeQuery = true)
    void createC(@Param("medical_id") Integer medical_id,
                 @Param("day_end") String day_end,
                 @Param("day_start") String day_start,
                 @Param("delete_status") String delete_status,
                 @Param("doctor") String doctor,
                 @Param("medical_code") String medical_code,
                 @Param("reason") String reason,
                 @Param("resolve") String resolve,
                 @Param("patient_id") Integer patient_id
    );

    @Query(value = "select * from medical_record where delete_status = 1 and doctor like %:name%", nativeQuery = true)
    List<MedicalRecord> searchC(@Param("name") String name);

    @Query(value = "select month(day_start) as thang, count(*) as patient from medical_record where year(day_start) = 2022 group by (month(day_start)) order by thang;", nativeQuery = true)
    List<String[]> getChart();
}
