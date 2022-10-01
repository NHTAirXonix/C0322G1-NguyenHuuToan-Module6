package vn.codegym.pig_farm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.pig_farm.entity.Advertisement;
import vn.codegym.pig_farm.dto.projections.AdvertisementDto;
import java.util.List;
import java.util.Optional;

public interface IAdvertisementService {

    /**
     * Created by :ChungHV
     * Date created : 9/8/2022
     * Function : Post advertisement
     */
    void saveAdvertisement(Advertisement advertisement);

    /**
     * Created by :ChungHV
     * Date created : 9/8/2022
     * Function : Update advertisement
     */
    void updateAdvertisement(Advertisement advertisement);

    /**
     * Created by :ChungHV
     * Date created : 9/8/2022
     * Function : FindById advertisement
     */
    Optional<Advertisement> findById(Integer id);

    /**
     * @param pageable
     * @param keySearch
     * @return List Advertisement, status 200
     * @function (Query to display all Advertisement and search)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    Page<AdvertisementDto> findAllAdvertisement(Pageable pageable, String keySearch);

    /**
     * @param ids
     * @function (Query to delete Advertisement)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    void delete(Integer[] ids);

    Boolean existsDate(String submittedDate);


    List<Advertisement> getAllAdvertisement();
}
