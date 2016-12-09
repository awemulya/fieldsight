import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent }   from './dashboard.component';
// import { UserComponent }   from './components/user/user.component';
// import { HeroesComponent }      from './heroes.component';
// import { GroupsComponent }      from './components/groups/groups.component';
// import { AddStageComponent }      from './components/stage/add-stage.component';
// import { HeroDetailComponent }  from './hero-detail.component';
import { SiteFormsComponent }  from './components/site/site-forms.component';
const routes: Routes = [
  // { path: 'dashboard',  component: DashboardComponent },
  // { path: 'login',  component: UserComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'forms/site-forms/:id', component: SiteFormsComponent },
  // { path: 'sites',     component: HeroesComponent },
  // { path: 'forms',     component: GroupsComponent },
  // { path: 'stage/add/:id',     component: AddStageComponent }
 { path: '', redirectTo: 'forms/site-forms/:id', pathMatch: 'full' },

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
