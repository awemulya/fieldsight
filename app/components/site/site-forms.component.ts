import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { GroupsService } from '../../services/groups/groups.service';
import { XformService } from '../../services/xform/xform.service';
import { UserService } from '../../services/user/user.service';
import { StageService } from '../../services/stage/stage.service';
import { FieldsightXF, Xform, Stage, Schedule } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');

@Component({
  moduleId: module.id,
  selector: 'site-forms',
  templateUrl: '../../templates/site/site-forms.component.html'
})

export class SiteFormsComponent implements OnInit {
  siteId: number;
  siteForms: FieldsightXF[];
  xForms: Xform[];
  stages: Stage[];
  schedules: Schedule[];
  displayForm = false;  
  displayAddStage = false;
  displayAddSchedule = false;
  version = myGlobals.version
  username = myGlobals.username
  formType = 3
  model = new FieldsightXF(undefined, undefined, undefined, false, false, undefined, undefined, 2);
  formTypes = [{'id': 1, type:"Staged"},{'id': 2, type:"Scheduled"},{'id': 3, type:"Normal"}]
  shared_levels = [{'id': 1, type:"Global"},{'id': 2, type:"Organization"},{'id': 3, type:"Private"}]

  days = [
  {'index':0 , day: 'Monday',selected: false},
  {'index':1 , day: 'Tuesday',selected: false},
  {'index':2 , day: 'Wednesday',selected: false},
  {'index':3 , day: 'Thursday',selected: false},
  {'index':4 , day: 'Friday',selected: false},
  {'index':5 , day: 'Saturday',selected: false},
  {'index':6 , day: 'Sunday',selected: false}
  ]
  selectedDays: any;
  new_schedule: Schedule = new Schedule(undefined,undefined,undefined,undefined,undefined,undefined);

  @ViewChild('scheduleModal')
  scheduleModal: ModalComponent;

  @ViewChild('stageModal')
  stageModal: ModalComponent;

  

    constructor(
    private groupService: GroupsService,
    private xformService: XformService,
    private stageService: StageService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.groupService.getForms(+params['id']))
      .subscribe(siteForms => this.siteForms = siteForms);
     this.route.params.subscribe(params => {
       this.siteId = +params['id'];
       });
     }



    newScheduleClose() {
        this.scheduleModal.close();
        console.log("closed");
    }

    newScheduleOpen() {
        this.new_schedule = new Schedule(undefined,undefined,undefined,undefined,undefined,undefined);
        this.scheduleModal.open();
        console.log("opened");
    }

       newStageModalClose() {
        this.stageModal.close();
        console.log("closed");
    }

    newStageModalOpen() {
        this.stageModal.open();
        console.log("opened");
    }

  onSubmit() { 
    this.saveAssignedForm();
    this.reloadForms();
    this.displayForm = false;
    // this.groupService.getForms(this.id) reload site forms again
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
    this.model = new FieldsightXF(undefined,undefined,this.siteId,false,false,undefined,undefined,2);
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
    this.groupService.getForms(this.siteId)
        .then(siteForms => this.siteForms = siteForms);

  }
  saveAssignedForm(){
    this.xformService.saveAssignedForm(this.model);
  }

  getToken() {
      return this.userService.getToken();
    }

    addStage(){
      this.displayAddStage = true;
    }

    setSelected(selectElement:any) {
        for (var i = 0; i < selectElement.options.length; i++) {
            var optionElement = selectElement.options[i];
            var optionModel = this.days[i];

            if (optionElement.selected == true) { optionModel.selected = true; }
            // else { optionModel.selected = false; }
        }
        this.getSelected();
    }
    getSelected(){
      this.selectedDays = this.days.filter((item) => { return item.selected === true; });
    }
}
