package com.codegym.ss7_c0222g1.model;

import javax.persistence.*;

@Entity
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer medicalId;
    private String medicalCode;
    private String dayStart;
    private String dayEnd;
    private String reason;
    private String resolve;
    private String deleteStatus;
    private String doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;


    public MedicalRecord() {
    }

    public MedicalRecord(Integer medicalId, String medicalCode, String dayStart, String dayEnd, String reason, String resolve, String doctor, String deleteStatus, Patient patient) {
        this.medicalId = medicalId;
        this.medicalCode = medicalCode;
        this.dayStart = dayStart;
        this.dayEnd = dayEnd;
        this.reason = reason;
        this.resolve = resolve;
        this.doctor = doctor;
        this.deleteStatus = deleteStatus;
        this.patient = patient;
    }

    public Integer getMedicalId() {
        return medicalId;
    }

    public void setMedicalId(Integer medicalId) {
        this.medicalId = medicalId;
    }

    public String getMedicalCode() {
        return medicalCode;
    }

    public void setMedicalCode(String code) {
        this.medicalCode = code;
    }

    public String getDayStart() {
        return dayStart;
    }

    public void setDayStart(String dayStart) {
        this.dayStart = dayStart;
    }

    public String getDayEnd() {
        return dayEnd;
    }

    public void setDayEnd(String dayEnd) {
        this.dayEnd = dayEnd;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getResolve() {
        return resolve;
    }

    public void setResolve(String resolve) {
        this.resolve = resolve;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getDeleteStatus() {
        return deleteStatus;
    }

    public void setDeleteStatus(String deleteStatus) {
        this.deleteStatus = deleteStatus;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
