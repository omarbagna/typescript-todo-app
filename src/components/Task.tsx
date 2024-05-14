import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { TbTrash } from 'react-icons/tb';

type SingleTask = { id: number; name: string };

type Props = {
	task: SingleTask;
	deleteTask: (task: SingleTask) => void;
	saveTask: (value: SingleTask) => void;
};

const Task = ({ deleteTask, saveTask, task }: Props) => {
	const [inputValue, setInputValue] = useState(task?.name);
	const [editMode, setEditMode] = useState(false);

	const changeEditMode = () => {
		setEditMode((prev) => !prev);
	};

	const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const saveChanges = () => {
		if (inputValue === '') {
			deleteTask(task);
		} else {
			saveTask({ id: task.id, name: inputValue });
			changeEditMode();
		}
	};

	return (
		<div className="w-full flex justify-between items-center gap-3 py-2 px-4 border-b border-gray-500">
			{!editMode ? (
				<h3 className="w-full text-base font-medium text-gray-800 dark:text-gray-200">
					{task.name}
				</h3>
			) : (
				<input
					type="text"
					defaultValue={task.name}
					onChange={handleEdit}
					className="w-full px-2 py-1 text-purple-900 border border-purple-900  outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-300 rounded-lg"
				/>
			)}

			<div className="flex justify-center items-center gap-1 shrink-0">
				{!editMode ? (
					<>
						<button
							type="button"
							onClick={changeEditMode}
							className="p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-200 text-black dark:hover:bg-gray-800 dark:text-gray-200 text-xl">
							<FaRegEdit />
						</button>
						<button
							type="button"
							onClick={() => deleteTask(task)}
							className="p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-200 text-black dark:hover:bg-gray-800 dark:text-gray-200 text-xl">
							<TbTrash />
						</button>
					</>
				) : (
					<button
						type="button"
						onClick={saveChanges}
						className="px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-green-500/30 text-white bg-green-500 text-base">
						Save
					</button>
				)}
			</div>
		</div>
	);
};

export default Task;
