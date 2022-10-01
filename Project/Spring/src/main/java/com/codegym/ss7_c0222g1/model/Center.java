package com.codegym.ss7_c0222g1.model;

import javax.persistence.*;

@Entity
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer centerId;
    private String centerName;
    private String centerDayCreate;
    private String centerAddress;
    private Integer deleteStatus;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public Center() {
    }

    public Center(Integer centerId, String centerName, String centerDayCreate, String centerAddress, Integer deleteStatus, Employee employee) {
        this.centerId = centerId;
        this.centerName = centerName;
        this.centerDayCreate = centerDayCreate;
        this.centerAddress = centerAddress;
        this.deleteStatus = deleteStatus;
        this.employee = employee;
    }

    public Integer getCenterId() {
        return centerId;
    }

    public void setCenterId(Integer centerId) {
        this.centerId = centerId;
    }

    public String getCenterName() {
        return centerName;
    }

    public void setCenterName(String centerName) {
        this.centerName = centerName;
    }

    public String getCenterDayCreate() {
        return centerDayCreate;
    }

    public void setCenterDayCreate(String centerDayCreate) {
        this.centerDayCreate = centerDayCreate;
    }

    public String getCenterAddress() {
        return centerAddress;
    }

    public void setCenterAddress(String centerAddress) {
        this.centerAddress = centerAddress;
    }

    public Integer getDeleteStatus() {
        return deleteStatus;
    }

    public void setDeleteStatus(Integer deleteStatus) {
        this.deleteStatus = deleteStatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
