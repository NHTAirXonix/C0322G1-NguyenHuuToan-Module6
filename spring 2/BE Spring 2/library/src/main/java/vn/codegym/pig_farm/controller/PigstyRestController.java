package vn.codegym.pig_farm.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.projections.EmployeeDto;
import vn.codegym.pig_farm.dto.projections.PigstyDto;
import vn.codegym.pig_farm.entity.Employee;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.service.IEmployeeService;
import vn.codegym.pig_farm.service.IPigstyService;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/pigsty")
public class PigstyRestController {
    @Autowired
    IPigstyService iPigstyService;

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: create a Pigsty
     *
     * @param pigstyDto
     * @return if created pigsty return HttpStatus.CREATED(201)
     */
    @PostMapping("/createPigsty")
    public ResponseEntity<Pigsty> createPigsty(@Valid @RequestBody vn.codegym.pig_farm.dto.PigstyDto pigstyDto, BindingResult bindingResult) {

        pigstyDto.validate(pigstyDto, bindingResult);
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Pigsty pigsty = new Pigsty();
        BeanUtils.copyProperties(pigstyDto, pigsty);
        if (pigstyDto.getBuildDate() != null && pigstyDto.getBuildDate() != "") {
            pigsty.setBuildDate(LocalDate.parse(pigstyDto.getBuildDate()));
        }
        pigsty.setCreationDate(LocalDate.parse(pigstyDto.getCreationDate()));
        pigsty.setEmployee(new Employee(pigstyDto.getEmployee().getId()));
        this.iPigstyService.createPigsty(pigsty);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Created by: HieuCD
     * Date created: 09/09/2022
     * function: get a Pigsty by id
     *
     * @param id
     * @return HTTP status OK : return pigsty
     * HTTP status NO_CONTENT : return pigsty=null
     * HTTP status NOT_FOUND : return pigstyId =null
     */
    @GetMapping("/getPigstyById/{id}")
    public ResponseEntity<PigstyDto> getPigstyById(@PathVariable Integer id) {
        PigstyDto pigsty = this.iPigstyService.getPigstyById(id);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (pigsty == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(pigsty, HttpStatus.OK);
    }

    /**
     * Created by: HieuCD
     * Date created: 09/09/2022
     * function: edit a Pigsty
     *
     * @param pigstyDto
     * @return if edited return Http status OK
     */
    @PatchMapping("/editPigsty")
    public ResponseEntity<Pigsty> editPigsty(@Valid @RequestBody vn.codegym.pig_farm.dto.PigstyDto pigstyDto, BindingResult bindingResult) {
        pigstyDto.validate(pigstyDto, bindingResult);
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Pigsty pigsty = new Pigsty();
        BeanUtils.copyProperties(pigstyDto, pigsty);
        if (pigstyDto.getBuildDate() != null && pigstyDto.getBuildDate() != "") {
            pigsty.setBuildDate(LocalDate.parse(pigstyDto.getBuildDate()));
        }
        pigsty.setCreationDate(LocalDate.parse(pigstyDto.getCreationDate()));
        pigsty.setEmployee(new Employee(pigstyDto.getEmployee().getId()));
        this.iPigstyService.editPigsty(pigsty);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * pigsty
     * Created by: HieuCD
     * Date created: 16/09/2022
     * function: get List of
     *
     * @return
     */
    @GetMapping("/getList")
    public ResponseEntity<List<Pigsty>> getListPigsty() {
        List<Pigsty> pigstyList = this.iPigstyService.getListPigsty();
        if (pigstyList.isEmpty()) {
            return new ResponseEntity<>(pigstyList, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(pigstyList, HttpStatus.OK);
    }

    /**
     * Create by PhucND
     * Date Create: 08/09/2022
     * This findAll
     * <p>
     * Param search
     */
    @GetMapping("/list")
    public ResponseEntity<Page<vn.codegym.pig_farm.dto.projections.PigstyDto>> findAll(@RequestParam(value = "search", defaultValue = "") String search, @PageableDefault(5) Pageable pageable) {
        return new ResponseEntity<>(iPigstyService.findAll(pageable, search), HttpStatus.OK);
    }

    /**
     * Created by: HieuCD
     * Date created: 16/09/2022
     * function: check code pigsty exist
     *
     * @param code
     * @return
     */
    @GetMapping("/checkCode/{code}")
    public ResponseEntity<?> checkCode(@PathVariable("code") String code) {
        return new ResponseEntity<>(iPigstyService.existsCode(code), HttpStatus.OK);
    }
}
