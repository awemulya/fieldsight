import { Component, OnInit } from '@angular/core';
import { DinosaurService } from '../../services/groups/groups.service'

@Component({
  selector: 'dinosaurs',
  templateUrl: '/app/templates/groups/groups.component.html', 
})
export class DinosaurComponent implements OnInit {
  dinos: any[];
  error: any;

  constructor(private dinosaurService: DinosaurService) { }

  getDinos() {
    this.dinosaurService
        .getDinos()
        .then(dinos => this.dinos = dinos)
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getDinos();
  }
}
