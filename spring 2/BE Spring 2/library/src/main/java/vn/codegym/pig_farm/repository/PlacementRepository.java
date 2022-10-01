package vn.codegym.pig_farm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.codegym.pig_farm.entity.Placement;

import java.util.List;

public interface PlacementRepository extends JpaRepository<Placement, Integer> {

    /**
     * Created by : ChungHV
     * Date created : 9/8/2022
     * Function: show list placement
     *
     * @return :List<Placement>
     */
    @Query(value = "select * from placement", nativeQuery = true)
    List<Placement> findAllPlacement();
}
