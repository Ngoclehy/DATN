import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { systemConstants } from 'src/app/core/common/system.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private DataService: DataService,
    private notiService: NotificationService
  ) {}
  lopHocs: any = [];
  collection: any = [];
  itemOnPage = 5;
  p = 1;
  date: any;
  searchKey: string = '';
  typeDate = 'date';
  key: any;

  ngOnInit(): void {
    this.getLopHoc();
    this.getAllDiemDanh();
  }

  encodedString(param1: any, param2: string) {
    return btoa(param1 + ' ' + param2);
  }

  getLopHoc() {
    this.DataService.GET('api/lophoc/getAll').subscribe((res) => {
      return (this.lopHocs = res);
    });
  }

  renderTenLopHoc(idLopHoc) {
    const lopHoc = this.lopHocs.find((e) => e.id_LopHoc === idLopHoc);
    if (lopHoc) {
      return lopHoc.tenLop;
    }
    return idLopHoc;
  }

  listenOnChangeYear() {
    if (this.date > 2099 || this.date < 2000) {
      if (this.date != null) {
        this.notiService.alertWarnMS('Thông báo', 'Bạn nhập không đúng năm');
        this.date = '';
      }
    }
  }

  convertToMonth(date: string) {
    const splitDate = date.split('-');
    splitDate.pop();
    splitDate[1] =
      splitDate[1].length == 1 ? `0${splitDate[1].length}` : splitDate[1];
    return splitDate.join('-');
  }

  convertToYear(date: string) {
    const splitDate = date.split('-');
    return splitDate[0];
  }

  countDiemDanhByLopHoc(array, idLopHoc, date) {
    let counterDiHoc = 0;
    let counterSiso = 0;
    array.forEach((e) => {
      if (e.idLopHoc === idLopHoc && e.date === date) {
        counterSiso++;
        if (e.diHoc) counterDiHoc++;
      }
    });
    return {
      counterDiHoc,
      counterSiso,
    };
  }

  handleData(data) {
    const getDistinctByLopHoc = data
      .reduce((accumulator: any, element) => {
        if (
          accumulator.find((e) => {
            return e.idLopHoc == element.idLopHoc && e.date == element.date;
          })
        ) {
          return accumulator;
        }

        return [...accumulator, element];
      }, [])
      .sort((a: any, b: any) => {
        const bDate: any = new Date(b.date);
        const aDate: any = new Date(a.date);
        return bDate - aDate;
      })
      .map((e, i) => ({
        index: i + 1,
        idLopHoc: e.idLopHoc,
        date: e.date,
        diHoc: this.countDiemDanhByLopHoc(data, e.idLopHoc, e.date)
          .counterDiHoc,
        siSo: this.countDiemDanhByLopHoc(data, e.idLopHoc, e.date).counterSiso,
      }));
    return getDistinctByLopHoc;
  }

  getAllDiemDanh() {
    this.DataService.GET('api/diemdanh/getAll').subscribe((res: any) => {
      this.collection = this.handleData(res);
    });
  }

  handleSearch() {
    if (this.date || this.searchKey.trim()) {
      this.DataService.GET('api/diemdanh/getAll').subscribe((res: any) => {
        let tmpData = this.handleData(res);
        if (this.date) {
          if (this.typeDate === 'date')
            tmpData = tmpData.filter((e) => e.date == this.date);
          else if (this.typeDate === 'month')
            tmpData = tmpData.filter(
              (e) => this.convertToMonth(e.date) == this.date
            );
          else if (this.typeDate === 'year')
            tmpData = tmpData.filter(
              (e) => this.convertToYear(e.date) == this.date
            );
        }
        if (this.searchKey.trim()) {
          tmpData = tmpData.filter((e) =>
            this.renderTenLopHoc(e.idLopHoc).includes(this.searchKey)
          );
        }
        this.collection = tmpData;
      });
    } else {
      this.getAllDiemDanh();
    }
  }

  onDelete(data) {
    this.key = [data.date, data.idLopHoc];
  }

  handleDelete() {
    this.http
      .delete(
        `${systemConstants.BASE_API}/api/diemdanh/delete?date=${this.key[0]}&idLopHoc=${this.key[1]}`
      )
      .subscribe(
        (e) => {
          $(`#delete-modal`).modal('hide');
          this.notiService.alertSuccessMS('Thông báo', 'Xóa thành công');
          this.getAllDiemDanh();
        },
        (error) =>
          this.notiService.alertErrorMS(
            'Thông báo',
            'Có lỗi xảy ra vui lòng thử lại'
          )
      );
  }
}
