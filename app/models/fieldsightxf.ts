export class FieldsightXF {
  constructor(
    public id: number,
    public xf: number,
    public site: number,
    public is_staged: boolean,
    public is_scheduled: boolean,
    public schedule: number,
    public stage: number,
    public shared_level: number
    
  ) {  }
}

export class Xform{

    constructor(
    public id: number,
    public title: string,
        ){}
}

export class User {
  constructor(
    public email_or_username: string,
    public password: string) { }
}

export class Token {
  constructor(
    public token: string,) { }
}


export class Stage{

    constructor(
    public id: number,
    public order: number,
    public stage: number,
    public name: string,
    public description: string,
    public main_stage: string,
        ){}
}
export class Schedule{

    constructor(
    public id: number,
    public name: string,
    public days: string,
    public selected_days: any,
    public date_range_start: string,
    public date_range_end: string,
        ){}
}