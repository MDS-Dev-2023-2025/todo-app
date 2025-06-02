class RawTodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;

  constructor(id: string, title: string, description: string, completed: boolean = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}

export default RawTodoItem;
