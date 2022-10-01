package com.codegym.ss7_c0222g1.repository;

import com.codegym.ss7_c0222g1.model.Center;
import com.codegym.ss7_c0222g1.model.Employee;
import com.codegym.ss7_c0222g1.model.MedicalRecord;
import com.codegym.ss7_c0222g1.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface CenterRepository extends JpaRepository<Center,Integer> {

    @Query(value = "select * from center where delete_status = 0", nativeQuery = true)
    List<Center> getCenterList();

    @Modifying
    @Query(value = "update  center set delete_status = 1 where center_id = :id", nativeQuery = true)
    void deleteByIdC(@Param("id") Integer id);

    @Query(value = "select * from center where delete_status = 0 and center_name like %:name% and employee_id like %:employeeId%", nativeQuery = true)
    List<Center> searchC(@Param("name") String name, @Param("employeeId") String employeeId);

    @Modifying
    @Query(value = "insert into center (center_id, center_name, center_address, center_day_create, delete_status, employee_id) values (:id, :name, :address, :day, :deleteStatus, :employeeId)", nativeQuery = true)
    void create(@Param("id") Integer id,
                @Param("name") String name,
                @Param("address") String address,
                @Param("day") String day,
                @Param("deleteStatus") Integer deleteStatus,
                @Param("employeeId") Integer employeeId
                );

//    center.getCenterId(),
//            center.getCenterName(),
//            center.getCenterAddress(),
//            center.getCenterDayCreate(),
//            0,
//            center.getEmployee().getEmployeeId()
}
