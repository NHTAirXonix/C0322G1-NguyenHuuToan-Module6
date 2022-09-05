package com.codegym.ss7_c0222g1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer patientId;
    private String patientCode;
    private String patientName;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private Set<MedicalRecord> medicalRecords;

    public Patient() {
    }

    public Patient(Integer patientId, String patientCode, String patientName, Set<MedicalRecord> medicalRecords) {
        this.patientId = patientId;
        this.patientCode = patientCode;
        this.patientName = patientName;
        this.medicalRecords = medicalRecords;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public String getPatientCode() {
        return patientCode;
    }

    public void setPatientCode(String code) {
        this.patientCode = code;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String name) {
        this.patientName = name;
    }

    public Set<MedicalRecord> getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(Set<MedicalRecord> medicalRecords) {
        this.medicalRecords = medicalRecords;
    }
}
