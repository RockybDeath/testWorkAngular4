import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAreaComponent } from './components/authentication/login-area/login-area.component';
import { WorkplaceAreaComponent } from './components/workplace-area/workplace-area.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeAreaComponent } from './components/home-area/home-area.component';
import { WorkplaceTableComponent } from './components/workplace-area/workplace-table/workplace-table.component';
import { EntityEnum } from './models/entity.enum';
import { WorkplaceOptionsComponent } from './components/workplace-area/workplace-options/workplace-options.component';

const workplaceAreaRoutes: Routes = [
  {
    path: '',
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: WorkplaceOptionsComponent,
      },
      {
        path: 'applications',
        component: WorkplaceTableComponent,
        data: { entity: EntityEnum.APPLICATIONS },
      },
      {
        path: 'campaigns',
        component: WorkplaceTableComponent,
        data: { entity: EntityEnum.CAMPAIGNS },
      },
      {
        path: 'offers',
        component: WorkplaceTableComponent,
        data: { entity: EntityEnum.OFFERS },
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

const routes: Routes = [
  {
    path: 'workplace',
    // canActivate: [AuthGuard],
    component: WorkplaceAreaComponent,
    children: workplaceAreaRoutes,
  },
  { path: '', component: HomeAreaComponent },
  { path: 'login', component: LoginAreaComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
