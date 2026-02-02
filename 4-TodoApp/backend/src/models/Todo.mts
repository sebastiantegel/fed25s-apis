export class Todo {
  id: number;
  text: string;
  done: boolean;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
    this.done = false;
  }
}
