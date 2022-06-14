import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

declare const $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(
    private router: Router,
    private DataService: DataService,
    private notifiService: NotificationService
  ) {}
  p: number = 1;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = '';
  idPhieuThu: number = 0;
  date: any = '';

  getAllPhieuChi() {
    this.DataService.GET('api/phieuchi/getAll').subscribe((phieuchis: any) => {
      this.DataService.GET('api/giaovien/getAll').subscribe(
        (giaoviens: any) => {
          phieuchis.forEach((phieuchi: any) => {
            phieuchi.giaovien = {};
            giaoviens.forEach((giaovien: any) => {
              if (phieuchi.id_GiaoVien == giaovien.id_GiaoVien) {
                phieuchi.giaovien = { ...phieuchi.giaovien, ...giaovien };
              }
            });
          });
          this.collection = phieuchis
            .map((value: any, index: number) => ({
              ...value,
              index: index + 1,
            }))
            .reverse()
            .map((value: any, index: number) => ({
              ...value,
              index: index + 1,
            }));
          console.log(this.collection);
        }
      );
    });
  }

  onChangeIdPhieuChi(idPhieuThu: any) {
    this.idPhieuThu = idPhieuThu;
  }

  handleDelete() {
    this.DataService.DELETE(
      'api/phieuchi/delete',
      'Id',
      this.idPhieuThu
    ).subscribe((res) => {
      this.getAllPhieuChi();
      $('#delete-cat-modal').modal('hide');
    });
  }

  handleSearch() {
    this.DataService.GET('api/phieuchi/getAll').subscribe((phieuchis: any) => {
      this.DataService.GET('api/giaovien/getAll').subscribe(
        (giaoviens: any) => {
          phieuchis.forEach((phieuchi: any) => {
            phieuchi.giaovien = {};
            giaoviens.forEach((giaovien: any) => {
              if (phieuchi.id_GiaoVien == giaovien.id_GiaoVien) {
                phieuchi.giaovien = { ...phieuchi.giaovien, ...giaovien };
              }
            });
          });
          if (this.date != '') {
            phieuchis = phieuchis.filter((value: any) => {
              const date = new Date(value.ngayChi);
              const dateArr = date.toLocaleDateString().split('/');
              const month =
                dateArr[0].length <= 1 ? `0${dateArr[0]}` : dateArr[0];
              value.ngayChi = `${dateArr[2]}-${month}-${dateArr[1]}`;
              return value.ngayChi == this.date;
            });
          }
          let _phieuchis = [...phieuchis];
          phieuchis = _phieuchis.filter((value: any) => {
            return value.giaovien.hoTen
              .toLowerCase()
              .includes(this.keySearch.toLowerCase());
          });
          if (phieuchis.length < 1) {
            phieuchis = _phieuchis.filter((value: any) => {
              return value.tenPhieuChi
                .toLowerCase()
                .includes(this.keySearch.toLowerCase());
            });
          }
          phieuchis = phieuchis.reverse().map((value: any, index: any) => {
            return {
              index: index + 1,
              ...value,
            };
          });
          this.collection = phieuchis;
        }
      );
    });
  }

  filterDate(date: any) {
    this.date = date;
  }

  ngOnInit(): void {
    this.getAllPhieuChi();
  }
}
