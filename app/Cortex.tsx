'use client';

import Parser from 'rss-parser';

export async function Cortex({ cortexRssFeed }: CortexParams) {
	const parser = new Parser();
	const feed = await parser.parseString(cortexRssFeed);

	return (
		<div className='grid grid-cols-1 gap-y-2 px-4'>
			{feed.items.map(item => {
				return (
					<div key={item.title} className='bg-gray-300 shadow-md px-4 py-2 rounded-md'>
						<h1 className='font-bold'>{item.title}</h1>
						<p className='text-sm font-light'>
							{new Date(Date.parse(item.pubDate!)).toLocaleString(undefined, {
								weekday: 'short',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<a href={item.link} target='_blank' rel='noopener noreferrer' className='text-blue-700'>
							{item.link}
						</a>
					</div>
				);
			})}
		</div>
	);
}

export interface CortexParams {
	cortexRssFeed: string;
}
