package com.codegym.ss7_c0222g1.service;
import com.codegym.ss7_c0222g1.model.MedicalRecord;

import java.util.List;

public interface IMedicalRecordService {
    List<MedicalRecord> findAll();

    void removeById(Integer id);

    MedicalRecord findById(Integer id);

    void update(Integer medicalId,
                String dayEnd,
                String dayStart,
                String doctor,
                String reason,
                String resolve);

    void create(MedicalRecord medicalRecordNew);

    List<MedicalRecord> search(String name);
}
