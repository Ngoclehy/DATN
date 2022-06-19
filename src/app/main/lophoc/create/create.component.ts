import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';
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
  hehocs: any=[]
  backPage(){
    this.route.navigate(['/main/lophoc/index'])
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenLop'),
        Validator.isRequired('#select_cat'),


      ],
      onSubmit: (data: any) => {
        data={
         // slug:this.utilityService.makeSeoTitle(data.tenHeHoc),
          ...data
        }
        this.DataService.POST('api/lophoc/insert',data).subscribe((res:any)=>{
          this.notiService.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
          this.route.navigate(['/main/lophoc/index'])
        },err=>this.notiService.alertErrorMS("Thông báo",'có lỗi xảy ra vui lòng thử lại'))
        console.log(data)
      }
    })
  }

  ngOnInit(): void {
    this.validate()
    this.DataService.GET('api/hehoc/getAll').subscribe(
      (res:any)=>{
        this.hehocs=res
        console.log(this.hehocs)
      }
    )
  }

}
