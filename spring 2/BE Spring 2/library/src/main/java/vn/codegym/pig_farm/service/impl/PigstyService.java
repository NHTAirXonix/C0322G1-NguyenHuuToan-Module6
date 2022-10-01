package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.dto.projections.PigstyDto;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.repository.PigstyRepository;
import vn.codegym.pig_farm.service.IPigstyService;

import java.util.List;

@Service
public class PigstyService implements IPigstyService {
    @Autowired
    private PigstyRepository pigstyRepository;

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: create a Pigsty
     *
     * @param pigsty
     */
    @Override
    public void createPigsty(Pigsty pigsty) {
        this.pigstyRepository.createPigsty(pigsty);
    }

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: edit a Pigsty
     *
     * @param pigsty
     */
    @Override
    public void editPigsty(Pigsty pigsty) {
        this.pigstyRepository.editPigsty(pigsty);
    }

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: get a Pigsty by id
     *
     * @param id
     * @return return a pigsty
     */
    @Override
    public PigstyDto getPigstyById(Integer id) {
        return this.pigstyRepository.getPigstyById(id);
    }

    @Override
    public List<Pigsty> getListPigsty() {
        return pigstyRepository.findAll();
    }

    /**
     * Create by PhucND
     * Date Create: 08/09/2022
     * This findAll
     * <p>
     * Param search,pageable
     */
    @Override
    public Page<PigstyDto> findAll(Pageable pageable, String search) {
        return pigstyRepository.findAll(pageable, "%" + search + "%");

    }

    @Override
    public List<Pigsty> listPigsty() {
        return pigstyRepository.findALLPigsty();
    }

    /**
     * Created by: HieuCD
     * Date created: 08/09/2022
     * function: check code Pigsty exist
     *
     * @param code
     * @return
     */
    @Override
    public Boolean existsCode(String code) {
        List<String> codeList = pigstyRepository.checkExistsCode();
        for (String item: codeList) {
            if (code.equals(item)){
                return false;
            }
        }
        return true;
    }
}
