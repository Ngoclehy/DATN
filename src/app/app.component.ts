import { Component } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { AuthService } from './core/services/auth.service';
import { DataService } from './core/services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DoAn5';
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private NotificationService: NotificationService
  ) {}
  data: any;
  basicData: any;

  ngOnInit(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: '',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
        {
          label: '',
          data: [8, 28, 10, 1, 6, 27, 90],
          fill: false,
          borderColor: '#d6d6d6',
          tension: 0.4,
        },
      ],
    };
  }
}
