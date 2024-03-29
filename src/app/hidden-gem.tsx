"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	setIsModalOpen: (isOpen: boolean) => void;
};

const Play = ({ setIsModalOpen }: Props) => {
	const handleOnClick = () => setIsModalOpen(true);

	return (
		<div className="absolute right-4 top-4 text-right">
			<button
				type="button"
				onClick={handleOnClick}
				className="mx-2 my-1 rounded-lg text-gray-400"
			>
				Play a Game
			</button>
			{/* <p>🤫 Shhh! I hide things on this page because it&apos;s a secret.</p> */}
		</div>
	);
};

const Game = ({ setIsModalOpen }: Props) => {
	const randomizePosition = () => {
		const modalSize = 500;
		const safeArea = (num: number) => Math.max(modalSize, num);
		const x = safeArea(
			Math.floor(Math.random() * window.innerWidth - modalSize),
		);
		const y = safeArea(
			Math.floor(Math.random() * window.innerHeight - modalSize),
		);
		return { x, y };
	};
	const [position, setPosition] = useState(randomizePosition());
	const [markerPosition, setMarkerPosition] = useState<
		{ x: number; y: number }[]
	>([]);
	const [count, setCount] = useState(0);

	const countTarget = 5;
	const isHidden = count < countTarget;

	const handleOnClick = () => {
		setCount((prev) => prev + 1);
		const countLeft = countTarget - count - 1;
		if (countLeft > 0) {
			toast(`Click ${countLeft} more to go!`);
		}
	};
	const handleOnClose = () => {
		setIsModalOpen(false);
		setCount(0);

		setPosition(randomizePosition());
	};
	/** Place ❌ on click position */
	const handleOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const { pageX, pageY } = e;
		setMarkerPosition((prev) => [...prev, { x: pageX, y: pageY }]);
	};

	return (
		<>
			{/* ❌ Marker */}
			{markerPosition.map((pos) => (
				<div
					key={`marker-${pos.x}-${pos.y}`}
					className="absolute w-4 h-4 text-3xl z-20"
					style={{
						top: pos.y - 20,
						left: pos.x - 20,
					}}
				>
					❌
				</div>
			))}
			{/* Overlay */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="fixed inset-0 bg-black/50 z-10"
				onClick={handleOnOverlayClick}
			/>
			{/* Modal */}
			<div
				onClick={handleOnClick}
				onKeyDown={handleOnClick}
				className={cn(
					"absolute flex cursor-default rounded-md flex-col items-center justify-center p-28 select-none z-50",
					isHidden
						? "opacity-0 bg-transparent text-transparent active:opacity-90 bg-gray-100"
						: "bg-gray-800",
				)}
				style={{
					top: position.y,
					left: position.x,
				}}
			>
				<h2 className="text-lg font-bold">
					Good News! You Found an Easter Egg 🐣!
				</h2>
				<p className="text-xs opacity-50">
					Bad News! Sorry, I&apos;m too lazy to animate this website. 😅
				</p>
				<button
					type="button"
					onClick={handleOnClose}
					className="p-2 mt-4 border border-gray-300 rounded-lg"
				>
					Close
				</button>
				{/* <form
					className={cn(
						"flex flex-col items-center justify-center gap-4",
						isHidden && "text-black",
					)}
				>
					<label htmlFor="name" className="text-xl">
						Name
					</label>
					<input
						id="name"
						type="text"
						className="p-2 border border-gray-300 rounded-lg"
					/>
					<button
						type="submit"
						className="p-2 border border-gray-300 rounded-lg"
					>
						Submit
					</button>
				</form> */}
			</div>
		</>
	);
};

const HiddenGem = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return isModalOpen ? (
		<Game setIsModalOpen={setIsModalOpen} />
	) : (
		<Play setIsModalOpen={setIsModalOpen} />
	);
};

export default HiddenGem;
