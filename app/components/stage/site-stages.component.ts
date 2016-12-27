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
  templateUrl: '../../templates/stage/site-stages.component.html'
})

export class SiteStagesComponent implements OnInit {
  siteId: number;
  siteStages: Stage[];
  xForms: Xform[];
  newStage: Stage;

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
     this.newStage = new Stage(undefined,undefined,undefined,undefined,undefined,undefined,this.siteId);
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
    this.newStage = new Stage(undefined,undefined,undefined,undefined,undefined,undefined,this.siteId);
    // saveStage
    return false;
   }

saveStage(){
        this.stageService.saveStage(this.newStage)
        .then(newStage => this.siteStages.push(newStage));
              

      }


  goBack(): void {
    this.location.back();
  }

}
