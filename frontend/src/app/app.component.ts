import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router){}
  
  isHomeRoute() {
    let a: boolean = false;
    a = (this.router.url === '/reservas/login' || this.router.url === '/reservas/solicitud');
    return !a;
  }
  
}
