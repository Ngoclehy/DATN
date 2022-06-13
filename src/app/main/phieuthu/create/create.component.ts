import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
  hehocId: any = '';

  giaoviens: any = [];
  hocsinhs: any = [];
  lophocs: any = [];

  khoanthus: any = [];
  tmpKhoanThu: any = [];
  tmpKhoanThuId: any = [];
  totalPrice: number = 0;

  idKhoanThu: number = 0;

  khoanthu: any = {};
  p: number = 1;

  ngayThu: any;
  phieuThuThang: any;

  labelNotfound = '';

  getAllGiaoVien() {
    this.dataService.GET('api/giaovien/getAll').subscribe((giaoviens: any) => {
      this.dataService.GET('api/lophoc/getAll').subscribe((lophocs: any) => {
        giaoviens.forEach((giaovien: any) => {
          giaovien.lop = '';
          lophocs.forEach((lophoc: any) => {
            if (giaovien.id_LopHoc == lophoc.id_LopHoc) {
              giaovien.lop += lophoc.tenLop;
            }
          });
        });

        this.giaoviens = giaoviens.sort((a: any, b: any) => {
          if (a > b) return -1;
          return 1;
        });
      });
    });
  }

  getAllLopHoc() {
    this.dataService
      .GET('api/lophoc/getAll')
      .subscribe((lophocs) => (this.lophocs = lophocs));
  }

  getAllHocSinh() {
    this.dataService
      .GET('api/hocsinh/getAll')
      .subscribe((hocsinhs) => (this.hocsinhs = hocsinhs));
  }

  onChangeLopHoc(idLopHoc: any) {
    this.dataService.GET('api/hocsinh/getAll').subscribe((hocsinhs: any) => {
      this.hocsinhId = '';
      this.resetKhoanThu();
      if (idLopHoc == '0') {
        this.hocsinhs = hocsinhs;
      } else {
        this.hocsinhs = hocsinhs.filter(
          (hocsinh: any) => hocsinh.id_LopHoc == idLopHoc
        );
      }
    });
  }

  getKhoanThu() {
    if (!this.hocsinhId) {
      this.labelNotfound = 'Vui lòng chọn học sinh để xem khoản thu';
      return;
    }
    this.dataService.GET('api/khoanthu/getAll').subscribe((khoanthus: any) => {
      this.dataService
        .GET('api/hocsinh/getById?id=' + this.hocsinhId)
        .subscribe((hocsinh: any) => {
          this.dataService
            .GET('api/lophoc/getAll')
            .subscribe((lophocs: any) => {
              this.dataService
                .GET('api/hehoc/getAll')
                .subscribe((hehocs: any) => {
                  const lophocByHocSinh = lophocs.find(
                    (lophoc) => lophoc.id_LopHoc == hocsinh.id_LopHoc
                  );
                  const heHocByLopHoc = hehocs.find(
                    (hehoc) => hehoc.id_HeHoc == lophocByHocSinh.id_HeHoc
                  );

                  this.hehocId = heHocByLopHoc.id_HeHoc;
                  this.khoanthus = khoanthus.filter(
                    (e) => e.heHoc == this.hehocId || e.heHoc == 0
                  );
                });
            });
        });
    });
  }

  saveKhoanThu() {
    let listKhoanThuId: any = [];
    $('input[name]:checked').each((i: any, element: any) => {
      listKhoanThuId.push(element.value);
    });
    let tmp: any = [];
    this.dataService.GET('api/khoanthu/getAll').subscribe((khoanthus: any) => {
      khoanthus.forEach((khoanthu: any) => {
        khoanthu.soLuong = 1;
        listKhoanThuId.forEach((KhoanThuId: any) => {
          if (khoanthu.id_KhoanThu == KhoanThuId) {
            tmp.push(khoanthu);
          }
        });
      });

      let _tmp: any = [];
      this.tmpKhoanThu.concat(tmp).forEach((val: any, index: any) => {
        let isExits = _tmp.find((e: any) => e.id_KhoanThu == val.id_KhoanThu);
        if (!isExits) {
          _tmp.push(val);
        }
      });

      this.tmpKhoanThu = _tmp;
      this.tmpKhoanThu.forEach((val: any, i: any) => {
        let isExits = listKhoanThuId.find(
          (e: any) => e == val.id_KhoanThu.toString()
        );
        if (!isExits) {
          this.tmpKhoanThu.splice(i, 1);
        }
      });

      this.tmpKhoanThuId = listKhoanThuId;
      this.totalPrice = this.tmpKhoanThu.reduce(
        (init: any, current: any) => init + current.soLuong * current.soTienThu,
        0
      );
      this.getSoNgayAnSoNgayDiHoc();
    });
    $('#modal-ThemKhoanThu').modal('hide');
  }

  updateSoLuongKhoanThu(id_KhoanThu: any) {
    this.idKhoanThu = id_KhoanThu;
    this.khoanthu = this.tmpKhoanThu.find(
      (value: any, i: any) => value.id_KhoanThu == id_KhoanThu
    );
  }

  Check(event: any) {
    var keyCode = event.keyCode;
    if (event.shiftKey) event.returnValue = false;
    else if (keyCode > 31 && (keyCode < 48 || keyCode > 57))
      event.returnValue = false;
    else event.returnValue = true;
  }

  saveSoLuongKhoanThu(quantiy: any) {
    this.tmpKhoanThu.forEach((value: any, i: any) => {
      if (value.id_KhoanThu == this.idKhoanThu) {
        value.soLuong = quantiy;
      }
    });
    this.totalPrice = this.tmpKhoanThu.reduce(
      (init: any, current: any) => init + current.soLuong * current.soTienThu,
      0
    );
    $('#modal-SuaSoluongKhoanThu').modal('hide');
  }

  deleteKhoanThu(id_KhoanThu: any) {
    this.tmpKhoanThu.forEach((value: any, i: any) => {
      if (value.id_KhoanThu == id_KhoanThu) {
        this.tmpKhoanThu.splice(i, 1);
        this.tmpKhoanThuId.splice(i, 1);
      }
    });
    this.totalPrice = this.tmpKhoanThu.reduce(
      (init: any, current: any) => init + current.soLuong * current.soTienThu,
      0
    );
  }

  insertCTPhieuThu(idPhieuThu: any, data: any) {
    this.dataService
      .POST('api/CTPhieuThu/insert', {
        id_PhieuThu: idPhieuThu,
        id_KhoanThu: data.id_KhoanThu,
        soLuong: data.soLuong,
        thanhTien: data.soLuong * data.soTienThu,
      })
      .subscribe((res) => res);
  }

  validate() {
    Validator({
      form: '#formPhieuthu',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenPhieuThu'),
        Validator.isRequired('#tenGiaoVienPhieuThu'),
        Validator.isRequired('#hocSinhPhieuThu'),
        Validator.isRequired('#nguoiNopPhieuThu'),
        Validator.isRequired('#ngayThu'),
        Validator.isRequired('#phieuThuThang'),
      ],
      onSubmit: (data: any) => {
        if (this.tmpKhoanThu.length < 1) {
          alert('Bạn chưa thêm khoản thu nào cho hóa đơn!');
          return;
        }

        data.tongTien = this.totalPrice;
        this.dataService
          .POST('api/phieuthu/insert', { ...data })
          .subscribe((phieuthu: any) => {
            let requests: any = [];
            this.tmpKhoanThu.forEach((val: any) => {
              requests.push(this.insertCTPhieuThu(phieuthu.id_PhieuThu, val));
            });
            Promise.all(requests).then((res: any) => {
              this.notiService.alertSuccessMS(
                'Thông báo',
                'Bạn đã thêm thành công'
              );
              this.router.navigate(['/main/phieuthu/index']);
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

  countSoNgayAn(data) {
    let count = 0;
    data.forEach((e) => {
      if (e.anTrua == true) {
        count++;
      }
    });
    return count;
  }
  countSoNgayDiHoc(data) {
    let count = 0;
    data.forEach((e) => {
      if (e.diHoc == true) {
        count++;
      }
    });
    return count;
  }

  getSoNgayAnSoNgayDiHoc<Type extends { ngayAn: number; ngayDiHoc: number }>() {
    this.dataService.GET('api/diemdanh/getAll').subscribe((res: any) => {
      const data = res.filter((e) => {
        return (
          this.convertDatetoMonth(e.date) == this.phieuThuThang &&
          this.hocsinhId == e.idHocSinh
        );
      });

      const ngayAn = this.countSoNgayAn(data);
      const ngayDiHoc = this.countSoNgayDiHoc(data);

      this.tmpKhoanThu = this.tmpKhoanThu.map((e) => {
        if (e.tenKhoanThu.toLocaleLowerCase().includes('tiền ăn')) {
          return {
            ...e,
            soLuong: ngayAn,
          };
        } else if (e.tenKhoanThu.toLocaleLowerCase().includes('học phí')) {
          return {
            ...e,
            soLuong: ngayDiHoc,
          };
        } else {
          return {
            ...e,
          };
        }
      });
      this.totalPrice = this.tmpKhoanThu.reduce(
        (init: any, current: any) => init + current.soLuong * current.soTienThu,
        0
      );
    });
  }

  resetKhoanThu() {
    this.tmpKhoanThu = [];
    this.totalPrice = 0;
  }

  ngOnInit(): void {
    const today = new Date();

    this.ngayThu = this.convertDate(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    );

    this.phieuThuThang = this.convertDate(
      today.getFullYear() + '-' + (today.getMonth() + 1)
    );

    this.validate();
    this.getAllGiaoVien();
    this.getAllLopHoc();
    this.getAllHocSinh();
    this.getKhoanThu();
  }
}
