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
    user: any = {};
    currentId = this.router.snapshot.paramMap.get('id')
    backPage(){
      this.route.navigate(['/main/user/index'])
    }
    validate() {
      Validator({
        form: '#form-1',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
          Validator.isRequired('#name'),
          Validator.isRequired('#email'),
          Validator.isRequired('#password'),
          Validator.isPhoneNumber('#phoneNumber'),
        ],
        onSubmit: (data: any) => {
          data = {
            userId: this.currentId,
           // slug: this.utilityService.makeSeoTitle(data.tenHeHoc),
            ...data
          }
          console.log(data)

          this.dataService.PUT('api/user/update', data).subscribe((res: any) => {
            this.notiService.alertSuccessMS("thông báo", 'Bạn đã sửa thành công .')
            //this.getData()
            this.route.navigate(['/main/user/index'])
          }, err => this.notiService.alertErrorMS("Thông báo", 'có lỗi xảy ra vui lòng thử lại'))
        }
      })
    }
    ngOnInit(): void {
      this.validate()
    this.getData()
  }
  getData() {
    this.dataService.GET("api/user/getById?id=" + this.currentId).subscribe(
      (res: any) => {
        this.user = res
        this.dataService.GET('api/user/getAll').subscribe((data: any) => {
          data.forEach(
            (user:any,i:any)=>{
              if(user.userId==this.currentId){
                data.splice(i,1)
              }

            }

          )
         // this.renderMenu(data)

        })

      }
    )
  }

}
