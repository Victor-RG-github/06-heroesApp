import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/User.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  sidebarItems = [
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Search', icon: 'search', url: './search' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  get currentUser(): User | undefined {
    return this.authService.currentUser;
  }
}
