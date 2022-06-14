import { HttpClient } from '@angular/common/http';
import { NotificationService } from './../../../core/services/notification.service';
import { DataService } from './../../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { systemConstants } from '../../../core/common/system.constants';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
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
  decodedString: any;

  ngOnInit(): void {
    this.getAllLophoc();
    this.getAllHocSinh();
    this.route.params.subscribe((e) => {
      this.decodedString = atob(e.id).split(' ');
      this.lophoc = +this.decodedString[0];
      this.date = this.convertDate(this.decodedString[1]);
      this.getDiemdanh(this.lophoc, this.date);
    });
  }

  convertDate(str) {
    let arrayDate = str.split('-');
    arrayDate[1] = arrayDate[1].length == 1 ? `0${arrayDate[1]}` : arrayDate[1];
    arrayDate[2] = arrayDate[2].length == 1 ? `0${arrayDate[2]}` : arrayDate[2];
    return arrayDate.join('-');
  }

  handleGetData(data: any) {
    this.data = [...this.data, data];
  }

  getAllLophoc() {
    this.DataService.GET('api/lophoc/getAll').subscribe(
      (e) => (this.lophocList = e)
    );
  }

  getAllHocSinh() {
    this.DataService.GET('api/hocsinh/getAll').subscribe((e) => {
      this.hocsinhList = e;
    });
  }

  getDiemdanh(lophoc, date) {
    this.DataService.GET('api/diemdanh/getAll').subscribe((e: any) => {
      let data = e
        .filter((e) => e.idLopHoc == lophoc && e.date == date)
        .map((e, i) => ({
          ...e,
          hoTen:
            this.hocsinhList.length > 0
              ? this.hocsinhList.find((r) => r.id_HocSinh == e.idHocSinh)?.hoTen
              : this.getDiemdanh(lophoc, date),
          namSinh:
            this.hocsinhList.length > 0
              ? this.hocsinhList.find((r) => r.id_HocSinh == e.idHocSinh)
                  ?.namSinh
              : this.getDiemdanh(lophoc, date),
        }))
        .sort((a, b) => {
          if (a.hoTen > b.hoTen) return 1;
          return -1;
        })
        .map((e, i) => ({ ...e, index: i + 1 }));
      this.diemdanhs = data;
    });
  }

  private async updateDiemDanh(item) {
    await this.DataService.PUT('api/diemdanh/update', item).subscribe(
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
    newData = newData.reduce((accumulator: any, element) => {
      if (
        accumulator.find((e) => {
          return e.idHocSinh == element.idHocSinh;
        })
      ) {
        return accumulator;
      }

      return [...accumulator, element];
    }, []);

    newData.forEach(async (e) => {
      await this.updateDiemDanh(e);
    });

    this.NotificationService.alertSuccessMS('Thông báo', 'Cập nhập thành công');
    this.router.navigate(['/main/diemdanh/index']);
  }
}
