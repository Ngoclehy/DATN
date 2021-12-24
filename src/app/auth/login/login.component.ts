import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
declare const Validator: any, $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
    private NotificationService: NotificationService,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.authService.LogOut()//xoa du lieu ng dung duoi local
    Validator({
      form: '#login-form',// truyền id form cần validate
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isEmail('#email'),//truyền tên id
        Validator.minLength('#password', 6),//hàm check có sẵn trong vallina
      ],
      onSubmit: (data: any) => {
        const { email, password } = data
        this.authService.Login(email, password).subscribe(
          res => {
            this.NotificationService.alertSuccessMS("Thông báo","Bạn đã đăng nhập thành công!")
            this.router.navigate(['/main/home'])
          },
          error=>this.NotificationService.alertErrorMS("Thông báo","Thông tin tài khoản hoặc mật khẩu không chính xác")

        )
      }
    })
    // this.authService.Login("ngocle4620@gmail.com","123").subscribe(res=>res);
    // console.log(this.authService.getLoginUser())


  }


}
