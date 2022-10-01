package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.dto.projections.StorageDto;
import vn.codegym.pig_farm.entity.Storage;
import vn.codegym.pig_farm.repository.StorageRepository;
import vn.codegym.pig_farm.service.IStorageService;

import java.util.List;

@Service
public class StorageService implements IStorageService {
    @Autowired
    StorageRepository storageRepository;

    /**
     * Created by: HoangDT
     * Date created: 08/09/2022
     * Function: findAll
     */

    @Override
    public Page<StorageDto> findAll(Pageable pageable, String keyWord) {
        return storageRepository.findAllStorage(pageable,"%" + keyWord + "%");
    }

    /**
     * Created by: HoangDT
     * Date created: 08/09/2022
     * Function: createStorage
     */

    @Override
    public void save(Storage storage) {
        storageRepository.saveS(storage.getAmount(), storage.getFoodType(), storage.getDate(), storage.getUnit());
    }

    @Override
    public List<Storage> findAllS() {
        return storageRepository.storageList();
    }

}
