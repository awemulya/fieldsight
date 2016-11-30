import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
// Imports for loading & configuring the in-memory web api
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { GroupsComponent }      from './components/groups/groups.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { GroupsService }      from './services/groups/groups.service';
import { HeroSearchComponent }  from './hero-search.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    GroupsComponent
  ],
  providers: [ HeroService, GroupsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
