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
import { ScheduleService } from '../../services/schedule/schedule.service';
import { FieldsightXF, Xform, Stage, Schedule, Day } from '../../models/fieldsightxf';
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
  mainStages: Stage[];
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

  days: Day[];
  
  selectedDays: Day[];
  new_schedule: Schedule = new Schedule(undefined,undefined,undefined,[],undefined,undefined);
  new_stage: Stage = new Stage(undefined,undefined,undefined,undefined,undefined,undefined);

  @ViewChild('scheduleModal')
  scheduleModal: ModalComponent;

  @ViewChild('stageModal')
  stageModal: ModalComponent;




  

    constructor(
    private groupService: GroupsService,
    private xformService: XformService,
    private stageService: StageService,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
     )
   {
     // this.new_schedule.valueChanges
     //         .debounceTime(400)
     //         .subscribe(value => console.log(value));
   }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.groupService.getForms(+params['id']))
      .subscribe(siteForms => this.siteForms = siteForms);
     this.route.params.subscribe(params => {
       this.siteId = +params['id'];
       });
     }

  wait(ms:number){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

    newScheduleClose() {
      this.saveSchedule();
      // this.wait(2000);
      
        this.scheduleModal.close();
       
   
        
    }
    
    saveSchedule(){
    this.scheduleService.saveSchedule(this.new_schedule)
        .then(new_schedule => this.schedules.push(new_schedule));
        }


    newScheduleOpen() {
        this.getDays();
        this.new_schedule = new Schedule(undefined,undefined,undefined,[],undefined,undefined);
        this.scheduleModal.open();
    }

     newStageClose() {
       this.saveStage();
       // this.wait(1000);
      
        this.stageModal.close();
    }

    saveStage(){
        this.stageService.saveStage(this.new_stage)
        .then(new_stage => this.stages.push(new_stage));
              

      }


    newStageOpen() {
      this.getMainStages();
        this.new_stage = new Stage(undefined,undefined,undefined,undefined,undefined,undefined);
        this.stageModal.open();
    }

  onSubmit() { 
    this.saveAssignedForm();
    this.reloadForms();
    this.displayForm = false;
    return false;
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
   
   getMainStages(){
    this.stageService.getMainStages()
        .then(stages => this.mainStages = stages);
  }
  getStages(){
    this.stageService.getStages()
        .then(stages => this.stages = stages);
  }
  getSchedules(){
    this.scheduleService.getSchedules()
        .then(schedules => this.schedules = schedules);
  }

  getDays(){
    this.scheduleService.getDays()
        .then(days => this.days = days);
  }
  reloadForms(){
    this.groupService.getReloadedForms(this.siteId)
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

            if (optionElement.selected == true) {

             this.days[i].selected = true;
        }
      }
        this.getSelected();
  }
    getSelected(){
      this.selectedDays = this.days.filter((item) => {
        var index = this.new_schedule.selected_days.indexOf(item.id, 0);
        if(item.selected === true){
          if (index < 0) {
               this.new_schedule.selected_days.push(item.id);
            }

          return true;
        }else{
           if (index > -1) {
               this.new_schedule.selected_days.splice(index, 1);
            }

        }

        });
             
    }


}
