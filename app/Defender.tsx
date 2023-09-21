'use client';

import Parser from 'rss-parser';

export async function Defender({ defenderRssFeed }: DefenderParams) {
	const parser = new Parser();
	const feed = await parser.parseString(defenderRssFeed);

	return (
		<>
			{feed.items.map(item => {
				return (
					<div key={item.pubDate} className='mt-3'>
						<h1 className='font-bold'>{item.title}</h1>
						<p>{item.pubDate}</p>
					</div>
				);
			})}
		</>
	);
}

export interface DefenderParams {
	defenderRssFeed: string;
}
