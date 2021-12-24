import { Injectable } from '@angular/core';
declare const myToast: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  alertSuccessMS(title: string, message: string) {
    myToast.toast({
      title: title,
      message: message,
      type: 'success',
      duration: 3000
    })
  }

  alertWarnMS(title: string, message: string) {
    myToast.toast({
      title: title,
      message: message,
      type: 'warn',
      duration: 3000
    })
  }

  alertErrorMS(title: string, message: string) {
    myToast.toast({
      title: title,
      message: message,
      type: 'error',
      duration: 3000
    })
  }
}
