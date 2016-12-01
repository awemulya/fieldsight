import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Hero }        from '../../hero';
import { GroupsService } from '../../services/groups/groups.service'
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: '../../templates/site/site-forms.component.html',
  styleUrls: [ '../../hero-detail.component.css' ]
})
export class SiteFormsComponent implements OnInit {
  siteForms: Hero[];
  constructor(
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.groupService.getForms(+params['id']))
      .subscribe(siteForms => this.siteForms = siteForms);
  }
  goBack(): void {
    this.location.back();
  }
}
