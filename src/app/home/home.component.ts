import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
sidebarCollapsed = false;

toggleSidebar() {
  this.sidebarCollapsed = !this.sidebarCollapsed;
  
  // For mobile view
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('show');
  }
}
}
