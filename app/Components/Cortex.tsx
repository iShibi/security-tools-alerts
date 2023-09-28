'use client';
import { useState } from 'react';

const regex = /Severity:\s*(\w+)\)/;
type SevType = 'All' | 'None' | 'Medium' | 'High';

export function Cortex({ cortexRssFeed }: CortexParams) {
	const [selectedSev, changeSev] = useState<SevType>('All');
	return (
		<div className='grid grid-cols-1 gap-y-4 px-4'>
			<select
				name=''
				id=''
				onChange={e => changeSev(e.target.value as SevType)}
				className='block w-fit rounded-md p-1 outline-none border shadow-sm'
			>
				<option value='All'>All</option>
				<option value='None'>None</option>
				<option value='Medium'>Medium</option>
				<option value='High'>High</option>
			</select>
			<div className='grid grid-cols-1 gap-y-2'>
				{cortexRssFeed.items.map(item => {
					let sev = regex.exec(item.title)?.at(1);
					return sev?.toLowerCase() === selectedSev.toLowerCase() || selectedSev === 'All' ? (
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
							<a href={item.link} target='_blank' rel='noopener noreferrer' className='text-blue-700'>
								{item.link}
							</a>
						</div>
					) : (
						<></>
					);
				})}
			</div>
		</div>
	);
}

export interface CortexParams {
	cortexRssFeed: any;
}
