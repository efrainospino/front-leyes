import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/general/alerts.service';
import { UsuariosService } from 'src/app/services/general/usuarios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private alertService: AlertsService, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
    });
  }

  authUser(): void {
    const data = this.loginForm.value;

    this.usuarioService.auth(data).subscribe(
      (response: any) => {
        if (response.errores) {
          const errores = response.errores;
          for (const campo in errores) {
            if (errores.hasOwnProperty(campo)) {
              let mensaje = errores[campo];
              if (typeof mensaje === 'object') {
                mensaje = mensaje.msg;
              }
              if (mensaje === 'Autenticación incorrecta') {
                this.alertService.showError(`${mensaje}`);
                return;
              }
            }
          }
          this.alertService.showError('Error al autenticar, inténtelo más tarde.');
        } else {
          this.usuarioService.guardarCredenciales(response.token, response.idUsuario, response.user);
          this.alertService.showSuccess('El usuario se autenticó correctamente.');
          this.router.navigate(['/']);
        }
      },
      (error: HttpErrorResponse) => {
        this.alertService.showError('Error al autenticar, inténtelo más tarde.');
      }
    );
  }
}
