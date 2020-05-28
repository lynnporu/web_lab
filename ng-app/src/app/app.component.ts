import { Component, OnInit } from '@angular/core';
import { Global } from './global';

import { faMagic,
         faList,
         faMusic,
         faCogs,
         faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faMagic = faMagic;
  faList = faList;
  faMusic = faMusic;
  faCogs = faCogs;
  title = 'ng-app';

  public inputLogin;
  public inputPassword;

  authorized = false;

  login() {
    if(
      this.inputPassword == "admin" &&
      this.inputLogin == "admin"
    ){
      this.authorized = true;
      Global.auth_token = '1ea8d528676e8db9fac140d9f99e87711f252528';
    }
  }

}