import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups/groups.service'

@Component({
  selector: 'dinosaurs',
  templateUrl: '/app/templates/groups/groups.component.html', 
})
export class GroupsComponent implements OnInit {
  dinos: any[];
  error: any;

  constructor(private groupsService: GroupsService) { }

  getDinos() {
    this.groupsService
        .getDinos()
        .then(dinos => this.dinos = dinos)
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getDinos();
  }
}
