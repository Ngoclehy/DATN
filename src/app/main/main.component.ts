import { Component,ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Menu } from '../core/common/Menu';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private  renderer:Renderer2,
    private AuthService:AuthService,
    private router:Router,
    private RefElement: ElementRef)  {
      router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
      this.currentUrl=event.url
      });
    }
    User:any=this.AuthService.getUser()

  menus:any=Menu.menus
  currentUrl:any
  ngAfterViewInit() {
    this.loadScripts();
  }

  public loadScripts() {
    this.renderExternalScript('assets/js/sb-admin-2.min.js').onload = () => {
    }

  }
  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit(): void {

  }

}
