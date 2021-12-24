import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
declare const Validator: any, $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private route: Router,
    private router: ActivatedRoute,
    private utilityService: UtilityService,

    private notiService: NotificationService,
    private dataService: DataService) { }
    hehoc: any = {};
    currentId = this.router.snapshot.paramMap.get('id')
    backPage(){
      this.route.navigate(['/main/hehoc/index'])
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
          data = {
            id_HeHoc: this.currentId,
           // slug: this.utilityService.makeSeoTitle(data.tenHeHoc),
            ...data
          }
          console.log(data)

          this.dataService.PUT('api/hehoc/update', data).subscribe((res: any) => {
            this.notiService.alertSuccessMS("thông báo", 'Bạn đã sửa thành công .')
            //this.getData()
            this.route.navigate(['/main/hehoc/index'])
          }, err => this.notiService.alertErrorMS("Thông báo", 'có lỗi xảy ra vui lòng thử lại'))
        }
      })
    }
    ngOnInit(): void {
      this.validate()
    this.getData()
  }
  getData() {
    this.dataService.GET("api/hehoc/getById?id=" + this.currentId).subscribe(
      (res: any) => {
        this.hehoc = res
        this.dataService.GET('api/hehoc/getAll').subscribe((data: any) => {
          data.forEach(
            (hehoc:any,i:any)=>{
              if(hehoc.id_HeHoc==this.currentId){
                data.splice(i,1)
              }

            }

          )
          this.renderMenu(data)

        })

      }
    )
  }
  renderMenu(hehocs: any) {
    let html = '<option value="0">Mở chọn đê</option>'
    let buildMenu = (items: any, saparate: string) => {
      items.forEach((item: any) => {
        let temp = `<option value="${item.id_HeHoc}">${saparate} ${item.tenHeHoc}</option>`;
        if (item.id_HeHoc == this.hehoc.id_HeHoc) {
          temp = `<option value="${item.id_HeHoc}" selected>${saparate} ${item.tenHeHoc}</option>`;
        }
        html += temp
        if (item.children && item.children.length > 0) {
          buildMenu(item.children, saparate + '--|');
        }
      })
      return html
    }
    hehocs.forEach((val: any) => {
      val.children = []
      hehocs.forEach((val1: any) => {
        if (val.id_HeHoc == val1.parentId)
          val.children.push(val1)
      })
    })
    hehocs = hehocs.filter((val: any) => val.parentId == 0)
    $('#select_cat').html(buildMenu(hehocs, ''))
  }
}
