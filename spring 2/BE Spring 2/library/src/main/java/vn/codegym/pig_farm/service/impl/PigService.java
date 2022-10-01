package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.dto.projections.PigDto;
import vn.codegym.pig_farm.entity.Pig;
import vn.codegym.pig_farm.repository.PigRepository;
import vn.codegym.pig_farm.service.IPigService;

import java.util.Optional;

@Service
public class PigService implements IPigService {
    @Autowired
    private PigRepository pigRepository;

    /**
     * Created by: DatVT
     * Date created: 08/09/2022
     * Function: findById
     */
    @Override
    public Pig findById(Integer id) {
        return pigRepository.findByIdPig(id);
    }

    /**
     * Created by: DatVT
     * Date created: 08/09/2022
     * Function: createPig
     */
    @Override
    public void createPig(Pig pig) {
        pigRepository.createPig(pig.getCode(), pig.getDateIn(), pig.getDateOut(), pig.getStatus(), pig.getWeight(), pig.getPigsty().getId());

    }

    /**
     * Created by: DatVT
     * Date created: 08/09/2022
     * Function: updatePig
     */
    @Override
    public void updatePig(Integer id, Pig pig) {
        pigRepository.updatePig(pig.getCode(), pig.getDateIn(), pig.getDateOut(), pig.getStatus(), pig.getWeight(), pig.getPigsty(), pig.getId());
    }

    @Override
    public Integer quantity(Integer id) {
        return pigRepository.countPigOnPigsty(id);
    }


    /**
     * @param pageable
     * @param code
     * @param dateIn
     * @param status
     * @return pig, status 200
     * @function (display all Pig and search)
     * @creator LamNT
     * @date-create 08/09/2022
     */

    @Override
    public Page<PigDto> findAllPig(Pageable pageable, String code, String dateIn, String status) {
        return pigRepository.findAllPig(pageable, "%" + code + "%", "%" + dateIn + "%", "%" + status + "%");
    }

    /**
     * @param ids
     * @return pig, status 200
     * @function (delete Pig by id)
     * @creator LamNT
     * @date-create 08/09/2022
     */

    @Override
    public void delete(Integer[] ids) {
        for (Integer id : ids) {
            pigRepository.delete(id);
        }
    }

    /**
     * @param id
     * @return pig, status 200
     * @function (find Pig by id)
     * @creator LamNT
     * @date-create 08/09/2022
     */

    @Override
    public Optional<Pig> findById(int id) {
        return pigRepository.findByIdPig(id);
    }

    /**
     * Created by: DatVT
     * Date created: 14/09/2022
     * Function: existsCode
     */
    @Override
    public Boolean existsCode(String code) {
        return code.equals(pigRepository.exitCode(code));
    }
}
