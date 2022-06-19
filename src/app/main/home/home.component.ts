import { NotificationService } from './../../core/services/notification.service';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private DataService: DataService,
    private NotificationService: NotificationService
  ) {}

  basicData: any;

  tongtienphieuthuList: any = [];
  tongtienphieuchiList: any = [];

  currentYear = new Date().getFullYear();

  soluonglophoc: any;
  soluonggiaovien: any;
  soluonghocsinh: any;
  tongtiendathu: any;
  tongtiendachi: any;

  p: number = 1;
  itemOnPage: number = 5;

  lophoc: any = '';
  date: any = new Date().getFullYear();
  khoanthu: any = '';

  lophocs: any = [];
  khoanthus: any = [];
  hocsinhs: any = [];
  ctpts: any = [];
  phieuthus: any = [];

  hocsinhList: any = [];

  ///
  getAllLopHoc() {
    this.DataService.GET('api/lophoc/getAll').subscribe((res) => {
      this.lophocs = res;
    });
  }

  getAllKhoanThu() {
    this.DataService.GET('api/khoanthu/getAll').subscribe((res) => {
      this.khoanthus = res;
    });
  }

  getAllHocSinh() {
    this.DataService.GET('api/hocsinh/getAll').subscribe((res) => {
      this.hocsinhs = res;
    });
  }

  getAllCTPT() {
    this.DataService.GET('api/ctphieuthu/getAll').subscribe((res) => {
      this.ctpts = res;
    });
  }

  getLopHoc(idHocSinh) {
    const hs = this.hocsinhs.find((e) => e.id_HocSinh == idHocSinh);
    return this.lophocs.find((e) => e.id_LopHoc == hs.id_LopHoc).tenLop;
  }

  handleSearch() {
    if (!this.lophoc || !this.date || !this.khoanthu) {
      this.NotificationService.alertWarnMS(
        'Thông báo',
        'Vui lòng chọn đủ thông tin các trường.'
      );
      return;
    }
    if (this.date.split('-')[0] > new Date().getFullYear()) {
      this.hocsinhList = [];
    }
    if (this.date.split('-')[0] == new Date().getFullYear()) {
      if (this.date.split('-')[1] <= new Date().getMonth() + 1) {
        this.DataService.GET('api/phieuthu/getAll').subscribe((res: any) => {
          // lọc theo tháng
          let phieuthus = res.filter((e) => {
            return this.convertDateToMonth(e.ngayThu) == this.date;
          });
          // lọc theo lớp
          phieuthus = phieuthus
            .map((e) => ({
              ...e,
              lophoc: this.getLopHocByIdHocSinh(e.id_HocSinh),
            }))
            .filter((e) => e.lophoc == this.lophoc);
          const idPhieuThus = phieuthus.map((e) => e.id_PhieuThu);

          // lọc theo khoản thu
          // tìm ra các học sinh đã đóng khoản thu này rồi
          let ctpts = this.ctpts
            .filter((e) => idPhieuThus.includes(e.id_PhieuThu))
            .filter((e) => e.id_KhoanThu == this.khoanthu)
            .map((e) => e.id_PhieuThu);
          const hocsinhsdanop = res
            .filter((e) => ctpts.includes(e.id_PhieuThu))
            .map((e) => e.id_HocSinh);
          const hocsinhchuanop = this.hocsinhs.filter(
            (e) =>
              e.id_LopHoc == this.lophoc &&
              !hocsinhsdanop.includes(e.id_HocSinh)
          );
          this.hocsinhList = hocsinhchuanop.map((e) => {
            return {
              ...e,
              lophoc: this.getLopHoc(e.id_HocSinh),
            };
          });
        });
      } else {
        this.hocsinhList = [];
      }
    }
  }
  ///
  getSoLuongLopHoc() {
    this.DataService.GET('api/lophoc/getAll').subscribe((res: any) => {
      this.soluonglophoc = res.length;
    });
  }

  getSoLuongGiaoVien() {
    this.DataService.GET('api/giaovien/getAll').subscribe((res: any) => {
      this.soluonggiaovien = res.length;
    });
  }

  getSoLuongHocSinh() {
    this.DataService.GET('api/hocsinh/getAll').subscribe((res: any) => {
      this.soluonghocsinh = res.length;
    });
  }

  getTongTienDaThu() {
    this.DataService.GET('api/phieuthu/getAll').subscribe((res: any) => {
      this.tongtiendathu = res.reduce((total, value) => {
        if (value.phieuThuThang.split('-')[0] == new Date().getFullYear()) {
          return total + value.tongTien;
        }
        return total;
      }, 0);
    });
  }

  getTongTienDaChi() {
    this.DataService.GET('api/phieuchi/getAll').subscribe((res: any) => {
      this.tongtiendachi = res.reduce((total, value) => {
        if (
          this.splitMonthPhieuChi(value.ngayChi).year ==
          new Date().getFullYear()
        )
          return total + value.tongTien;
        return total;
      }, 0);
    });
  }

  splitMonthPhieuThu(date) {
    let splitDate = date.split('-');
    return {
      month: splitDate[1],
      year: splitDate[0],
    };
  }

  splitMonthPhieuChi(date) {
    let split = date.split(' ');
    date = split[0];
    let splitDate = date.split('/');
    splitDate.splice(1, 1);

    return {
      month: splitDate[0],
      year: splitDate[1],
    };
  }

  convertToMonth(n) {
    n = String(n);
    return n.length == 1 ? `0${Number(n)}` : Number(n);
  }

  getListPhieuThuChi() {
    this.DataService.GET('api/phieuthu/getAll').subscribe((res: any) => {
      for (let i = 0; i < 12; i++) {
        const filterByMonth = res.filter((e) => {
          return (
            this.splitMonthPhieuThu(e.phieuThuThang).month ==
              this.convertToMonth(i + 1) &&
            this.splitMonthPhieuThu(e.phieuThuThang).year ==
              new Date().getFullYear()
          );
        });

        if (filterByMonth) {
          const total = filterByMonth.reduce((total, value) => {
            return total + value.tongTien;
          }, 0);
          this.tongtienphieuthuList.push(total);
        } else {
          this.tongtienphieuthuList.push(0);
        }
      }
      this.DataService.GET('api/phieuchi/getAll').subscribe((res: any) => {
        for (let i = 0; i < 12; i++) {
          const filterByMonth = res.filter((e) => {
            return (
              this.splitMonthPhieuChi(e.ngayChi).month == i + 1 &&
              this.splitMonthPhieuChi(e.ngayChi).year ==
                new Date().getFullYear()
            );
          });

          if (filterByMonth) {
            const total = filterByMonth.reduce((total, value) => {
              return total + value.tongTien;
            }, 0);
            this.tongtienphieuchiList.push(total);
          } else {
            this.tongtienphieuchiList.push(0);
          }
        }
        this.basicData = {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'Phiếu thu',
              data: this.tongtienphieuthuList,
              fill: false,
              borderColor: '#42A5F5',
              tension: 0.4,
            },
            {
              label: 'Phiếu chi',
              data: this.tongtienphieuchiList,
              fill: false,
              borderColor: '#FFA726',
              tension: 0.4,
            },
          ],
        };
      });
    });
  }

  getCurrentMonth() {
    const date = new Date();
    const month =
      String(date.getMonth() + 1).length == 1
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    return `${date.getFullYear()}-${month}`;
  }

  convertDateToMonth(date) {
    const splitDate = date.split('-');
    splitDate.pop();
    return splitDate.join('-');
  }

  getLopHocByIdHocSinh(id) {
    const hocSinh = this.hocsinhs.find((e) => e.id_HocSinh == id);
    return hocSinh.id_LopHoc;
  }
  ngOnInit(): void {
    this.date = this.getCurrentMonth();
    this.getSoLuongLopHoc();
    this.getSoLuongGiaoVien();
    this.getSoLuongHocSinh();
    this.getTongTienDaThu();
    this.getTongTienDaChi();
    this.getListPhieuThuChi();
    this.getAllLopHoc();
    this.getAllKhoanThu();
    this.getAllHocSinh();
    this.getAllCTPT();
  }
}
