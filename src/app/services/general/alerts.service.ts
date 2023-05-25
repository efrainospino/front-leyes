import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  showSuccess(message: string) {
    swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 700,
      width: 350
    });
  }

  showError(message: string) {
    swal.fire({
      customClass: {
        icon: 'mx-auto mt-3',
      },
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 700,
      width: 350
    });
  }
}
