package vn.codegym.pig_farm.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.pig_farm.dto.projections.PigstyDto;
import vn.codegym.pig_farm.entity.Pigsty;

import java.util.List;

public interface IPigstyService {
    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: create a Pigsty
     *
     * @param pigsty
     */
    void createPigsty(Pigsty pigsty);

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: edit a Pigsty
     *
     * @param pigsty
     */
    void editPigsty(Pigsty pigsty);

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: get a Pigsty by id
     *
     * @param id
     * @return return a pigsty
     */
    PigstyDto getPigstyById(Integer id);

    List<Pigsty> getListPigsty();

    /**
     * Create by PhucND
     * Date Create: 08/09/2022
     * This findAll
     * Param search,pageable
     */
    Page<PigstyDto> findAll(Pageable pageable, String search);

    /**
     * Created by: DatVT
     * Date created: 08/09/2022
     * Function: listPigsty
     */
    List<Pigsty> listPigsty();

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: check code Pigsty exist
     *
     * @param code
     * @return
     */
    Boolean existsCode(String code);
}
