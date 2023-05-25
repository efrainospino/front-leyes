import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/general/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/general/clientes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userId= localStorage.getItem('idUsuario');

  constructor(
    private alertService: AlertsService,
    private clienteService: ClientesService,
    private router: Router
  ) {}

  clienteForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.clienteForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      fecha_inicial: new FormControl('', Validators.required),
      fecha_final: new FormControl({ value: '', disabled: false }, Validators.required),
      calcular: new FormControl(''),
      usuarioId: new FormControl(this.userId)
    });
  }

  calculateEndDate() {
    const months = parseInt(this.clienteForm.get('calcular')?.value, 10);
    const startDate = this.clienteForm.get('fecha_inicial')?.value;
    
    if (!isNaN(months) && startDate) {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + months);
      this.clienteForm.get('fecha_final')?.setValue(endDate);
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
  
    if (numericValue !== inputValue) {
      input.value = numericValue;
    }
  
    this.clienteForm.get('calcular')?.setValue(numericValue)

    this.calculateEndDate();
  }

  createCliente(): void {
    const data = this.clienteForm.value;
    this.clienteService.Add(data).subscribe(
      (response: any) => {
        if (response.errores) {
          const errores = response.errores;
          for (const campo in errores) {
            if (errores.hasOwnProperty(campo)) {
              const error = errores[campo];
              const mensaje = error.msg;
              this.alertService.showError(mensaje);
            }
          }
        } else if (response.message) {
          this.alertService.showSuccess(response.message);
          this.router.navigate(['/']);
        }
      },
      (error: HttpErrorResponse) => {
        this.alertService.showError('Error al crear el cliente. Por favor, inténtalo de nuevo.');
      }
    );
  }  
}