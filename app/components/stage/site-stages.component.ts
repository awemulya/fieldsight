import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { GroupsService } from '../../services/groups/groups.service';
import { XformService } from '../../services/xform/xform.service';
// import { UserService } from '../../services/user/user.service';
import { StageService } from '../../services/stage/stage.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { FieldsightXF, Xform, Stage, Schedule, Day } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');
@Component({
  moduleId: module.id,
  selector: 'site-stages',
  templateUrl: '../../templates/stage/site-stages.component.html',
  styleUrls: [ 'site-stages.component.css' ]
})

export class SiteStagesComponent implements OnInit {
  siteId: number;
  showCreateMainStage: boolean = true;
  siteStages: Stage[];
  subStages: Stage[];
  model = new FieldsightXF(undefined, undefined, undefined, false, false, undefined, undefined, 2);
  currentSubStage: Stage;
  xForms: Xform[];
  newStage: Stage;
  newSubStage: Stage;
  selectedMainStage: Stage;

  @ViewChild('formModal')
  formModal: ModalComponent;

  constructor(
    private xformService: XformService,
    private stageService: StageService,
    private route: ActivatedRoute,
    private location: Location,
     )
   {

   }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.stageService.getSiteMainStages(+params['id']))
      .subscribe(siteStages => this.siteStages = siteStages);
     this.route.params.subscribe(params => {
       this.siteId = +params['id'];
       });
     this.newStage = new Stage(undefined,undefined,undefined,undefined,undefined,undefined,this.siteId,undefined);
     }

  wait(ms:number){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

show_form(){
  return true;
}
order(){
  if(this.siteStages == null){

  return 1;
  }else{

  return this.siteStages.length + 1;
  }
}
    
  onSubmit() { 
    this.saveStage();
    this.newStage = new Stage(undefined,undefined,undefined,undefined,undefined,undefined,this.siteId,undefined);
    return false;
   }

  onSaveSubStage() { 
    this.saveSubStage();
    this.newSubStage = new Stage(undefined,undefined,this.selectedMainStage.id,undefined,undefined,undefined,this.siteId,undefined);
    return false;
   }

saveStage(){
        this.stageService.saveStage(this.newStage)
        .then(newStage => this.siteStages.push(newStage));
              

      }
    saveSubStage(){
        this.stageService.saveStage(this.newSubStage)
        .then(newStage => this.subStages.push(newStage));
              

      }

mainStageOnSelect(stage: Stage): void {
    this.showCreateMainStage = false;
    this.selectedMainStage = stage;
    this.stageService.getSubStages(stage.id)
      .then(subStages => this.subStages = subStages);
    this.newSubStage = new Stage(undefined,undefined,this.selectedMainStage.id,undefined,undefined,undefined,this.siteId, undefined);
  }

  openAssignForm(stage: Stage){
    this.model.xf = undefined;
    this.model.stage = stage.id;
    this.currentSubStage = stage;
    this.xformService.getForms()
        .then(xForms => this.xForms = xForms);
    this.formModal.open();

  }

 assignFormClose() {
     // this.saveStage();
     // this.wait(1000);
    this.xformService.saveAssignedForm(this.model)
    .then(fsxf => this.formSaved(fsxf));
      this.formModal.close();
}
formSaved(fsxf: any){
  
    for (var i = 0; i < this.subStages.length; i++) {
            var stage = this.subStages[i];

            if (stage.id == this.currentSubStage.id) {

             this.subStages[i].form = this.currentSubStage.form;
        }
      }
 
}

setFormAssigned(xf: Xform){
  this.currentSubStage.form = xf.title;
  this.model.site = this.siteId;
  this.model.xf = xf.id;
  this.model.is_staged = true;
}

showMainStages(){
  this.showCreateMainStage = true;
  this.selectedMainStage = null;
  
}
  goBack(): void {
    this.location.back();
  }

}
