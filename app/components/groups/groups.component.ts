import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Hero }                from '../../hero';
import { GroupsService } from '../../services/groups/groups.service'

@Component({
  selector: 'dinosaurs',
  templateUrl: '/app/templates/groups/groups.component.html',
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
