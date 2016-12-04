import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { User, Token } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');
// import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: '../../templates/user/user.component.html',
})

export class UserComponent implements OnInit {
  // @LocalStorage() public token:string = "";
  // @LocalStorage('differentLocalStorageKey') public lastSearchQuery:Object = {};
  model: User;
  token: string;
    
    constructor(
    // private localStorageService: LocalStorageService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {

      // this.token = this.userService.getToken();
    }

  ngOnInit(): void {
    this.model = new User("", "");
    if(this.token){

    this.router.navigate(['/dashboard']);
      
    }
    
     }

  loginUser(){
    this.userService.checkUser(this.model)
        .then(user => this.token = user.token);
    if(this.token){
          console.log("login sucess");
          this.router.navigate(['/dashboard']);
          // this.userService.setToken(this.token);
          // this.localStorageService.set("token", this.token);
    }else{

    alert("Incorrect Email or Password, Please Try Again.");
  }
  }

   goBack(): void {
    this.location.back();
  }

   
}

