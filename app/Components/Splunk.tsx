'use client';

import { RssFeedType } from '../page';

export function Splunk({ splunkRssFeed }: SplunkParams) {
	return (
		<div className='grid grid-cols-1 gap-y-2 px-4'>
			{splunkRssFeed.items.map(item => {
				return (
					<div key={item.title} className='bg-slate-300/80 shadow-md px-4 py-2 rounded-md'>
						<h1 className='font-bold'>{item.title}</h1>
						<p className='text-sm font-light'>
							{new Date(Date.parse(item.pubDate!)).toLocaleString(undefined, {
								weekday: 'short',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<p>{item.content}</p>
						<a href={item.link} target='_blank' rel='noopener noreferrer' className='text-blue-700'>
							{item.link}
						</a>
					</div>
				);
			})}
		</div>
	);
}

export interface SplunkParams {
	splunkRssFeed: RssFeedType;
}
