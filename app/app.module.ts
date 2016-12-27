import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
// import { DashboardComponent }   from './dashboard.component';
// import { GroupsComponent }      from './components/groups/groups.component';
// import { HeroesComponent }      from './heroes.component';
// import { HeroDetailComponent }  from './hero-detail.component';
// import { HeroService }          from './hero.service';
import { GroupsService }      from './services/groups/groups.service';
import { XformService }      from './services/xform/xform.service';
import { StageService }      from './services/stage/stage.service';
import { ScheduleService }      from './services/schedule/schedule.service';
// import { UserService }      from './services/user/user.service';
// import { HeroSearchComponent }  from './hero-search.component';
// import { AddStageComponent }  from './components/stage/add-stage.component';
import { SiteFormsComponent }  from './components/site/site-forms.component';
import { SiteStagesComponent }  from './components/stage/site-stages.component';
// import { UserComponent }  from './components/user/user.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// import {LocalStorageService, LocalStorageSubscriber} from 'angular2-localstorage/LocalStorageEmitter';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    AppComponent,
    // DashboardComponent,
    // HeroDetailComponent,
    // HeroesComponent,
    // HeroSearchComponent,
    // GroupsComponent,
    // AddStageComponent,
    SiteFormsComponent,
    SiteStagesComponent,
    // UserComponent
  ],
  providers: [GroupsService, XformService, StageService, ScheduleService ],
  exports:[],
  bootstrap: [ AppComponent]
})
export class AppModule {

}
