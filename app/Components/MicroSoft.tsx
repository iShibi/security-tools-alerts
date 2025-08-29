'use client';

import { useState } from 'react';
import { RssFeedType } from '../page';

export function MicroSoft({ microSoftRssFeed }: MicroSoftParams) {
	const [showOnlyDefender, toggleShowOnlyDefender] = useState<boolean>(false);
	return (
		<div className='grid grid-cols-1 gap-y-4 px-4'>
			<div className='flex gap-x-2'>
				<div className='flex rounded-md border border-dashed border-slate-800 px-2 shadow-md select-none dark:border-gray-300'>
					<input
						id='cortex-checkbox'
						type='checkbox'
						checked={showOnlyDefender}
						onChange={e => toggleShowOnlyDefender(!showOnlyDefender)}
						name='Cortex'
						className='cursor-pointer'
					/>
					<label htmlFor='cortex-checkbox' className='block cursor-pointer px-2 py-1'>
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
					<div key={item.title} className='rounded-md bg-slate-300/80 px-4 py-2 shadow-md dark:bg-gray-800'>
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
						<a href={item.link} target='_blank' rel='noopener noreferrer' className='text-blue-700 dark:text-blue-400'>
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
					<div key={item.title} className='rounded-md bg-slate-300/80 px-4 py-2 shadow-md dark:bg-gray-800'>
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
						<a href={item.link} target='_blank' rel='noopener noreferrer' className='text-blue-700 dark:text-blue-400'>
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
