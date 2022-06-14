import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Menu } from '../core/common/Menu';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private AuthService: AuthService,
    private router: Router,
    private RefElement: ElementRef
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.currentUrl = event.url;
      });
  }
  User: any = this.AuthService.getUser();

  menus: any = Menu.menus;
  currentUrl: any;

  ngOnInit(): void {}
}
