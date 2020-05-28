import { Component, OnInit } from '@angular/core';

import { Global } from '../global';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
  	Global.auth_token = null;
  	window.location.reload();
  }

}
