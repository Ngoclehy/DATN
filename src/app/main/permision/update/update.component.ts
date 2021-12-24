import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare const Validator:any,$:any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private notificationService:NotificationService,
    private utilityService:UtilityService,
    private DataService: DataService,
    private router:Router,
    private route: ActivatedRoute,) { }
    actions: any[]=[];
    permision:any={};
    actionsByPer: any[]=[];
  ngOnInit(): void {
    Validator({
      form:"#form-1",
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name')
      ],
      onSubmit:(data:any)=>{
        const _this = this
        data={
          ...data,
          permisionId:perId
        }
        var promise= new Promise((resolve)=>{
          this.DataService.DELETE('api/PermisionAction/DeletePermisionAction','id',perId).subscribe(
            res =>{
              resolve(res)
            },
            error=>this.notificationService.alertErrorMS("Thông bao",error)
          )
        })
        promise.then((res)=>
        {
          this.DataService.PUT('api/permision/update',data).subscribe(
            (response:any)=>
            {
              if(data.actionId){
                let requests:any=[];
                data.actionId.forEach((val:any)=>{
                  requests.push(this.insertPerAc(response.permisionId,val))
                })
                Promise.all(requests).then((res:any)=>{
                  this.notificationService.alertSuccessMS("Thông báo","Bạn đã câp nhật thành công")
                  this.router.navigate(['main/permision/index'])
                })
              }
              else{
                this.notificationService.alertSuccessMS("Thông báo","Bạn đã cập nhật thành công")
                this.router.navigate(['main/permision/index'])
              }
            }
          )
        })

      }
    })
    this.allAction();
    const _this=this
    const perId:any= this.route.snapshot.paramMap.get('id');
    this.DataService.GET('api/Permision/getById?id='+perId).subscribe(
      function(response:any)
      {
        _this.permision=response

      }
    )
    this.DataService.GET('api/PermisionAction/GetActionPer?id='+perId).subscribe(
      function(response:any)
      {
        if(response)
        {
          _this.actionsByPer=response.map((res:any)=>res.actionCode)
        }
      }
    )
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
    this.router.navigate(['/main/permision/index'])
  }

}
