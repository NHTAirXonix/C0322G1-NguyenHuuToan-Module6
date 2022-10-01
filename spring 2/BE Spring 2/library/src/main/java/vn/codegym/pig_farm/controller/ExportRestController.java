package vn.codegym.pig_farm.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.projections.ExportDto;
import vn.codegym.pig_farm.entity.Employee;
import vn.codegym.pig_farm.entity.Export;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.repository.ExportRepository;
import vn.codegym.pig_farm.service.IExportService;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/export")
public class ExportRestController {

    @Autowired
    ExportRepository exportRepository;
    @Autowired
    IExportService iExportService;

    /**
     * Create by: DongLHP
     * Date create: 08/09/2022
     * Function: get all and search export in Database
     *
     * @return HttpStatus.NOT_FOUND
     * @return HttpStatus.OK
     * @param: pageable
     */
    @GetMapping("/page")
    public ResponseEntity<Page<ExportDto>> getListExport(@PageableDefault(value = 5) Pageable pageable,
                                                         @RequestParam Optional<String> codeExport,
                                                         @RequestParam Optional<String> company,
                                                         @RequestParam Optional<String> nameEmployee) {
        String code = codeExport.orElse("");
        String company1 = company.orElse("");
        String nameEmployee1 = nameEmployee.orElse("");
        if (code.equals("null")) {
            code = "";
        }
        if (company1.equals("null")) {
            company1 = "";
        }

        if (nameEmployee1.equals("null")) {
            nameEmployee1 = "";
        }
        Page<ExportDto> contactPage = iExportService.listAll(pageable, code, company1, nameEmployee1);

        return new ResponseEntity<>(contactPage, HttpStatus.OK);

    }

    /**
     * Create by: DongLHP
     * Date create: 08/09/2022
     * Function: delete export by Id
     *
     * @return HttpStatus.NOT_FOUND
     * @return HttpStatus.OK
     */
    @PostMapping("/delete")
    public ResponseEntity<Object> deleteExport(@RequestBody Map<String, Integer[]> ids) {
        iExportService.delete(ids.get("id"));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Created by : HoaL
     * Date create : 08/09/2022
     * Function : create item in Export
     * return exportDto
     */

    @PostMapping("/create")
    public ResponseEntity<Object> create(@Validated @RequestBody vn.codegym.pig_farm.dto.ExportDto exportDto, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        iExportService.create(exportDto);
        return new ResponseEntity<>(exportDto, HttpStatus.CREATED);
    }

    /**
     * Created by: HoaL
     * Date created: 08/09/2022
     * Function: update item in Export
     * return export1
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Export> update(@Validated @PathVariable("id") Integer id, @RequestBody vn.codegym.pig_farm.dto.ExportDto exportDto, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

        Export exportUpdate = iExportService.findById(id);

        if (exportUpdate == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Export export = new Export();
        BeanUtils.copyProperties(exportDto, export);
        export.setId(exportUpdate.getId());
        export.setEmployee(exportUpdate.getEmployee());
        export.setPigsty(exportUpdate.getPigsty());
        export.setEmployee(new Employee(exportDto.getEmployDto().getId()));
        export.setPigsty(new Pigsty(exportDto.getPigstyDto().getId()));
        iExportService.update(export);
        return new ResponseEntity<>(export, HttpStatus.OK);
    }

    @GetMapping("/totalWeightCount/{id}")
    public ResponseEntity<Object[]> totalWeightCount(@PathVariable("id") Integer id) {
        Object[] temp = {(exportRepository.countPigOnPigsty(id)), exportRepository.totalWeight(id)};
        return new ResponseEntity<>(temp, HttpStatus.OK);
    }

    @GetMapping("/show/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") Integer id) {
        Export export = iExportService.findById(id);
        if (export == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(export, HttpStatus.CREATED);
    }

    @GetMapping("/check/{code}")
    public ResponseEntity<Object> checkCode(@PathVariable("code") String code) {
        return new ResponseEntity<>(iExportService.existsCode(code), HttpStatus.OK);
    }
}
