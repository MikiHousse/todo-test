import { classNames } from '@/utils/classNames';
import cls from './Modal.module.scss';
import { ReactNode, useCallback, useEffect } from 'react';
import { Portal } from '../Portal/Portal';

interface ModalProps {
	isOpen: boolean;
	onClose?: () => void;
	children?: ReactNode;
}

const Modal = (props: ModalProps) => {
	const { isOpen, onClose, children } = props;

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const closeHandler = useCallback(() => {
		if (onClose) {
			onClose();
		}
	}, [onClose]);

	const mods: Record<string, boolean> = {
		[cls.opened]: isOpen,
	};

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler();
			}
		},
		[closeHandler],
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods)}>
				<div className={cls.overlay} onClick={closeHandler}>
					<div className={cls.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
