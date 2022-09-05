package com.codegym.ss7_c0222g1.service;

import com.codegym.ss7_c0222g1.model.Patient;

import java.util.List;

public interface IPatientService {
    List<Patient> findAll();

    void update(Integer patientId, String patientName);

    void create(Patient patient);
}
