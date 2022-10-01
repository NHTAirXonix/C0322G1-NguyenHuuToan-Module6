package vn.codegym.pig_farm.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.PigDto;
import vn.codegym.pig_farm.entity.Pig;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.service.IPigService;
import vn.codegym.pig_farm.service.IPigstyService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PigRestController {

    @Autowired
    private IPigService pigService;
    @Autowired
    private IPigstyService pigstyService;

    @Autowired
    private ModelMapper modelMapper;


    /**
     * Create by: DatVT
     * Date Create: 08/09/2022
     * function: Quantity item in pig
     *
     * @param id
     */

    @GetMapping("/quantity")
    public ResponseEntity<Integer> getQuantityPigsty(@RequestParam Integer id) {
        Integer quantity = pigService.quantity(id);
        return new ResponseEntity<>(quantity, HttpStatus.OK);
    }

    /**
     * Create by: DatVT
     * Date Create: 08/09/2022
     * function: Create item in pig
     *
     * @param pigDTO
     */
    @PostMapping("/create")
    public ResponseEntity<?> createPig(@RequestBody @Valid PigDto pigDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.BAD_REQUEST);
        } else {
            Pig pig = new Pig();
            BeanUtils.copyProperties(pigDTO, pig);
            pigService.createPig(pig);
            return new ResponseEntity<>(pig, HttpStatus.CREATED);
        }
    }

    /**
     * Create by: DatVT
     * Date Create: 08/09/2022
     * function: Update item in pig
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePig(@PathVariable("id") Integer id, @RequestBody @Valid PigDto pigDTO) {
        Pig pig = modelMapper.map(pigDTO, Pig.class);
        pigService.updatePig(id, pig);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * @param pageable
     * @param codeSearch
     * @param dateInSearch
     * @param statusSearch
     * @return pig, status 200
     * @function (display all Pig and search)
     * @creator LamNT
     * @date-create 08/09/2022
     */

    @GetMapping("/page")
    public ResponseEntity<Page<vn.codegym.pig_farm.dto.projections.PigDto>> listAll(@PageableDefault(5) Pageable pageable, @RequestParam Optional<String> codeSearch, @RequestParam Optional<String> dateInSearch, @RequestParam Optional<String> statusSearch) {
        {
            String code = codeSearch.orElse("");
            String dateIn = dateInSearch.orElse("");
            String status = statusSearch.orElse("");
            if (code.equals("null")) {
                code = "";
            }
            if (dateIn.equals("null")) {
                dateIn = "";
            }
            if (status.equals("null")) {
                status = "";
            }
            Page<vn.codegym.pig_farm.dto.projections.PigDto> pigs = pigService.findAllPig(pageable, code, dateIn, status);
            if (pigs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(pigs, HttpStatus.OK);
        }
    }

    /**
     * @param ids
     * @return
     * @function (delete Pig by Id)
     * @creator LamNT
     * @date-create 08/09/2022
     */

    @PostMapping("/id")
    public ResponseEntity<vn.codegym.pig_farm.dto.projections.PigDto> delete(@RequestBody Map<String, Integer[]> ids) {
        pigService.delete(ids.get("id"));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Create by: DatVT
     * Date Create: 13/09/2022
     * funtion: findById item in pig
     *
     * @param id
     * @return
     */
    @GetMapping(value = "list/{id}")
    public ResponseEntity<Pig> findById(@PathVariable("id") Integer id) {
        Pig pig = pigService.findById(id);
        if (pig == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pig, HttpStatus.OK);
    }

    /**
     * Create by: DatVT
     * Date Create: 13/09/2022
     * funtion: findAllPigsty item in pigsty
     *
     * @return
     */
    @GetMapping(value = "list/pigsty")
    public ResponseEntity<List<Pigsty>> getListPigsty() {
        List<Pigsty> pigsty = pigstyService.listPigsty();
        if (pigsty.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(pigsty, HttpStatus.OK);
    }

    /**
     * Create by: DatVT
     * Date Create: 14/09/2022
     * funtion: checkCode
     *
     * @return
     */
    @GetMapping("/check/{code}")
    public ResponseEntity<?> checkCode(@PathVariable("code") String code) {
        return new ResponseEntity<>(pigService.existsCode(code), HttpStatus.OK);
    }
}