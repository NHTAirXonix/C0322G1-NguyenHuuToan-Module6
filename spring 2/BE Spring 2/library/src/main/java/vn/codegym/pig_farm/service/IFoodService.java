package vn.codegym.pig_farm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.pig_farm.entity.Food;
import vn.codegym.pig_farm.entity.Storage;

public interface IFoodService {
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
    Page<Food> getAllFood(Pageable pageable, String searchKeyWork);


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: create a food
     * @param food
     */
    void create(Food food);

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: update a food
     * @param food
     */

    void update(Food food);

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: finById a food
     * @param id
     * @return
     */

    Food findById(int id);



    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: finById a Storage
     * @param id
     * @return
     */

    Storage findByIdStorage(int id);


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: update a Storage
     * @param i
     * @param id
     */
    void updateStorage(double i, Integer id);

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: delete a Storage
     * @param i
     * @param id
     */
    void deleteStorage(double i, Integer id);
}
