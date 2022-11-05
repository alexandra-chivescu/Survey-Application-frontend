export class Survey {
  public id : number;
  public title : string;
  public creator : string;
  public start_date : Date;
  public end_date : Date;

  constructor(id: number, title: string, creator: string, start_date: Date, end_date: Date) {
    this.id = id;
    this.title = title;
    this.creator = creator;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
