'use client';
import { FC, useState } from 'react';
import cls from './TodoApp.module.scss';
import { observer } from 'mobx-react-lite';
import { ITodoModel } from '@/store/TodoStore';
import todosStore from '@/store/TodoStore';

const initialState = [
	{
		id: 0,
		name: 'Task 1',
		description: 'Написать код',
		check: true,
		subTasksState: [{ id: 0, name: 'Buy milk', check: true, subTasksState: [] }],
	},
	{
		id: 1,
		name: 'Task 2',
		description: 'Сделать туду',
		check: true,
		subTasksState: [{ id: 0, name: 'Buy milk', check: true, subTasksState: [] }],
	},
	{
		id: 2,
		name: 'Task 3',
		description: 'Помыть кошку',
		check: false,
		subTasksState: [{ id: 0, name: 'Buy milk', check: true, subTasksState: [] }],
	},
];

let nextId = initialState.length;

const TodoApp: FC = observer(() => {
	const [isName, setIsName] = useState('');
	const [isDescription, setIsDescription] = useState('');
	const [tasks, setTasks] = useState(initialState);
	const [isOpen, setIsOpen] = useState(false);
	const [taskNumber, setTaskNumber] = useState(0);
	const [showSubtasks, setShowSubtasks] = useState(false);

	const handleSubtaskClick = () => {
		setShowSubtasks(!showSubtasks);
	};

	function showTaskDescription(id: number) {
		setTaskNumber(id);
		const task = tasks[id];
		console.log(`Описание для задачи "${task.name}": ${task.description}`);
	}

	function showTask(id: number) {
		const task = tasks[id];
		setIsOpen(!isOpen);
		console.log(`открыт ${task.name}`);
	}

	const handleAddTaskClick = (isName: string) => {
		setTasks([
			...tasks,
			{ id: nextId++, name: isName, description: isDescription, check: false, subTasksState: [] },
		]);
	};

	const handleOpenClick = () => {
		setIsOpen(!isOpen);
	};

	const task = tasks[taskNumber];

	return (
		<div className={cls.TodoApp}>
			<div className={cls.todoInfo}>
				<ul>
					{todosStore.todosList.map((el: ITodoModel) => (
						<li
							key={el.id}
							className={cls.task}
							// onClick={() => {
							// 	handleSubtaskClick;
							// 	showTaskDescription(el.id);
							// }}
						>
							<span>{el.text}</span>
							<input type='checkbox' defaultChecked={el.done} />
							{/* {showSubtasks
								? el.subTasksState.map((subTask) => (
										<div
											onClick={() => handleOpenClick()}
											key={el.id + '-' + subTask.id}
											className={cls.subTask}>
											<span>{subTask.name}</span>
											<input type='checkbox' defaultChecked={subTask.check} />
										</div>
								  ))
								: ''} */}
						</li>
					))}
				</ul>
				<div>
					{' '}
					<form className={cls.input} onClick={() => setIsOpen(false)}>
						<input type='text' onChange={(e) => setIsName(e.target.value)} />
						<input
							value={isDescription}
							type='text'
							onChange={(e) => (todosStore.todo.text = e.target.value)}
						/>
						<button
							onClick={(e) => {
								e.preventDefault();
								todosStore.addTodo();
								// setIsName('');
								// handleAddTaskClick(isName);
							}}>
							Add Task
						</button>
					</form>
					<div>
						<h2>{task.name}</h2>
						<p>{task.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
});

export default TodoApp;
