import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupsService } from '../../services/groups/groups.service'
import { HeroService } from '../../hero.service';

import { Hero }                from '../../hero';
import { Location } from '@angular/common';

@Component({
  selector: 'dinosaurs',
  templateUrl: `
  Add Stage Here
  `,
  styleUrls: [ '/static/ng/app/heroes.component.css' ] 
})
export class AddStageComponent implements OnInit {
hero: Hero;
constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) { }

 ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

}
