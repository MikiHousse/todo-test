import { makeAutoObservable } from 'mobx';

interface ISubTodo {
	id: number;
	name: string;
	description: string;
	show: boolean;
	done: boolean;
	subtodo: ISubTodo[];
}

export interface ITodo {
	id: number;
	name: string;
	description: string;
	show: boolean;
	done: boolean;
	subtodo: ISubTodo[];
}

class TodoStore {
	todoList: ITodo[] = [
		{
			id: 1,
			name: 'Todo',
			description: 'Add Todo',
			show: false,
			done: false,
			subtodo: [],
		},
		{
			id: 2,
			name: 'Todo',
			description: 'delete todo',
			show: false,
			done: false,
			subtodo: [],
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
			subtodo: [],
		};
	}

	constructor() {
		makeAutoObservable(this);
	}

	addTodo = () => {
		this.todoList.push(this.todo);
		this.todo = this.resetTodoData();
	};

	showTodo = (id: number) => {
		const todo = this.todoList.find((t) => t.id === id);
		if (todo) {
			todo.show = !todo.show;
		}
	};

	selectTodo = (id: number) => {
		const todo = this.todoList.find((t) => t.id === id);
		if (todo) {
			this.todo = todo;
		}
	};

	addSubtodo = () => {
		this.todoList.push(this.todo);
		this.todo = this.resetTodoData();
	};
}
const todoStore = new TodoStore();
export default todoStore;
