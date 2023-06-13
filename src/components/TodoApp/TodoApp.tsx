'use client';
import { FC, useState } from 'react';
import cls from './TodoApp.module.scss';
import { observer } from 'mobx-react-lite';
import { ITodo } from '@/store/TodoStore';
import todoStore from '@/store/TodoStore';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import Modal from '../Modal/Modal';

const TodoApp: FC = observer(() => {
	const [addTodo, setAddTodo] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleAddTodoClick = () => {
		todoStore.reset();
		setIsOpen(true);
		setAddTodo(true);
	};

	return (
		<>
			<div className={cls.TodoApp}>
				<div className={cls.todo}>
					<div className={cls.todoList}>
						{todoStore.todoList.map((el: ITodo) => (
							<div
								key={el.id}
								className={cls.list}
								onClick={() => {
									todoStore.selectTodo(el.id);
									setAddTodo(false);
								}}>
								<div className={cls.item}>
									<button className={cls.btnShow} onClick={() => todoStore.showTodo(el.id)}>
										{el.show ? <AiFillCaretDown /> : <AiFillCaretUp />}
									</button>
									<span className={cls.name}>
										{el.id}. {el.name}
									</span>
									<input className={cls.checkbox} type='checkbox' defaultChecked={el.done} />
								</div>
								{el.show ? (
									<div>
										{el.subtodo?.map((el) => {
											return <span>{el.name}</span>;
										})}
										<button className={cls.addSubTask}>Add a subtask</button>
									</div>
								) : (
									''
								)}
							</div>
						))}
						<div>
							<button className={cls.addTodo} onClick={handleAddTodoClick}>
								<BsPlusLg className={cls.plus} size={40} color='white' />
							</button>
						</div>
					</div>
					<div className={cls.todoInfo}>
						<h2>{todoStore.todo.name === undefined ? '' : todoStore.todo.name}</h2>
						<p>{todoStore.todo.description}</p>
					</div>
				</div>
			</div>
			{addTodo ? (
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
					<div className={cls.forms}>
						<form className={cls.modalForm}>
							<input
								placeholder='Todo title'
								className={cls.inputModal}
								type='text'
								value={todoStore.todo.name}
								onChange={(e) => (todoStore.todo.name = e.target.value)}
							/>
							<textarea
								className={cls.textareModal}
								placeholder='Describe the task'
								rows={5}
								cols={100}
								value={todoStore.todo.description}
								onChange={(e) => (todoStore.todo.description = e.target.value)}
							/>
						</form>
						<div className={cls.addTodoBtn}>
							<button
								onClick={(e) => {
									e.preventDefault();
									todoStore.addTodo();
									setIsOpen(false);
								}}>
								Add Task
							</button>
						</div>
					</div>
				</Modal>
			) : (
				''
			)}
		</>
	);
});

export default TodoApp;
