package vn.codegym.pig_farm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.pig_farm.dto.projections.ExportDto;
import vn.codegym.pig_farm.entity.Export;

public interface IExportService {

    /**
     * Create by: DongLHP
     * Date create: 08/09/2022
     * Function: get all export pork
     * @Param: pageable
     * @return
     */

    Page<ExportDto> listAll(Pageable pageable, String codeExport, String company, String nameEmployee);


    /**
     * Create by: DongLHP
     * Date create: 08/09/2022
     * Function: delete export pork
     * @Param: export
     */
    void delete(Integer[] ids);


    /**
     * Created by: HoaL
     * Date created: 08/09/2022
     * Function: create
     */
    void create(vn.codegym.pig_farm.dto.ExportDto exportDto);

    /**
     * Created by: HoaL
     * Date created: 08/09/2022
     * Function: update
     */
    void update(Export export);

    /**
     * Created by: HoaL
     * Date created: 08/09/2022
     * Function: findById
     *
     */
    Export findById(int id);


    /**
     * Created by: HoaL
     * Date created: 15/09/2022
     * Function: existsCode
     *
     */
    Boolean existsCode(String codeExport);
}
