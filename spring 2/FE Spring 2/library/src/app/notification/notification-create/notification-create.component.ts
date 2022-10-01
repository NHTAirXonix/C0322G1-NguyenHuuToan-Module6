import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {NotificationService} from '../../service/notification.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {
  public editor = ClassicEditor;
  selectedImage: File = null;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  checkImgSize: boolean;
  check = true;
  buttonNotification = true;
  notificationForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    content: new FormControl('', Validators.required),
    dateSubmitted: new FormControl(Date())
  });

  constructor(private notificationService: NotificationService,
              private router: Router,
              private storage: AngularFireStorage,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle('Đăng thông báo');
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.notificationForm.patchValue({imageUrl: this.selectedImage.name});
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  submit() {
    console.log(this.notificationForm);
    if (this.selectedImage.name == null || this.notificationForm.invalid) {
      this.buttonNotification = true;
    } else {
      this.buttonNotification = false;
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const filePath = `news/${nameImg}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(`news/${nameImg}`, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.notificationForm.patchValue({image: url});
            console.log(url);
            console.log(this.notificationForm.value);
            this.notificationService.save(this.notificationForm.value).subscribe(
              () => {
                this.toast.success('Tạo mới thành công');
                this.router.navigateByUrl('/notification/list');
              },
              error => {
                this.toast.error('Tạo mới thất bại, xin hãy thử lại.');
              }
            );
          });
        })
      ).subscribe();
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  reset() {
    this.notificationForm = new FormGroup({
      image: new FormControl(''),
      title: new FormControl(''),
      content: new FormControl(''),
      dateSubmitted: new FormControl(Date())
    });
    this.selectedImage = null;
    this.regexImageUrl = false;
    this.editImageState = false;
    this.checkImg = false;
    this.checkImgSize = false;
  }
}
