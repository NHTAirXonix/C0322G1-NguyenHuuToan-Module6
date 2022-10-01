package vn.codegym.pig_farm.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.ContactDto;
import vn.codegym.pig_farm.entity.Contact;
import vn.codegym.pig_farm.service.IContactService;

import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/public")
public class  ContactRestController {
    @Autowired
    private IContactService contactService;

    /**
     * Create by PhucND
     * Date Create: 08/09/2022
     * This save
     *
     * Param contactDto
     */
    @PostMapping("/api/contact/create")
    public ResponseEntity<Object> save(@Valid @RequestBody ContactDto contactDto, BindingResult bindingResult) {
        new ContactDto().validate(contactDto, bindingResult);
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.BAD_REQUEST);
        } else {
            Contact contact = new Contact();
            BeanUtils.copyProperties(contactDto, contact);
            contact.setDate(java.time.LocalDate.now());
            contactService.save(contact);
            return new ResponseEntity<>(contact, HttpStatus.CREATED);
        }
    }

    /**
     * Create by TriPT
     * Date create: 08/09/2022
     * function: findAll Contact
     */
    @GetMapping("/api/contact/page")
    public ResponseEntity<Page<Contact>> findAllContact(@PageableDefault(value = 5) Pageable pageable,
                                                        Optional<String> nameSearch) {
        String name = nameSearch.orElse("");
        if (name.equals("null")) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Page<Contact> contactPage = contactService.getAll(pageable,name);
        if (contactPage.isEmpty()){
            return new ResponseEntity<>(contactPage,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contactPage,HttpStatus.OK);
    }

    /**
     * Create by : TriPT
     * Date created: 08/09/2022
     * function: find by id contact
     */
    @GetMapping("/api/contact/{id}")
    public ResponseEntity<Contact> findById(@PathVariable Integer id) {
        Contact contact = contactService.findByIdContact(id);
        if (contact == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }
    /**
     * Create by : TriPT
     * Date created: 08/09/2022
     * function: delete Contact
     */
    @PostMapping("/api/contact/delete")
    public ResponseEntity<Contact> delete(@RequestBody Map<String, Integer[]> ids) {
        contactService.deleteContact(ids.get("id"));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
