import Button from '@/components/Button/Button';
import cls from './page.module.scss';
import TodoApp from '@/components/TodoApp/TodoApp';

interface IPage {
	toggleTheme: () => void;
}

const Page = ({ toggleTheme }: IPage) => {
	return (
		<main className={cls.Page}>
			<div className={cls.btnPage}>
				<Button onClick={toggleTheme}>Toggler</Button>
			</div>
			<TodoApp />
		</main>
	);
};

export default Page;
