import { Component } from '@angular/core';

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
}