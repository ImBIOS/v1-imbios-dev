import { Suspense } from "react";
import HiddenGem from "./hidden-gem";
import Note from "./note";
import Projects from "./projects";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					✅ UPDATED:&nbsp;
					<Suspense fallback={null}>
						<Note />
					</Suspense>
				</p>
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
					<p className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
						With <span className="text-5xl">💝&☕</span>
					</p>
				</div>
			</div>

			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-green-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-green-500 after:dark:opacity-40 before:lg:h-[360px] z-[-1] bg-gradient-to-br from-white via-gray-300 to-gray-700 bg-clip-text text-transparent">
				<h1 className="font-black text-9xl border-r-4 pr-2">ImBIOS</h1>
				<p className="font-bold text-xl pl-2">Imamuzzaki Abu Salam</p>
			</div>

			<HiddenGem />

			<div className="mb-32 grid gap-2 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
				<Suspense fallback={null}>
					<Projects />
				</Suspense>
			</div>
		</main>
	);
}
