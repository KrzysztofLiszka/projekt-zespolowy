import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  constructor(private router: Router) {
  }

  logout(): void {
    localStorage.removeItem("tokenPZ");
    this.router.navigateByUrl("/login");
  }
}
