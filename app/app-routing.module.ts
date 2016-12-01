import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { GroupsComponent }      from './components/groups/groups.component';
import { AddStageComponent }      from './components/stage/add-stage.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { SiteFormsComponent }  from './components/site/site-forms.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'site-forms/:id', component: SiteFormsComponent },
  { path: 'sites',     component: HeroesComponent },
  { path: 'forms',     component: GroupsComponent },
  { path: 'stage/add/:id',     component: AddStageComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
