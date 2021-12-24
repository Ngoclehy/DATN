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
  hocsinhs: any=[]
  giaoviens: any=[]
  backPage(){
    this.route.navigate(['/main/phieuthu/index'])
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.row',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenPhieuThu'),
        Validator.isRequired('#select_cat'),
        Validator.isRequired('#select_giaovien'),


      ],
      onSubmit: (data: any) => {
        data={
         // slug:this.utilityService.makeSeoTitle(data.tenHeHoc),
          ...data
        }
        this.DataService.POST('api/hocsinh/insert',data).subscribe((res:any)=>{
          this.notiService.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
          this.route.navigate(['/main/hocsinh/index'])
        },err=>this.notiService.alertErrorMS("Thông báo",'có lỗi xảy ra vui lòng thử lại'))
        console.log(data)
      }
    })
  }
  ngOnInit(): void {
    this.validate()
    this.DataService.GET('api/hocsinh/getAll').subscribe(
      (res:any)=>{
        this.hocsinhs=res
        console.log(this.hocsinhs)
      }
    )
    this.DataService.GET('api/giaovien/getAll').subscribe(
      (res:any)=>{
        this.giaoviens=res
        console.log(this.giaoviens)
      }
    )
  }

}
