import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private notiService: NotificationService,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    tenKhoanThu: ['', Validators.required],
    soTienThu: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
  });

  get tenKhoanThu() {
    return this.form.get('tenKhoanThu');
  }
  get soTienThu() {
    return this.form.get('soTienThu');
  }

  handleSubmit(formValue: FormGroup) {
    if (this.form.valid) {
      
      this.dataService.PUT('api/khoanthu/update', {
        ...formValue, 
        id_KhoanThu: this.route.snapshot.paramMap.get('id')
      }).subscribe(() => {
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

  ngOnInit() {
    this.dataService.GET('api/khoanthu/getById?id=' + this.route.snapshot.paramMap.get('id')).subscribe(
      (res: any) =>{
        if(res) {
          this.form = this.fb.group({
            tenKhoanThu: [res.tenKhoanThu, Validators.required],
            soTienThu: [res.soTienThu, [Validators.required, Validators.pattern('[1-9][0-9]*')]],
          });
        }
      }
    )
  }
}
