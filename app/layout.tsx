import './globals.css';

export const metadata = {
	title: 'Security Tools Alerts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='bg-slate-200/60'>
			<body>{children}</body>
		</html>
	);
}
