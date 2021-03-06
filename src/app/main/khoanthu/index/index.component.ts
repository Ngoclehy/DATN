import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(private dataService: DataService) {}
  p: number = 1;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = '';
  idKhoanThu: string = '';

  handleSearch() {
    this.dataService.GET('api/khoanthu/getAll').subscribe((res: any) => {
      this.collection = [];
      res.forEach((e: any) => {
        if (
          e.tenKhoanThu.toLowerCase().includes(this.keySearch.toLowerCase())
        ) {
          this.collection.push(e);
        }
      });
      this.collection = this.collection.map((e: any, i: any) => {
        return {
          index: i,
          id_KhoanThu: e.id_KhoanThu,
          tenKhoanThu: e.tenKhoanThu,
          soTienThu: e.soTienThu,
        };
      });
    });
  }

  GetId(id: string) {
    this.idKhoanThu = id;
  }

  handleDelete() {
    this.dataService.DELETE('api/khoanthu/delete', 'id', this.idKhoanThu).subscribe(res=>this.getData());
    
    $('#delete-kt-modal').modal('hide');
  }

  getData() {
    this.dataService.GET('api/khoanthu/getAll').subscribe((khoanthus: any) => {
      this.collection = khoanthus.map((value: any, index: number) => ({
        ...value,
        index,
      }));
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
