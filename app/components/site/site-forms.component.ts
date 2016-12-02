import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { GroupsService } from '../../services/groups/groups.service';
import { FieldsightXF } from '../../models/fieldsightxf';

@Component({
  moduleId: module.id,
  selector: 'site-forms',
  templateUrl: '../../templates/site/site-forms.component.html'
})

export class SiteFormsComponent implements OnInit {
  id: number;
  siteForms: FieldsightXF[];
  displayForm = false;
  model = new FieldsightXF(undefined,undefined,undefined,false,false,undefined,undefined,2);
  submitted = false;
  formType = 3;
  formTypes = [{'id': 1, type:"Staged"},{'id': 2, type:"Scheduled"},{'id': 3, type:"Normal"}]
  shared_levels = [{'id': 1, type:"Global"},{'id': 2, type:"Organization"},{'id': 3, type:"Private"}]

    constructor(
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.groupService.getForms(+params['id']))
      .subscribe(siteForms => this.siteForms = siteForms);
     this.route.params.subscribe(params => {
       this.id = +params['id'];
       });

  }

  onSubmit() { this.submitted = true;
    if(this.model.is_staged == true && !this.model.stage){
      alert("Stage Data Missing");  
    }
     if(this.model.is_scheduled == true && !this.model.schedule){
      alert("Schedule Data Missing");  
    }
    al

   }
  newForm() {
    this.displayForm = true;
    this.model = new FieldsightXF(undefined,undefined,this.id,false,false,undefined,undefined,2);
  }

  goBack(): void {
    this.location.back();
  }

  setStageSchedule(formtype: number){

    if(formtype == 1){
      this.model.is_staged = true;
      this.model.is_scheduled = false;
    }else if(formtype == 2){
      this.model.is_staged = false;
      this.model.is_scheduled = true;
    }else{
      this.model.is_staged = false;
      this.model.is_scheduled = false;
    }
  }

  onChange(newValue:number) {
    this.formType = newValue;
    this.setStageSchedule(newValue);
}
  onChangeSharedLevel(newValue:number) {
    this.model.shared_level = newValue;
}
}
