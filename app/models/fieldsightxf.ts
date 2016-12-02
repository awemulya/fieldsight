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
