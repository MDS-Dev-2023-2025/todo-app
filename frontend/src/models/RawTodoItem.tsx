class RawTodoItem {
  id: string;
  title: string;
  completed: boolean = false;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}

export default RawTodoItem;
