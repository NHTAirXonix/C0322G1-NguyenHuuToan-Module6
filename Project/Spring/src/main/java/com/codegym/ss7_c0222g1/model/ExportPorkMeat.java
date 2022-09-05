package com.codegym.ss7_c0222g1.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ExportPorkMeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exportId;
    private String codeCage;
    private String codeEmployee;
    private String nameEmployee;
    private String company;
    private String startDay;
    private String amount;
    private String kilogram;
    private String price;
    private String totalMoney;
    private String statusDelete;

    public ExportPorkMeat() {
    }

    public ExportPorkMeat(Integer exportId, String codeCage, String codeEmployee, String nameEmployee, String company, String startDay, String amount, String kilogram, String price, String totalMoney, String statusDelete) {
        this.exportId = exportId;
        this.codeCage = codeCage;
        this.codeEmployee = codeEmployee;
        this.nameEmployee = nameEmployee;
        this.company = company;
        this.startDay = startDay;
        this.amount = amount;
        this.kilogram = kilogram;
        this.price = price;
        this.totalMoney = totalMoney;
        this.statusDelete = statusDelete;
    }

    public Integer getExportId() {
        return exportId;
    }

    public void setExportId(Integer exportId) {
        this.exportId = exportId;
    }

    public String getCodeCage() {
        return codeCage;
    }

    public void setCodeCage(String codeCage) {
        this.codeCage = codeCage;
    }

    public String getCodeEmployee() {
        return codeEmployee;
    }

    public void setCodeEmployee(String codeEmployee) {
        this.codeEmployee = codeEmployee;
    }

    public String getNameEmployee() {
        return nameEmployee;
    }

    public void setNameEmployee(String nameEmployee) {
        this.nameEmployee = nameEmployee;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getStartDay() {
        return startDay;
    }

    public void setStartDay(String startDay) {
        this.startDay = startDay;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getKilogram() {
        return kilogram;
    }

    public void setKilogram(String kilogram) {
        this.kilogram = kilogram;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(String totalMoney) {
        this.totalMoney = totalMoney;
    }

    public String getStatusDelete() {
        return statusDelete;
    }

    public void setStatusDelete(String statusDelete) {
        this.statusDelete = statusDelete;
    }
}