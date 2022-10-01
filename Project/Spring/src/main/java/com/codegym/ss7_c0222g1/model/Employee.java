package com.codegym.ss7_c0222g1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employeeId;

    private String employeeCode;
    private String employeeName;
    private String employeeBirthDay;
    private String employeeGender;
    private String employeePositon;

    @OneToOne(mappedBy = "employee")
    @JsonIgnore
    private  Center center;

    public Employee() {
    }


    public Employee(Integer employeeId, String employeeCode, String employeeName, String employeeBirthDay, String employeeGender, String employeePositon, Center center) {
        this.employeeId = employeeId;
        this.employeeCode = employeeCode;
        this.employeeName = employeeName;
        this.employeeBirthDay = employeeBirthDay;
        this.employeeGender = employeeGender;
        this.employeePositon = employeePositon;
        this.center = center;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeBirthDay() {
        return employeeBirthDay;
    }

    public void setEmployeeBirthDay(String employeeBirthDay) {
        this.employeeBirthDay = employeeBirthDay;
    }

    public String getEmployeeGender() {
        return employeeGender;
    }

    public void setEmployeeGender(String employeeGender) {
        this.employeeGender = employeeGender;
    }

    public String getEmployeePositon() {
        return employeePositon;
    }

    public void setEmployeePositon(String employeePositon) {
        this.employeePositon = employeePositon;
    }

    public Center getCenter() {
        return center;
    }

    public void setCenter(Center center) {
        this.center = center;
    }
}
