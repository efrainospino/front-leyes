import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/general/alerts.service';
import { UsuariosService } from 'src/app/services/general/usuarios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private alertService: AlertsService, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      confirmarContraseña: new FormControl('', Validators.required),
    });
  }

  createUser(): void {
    const data = this.loginForm.value;
  
    this.usuarioService.Add(data).subscribe(
      (response: any) => {
        if (response.errores) {
          const errores = response.errores;
          for (const campo in errores) {
            if (errores.hasOwnProperty(campo)) {
              let mensaje = errores[campo];
              if (typeof mensaje === 'object') {
                mensaje = mensaje.msg;
              }
              this.alertService.showError(`${mensaje}`);
            }
          }
        } else if (response.mensaje) {
          this.alertService.showSuccess('El usuario se creó correctamente.');
          this.router.navigate(['/auth']);
        }
      },
      (error: HttpErrorResponse) => {
        this.alertService.showError('Error al crear el usuario. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
