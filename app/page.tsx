import Parser from 'rss-parser';
import { SwitchReportComponent } from './SwitchReport';

export type RssFeedType = {
	[key: string]: any;
} & Parser.Output<{
	[key: string]: any;
}>;

const parser = new Parser();

async function getPaloAltoData(): Promise<RssFeedType> {
	const res = await fetch(`https://security.paloaltonetworks.com/rss.xml`, {
		cache: 'no-store',
	});
	const data = await res.text();
	const rssFeed = await parser.parseString(data);
	return rssFeed;
}

async function getMicroSoftData(): Promise<RssFeedType> {
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
	const [paloAltoData, microsoftData, splunkData] = await Promise.all([
		getPaloAltoData(),
		getMicroSoftData(),
		getSplunkData(),
	]);

	return (
		<div className='h-screen'>
			<SwitchReportComponent
				paloAltoRssFeed={paloAltoData}
				microSoftRssFeed={microsoftData}
				splunkRssFeed={splunkData}
			/>
		</div>
	);
}
