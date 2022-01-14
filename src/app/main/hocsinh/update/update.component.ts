import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
declare const Validator: any, $: any;@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private route: Router,
    private router: ActivatedRoute,
    private notiService: NotificationService,
    private dataService: DataService) { }
    hocsinh: any = {};
    lops:any=[];
    currentId = this.router.snapshot.paramMap.get('id')
    backPage(){
      this.route.navigate(['/main/hocsinh/index'])
    }
    getData() {
    this.dataService.GET("api/hocsinh/getById?id=" + this.currentId).subscribe(
      (res: any) => {
        this.hocsinh = res
        this.dataService.GET('api/hocsinh/getAll').subscribe((data: any) => {
          data.forEach(
            (hocsinh:any,i:any)=>{
              if(hocsinh.id_HocSinh==this.currentId){
                data.splice(i,1)
              }
            }

          )
         // this.renderMenu(data)

        })

      }
    )
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#hoTen'),
        Validator.isRequired('#gioiTinh'),
        Validator.isRequired('#namSinh'),
        Validator.isRequired('#tenPhuHuynh'),
        Validator.isPhoneNumber('#sdt'),
        Validator.isRequired('#diaChi'),
        Validator.isRequired('#ngayDangKyHoc'),
        Validator.isRequired('#select_cat'),

      ],
      onSubmit: (data: any) => {
        data={
          id_HocSinh: this.currentId,
         // slug:this.utilityService.makeSeoTitle(data.tenHeHoc),
          ...data
        }
        console.log(data)
        this.dataService.PUT('api/hocsinh/update',data).subscribe((res:any)=>{
          this.notiService.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
          this.route.navigate(['/main/hocsinh/index'])
        },err=>this.notiService.alertErrorMS("Thông báo",'có lỗi xảy ra vui lòng thử lại'))

      }

    })
  }
  ngOnInit(): void {
    this.validate()
    this.getData()
    this.dataService.GET('api/lophoc/getAll').subscribe(
      (res:any)=>{
        this.lops=res
        //console.log(this.lops)
      }
    )
  }

}
