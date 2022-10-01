package com.codegym.ss7_c0222g1.service.impl;

import com.codegym.ss7_c0222g1.model.MedicalRecord;
import com.codegym.ss7_c0222g1.repository.MedicalRecordRepository;
import com.codegym.ss7_c0222g1.service.IMedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordService implements IMedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Override
    public List<MedicalRecord> findAll() {
        return medicalRecordRepository.findAllC();
    }

    @Override
    public void removeById(Integer id) {
        medicalRecordRepository.removeByIdC(id);
    }

    @Override
    public MedicalRecord findById(Integer id) {
        return medicalRecordRepository.findByIdC(id);
    }

    @Override
    public void update(Integer medicalId, String dayEnd, String dayStart, String doctor, String reason, String resolve) {
        medicalRecordRepository.updateC(medicalId, dayEnd, dayStart, doctor, reason, resolve);
    }

    @Override
    public void create(MedicalRecord medicalRecordNew) {
        medicalRecordRepository.createC(medicalRecordNew.getMedicalId(),
                                        medicalRecordNew.getDayEnd(),
                                        medicalRecordNew.getDayStart(),
                                        medicalRecordNew.getDeleteStatus(),
                                        medicalRecordNew.getDoctor(),
                                        medicalRecordNew.getMedicalCode(),
                                        medicalRecordNew.getReason(),
                                        medicalRecordNew.getResolve(),
                                        medicalRecordNew.getPatient().getPatientId()
        );
    }

    @Override
    public List<MedicalRecord> search(String name, String patientId) {
        return medicalRecordRepository.searchC(name, patientId);
    }

    @Override
    public List<String[]> getChart() {
        return medicalRecordRepository.getChart();
    }


}
