package com.codegym.ss7_c0222g1.service.impl;

import com.codegym.ss7_c0222g1.model.Center;
import com.codegym.ss7_c0222g1.model.Employee;
import com.codegym.ss7_c0222g1.model.MedicalRecord;
import com.codegym.ss7_c0222g1.repository.CenterRepository;
import com.codegym.ss7_c0222g1.repository.EmployeeRepository;
import com.codegym.ss7_c0222g1.service.ICenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CenterService implements ICenterService {

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;


    @Override
    public List<Center> getCenterList() {
        return centerRepository.getCenterList();
    }

    @Override
    public Employee findEmployee(Integer employeeId) {
        return employeeRepository.findEmployee(employeeId);
    }

    @Override
    public List<Employee> findEmployeeList() {
        return employeeRepository.findEmployeeList();
    }

    @Override
    public void removeById(Integer id) {
        centerRepository.deleteByIdC(id);
    }

    @Override
    public List<Center> search(String name, String patientId) {
        return centerRepository.searchC(name, patientId);
    }

    @Override
    public void create(Center center) {
        centerRepository.save(center);
    }
}
