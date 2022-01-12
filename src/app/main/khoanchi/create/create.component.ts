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
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    private notiService: NotificationService,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    tenKhoanChi: ['', Validators.required],
    soTienChi: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
  });

  get tenKhoanChi() {
    return this.form.get('tenKhoanChi');
  }
  get soTienChi() {
    return this.form.get('soTienChi');
  }
  handleSubmit(formValue: FormGroup) {
    if (this.form.valid) {
      this.dataService
        .POST('api/khoanchi/insert', formValue)
        .subscribe(() => {
          this.notiService.alertSuccessMS(
            'Thông báo',
            'Bạn đã thêm thành công khoản thu.'
          );
          this.router.navigate(['/main/khoanchi/index']);
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
  }

}
