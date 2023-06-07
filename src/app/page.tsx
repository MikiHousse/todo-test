import styles from './page.module.scss';
import TodoApp from '@/components/TodoApp/TodoApp';

export default function Home() {
	return (
		<main className={styles.main}>
			<TodoApp />
		</main>
	);
}
