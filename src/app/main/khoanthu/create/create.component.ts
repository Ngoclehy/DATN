import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
declare const Validator: any, $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private notiService: NotificationService,
    private fb: FormBuilder
  ) {}

  hehocList: any = [];

  form = this.fb.group({
    tenKhoanThu: ['', Validators.required],
    soTienThu: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
    heHoc: ['', Validators.required],
  });

  get tenKhoanThu() {
    return this.form.get('tenKhoanThu');
  }
  get soTienThu() {
    return this.form.get('soTienThu');
  }
  get heHoc() {
    return this.form.get('heHoc');
  }

  getHeHoc() {
    this.dataService.GET('api/hehoc/getAll').subscribe((res) => {
      this.hehocList = res;
    });
  }

  handleSubmit(formValue: FormGroup) {
    if (this.form.valid) {
      this.dataService.POST('api/khoanthu/insert', formValue).subscribe(() => {
        this.notiService.alertSuccessMS(
          'Thông báo',
          'Bạn đã thêm thành công khoản thu.'
        );
        this.router.navigate(['/main/khoanthu/index']);
        return;
      });
    } else {
      this.notiService.alertWarnMS(
        'Thông báo',
        'Vui lòng điền thông tin hợp lệ.'
      );
    }
  }

  ngOnInit(): void {
    this.getHeHoc();
  }
}
