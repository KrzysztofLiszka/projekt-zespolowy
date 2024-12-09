import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.checkIfLoggedIn();
            });

        this.checkIfLoggedIn();
    }

    private checkIfLoggedIn(): void {
        this.isLoggedIn = this.router.url.endsWith('/home');
    }
}
