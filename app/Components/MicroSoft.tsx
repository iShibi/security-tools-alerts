'use client';

import { useState } from 'react';
import { RssFeedType } from '../page';

export function MicroSoft({ microSoftRssFeed }: MicroSoftParams) {
	console.log(microSoftRssFeed);
	const [showOnlyDefender, toggleShowOnlyDefender] = useState<boolean>(false);
	return (
		<div className='grid grid-cols-1 gap-y-4 px-4'>
			<div className='flex gap-x-2'>
				<div className='flex border select-none border-dotted border-slate-800 rounded-md px-1 shadow-md'>
					<input
						id='cortex-checkbox'
						type='checkbox'
						checked={showOnlyDefender}
						onChange={e => toggleShowOnlyDefender(!showOnlyDefender)}
						name='Cortex'
						className='cursor-pointer'
					/>
					<label htmlFor='cortex-checkbox' className='block p-1 cursor-pointer'>
						Show Only Defender
					</label>
				</div>
			</div>
			{showOnlyDefender ? (
				<Defender defenderRssFeed={microSoftRssFeed} />
			) : (
				<OtherProducts otherProductRssFeed={microSoftRssFeed} />
			)}
		</div>
	);
}

export interface MicroSoftParams {
	microSoftRssFeed: RssFeedType;
}

export function Defender({ defenderRssFeed }: DefenderParams) {
	return (
		<div className='grid grid-cols-1 gap-y-2'>
			{defenderRssFeed.items.map(item => {
				if (!item.title?.includes('Defender')) return;
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

export function OtherProducts({ otherProductRssFeed }: OtherProductsParams) {
	return (
		<div className='grid grid-cols-1 gap-y-2'>
			{otherProductRssFeed.items.map(item => {
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

export interface OtherProductsParams {
	otherProductRssFeed: RssFeedType;
}

export interface DefenderParams {
	defenderRssFeed: RssFeedType;
}
