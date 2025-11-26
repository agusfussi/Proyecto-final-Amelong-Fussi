import { isPlatformBrowser } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage)  {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
    
  }

  toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    localStorage.setItem(
      'theme',
      body.classList.contains('dark-theme') ? 'dark' : 'light'
    );
  }
}
