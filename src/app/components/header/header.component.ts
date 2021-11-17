import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthStatus();
    this.authSubscription = this.authService.getAuthStatusListener().subscribe(res => {
      this.isAuthenticated = res;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
