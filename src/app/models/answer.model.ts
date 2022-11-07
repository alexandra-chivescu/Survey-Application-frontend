export class Answer {
  public id : number;
  public question_id : number;
  public answer : string;

  constructor(id: number, question_id: number, answer: string) {
    this.id = id;
    this.question_id = question_id;
    this.answer = answer;
  }
}
