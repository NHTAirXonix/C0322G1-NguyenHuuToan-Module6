import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Placement} from '../../model/placement';
import {Advertisement} from '../../model/advertisement';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AdvertisementService} from '../../service/advertisement.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-advertisement-post',
  templateUrl: './advertisement-post.component.html',
  styleUrls: ['./advertisement-post.component.css']
})
export class AdvertisementPostComponent implements OnInit {
  formAdvertisement: FormGroup;
  selectedImage: File = null;
  placementList: Placement[];
  advertisement: Advertisement[];
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  buttonAdvertisementStatus = true;
  page: number;
  titleSearch: string;
  isExistDate = false;

  constructor(private route: Router,
              private toast: ToastrService,
              private placementService: AdvertisementService,
              private storage: AngularFireStorage,
              private ads: AdvertisementService,
              private title: Title) {
    this.title.setTitle(' Đăng quảng cáo ');
  }

  ngOnInit(): void {

    this.placementService.getListPlacement().subscribe(next => {
      this.placementList = next;
    });
    this.formAdvertisement = new FormGroup({
      // tslint:disable-next-line:max-line-length
      title: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{2,50}')]),
      image: new FormControl(''),
      // tslint:disable-next-line:max-line-length
      submittedDate: new FormControl('', [Validators.required, this.checkDate]),
      timeExistence: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      placement: new FormControl('', Validators.required)
    });

  }

  checkDateTime($event: Event) {
    this.ads.checkDate(String($event)).subscribe(value => {
        if (value) {
          this.isExistDate = true;
        } else {
          this.isExistDate = false;
        }
      }
    );
  }

  checkDate(abstractControl: AbstractControl): any {
    const date = new Date(abstractControl.value);
    const now = new Date();
    if (date > now) {
      return null;
    } else {
      return {date: true};
    }
    for (const a of this.advertisement) {
      if (a.submittedDate === abstractControl.value.submittedDate) {
        return {duplicateDate: true};
      }
    }
    return null;

  }

  submit() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `advertisement/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        this.buttonAdvertisementStatus = false;
        fileRef.getDownloadURL().subscribe((url) => {
          this.formAdvertisement.patchValue({image: url});
          this.placementService.save(this.formAdvertisement.value).subscribe(
            () => {
              this.route.navigateByUrl('/advertisement/page');
              this.toast.success('Đăng quảng cáo thành công');
            },
            error => {
              this.toast.error('Đăng quảng cáo thất bại');
            }
          );
        });
      })
    ).subscribe();
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
    this.formAdvertisement.patchValue({imageUrl: this.selectedImage.name});
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

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }
}
