import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/general/clientes.service';
import { UsuariosService } from 'src/app/services/general/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private clienteService: ClientesService, private usuarioService: UsuariosService, private router: Router) { }

  clientes: any;

  ngOnInit(): void {
    // Obtener las credenciales almacenadas en el localStorage
    const credenciales = this.usuarioService.obtenerCredenciales();

    if (credenciales) {
      const idUsuario = credenciales.idUsuario;
      this.clienteService.getClientesUsuario(idUsuario).subscribe(
        (response: any) => {
          this.clientes = response.clientes;
        },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }
 
}
