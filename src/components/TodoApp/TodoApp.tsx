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
	const [todoInfo, setTodoInfo] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleAddTodoClick = () => {
		setIsOpen(true);
		setAddTodo(true);
		setTodoInfo(false);
	};

	return (
		<>
			<div className={cls.TodoApp}>
				{/* <div>
				<form>
					<input type="text" />
					<button onClick={todoStore.addSubtodo(el.id , el.name)}></button>
				</form>
			</div> */}
				<div className={cls.todo}>
					<div className={cls.todoList}>
						{todoStore.todoList.map((el: ITodo) => (
							<div
								key={el.id}
								className={cls.list}
								onClick={() => {
									todoStore.selectTodo(el.id);
									setAddTodo(false);
									setTodoInfo(true);
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
										<form>
											<input
												type='text'
												onChange={(e) => {
													todoStore.todo.name = e.target.value;
												}}
											/>
											<button
												onClick={(e) => {
													e.preventDefault();
													todoStore.addSubtodo();
												}}>
												add
											</button>
										</form>
									</div>
								) : (
									''
								)}
							</div>
						))}
						<div>
							<button className={cls.addTodo} onClick={handleAddTodoClick}>
								<BsPlusLg className={cls.plus} size={30} color='white' />
							</button>
						</div>
					</div>
					{/* {todoInfo ? (

					) : (
						''
					)} */}
					<div className={cls.todoInfo}>
						<h2>{todoStore.todo.name === undefined ? '' : todoStore.todo.name}</h2>
						<p>{todoStore.todo.description}</p>
					</div>
				</div>
			</div>
			{addTodo ? (
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
					{' '}
					<div className={cls.forms}>
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
						</form>
						<button
							onClick={(e) => {
								e.preventDefault();
								todoStore.addTodo();
							}}>
							Add Task
						</button>
					</div>
				</Modal>
			) : (
				''
			)}
		</>
	);
});

export default TodoApp;
