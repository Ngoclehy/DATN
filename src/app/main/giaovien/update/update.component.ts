import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
declare const Validator: any, $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private utilityService: UtilityService,

    private notiService: NotificationService,
    private dataService: DataService
  ) {}
  giaovien: any = {};
  lops: any = [];
  currentId = this.router.snapshot.paramMap.get('id');
  backPage() {
    this.route.navigate(['/main/giaovien/index']);
  }
  getData() {
    this.dataService
      .GET('api/giaovien/getById?id=' + this.currentId)
      .subscribe((res: any) => {
        this.giaovien = res;
        this.dataService.GET('api/hocsinh/getAll').subscribe((data: any) => {
          data.forEach((hocsinh: any, i: any) => {
            if (hocsinh.id_HocSinh == this.currentId) {
              data.splice(i, 1);
            }
          });
          // this.renderMenu(data)
        });
      });
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#hoTen'),
        Validator.isRequired('#gioiTinh'),
        Validator.isRequired('#diaChi'),
        Validator.isPhoneNumber('#SoDienThoai'),
      //  Validator.isRequired('#select_cat'),
      ],
      onSubmit: (data: any) => {
        data = {
          id_GiaoVien: this.currentId,
          // slug:this.utilityService.makeSeoTitle(data.tenHeHoc),
          ...data,
        };
        this.dataService.PUT('api/giaovien/update', data).subscribe(
          (res: any) => {
            this.notiService.alertSuccessMS(
              'th??ng b??o',
              'B???n ???? th??m th??nh c??ng .'
            );
            this.route.navigate(['/main/giaovien/index']);
          },
          (err) =>
            this.notiService.alertErrorMS(
              'Th??ng b??o',
              'c?? l???i x???y ra vui l??ng th??? l???i'
            )
        );
        console.log(data);
      },
    });
  }

  ngOnInit(): void {
    console.log(this.currentId);
    this.validate();
    this.getData();
    this.dataService.GET('api/lophoc/getAll').subscribe((res: any) => {
      this.lops = res;
      //console.log(this.lops)
    });
  }
}
