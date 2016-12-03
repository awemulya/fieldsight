import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { GroupsService } from '../../services/groups/groups.service';
import { XformService } from '../../services/xform/xform.service';
import { StageService } from '../../services/stage/stage.service';
import { FieldsightXF, Xform, Stage, Schedule } from '../../models/fieldsightxf';

@Component({
  moduleId: module.id,
  selector: 'site-forms',
  templateUrl: '../../templates/site/site-forms.component.html'
})

export class SiteFormsComponent implements OnInit {
  id: number;
  siteForms: FieldsightXF[];
  xForms: Xform[];
  stages: Stage[];
  schedules: Schedule[];
  displayForm = false;
  model = new FieldsightXF(undefined,undefined,undefined,false,false,undefined,undefined,2);
  submitted = false;
  formType = 3;
  formTypes = [{'id': 1, type:"Staged"},{'id': 2, type:"Scheduled"},{'id': 3, type:"Normal"}]
  shared_levels = [{'id': 1, type:"Global"},{'id': 2, type:"Organization"},{'id': 3, type:"Private"}]

    constructor(
    private groupService: GroupsService,
    private xformService: XformService,
    private stageService: StageService,
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

  onSubmit() { 
    this.submitted = true;
    alert("Form Saved")
    this.displayForm = false;
    // if(this.model.is_staged == true && !this.model.stage){
    //   this.model.stage.value.markAsDirty();
    // }else if(this.model.is_scheduled == true && !this.model.schedule){
    //  this.model.schedule.value.markAsDirty();
    // }else{

    //   console.log(this.model.xf);
    // }

   }
  newForm() {
    this.displayForm = true;
    this.getXforms()
    this.model = new FieldsightXF(undefined,undefined,this.id,false,false,undefined,undefined,2);
  }

  goBack(): void {
    this.location.back();
  }

  setStageSchedule(formtype: number){

    if(formtype == 1){
      this.model.is_staged = true;
      this.model.is_scheduled = false;
      this.model.schedule = undefined;
      this.getStages();
    }else if(formtype == 2){
      this.model.is_staged = false;
      this.model.is_scheduled = true;
      this.model.stage = undefined;
      this.getSchedules();
    }else if(formtype == 3){
      this.model.is_staged = false;
      this.model.is_scheduled = false;
      this.model.stage = undefined;
      this.model.schedule = undefined;
    }
  }

  onChange(newValue:number) {
    this.formType = newValue;
    this.setStageSchedule(newValue);
}
  onChangeSharedLevel(newValue:number) {
    this.model.shared_level = newValue;
}
   getXforms(){

     this.xformService.getForms()
        .then(xForms => this.xForms = xForms);
   }

  getStages(){
    this.stageService.getStages()
        .then(stages => this.stages = stages);
  }
  getSchedules(){
    this.stageService.getSchedules()
        .then(schedules => this.schedules = schedules);
  }
  reloadForms(){
    this.xformService.getForms()
        .then(xForms => this.xForms = xForms);

  }
}
