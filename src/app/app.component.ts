import { Component } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { AuthService } from './core/services/auth.service';
import { DataService } from './core/services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoAn5';
  constructor(private authService:AuthService,
    private dataService:DataService,
    private NotificationService:NotificationService ){}
data:any

    ngOnInit():void{



    }
}
