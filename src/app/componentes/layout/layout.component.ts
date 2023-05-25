import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  showButton: boolean;

  constructor(private router: Router) {
    this.showButton = router.url === '/';

    // Suscribirse a los eventos de cambio de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Actualizar el estado del botón al cambiar de ruta
        this.showButton = event.url === '/';
      }
    });
  }
}
