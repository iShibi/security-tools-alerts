import { SwitchReportComponent } from './SwitchReport';

async function getCortexData(): Promise<string> {
	const res = await fetch(`https://security.paloaltonetworks.com/rss.xml`, {
		cache: 'no-store',
	});
	const data = res.text();
	return data;
}

async function getDefenderData(): Promise<string> {
	const res = await fetch(`https://api.msrc.microsoft.com/update-guide/rss`, {
		cache: 'no-store',
	});
	const data = res.text();
	return data;
}

export default async function Home() {
	const [cortexData, defenderData] = await Promise.all([getCortexData(), getDefenderData()]);

	return (
		<div className='h-screen'>
			<SwitchReportComponent cortexRssFeed={cortexData} defenderRssFeed={defenderData} />
		</div>
	);
}
