import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Router } from '@angular/router';
declare const Validator:any,$:any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private notificationService:NotificationService,
    private DataService: DataService,
    private route:Router,) { }
    actions: any[]=[];
  ngOnInit(): void {
    this.allAction()
    Validator({
      form:"#form-1",
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name')
      ],
      onSubmit: (data: any) => {
        const _this = this
        this.DataService.POST('api/permision/insert', data).subscribe(
          function (response: any) {
            if (data.actionId) {
              let requests: any = [];
              data.actionId.forEach((val: any) => {
                requests.push(_this.insertPerAc(response.permisionId, val))
              })
              Promise.all(requests).then((res:any)=>{
                _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
                _this.route.navigate(['/main/permision/index'])
              })
            }
            else {
              _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
              _this.route.navigate(['/main/permision/index'])
            }
          }
        )
      }
    })
  }
  insertPerAc(permisionId: any, actionId: any) {
    let data = {
      permisionId: permisionId,
      actionId: actionId,
    }
    return new Promise((resolve, reject) => {
      this.DataService.POST('api/PermisionAction/InsertPermisionAction', data).subscribe(
        res => resolve(res)
      )
    })
  }
  allAction(){
    const _this=this
    this.DataService.GET('api/PermisionAction/getAllAction').subscribe(
      function(response:any)
      {
        response.forEach((res:any)=>{
          res.child=response.filter((re:any)=>re.parentId==res.actionId)
        })
        _this.actions=response.filter((res:any)=>res.parentId==0)
        console.log(_this.actions)
      }, error=>this.notificationService.alertErrorMS("Thông báo",error)
    )
  }
  backPage(){
    this.route.navigate(['/main/permision/index'])
  }

}
