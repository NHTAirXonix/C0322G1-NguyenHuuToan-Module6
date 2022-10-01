package com.codegym.ss7_c0222g1.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;
    private String customerCode;
    private String customerIdNumber;
    private String customerBirthDay;
    private String customerGender;
    private String customerDayCreate;
    private String customerDate;

    public Customer() {
    }

    public Customer(Integer customerId, String customerCode, String customerIdNumber, String customerBirthDay, String customerGender, String customerDayCreate, String customerDate) {
        this.customerId = customerId;
        this.customerCode = customerCode;
        this.customerIdNumber = customerIdNumber;
        this.customerBirthDay = customerBirthDay;
        this.customerGender = customerGender;
        this.customerDayCreate = customerDayCreate;
        this.customerDate = customerDate;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerIdNumber() {
        return customerIdNumber;
    }

    public void setCustomerIdNumber(String customerIdNumber) {
        this.customerIdNumber = customerIdNumber;
    }

    public String getCustomerBirthDay() {
        return customerBirthDay;
    }

    public void setCustomerBirthDay(String customerBirthDay) {
        this.customerBirthDay = customerBirthDay;
    }

    public String getCustomerGender() {
        return customerGender;
    }

    public void setCustomerGender(String customerGender) {
        this.customerGender = customerGender;
    }

    public String getCustomerDayCreate() {
        return customerDayCreate;
    }

    public void setCustomerDayCreate(String customerDayCreate) {
        this.customerDayCreate = customerDayCreate;
    }

    public String getCustomerDate() {
        return customerDate;
    }

    public void setCustomerDate(String customerDate) {
        this.customerDate = customerDate;
    }
}
