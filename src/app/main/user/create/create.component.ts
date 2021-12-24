import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { MessageConstants } from 'src/app/core/common/message.constants';

declare const Validator: any, $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private DataService: DataService,
    private utilityService: UtilityService,
    private router: Router,
    private notiService: NotificationService,
  ) { }
  listEmailUser: any[] = [];
  backPage() {
    this.router.navigate(['/main/hocsinh/index'])
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name'),
        Validator.isEmail('#email'),
        Validator.isExist('#email', this.listEmailUser),
        Validator.minLength('#password', 6),
        Validator.isRequired('#repassword'),
        Validator.isConfirmed('#repassword', function () {
          return $('#form-1 #password').val();
        }, 'Mật khẩu nhập lại không chính xác'),

        Validator.isRequired('#address'),
        Validator.isPhoneNumber('#phoneNumber')


      ],
      onSubmit: (data: any) => {
        let that=this
        var form = new FormData();
        form.append("image", $("#avatar")[0].files[0]);

        function uploadImage() {
          return new Promise((resolve, reject) => {
            if ($('#avatar').val()) {
              // $('#loader').addClass('loader');
              var settings = {
                "url": "https://api.imgbb.com/1/upload?key=c5cfc2d7918ba161a5fdbea2e2cc7883",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
              };
              $.ajax(settings).done(function (response: any) {
                var jx = JSON.parse(response);
                resolve(jx.data.url);
              })
            }
            else {
              // $('#loader').addClass('loader');
              resolve('');
            }
          })
        }
        async function asyncCall ()  {
          const result = await uploadImage();
          let dataSubmit = {
            ...data,
            avatar: result,
          }

          that.DataService.POST('api/user/insert', dataSubmit).subscribe(
            res => {
              that.notiService.alertSuccessMS("Thông báo", MessageConstants.CREATE_OK_MSG)
              that.router.navigate(['main/user/index'])
              // $('#loader').removeClass('loader');
            }, err => {
              that.notiService.alertErrorMS("Thông báo", err)
              // $('#loader').removeClass('loader');
            }
          )
        }
        asyncCall()
      }
    })
  }
  ngOnInit(): void {
    this.validate()
    this.DataService.GET('api/user/getAll').subscribe(
      (res: any) => {
        res.forEach((res: any) => {
          if (res) {
            this.listEmailUser.push(res.email)
          }
        })

        localStorage.setItem('listEmailUser', btoa(JSON.stringify(this.listEmailUser)))
        this.listEmailUser = JSON.parse(atob(localStorage.getItem('listEmailUser') || '{}'))
      }, error => this.notiService.alertErrorMS("Thông báo", error))
  }
}
