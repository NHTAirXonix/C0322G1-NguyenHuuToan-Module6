package com.codegym.ss7_c0222g1.repository;

import com.codegym.ss7_c0222g1.model.Center;
import com.codegym.ss7_c0222g1.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    @Query(value = "select * from employee where employee_id = :employeeId", nativeQuery = true)
    Employee findEmployee(@Param("employeeId") Integer employeeId);

    @Query(value = "select * from employee ", nativeQuery = true)
    List<Employee> findEmployeeList();
}
