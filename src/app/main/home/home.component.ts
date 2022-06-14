import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private DataService: DataService) {}

  basicData: any;

  tongtienphieuthuList: any = [];
  tongtienphieuchiList: any = [];

  currentYear = new Date().getFullYear();

  soluonglophoc: any;
  soluonggiaovien: any;
  soluonghocsinh: any;
  tongtiendathu: any;
  tongtiendachi: any;

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

  ngOnInit(): void {
    this.getSoLuongLopHoc();
    this.getSoLuongGiaoVien();
    this.getSoLuongHocSinh();
    this.getTongTienDaThu();
    this.getTongTienDaChi();
    this.getListPhieuThuChi();
  }
}
