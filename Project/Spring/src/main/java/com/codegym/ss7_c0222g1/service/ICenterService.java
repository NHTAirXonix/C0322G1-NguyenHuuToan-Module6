package com.codegym.ss7_c0222g1.service;


import com.codegym.ss7_c0222g1.model.Center;
import com.codegym.ss7_c0222g1.model.Employee;

import java.util.List;


public interface ICenterService {

    List<Center> getCenterList();

    Employee findEmployee(Integer employeeId);

    List<Employee> findEmployeeList();

    void removeById(Integer id);

    List<Center> search(String name, String patientId);

    void create(Center center);
}
