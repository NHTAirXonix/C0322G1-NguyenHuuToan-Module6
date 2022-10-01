package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.entity.Placement;
import vn.codegym.pig_farm.repository.PlacementRepository;
import vn.codegym.pig_farm.service.IPlacementService;

import java.util.List;

@Service
public class PlacementService implements IPlacementService {
    @Autowired
    private PlacementRepository placementRepository;

    /**
     * Created by : ChungHV
     * Date created : 9/8/2022
     * Function: show list placement
     * @return :List<Placement>
     */
    @Override
    public List<Placement> findAllPlacement() {
        return placementRepository.findAllPlacement();
    }
}
