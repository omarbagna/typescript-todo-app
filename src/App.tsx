import { useState } from 'react';
import {
	MdOutlineDarkMode,
	MdOutlineLightMode,
	MdOutlineDeleteSweep,
} from 'react-icons/md';
import Task from './components/Task';

type SingleTask = { id: number; name: string };
type Tasks = SingleTask[];

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTasks] = useState<Tasks>([]);

	const deleteTask = (task: SingleTask) => {
		setTasks((prev) => prev.filter((item) => item?.id !== task?.id));
	};

	const clearTasks = () => {
		setTasks([]);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const addTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue !== '') {
			setTasks((prev) => [
				...prev,
				{ id: Math.floor(Math.random() * 10), name: inputValue },
			]);

			setInputValue('');
		}
	};

	const saveTask = (task: SingleTask) => {
		const currentTasks = [...tasks];
		currentTasks[currentTasks.findIndex((item) => item?.id === task?.id)].name =
			task?.name;

		setTasks(currentTasks);
	};

	const updateDarkMode = () => {
		setDarkMode((darkMode) => !darkMode);
	};

	return (
		<div className={darkMode ? 'dark' : ''}>
			<div className="w-full h-screen flex flex-col justify-start items-center bg-gray-300 dark:bg-gray-900">
				<div className="w-full h-1/4 md:h-1/3 lg:h-1/2 bg-gradient-to-r from-purple-900 to-indigo-800 flex flex-col justify-center items-center gap-10 text-gray-100 px-6 md:px-32 lg:px-60">
					<div className="w-full flex justify-between items-end gap-5">
						<h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold capitalize">
							Todo List
						</h1>
						<button
							type="button"
							className="p-2 rounded-md bg-gray-200 text-black dark:bg-gray-800 dark:text-gray-200 text-2xl"
							onClick={updateDarkMode}>
							{darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
						</button>
					</div>
					<form
						onSubmit={addTask}
						className="w-full h-fit relative rounded-lg overflow-hidden">
						<input
							type="text"
							value={inputValue}
							onChange={handleChange}
							className="w-full h-14 pl-4 pr-16 py-1 border border-gray-800 text-purple-900 outline-none focus:ring-0 shadow-lg dark:bg-gray-700 dark:border-gray-400 dark:text-gray-300 rounded-lg"
						/>

						<button
							type="submit"
							className="absolute top-1/2 -translate-y-1/2 right-1 px-2 py-1 h-12 rounded-md bg-purple-900 text-white transition-all duration-300 ease-in-out hover:shadow-md dark:bg-gray-500 dark:text-gray-200 text-xl font-medium">
							Add
						</button>
					</form>
				</div>

				<div className="w-full h-3/4 md:h-2/3 lg:h-1/2 relative">
					<div className="w-11/12 md:w-8/12 bg-white border border-gray-500 dark:bg-gray-700 dark:border-gray-400 h-full absolute shadow-md z-10 left-1/2 -translate-x-1/2 -top-16 rounded-lg flex flex-col justify-start items-start py-3">
						<div className="w-full flex justify-between items-center gap-5 pb-5 px-2 border-b border-gray-500">
							<span className="text-sm font-light italic capitalize text-gray-500 dark:text-gray-400">
								{tasks?.length} tasks added
							</span>
							{tasks?.length === 0 ? null : (
								<button
									type="button"
									onClick={clearTasks}
									className="px-2 py-1 rounded-md bg-transparent text-red-400 border border-red-400 transition-all duration-300 ease-in-out hover:shadow-md hover:bg-red-400 hover:text-gray-100 dark:bg-red-400 dark:text-gray-100 text-2xl capitalize font-medium">
									<MdOutlineDeleteSweep />
								</button>
							)}
						</div>

						{tasks?.map((task) => (
							<Task
								key={task?.id}
								deleteTask={deleteTask}
								task={task}
								saveTask={saveTask}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
