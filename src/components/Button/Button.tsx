import { ButtonHTMLAttributes } from 'react';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
	return (
		<button className={cls.Button} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
