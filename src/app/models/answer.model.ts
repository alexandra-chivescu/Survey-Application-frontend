export class Answer {
  public id : number;
  public question_id : number;
  public answer : string;
  public noResponses : number;

  constructor(id: number, question_id: number, answer: string, noResponses: number) {
    this.id = id;
    this.question_id = question_id;
    this.answer = answer;
    this.noResponses = noResponses;
  }
}
