import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Security Tools Alerts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='bg-slate-200/60 dark:bg-gray-900 dark:text-gray-300'>
			<body>{children}</body>
		</html>
	);
}
