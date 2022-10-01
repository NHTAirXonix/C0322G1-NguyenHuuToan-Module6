package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.entity.Food;
import vn.codegym.pig_farm.entity.Storage;
import vn.codegym.pig_farm.repository.FoodRepository;
import vn.codegym.pig_farm.repository.StorageRepository;
import vn.codegym.pig_farm.service.IFoodService;

@Service
public class FoodService implements IFoodService {
    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    StorageRepository storageRepository;

    /**
     * Create by HoanTV
     * Date: 16:30 pm  08-9-2022
     * method show list and search and paging
     * HoanTV-list-food
     *
     * @param pageable
     * @param searchKeyWork
     * @return
     */
    @Override
    public Page<Food> getAllFood(Pageable pageable, String searchKeyWork) {
        return foodRepository.getAllFood(pageable, "%" + searchKeyWork + "%");
    }

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: create a food
     *
     * @param food
     */
    @Override
    public void create(Food food) {
        foodRepository.save(food.getAmount(), food.getUnit(), food.getPigsty(), food.getStorage());
    }

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: update a food
     *
     * @param food
     */
    @Override
    public void update(Food food) {
        foodRepository.update(food.getAmount(), food.getUnit(), food.getPigsty(), food.getStorage(), food.getId());
    }

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: finById a food
     *
     * @param id
     * @return
     */
    @Override
    public Food findById(int id) {
        return foodRepository.findById(id);
    }

    @Override
    public Storage findByIdStorage(int id) {
        return storageRepository.findByIdStorage(id);
    }

    @Override
    public void updateStorage(double i, Integer id) {
        storageRepository.updateAmountStorage(i, id);
    }


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: deleteStorage
     *
     * @param id
     * @return
     */
    @Override
    public void deleteStorage(double i, Integer id) {
        storageRepository.deleteStorage(i,id);
    }
}
