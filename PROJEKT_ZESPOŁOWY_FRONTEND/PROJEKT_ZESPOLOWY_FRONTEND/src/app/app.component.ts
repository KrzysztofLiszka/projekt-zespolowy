import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './core/modules/auth/auth.module';
import { SidebarComponent } from './core/shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AuthModule, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'System zarządzania pracą';
}
