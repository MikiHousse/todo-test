import { makeAutoObservable } from 'mobx';
export interface ITodo {
	id: number;
	name: string;
	description: string;
	show: boolean;
	done: boolean;
}

class TodoStore {
	todoList: ITodo[] = [
		{
			id: 1,
			name: 'Task 1',
			description: 'Add task',
			show: false,
			done: false,
		},
		{
			id: 2,
			name: 'Task 2',
			description: 'delete task',
			show: false,
			done: false,
		},
	];
	todo: ITodo = this.resetTodoData();

	resetTodoData() {
		return {
			id: Math.max(0, Math.max(...this.todoList.map(({ id }) => id))) + 1,
			name: '',
			description: '',
			show: false,
			done: false,
		};
	}

	constructor() {
		makeAutoObservable(this);
	}

	addTodo() {
		this.todoList.push(this.todo);
		this.todo = this.resetTodoData();
	}

	showTodo(id: number) {
		const todo = this.todoList.find((t) => t.id === id);
		if (todo) {
			todo.show = !todo.show;
		}
	}
}
const todoStore = new TodoStore();
export default todoStore;
