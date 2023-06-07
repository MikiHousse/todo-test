'use client';
import { FC } from 'react';
import cls from './TodoApp.module.scss';
import { observer } from 'mobx-react-lite';
import { ITodo } from '@/store/TodoStore';
import todoStore from '@/store/TodoStore';

const TodoApp: FC = observer(() => {
	return (
		<div className={cls.TodoApp}>
			<div className={cls.todoInfo}>
				<ul>
					{todoStore.todoList.map((el: ITodo) => (
						<li key={el.id} className={cls.task} onClick={() => todoStore.showTodo(el.id)}>
							<span>{el.name}</span>
							{el.show ? <p>{el.description}</p> : ''}

							<input type='checkbox' defaultChecked={el.done} />
						</li>
					))}
				</ul>
				<div>
					{' '}
					<form className={cls.input}>
						<input
							type='text'
							value={todoStore.todo.name}
							onChange={(e) => (todoStore.todo.name = e.target.value)}
						/>
						<input
							type='textarea'
							value={todoStore.todo.description}
							onChange={(e) => (todoStore.todo.description = e.target.value)}
						/>
						<button
							onClick={(e) => {
								e.preventDefault();
								todoStore.addTodo();
							}}>
							Add Task
						</button>
					</form>
				</div>
			</div>
		</div>
	);
});

export default TodoApp;
