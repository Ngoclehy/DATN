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
  $:any=document.querySelector.bind(document);
  hehocs = []

  constructor(private DataService:DataService,
    private utilityService:UtilityService,
  private route:Router,
  private notiService:NotificationService,) { }
  backPage(){
    this.route.navigate(['/main/hehoc/index'])
  }
  ngOnInit(): void {


    //this.DataService.GET('api/hehoc/getAll').subscribe(this.renderMenu)
    this.validate()


  }

  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenHeHoc'),
      ],
      onSubmit: (data: any) => {
        data={
         // slug:this.utilityService.makeSeoTitle(data.tenHeHoc),
          ...data
        }
        this.DataService.POST('api/hehoc/insert',data).subscribe((res:any)=>{
          this.notiService.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
          this.route.navigate(['/main/hehoc/index'])
        },err=>this.notiService.alertErrorMS("Thông báo",'có lỗi xảy ra vui lòng thử lại'))
      }
    })
  }
  // renderMenu(hehocs: any) {
  //   let html = '<option value="0">Mở chọn đê</option>'
  //   function buildMenu(items: any, saparate: string) {
  //     items.forEach((item: any) => {
  //       let temp = `<option value="${item.id_HeHoc}">${saparate} ${item.tenHeHoc}</option>`;
  //       html += temp
  //       if (item.children && item.children.length > 0) {
  //         buildMenu(item.children, saparate + '--|');
  //       }
  //     })
  //     return html
  //   }
  //   hehocs.forEach((val: any) => {
  //     val.children = []
  //     hehocs.forEach((val1: any) => {
  //       if (val.id_HeHoc == val1.parentId)
  //         val.children.push(val1)
  //     })
  //   })
  //   hehocs = hehocs.filter((val: any) => val.parentId == 0)
  //   $('#select_cat').html(buildMenu(hehocs, ''))
  // }

}


