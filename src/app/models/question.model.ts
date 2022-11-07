export class Question {
  public id : number;
  public survey_id : number;
  public title : string;


  constructor(id: number, survey_id: number, title: string) {
    this.id = id;
    this.survey_id = survey_id;
    this.title = title;
  }
}
