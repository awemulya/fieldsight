import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Hero }                from '../../hero';
import { GroupsService } from '../../services/groups/groups.service'

@Component({
  selector: 'dinosaurs',
  templateUrl: `
  <h2> Form Groups </h2>
<div *ngIf="selectedGroup">
  <h2>
    {{selectedGroup.name | uppercase}} 
    {{selectedGroup.description}} 
  </h2>
  stages List of {{selectedGroup.name}}
  <!-- put some component here e.g  -->
</div>


<ul class="heroes">
  <li *ngFor="let group of groups" (click)="onSelect(group)"
      [class.selected]="group === selectedGroup">
    <span>{{group.name}}</span>
 
      <button class="heros"
      (click)="onSelect(group); $event.stopPropagation()">Detail</button>
  </li> 
</ul>


  `,
  styleUrls: [ '/app/heroes.component.css' ] 
})
export class GroupsComponent implements OnInit {
  groups: any[];
  error: any;
  selectedGroup: Hero;
  stagesOf: Hero;
  showAdd: boolean;

  constructor(private groupsService: GroupsService,
  private router: Router) { }

  getGroups() {
    this.groupsService
        .getGroups()
        .then(groups => this.groups = groups)
        .catch(error => this.error = error);
  }

  delete(group: Hero): void {
    console.log("implement delete")
  }

  ngOnInit() {
    this.getGroups();
  }
  onSelect(group: Hero): void {
    this.selectedGroup = group;
  }
 
  
}
