'use client';
import { useState } from 'react';
import './styles/globals.scss';
import Page from './page';

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
}

export default function RootLayout() {
	const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

	const toggleTheme = () => {
		setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
	};

	return (
		<html lang='en'>
			<body className={`app ${theme}`}>
				<Page toggleTheme={toggleTheme} />
			</body>
		</html>
	);
}
