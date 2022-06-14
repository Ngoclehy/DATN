import { HttpClient } from '@angular/common/http';
import { NotificationService } from './../../../core/services/notification.service';
import { DataService } from './../../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { systemConstants } from '../../../core/common/system.constants';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private DataService: DataService,
    private NotificationService: NotificationService
  ) {}

  hocsinhList: any = [];
  date: any;
  lophoc: any = 0;
  lophocList: any = [];
  data: any = [];
  diemdanhs: any = [];
  disabled = true;

  ngOnInit(): void {
    const today = new Date();
    this.date = this.convertDate(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    );
    this.getAllLophoc();
    this.getAllDiemdanh();
  }

  convertDate(str) {
    let arrayDate = str.split('-');
    arrayDate[1] = arrayDate[1].length == 1 ? `0${arrayDate[1]}` : arrayDate[1];
    arrayDate[2] = arrayDate[2].length == 1 ? `0${arrayDate[2]}` : arrayDate[2];
    return arrayDate.join('-');
  }

  handleOnchange(e: any) {
    const value = e.target.value;
    this.lophoc = value;

    if (value == 0) {
      this.hocsinhList = [];
    } else {
      this.DataService.GET('api/hocsinh/getAll').subscribe((res: any) => {
        this.hocsinhList = res
          .filter((e) => e.id_LopHoc == value)
          .sort((a, b) => {
            if (a.hoTen > b.hoTen) return 1;
            return -1;
          })
          .map((e, i) => ({ ...e, index: i + 1 }));

        this.handleCheckExist(this.lophoc, this.date, this.hocsinhList);
      });
    }
  }

  handleGetData(data: any) {
    this.data = [...this.data, data];
  }

  getAllLophoc() {
    this.DataService.GET('api/lophoc/getAll').subscribe(
      (e) => (this.lophocList = e)
    );
  }

  getAllDiemdanh() {
    this.DataService.GET('api/diemdanh/getAll').subscribe(
      (e) => (this.diemdanhs = e)
    );
  }

  handleCheckExist(lophoc, date, data) {
    if (lophoc == 0) {
      this.disabled = true;
      return this.disabled;
    }
    if (data.length <= 0) {
      this.disabled = true;
      return this.disabled;
    }
    const exist = this.diemdanhs.find((e) => {
      return e.date == date && e.idLopHoc == lophoc;
    });
    this.disabled = exist ? (this.disabled = true) : (this.disabled = false);
    return this.disabled;
  }

  private async insertDiemDanh(item) {
    await this.DataService.POST('api/diemdanh/insert', item).subscribe(
      async (res) => {
        await res;
        return res;
      },
      (err) => {
        this.NotificationService.alertErrorMS(
          'Thông báo',
          'Có lỗi xảy ra vui lòng thử lại.'
        );
        this.http.delete(
          `${systemConstants.BASE_API}/api/diemdanh/delete?date=${this.date}&idLopHoc=${this.lophoc}`
        );
      }
    );
  }

  handleSubmit() {
    let newData = this.data.reverse();
    newData = newData
      .reduce((accumulator: any, element) => {
        if (
          accumulator.find((e) => {
            return e.id_HocSinh == element.id_HocSinh;
          })
        ) {
          return accumulator;
        }

        return [...accumulator, element];
      }, [])
      .filter((e) => e.id_LopHoc == this.lophoc)
      .map((e) => ({
        idLopHoc: this.lophoc,
        idHocSinh: e.id_HocSinh,
        diHoc: e.diHoc,
        anTrua: e.anTrua,
        date: this.date,
      }));
    newData.forEach(async (e) => {
      await this.insertDiemDanh(e);
    });

    setTimeout(() => {
      this.NotificationService.alertSuccessMS('Thông báo', 'Thêm thành công');
      this.router.navigate(['/main/diemdanh/index']);
    }, 500);
  }
}
