import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

declare const $: any;
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
  idkhoanchi: string = '';

  handleSearch() {
    this.dataService.GET('api/khoanchi/getAll').subscribe((res: any) => {
      this.collection = [];
      res.forEach((e: any) => {
        if (
          e.tenKhoanChi.toLowerCase().includes(this.keySearch.toLowerCase())
        ) {
          this.collection.push(e);
        }
      });
      this.collection = this.collection.map((e: any, i: any) => {
        return {
          index: i,
          id_KhoanChi: e.id_KhoanChi,
          tenKhoanChi: e.tenKhoanChi,
          soTienChi: e.soTienChi,
        };
      });
    });
  }

  GetId(id: string) {
    this.idkhoanchi = id;
  }

  handleDelete() {
    this.dataService
      .DELETE('api/khoanchi/delete', 'id', this.idkhoanchi)
      .subscribe((res) => this.getData());

    $('#delete-kt-modal').modal('hide');
  }

  getData() {
    this.dataService.GET('api/khoanchi/getAll').subscribe((khoanchis: any) => {
      this.collection = khoanchis.map((value: any, index: number) => ({
        ...value,
        index,
      }));
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
