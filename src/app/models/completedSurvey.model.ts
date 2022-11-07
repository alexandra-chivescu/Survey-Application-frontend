export class CompletedSurvey {
  public id : number;
  public user_id : number;
  public survey_id : number;

  constructor(id: number, user_id: number, survey_id: number) {
    this.id = id;
    this.user_id = user_id;
    this.survey_id = survey_id;
  }
}
