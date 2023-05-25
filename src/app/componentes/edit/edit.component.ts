import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/general/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/general/clientes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userId = localStorage.getItem('idUsuario');
  cliente: any;

  constructor(
    private alertService: AlertsService,
    private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  clienteFormEdit!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe(params => {
      const clienteId = params.get('id');
      if (clienteId !== null) {
        this.clienteService.getCliente(clienteId).subscribe(
          (response: any) => {
            this.cliente = response;
            this.userId = localStorage.getItem('idUsuario');
            if (String(this.cliente.usuarioId) !== this.userId) {
              this.router.navigate(['/']);
            } else {
              this.populateForm();
            }
          },
          (error: HttpErrorResponse) => {
          }
        );
      }
    });
  }

  populateForm(): void {
    if (this.cliente) {
      this.clienteFormEdit.patchValue({
        nombre: this.cliente.nombre,
        fecha_inicial: this.cliente.fecha_inicial,
        fecha_final: this.cliente.fecha_final
      });
    }
  }

  initForm(): void {
    this.clienteFormEdit = new FormGroup({
      nombre: new FormControl('', Validators.required),
      fecha_inicial: new FormControl('', Validators.required),
      fecha_final: new FormControl({ value: '', disabled: false }, Validators.required),
      calcular: new FormControl(''),
      usuarioId: new FormControl(this.userId)
    });
  }

  calculateEndDate() {
    const months = parseInt(this.clienteFormEdit.get('calcular')?.value, 10);
    const startDate = this.clienteFormEdit.get('fecha_inicial')?.value;

    if (!isNaN(months) && startDate) {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + months);
      this.clienteFormEdit.get('fecha_final')?.setValue(endDate);
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue !== inputValue) {
      input.value = numericValue;
    }

    this.clienteFormEdit.get('calcular')?.setValue(numericValue)

    this.calculateEndDate();
  }

  editCliente(): void {
    const data = this.clienteFormEdit.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.camposVacios(data)) {
      this.alertService.showError('Debes completar todos los campos.');
      return;
    }
    this.clienteService.Edit(id, data).subscribe(
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
        } else if (response) {
          this.alertService.showSuccess('Se editó correctamente.');
          this.router.navigate(['/']);
        }
      },
      (error: HttpErrorResponse) => {
        this.alertService.showError('Error al crear el cliente. Por favor, inténtalo de nuevo.');
      }
    );
  }
  camposVacios(data: any): boolean {
    const camposValidar = ['nombre', 'fecha_inicial', 'fecha_final', 'usuarioId'];

    for (const campo of camposValidar) {
      if (!data[campo] || data[campo] === '') {
        return true;
      }
    }

    return false;
  }
}
