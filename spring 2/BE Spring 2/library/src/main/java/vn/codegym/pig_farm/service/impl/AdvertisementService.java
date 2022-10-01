package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.dto.projections.AdvertisementDto;
import vn.codegym.pig_farm.entity.Advertisement;
import vn.codegym.pig_farm.repository.AdvertisementRepository;
import vn.codegym.pig_farm.service.IAdvertisementService;

import java.util.List;
import java.util.Optional;

@Service
public class AdvertisementService implements IAdvertisementService {
    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Override
    public List<Advertisement> getAllAdvertisement() {
        return advertisementRepository.getAllAdvertisement();
    }

    /**
     * Created by : ChungHV
     * Date create : 9/8/2022
     * Function : Post Advertisement
     *
     * @param advertisement
     */
    @Override
    public void saveAdvertisement(Advertisement advertisement) {
        advertisementRepository.saveAdvertisement(advertisement.getImage(), advertisement.getSubmittedDate(), advertisement.getTimeExistence(), advertisement.getTitle(), advertisement.getPlacement().getId());
    }

    /**
     * Created by : ChungHV
     * Date create : 9/8/2022
     * Function : Update Advertisement
     *
     * @param advertisement
     */
    @Override
    public void updateAdvertisement(Advertisement advertisement) {
        advertisementRepository.updateAdvertisement(advertisement.getImage(), advertisement.getSubmittedDate(), advertisement.getTimeExistence(), advertisement.getTitle(), advertisement.getPlacement().getId(), advertisement.getId());
    }

    /**
     * Created by : ChungHV
     * Date create : 9/8/2022
     * Function : FindById Advertisement
     *
     * @param id
     * @return :Optional<Advertisement>
     */
    @Override
    public Optional<Advertisement> findById(Integer id) {
        return advertisementRepository.findById(id);
    }

    /**
     * @param pageable
     * @param keySearch
     * @return List Advertisement, status 200
     * @function (Query to display All Advertisement and search)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    @Override
    public Page<AdvertisementDto> findAllAdvertisement(Pageable pageable, String keySearch) {
        return advertisementRepository.findAllAdvertisement(pageable, "%" + keySearch + "%");
    }


    /**
     * @param ids
     * @function (Query to delete Advertisement)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    @Override
    public void delete(Integer[] ids) {
        for (Integer id : ids) {
            advertisementRepository.deleteAdvertisement(id);
        }
    }

    @Override
    public Boolean existsDate(String submittedDate) {
        return submittedDate.equals(advertisementRepository.existDate(submittedDate));
    }
}
