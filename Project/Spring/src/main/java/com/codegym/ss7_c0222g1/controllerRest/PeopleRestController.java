package com.codegym.ss7_c0222g1.controllerRest;

import com.codegym.ss7_c0222g1.model.MedicalRecord;
import com.codegym.ss7_c0222g1.model.Patient;
import com.codegym.ss7_c0222g1.service.IPatientService;
import com.codegym.ss7_c0222g1.service.IMedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/people")
public class PeopleRestController {

    @Autowired
    private IPatientService patientService;

    @Autowired
    private IMedicalRecordService medicalRecordService;

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        List<MedicalRecord> medicalRecordList = medicalRecordService.findAll();
        if(medicalRecordList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(medicalRecordList, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        MedicalRecord medicalRecord = medicalRecordService.findById(id);
        if(medicalRecord == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(medicalRecord, HttpStatus.OK);
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<?> create(@RequestBody MedicalRecord medicalRecord){

        Patient patient = new Patient();
        patient.setPatientCode(medicalRecord.getPatient().getPatientCode());
        patient.setPatientName(medicalRecord.getPatient().getPatientName());
        patientService.create(patient);

        MedicalRecord medicalRecordNew = new MedicalRecord();
        medicalRecordNew.setMedicalId(medicalRecord.getMedicalId());
        medicalRecordNew.setDayEnd(medicalRecord.getDayEnd());
        medicalRecordNew.setDayStart(medicalRecord.getDayStart());
        medicalRecordNew.setDeleteStatus("1");
        medicalRecordNew.setDoctor(medicalRecord.getDoctor());
        medicalRecordNew.setMedicalCode(medicalRecord.getMedicalCode());
        medicalRecordNew.setReason(medicalRecord.getReason());
        medicalRecordNew.setResolve(medicalRecord.getResolve());
        medicalRecordNew.setPatient(patient);
        medicalRecordService.create( medicalRecordNew);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody MedicalRecord medicalRecord){
        patientService.update(medicalRecord.getPatient().getPatientId(),medicalRecord.getPatient().getPatientName());
        medicalRecordService.update(medicalRecord.getMedicalId(),
                                    medicalRecord.getDayEnd(),
                                    medicalRecord.getDayStart(),
                                    medicalRecord.getDoctor(),
                                    medicalRecord.getReason(),
                                    medicalRecord.getResolve()
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
        medicalRecordService.removeById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/patientlList")
    public ResponseEntity<?> getPatientList() {
        List<Patient> patientList = patientService.findAll();
        if(patientList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(patientList, HttpStatus.OK);
    }

    @GetMapping("/search/{name}/{patientId}")
    public ResponseEntity<?> search(@PathVariable("name") String name, @PathVariable("patientId") String patientId) {
        if (name.equals("all")) {
            name = "";
        }
        List<MedicalRecord> medicalRecordList = medicalRecordService.search(name,patientId);
        if(medicalRecordList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(medicalRecordList, HttpStatus.OK);
    }

    @GetMapping("/getChart")
    public ResponseEntity<?> getChart() {
        List<String[]> chartData = medicalRecordService.getChart();
        if(chartData.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(chartData, HttpStatus.OK);
    }
}
