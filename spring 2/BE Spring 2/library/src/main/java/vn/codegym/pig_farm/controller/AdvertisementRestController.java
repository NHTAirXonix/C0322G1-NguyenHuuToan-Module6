package vn.codegym.pig_farm.controller;

import lombok.ToString;
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
import vn.codegym.pig_farm.entity.Advertisement;
import vn.codegym.pig_farm.entity.Placement;
import vn.codegym.pig_farm.dto.projections.AdvertisementDto;
import vn.codegym.pig_farm.service.IAdvertisementService;
import vn.codegym.pig_farm.service.IPlacementService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/advertisement")
@ToString
public class AdvertisementRestController {
    @Autowired
    private IAdvertisementService advertisementService;

    @Autowired
    private IPlacementService placementService;

    @Autowired(required = false)
    private ModelMapper modelMapper;

    /**
     * Created by :ChungHV
     * Date create : 9/8/2022
     * Function : show list placement
     *
     * @return : Http.OK
     */
    @GetMapping("/list/placement")
    public ResponseEntity<List<Placement>> findAllPlacement() {
        return new ResponseEntity<>(placementService.findAllPlacement(), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Advertisement>> findAllAdvertisement() {
        return new ResponseEntity<>(advertisementService.getAllAdvertisement(), HttpStatus.OK);
    }

    /**
     * Created by :ChungHV
     * Date create : 9/8/2022
     * Function : Post Advertisement
     *
     * @param advertisementDto
     * @param bindingResult
     * @return : Http.BAD_REQUEST
     * @return : Http.OK
     */
    @PostMapping("/post")
    public ResponseEntity<Object> postAdvertisement(@RequestBody @Valid vn.codegym.pig_farm.dto.AdvertisementDto advertisementDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            Advertisement advertisement = new Advertisement();
            BeanUtils.copyProperties(advertisementDto, advertisement);
            advertisementService.saveAdvertisement(advertisement);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    /**
     * Created by :ChungHV
     * Date create : 9/8/2022
     * Function : Update Advertisement
     *
     * @param id
     * @param advertisementDto
     * @param bindingResult
     * @return : Http.NOT_FOUND
     * @return : Http.OK
     */
    @PutMapping("/edit/{id}")

    public ResponseEntity<Object> editAdvertisement(@PathVariable("id") Integer id, @RequestBody @Valid vn.codegym.pig_farm.dto.AdvertisementDto advertisementDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            return  new ResponseEntity<>(bindingResult.getAllErrors(),HttpStatus.NOT_FOUND);
        }
        Optional<Advertisement> advertisementUpdate = advertisementService.findById(id);
        if (!advertisementUpdate.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Advertisement advertisement = new Advertisement();
        BeanUtils.copyProperties(advertisementDto, advertisement);
        advertisement.setId(advertisementUpdate.get().getId());
        advertisementService.updateAdvertisement(advertisement);
        return new ResponseEntity<>(advertisement, HttpStatus.OK);

    }

    /**
     * Created by :ChungHV
     * Date create : 9/8/2022
     * Function : FindById Advertisement
     *
     * @param id
     * @return : Http.BAD_REQUEST
     * @return : Http.OK
     */

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        Optional<Advertisement> advertisement = advertisementService.findById(id);
        if (!advertisement.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(advertisement, HttpStatus.OK);
        }
    }

    /**
     * @param pageable
     * @param keySearch return List Advertisement, status 200
     * @function (Query to display all Advertisement and search)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    @GetMapping("/page")
    public ResponseEntity<Page<AdvertisementDto>> findAllAdvertisement(@PageableDefault(value = 5) Pageable pageable,
                                                                       @RequestParam Optional<String> keySearch) {
        String title = keySearch.orElse("");
        Page<AdvertisementDto> advertisementPage = advertisementService.findAllAdvertisement(pageable, title);
        if (advertisementPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(advertisementPage, HttpStatus.OK);
    }

    /**
     * @param ids return status 200
     * @function (Query to delete Advertisement)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    @PostMapping("/delete")
    private ResponseEntity<?> delete(@RequestBody Map<String, Integer[]> ids) {
        advertisementService.delete(ids.get("id"));
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/date/{date}")
    public ResponseEntity<?> checkDate(@PathVariable("date") String date) {
        return new ResponseEntity<>(advertisementService.existsDate(date), HttpStatus.OK);
    }
}
