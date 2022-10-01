import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../service/contact.service';
import {Contact} from '../../model/contact';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  contactForm: FormGroup;
  success = false;
  submit = false;

  constructor(private contactService: ContactService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/g)]],
      address: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  save() {
    this.submit = true;
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      this.contactService.save(contact).subscribe(next => {
        this.submit = false;
        document.getElementById('closeModal').click();
        document.getElementById('button-modal-success').click();
        this.initContactForm();
      });
    }
  }

  changSuccess() {
    if (this.success === true) {
      this.initContactForm();
      this.success = false;
    }
  }
}
