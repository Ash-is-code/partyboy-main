import { Link, Outlet } from "react-router-dom";

export function AppLayout() {
	return (
		<>
			<div className="min-h-screen">
				<header className="bg-brand-900 text-white">
					<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
						<Link
							to="/"
							className="font-display text-2xl font-bold tracking-tight">
							Party <span className="text-gold-500">Boy</span>
						</Link>
						<p className="hidden tex-sm text-white/70 sm:block">
							All Guests, vendors and money management in one place
						</p>
					</div>
					<div className="adire-strip" />
				</header>
				<main className="mx-auto max-w-6xl px-4 py-8">
					<Outlet />
				</main>
			</div>
		</>
	);
}
