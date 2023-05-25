import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './componentes/auth/auth.component';
import { CreateComponent } from './componentes/create/create.component';
import { EditComponent } from './componentes/edit/edit.component';
import { HomeComponent } from './componentes/home/home.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { RegisterComponent } from './componentes/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
