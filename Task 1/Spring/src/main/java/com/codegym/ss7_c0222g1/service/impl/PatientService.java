package com.codegym.ss7_c0222g1.service.impl;

import com.codegym.ss7_c0222g1.model.Patient;
import com.codegym.ss7_c0222g1.repository.PatientRepository;
import com.codegym.ss7_c0222g1.service.IPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PatientService implements IPatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<Patient> findAll() {
        return patientRepository.findAllC();
    }

    @Override
    public void update(Integer patientId, String patientName) {
        patientRepository.updateC(patientId, patientName);
    }

    @Override
    public void create(Patient patient) {
        patientRepository.saveC(patient.getPatientId(),patient.getPatientCode(),patient.getPatientName());
    }
}
