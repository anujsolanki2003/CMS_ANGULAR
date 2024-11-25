import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(
        savedTheme === 'dark' ? 'dark-theme' : 'light-theme'
      );
    } else {
      document.body.classList.add('light-theme');
    }
  }
}
