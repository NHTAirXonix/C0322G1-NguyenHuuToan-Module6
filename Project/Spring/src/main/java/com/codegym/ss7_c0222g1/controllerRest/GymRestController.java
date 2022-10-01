package com.codegym.ss7_c0222g1.controllerRest;

import com.codegym.ss7_c0222g1.model.Center;
import com.codegym.ss7_c0222g1.model.Employee;
import com.codegym.ss7_c0222g1.model.MedicalRecord;
import com.codegym.ss7_c0222g1.model.Patient;
import com.codegym.ss7_c0222g1.service.ICenterService;
import com.codegym.ss7_c0222g1.service.IPatientService;
import com.sun.javafx.iio.gif.GIFImageLoaderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/gym")
public class GymRestController {

    @Autowired
    private ICenterService centerService;

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        List<Center> centerList = centerService.getCenterList();
        if(centerList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(centerList, HttpStatus.OK);
    }

    @GetMapping("/findEmployee/{id}")
    public ResponseEntity<?> FindEmployee(@PathVariable("id") Integer id) {
        Employee employee = centerService.findEmployee(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @GetMapping("/findEmployeeList")
    public ResponseEntity<?> FindEmployeeList() {
        List<Employee> employeeList = centerService.findEmployeeList();
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }

    @GetMapping("/search/{name}/{employeeId}")
    public ResponseEntity<?> search(@PathVariable("name") String name, @PathVariable("employeeId") String employeeId) {
        if (name.equals("all")) {
            name = "";
        }
        if (employeeId.equals("all")) {
            employeeId = "";
        }
        List<Center> centerList = centerService.search(name,employeeId);
        return new ResponseEntity<>(centerList, HttpStatus.OK);
    }

    @DeleteMapping("/removeCenter/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
        centerService.removeById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<?> create(@PathVariable("id") Integer id,
                                    @RequestBody Center center
    ){
        Employee newEmployee = centerService.findEmployee(id);
        center.setEmployee(newEmployee);
        center.setDeleteStatus(0);
        centerService.create(center);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
