export class Survey {
  public id : number;
  public title : string;
  public creator : string;
  public start_Date : Date;
  public end_Date : Date;

  constructor(id: number, title: string, creator: string, start_date: Date, end_date: Date) {
    this.id = id;
    this.title = title;
    this.creator = creator;
    this.start_Date = start_date;
    this.end_Date = end_date;
  }
}
