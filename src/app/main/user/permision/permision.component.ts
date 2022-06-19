import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare const Validator:any,$:any;
@Component({
  selector: 'app-permission',
  templateUrl: './permision.component.html',
  styleUrls: ['./permision.component.css']
})
export class PermisionComponent implements OnInit {

  constructor(
    private notificationService:NotificationService,
    private utilityService:UtilityService,
    private DataService: DataService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }
  goBack() {
    this.router.navigate(['/main/user/index'])
  }

  userId: any

  user: any = {}

  permision: any

  perByUser: any = []

  insertUserPer(UserId: any, PermisionId: any) {
    let data = {
      UserId: UserId,
      PermisionId: PermisionId
    }
    this.DataService.POST('api/UserPermision/insert', data).subscribe(res => res)
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.DataService.GET('api/user/getById?id=' + this.userId).subscribe(
      (response) => {
        this.user = response
      }
    )

    this.DataService.GET('api/permision/getAll').subscribe(
      (response) => {
        this.permision = response
      }
    )

    this.DataService.GET('api/user/getPerByUser?id=' + this.userId).subscribe(
      (response: any) => {
        this.perByUser = response.map((res: any) => res.name)
      }
    )

    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [],
      onSubmit: (data: any) => {
        const _this = this
        var promise = new Promise(resolve => {
          this.DataService.DELETE('api/UserPermision/delete', 'id', this.userId).subscribe(
            (res) => {
              resolve(res)
            }
          )
        })
        promise.then(() => {
          if (data.permisionId) {
            let requests: any = [];
            data.permisionId.forEach((val: any) => {
              requests.push(_this.insertUserPer(this.userId, val))

            })
            Promise.all(requests).then((res: any) => {
              _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
            setTimeout(()=>{
              this.router.navigate(['/main/user/index'])
            }, 500)
            })
          }
          else {
            _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
            this.router.navigate(['/main/user/index'])
          }
        })


      }
    })
  }

}
