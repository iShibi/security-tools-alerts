import Parser from 'rss-parser';
import { SwitchReportComponent } from './SwitchReport';

export type RssFeedType = {
	[key: string]: any;
} & Parser.Output<{
	[key: string]: any;
}>;

const parser = new Parser();

async function getCortexData(): Promise<RssFeedType> {
	const res = await fetch(`https://security.paloaltonetworks.com/rss.xml`, {
		cache: 'no-store',
	});
	const data = await res.text();
	const rssFeed = await parser.parseString(data);
	return rssFeed;
}

async function getDefenderData(): Promise<RssFeedType> {
	const res = await fetch(`https://api.msrc.microsoft.com/update-guide/rss`, {
		cache: 'no-store',
	});
	const data = await res.text();
	const rssFeed = await parser.parseString(data);
	return rssFeed;
}

async function getSplunkData(): Promise<RssFeedType> {
	const res = await fetch(`https://advisory.splunk.com/feed.xml`, {
		cache: 'no-store',
	});
	const data = await res.text();
	const rssFeed = await parser.parseString(data);
	return rssFeed;
}

export default async function Home() {
	const [cortexData, defenderData, splunkData] = await Promise.all([
		getCortexData(),
		getDefenderData(),
		getSplunkData(),
	]);

	return (
		<div className='h-screen'>
			<SwitchReportComponent cortexRssFeed={cortexData} defenderRssFeed={defenderData} splunkRssFeed={splunkData} />
		</div>
	);
}
