export class CompletedSurveyDto {
  public user_id : number;
  public survey_id : number;

  constructor(user_id: number, survey_id: number) {
    this.user_id = user_id;
    this.survey_id = survey_id;
  }
}
