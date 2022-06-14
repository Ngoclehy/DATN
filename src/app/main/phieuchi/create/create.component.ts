import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';

declare const Validator: any, $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    private notiService: NotificationService
  ) {}
  hocsinhId: any = '';

  giaoviens: any = [];
  giaovienId: any = '';

  khoanchis: any = [];
  tmpKhoanChi: any = [];
  tmpKhoanChiId: any = [];
  totalPrice: number = 0;

  idKhoanChi: number = 0;

  khoanchi: any = {};
  p: number = 1;

  ngayChi: any;

  getAllGiaoVien() {
    this.dataService.GET('api/giaovien/getAll').subscribe((giaoviens: any) => {
      this.giaoviens = giaoviens;
    });
  }

  getKhoanChi() {
    this.dataService.GET('api/khoanchi/getAll').subscribe((khoanchis: any) => {
      this.khoanchis = khoanchis;
    });
  }

  savekhoanchi() {
    let listkhoanchiId: any = [];
    $('input[name]:checked').each((i: any, element: any) => {
      listkhoanchiId.push(element.value);
    });
    let tmp: any = [];
    this.dataService.GET('api/khoanchi/getAll').subscribe((khoanchis: any) => {
      khoanchis.forEach((khoanchi: any) => {
        khoanchi.soLuong = 1;
        listkhoanchiId.forEach((khoanchiId: any) => {
          if (khoanchi.id_KhoanChi == khoanchiId) {
            tmp.push(khoanchi);
          }
        });
      });

      let _tmp: any = [];
      this.tmpKhoanChi.concat(tmp).forEach((val: any, index: any) => {
        let isExits = _tmp.find((e: any) => e.id_KhoanChi == val.id_KhoanChi);
        if (!isExits) {
          _tmp.push(val);
        }
      });

      this.tmpKhoanChi = _tmp;
      this.tmpKhoanChi.forEach((val: any, i: any) => {
        let isExits = listkhoanchiId.find(
          (e: any) => e == val.id_KhoanChi.toString()
        );
        if (!isExits) {
          this.tmpKhoanChi.splice(i, 1);
        }
      });

      this.tmpKhoanChiId = listkhoanchiId;
      this.totalPrice = this.tmpKhoanChi.reduce(
        (init: any, current: any) => init + current.soLuong * current.soTienChi,
        0
      );
    });
    $('#modal-Themkhoanchi').modal('hide');
  }

  updateSoLuongkhoanchi(id_KhoanChi: any) {
    this.idKhoanChi = id_KhoanChi;
    this.khoanchi = this.tmpKhoanChi.find(
      (value: any, i: any) => value.id_KhoanChi == id_KhoanChi
    );
  }

  Check(event: any) {
    var keyCode = event.keyCode;
    if (event.shiftKey) event.returnValue = false;
    else if (keyCode > 31 && (keyCode < 48 || keyCode > 57))
      event.returnValue = false;
    else event.returnValue = true;
  }

  saveSoLuongkhoanchi(quantiy: any) {
    this.tmpKhoanChi.forEach((value: any, i: any) => {
      if (value.id_KhoanChi == this.idKhoanChi) {
        value.soLuong = quantiy;
      }
    });
    this.totalPrice = this.tmpKhoanChi.reduce(
      (init: any, current: any) => init + current.soLuong * current.soTienChi,
      0
    );
    $('#modal-SuaSoluongkhoanchi').modal('hide');
  }

  deletekhoanchi(id_KhoanChi: any) {
    this.tmpKhoanChi.forEach((value: any, i: any) => {
      if (value.id_KhoanChi == id_KhoanChi) {
        this.tmpKhoanChi.splice(i, 1);
        this.tmpKhoanChiId.splice(i, 1);
      }
    });
    this.totalPrice = this.tmpKhoanChi.reduce(
      (init: any, current: any) => init + current.soLuong * current.soTienChi,
      0
    );
  }

  insertCTPhieuChi(idPhieuChi: any, data: any) {
    this.dataService
      .POST('api/CTPhieuChi/insert', {
        id_PhieuChi: idPhieuChi,
        id_KhoanChi: data.id_KhoanChi,
        soLuong: data.soLuong,
        thanhTien: data.soLuong * data.soTienChi,
      })
      .subscribe((res) => res);
  }

  validate() {
    Validator({
      form: '#formPhieuchi',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenPhieuChi'),
        Validator.isRequired('#tenGiaoVienPhieuChi'),
        Validator.isRequired('#ngayChi'),
      ],
      onSubmit: (data: any) => {
        if (this.tmpKhoanChi.length < 1) {
          alert('Bạn chưa thêm khoản chi nào cho hóa đơn!');
          return;
        }

        data.tongTien = this.totalPrice;

        this.dataService
          .POST('api/phieuchi/insert', { ...data })
          .subscribe((phieuchi: any) => {
            let requests: any = [];

            this.tmpKhoanChi.forEach((val: any) => {
              requests.push(this.insertCTPhieuChi(phieuchi.id_PhieuChi, val));
            });
            Promise.all(requests).then((res: any) => {
              this.notiService.alertSuccessMS(
                'Thông báo',
                'Bạn đã thêm thành công'
              );
              this.router.navigate(['/main/phieuchi/index']);
            });
          });
      },
    });
  }

  convertDate(str) {
    let arrayDate = str.split('-');
    arrayDate[1] = arrayDate[1].length == 1 ? `0${arrayDate[1]}` : arrayDate[1];
    if (arrayDate[2]) {
      arrayDate[2] =
        arrayDate[2].length == 1 ? `0${arrayDate[2]}` : arrayDate[2];
    }
    return arrayDate.join('-');
  }

  convertDatetoMonth(date) {
    const splitDate = date.split('-');
    splitDate.pop();
    return splitDate.join('-');
  }

  ngOnInit(): void {
    const today = new Date();

    this.ngayChi = this.convertDate(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    );

    this.validate();
    this.getAllGiaoVien();
    this.getKhoanChi();
  }
}
