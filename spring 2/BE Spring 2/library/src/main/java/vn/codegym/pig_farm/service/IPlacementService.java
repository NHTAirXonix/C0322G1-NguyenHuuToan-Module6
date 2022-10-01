package vn.codegym.pig_farm.service;


import vn.codegym.pig_farm.entity.Placement;

import java.util.List;

public interface IPlacementService {

    /**
     * Created by : ChungHV
     * Date created : 9/8/2022
     * Function: show list placement
     * @return :List<Placement>
     */
    List<Placement> findAllPlacement();
}
