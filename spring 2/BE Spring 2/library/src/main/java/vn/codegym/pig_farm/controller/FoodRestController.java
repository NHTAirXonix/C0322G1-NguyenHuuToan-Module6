package vn.codegym.pig_farm.controller;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.FoodDto;
import vn.codegym.pig_farm.entity.Food;
import vn.codegym.pig_farm.entity.Storage;
import vn.codegym.pig_farm.service.IFoodService;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/public/api/food")
public class FoodRestController {
    @Autowired
    private IFoodService iFoodService;

    /**
     * Create by HoanTV
     * Date: 16:30 pm  08-9-2022
     * method show list and search and paging
     * HoanTV-list-food
     * @param foodType
     * @param page
     * @param size
     * @param sort
     * @return
     */
    @GetMapping("/list")
    public ResponseEntity<Page<Food>> getAllFood(Optional<String> foodType,
                                                 @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
                                                 @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
                                                 @RequestParam(name = "sort", required = false, defaultValue = "id") String sort) {
        Sort sortable = getSort(sort);
        Pageable pageable = PageRequest.of(page, size, sortable);
        String searchKeyWork = foodType.orElse("");
        Page<Food> iFoodPage = this.iFoodService.getAllFood(pageable, searchKeyWork);
        if (iFoodPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(iFoodPage, HttpStatus.OK);
    }

    @NotNull
    private Sort getSort(String sort) {
        Sort sortable;
        switch (sort) {
            case "amount,asc":
                sortable = Sort.by(Sort.Order.asc("amount"));
                break;
            case "amount,desc":
                sortable = Sort.by(Sort.Order.desc("amount"));
                break;
            case "unit,asc":
                sortable = Sort.by(Sort.Order.asc("unit"));
                break;
            case "unit,desc":
                sortable = Sort.by(Sort.Order.desc("unit"));
                break;
            case "storage.food_type,asc":
                sortable = Sort.by(Sort.Order.asc("s.food_type"));
                break;
            case "storage.food_type,desc":
                sortable = Sort.by(Sort.Order.desc("s.food_type"));
                break;
            default:
                sortable = Sort.by(Sort.Order.asc("id"));
                break;
        }
        return sortable;
    }

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: create a food
     *
     * @param foodDto
     * @return if created food return HttpStatus.CREATED(201)
     */
    @PostMapping("/create")
    public ResponseEntity<Object> add(@Validated @RequestBody FoodDto foodDto, BindingResult bindingResult) {
        if (foodDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.NOT_FOUND);
        }
        Food food = new Food();
        Storage storage = iFoodService.findByIdStorage(foodDto.getStorage().getId());
        double amountSet = storage.getAmount() - foodDto.getAmount();
        if (amountSet < 0) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.NOT_FOUND);
        }
        BeanUtils.copyProperties(foodDto, food);
        food.setAmount(foodDto.getAmount());
        food.setUnit(foodDto.getUnit());
        food.setStorage(foodDto.getStorage());
        food.setPigsty(foodDto.getPigsty());
        iFoodService.create(food);
        if (amountSet == 0) {
            iFoodService.deleteStorage(1, storage.getId());
        }
        iFoodService.updateStorage(amountSet, storage.getId());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: edit a food
     *
     * @param foodDto
     * @return if created food return HttpStatus.CREATED(201)
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") Integer id, @Validated @RequestBody FoodDto foodDto, BindingResult bindingResult) {
        Food foods = iFoodService.findById(id);
        if (foods == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        Double foodsAmount = foods.getAmount();
        double amountSet;
        foods.setStorage(foodDto.getStorage());
        Storage storage = iFoodService.findByIdStorage(foods.getStorage().getId());
        amountSet = storage.getAmount() + foodsAmount;
        if (amountSet < foodDto.getAmount() || foodDto.getAmount() < 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            foods.setAmount(foodDto.getAmount());
            foods.setUnit(foodDto.getUnit());
            foods.setPigsty(foodDto.getPigsty());
            iFoodService.update(foods);
            iFoodService.updateStorage(amountSet - foods.getAmount(), storage.getId());
            if (amountSet - foods.getAmount() == 0) {
                iFoodService.deleteStorage(1, storage.getId());
            }else {
                iFoodService.deleteStorage(0, storage.getId());
            }
            return new ResponseEntity<>(foods, HttpStatus.OK);
        }
    }


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: show a food
     *
     * @return if created food return HttpStatus.CREATED(201)
     */
    @GetMapping("/show/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") Integer id) {
        Food foods = iFoodService.findById(id);
        if (foods == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(foods, HttpStatus.CREATED);
    }
}