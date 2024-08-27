import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    MasterComponent,
    DetailComponent
 } from './component';
export const routes: Routes = [
    { path: 'home', component: MasterComponent },
    { path: 'details/:id', component: DetailComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' } // Default route
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
