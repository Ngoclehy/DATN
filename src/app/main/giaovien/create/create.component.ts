import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
declare const Validator:any,$:any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private DataService:DataService,
    private utilityService:UtilityService,
  private route:Router,
  private notiService:NotificationService,) { }
  lops: any=[]
  backPage(){
    this.route.navigate(['/main/giaovien/index'])
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#hoTen'),
        Validator.isRequired('#gioiTinh'),


        Validator.isPhoneNumber('#sdt'),
        Validator.isRequired('#diaChi'),

     //   Validator.isRequired('#select_cat'),

      ],
      onSubmit: (data: any) => {
        data={
         // slug:this.utilityService.makeSeoTitle(data.tenHeHoc),
          ...data
        }
        this.DataService.POST('api/giaovien/insert',data).subscribe((res:any)=>{
          this.notiService.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
          this.route.navigate(['/main/giaovien/index'])
        },err=>this.notiService.alertErrorMS("Thông báo",'có lỗi xảy ra vui lòng thử lại'))
       // console.log(data)
      }
    })
  }

  ngOnInit(): void {
    this.DataService.GET('api/lophoc/getAll').subscribe(
      (res:any)=>{
        this.lops=res
        console.log(this.lops)
      }
    )

    this.validate()
  }

}
