import { Component, HostListener  } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet, 
    RouterLink, 
    CommonModule
  ],
})
export class AppComponent {
  title = 'MiniKanban';
  showButton = false;

  @HostListener('window:scroll')
  onScroll() {
    this.showButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}