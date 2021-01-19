import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SaucesService } from '../services/sauces.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  authSubscription: Subscription;
  headMessage: string;
  showMessage: boolean;

  constructor(private auth: AuthService,
              private sauces: SaucesService) { }

  ngOnInit() {
    this.authSubscription = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  ngDoCheck() {
    this.sauces.headMessage$.subscribe(
      (headMessage: string) => {
        this.headMessage = headMessage;
        this.showMessage = true;
        if (headMessage !== '')
        this.sauces.clearMessage();
      }
    )
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
