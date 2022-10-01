package vn.codegym.pig_farm.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.projections.TreatmentDto;
import vn.codegym.pig_farm.entity.Pig;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.entity.Treatment;
import vn.codegym.pig_farm.service.ITreatmentService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/public/api/treatment/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TreatmentRestController {
    @Autowired
    private ITreatmentService treatmentService;

    /**
     * create by TuongTK
     * date: 08/09/2022
     * create treatment
     *
     * @param treatmentDto
     * @return HttpStatus.OK : Http 200: ResponseEntity
     */
    @PostMapping("/create")
    public ResponseEntity<List<FieldError>> createTreatment(@RequestBody @Valid vn.codegym.pig_farm.dto.TreatmentDto treatmentDto) {
        Treatment treatment = new Treatment();
        BeanUtils.copyProperties(treatmentDto, treatment);
        Pig pig = new Pig();
        pig.setId(treatmentDto.getPig().getId());
        treatment.setPig(pig);
        this.treatmentService.save(treatment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Create by ThuanT
     * Date create: 08/09/2022
     * method: get All Treatment
     *
     * @return
     */
    @GetMapping("/")
    public ResponseEntity<Page<TreatmentDto>> getAllTreatment(@PageableDefault(value = 5) Pageable pageable, Optional<String> keySearch) {
        String title = keySearch.orElse("");
        if (title.equals("null")) {
            title = "";
        }
        Page<TreatmentDto> treatmentPage = treatmentService.getAllTreatment(pageable, title);
        if (treatmentPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(treatmentPage, HttpStatus.OK);
    }

    /**
     * Create by ThuanT
     * Date create: 08/09/2022
     * method: delete Treatment
     *
     * @param id
     * @return
     */

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> deleteTreatment(@PathVariable String id) {
        try {
            Integer.parseInt(id);
            TreatmentDto treatment = treatmentService.findById(Integer.parseInt(id));
            if (treatment == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            treatmentService.deleteByIdTreatment(Integer.parseInt(id));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/getListPig/{id}")
    public ResponseEntity<List<Pig>> getListPig(@PathVariable String id) {
        List<Pig> pigs = treatmentService.getListPig(id);
        if (pigs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>( pigs ,HttpStatus.OK);
    }

    @GetMapping(value = "/getListPigsty")
    public ResponseEntity<List<Pigsty>> getListPigsty() {
        List<Pigsty> pigsty = treatmentService.getListPigSty();
        if (pigsty.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>( pigsty ,HttpStatus.OK);
    }
}