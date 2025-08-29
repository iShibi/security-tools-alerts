'use client';
import { useState } from 'react';
import { RssFeedType } from '../page';

const severityRegex = /Severity:\s*(\w+)\)/;
type SevType = 'All' | 'None' | 'Medium' | 'High';

export function PaloAlto({ paloAltoRssFeed }: PaloAltoParams) {
	const [selectedSev, changeSev] = useState<SevType>('All');
	const [showOnlyCortex, toggleShowOnlyCortex] = useState<boolean>(false);
	return (
		<div className='grid grid-cols-1 gap-y-4 px-4'>
			<div className='flex gap-x-2'>
				<div className='flex rounded-md border border-dashed border-slate-800 px-2 shadow-md select-none dark:border-gray-300'>
					<input
						id='cortex-checkbox'
						type='checkbox'
						checked={showOnlyCortex}
						onChange={e => toggleShowOnlyCortex(!showOnlyCortex)}
						name='Cortex'
						className='cursor-pointer'
					/>
					<label htmlFor='cortex-checkbox' className='block cursor-pointer px-2 py-1'>
						Show Only Cortex
					</label>
				</div>
				<div className='flex rounded-md border border-dashed border-slate-800 shadow-md select-none dark:border-gray-300'>
					<label htmlFor='severity-dropdown' className='block cursor-pointer px-2 py-1'>
						Severity
					</label>
					<select
						name=''
						id='severity-dropdown'
						onChange={e => changeSev(e.target.value as SevType)}
						className='block w-fit cursor-pointer rounded-r-md border-none pl-2 shadow-sm dark:bg-gray-800'
					>
						<option value='All'>All</option>
						<option value='None'>None</option>
						<option value='Medium'>Medium</option>
						<option value='High'>High</option>
					</select>
				</div>
			</div>
			{showOnlyCortex ? (
				<Cortex cortexRssFeed={paloAltoRssFeed} selectedSev={selectedSev} />
			) : (
				<OtherProducts otherProductRssFeed={paloAltoRssFeed} selectedSev={selectedSev} />
			)}
		</div>
	);
}

export interface PaloAltoParams {
	paloAltoRssFeed: RssFeedType;
}

export interface CortexParams {
	cortexRssFeed: RssFeedType;
	selectedSev: SevType;
}

export interface OtherProductsParams {
	otherProductRssFeed: RssFeedType;
	selectedSev: SevType;
}

function Cortex({ cortexRssFeed, selectedSev }: CortexParams) {
	return (
		<div className='grid grid-cols-1 gap-y-2'>
			{cortexRssFeed.items.map(item => {
				if (!item.title?.includes('Cortex')) return;
				let sev = severityRegex.exec(item.title!)?.at(1);
				return sev?.toLowerCase() === selectedSev.toLowerCase() || selectedSev === 'All' ? (
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
						<a href={item.link} target='_blank' rel='noopener noreferrer' className='text-blue-700 dark:text-blue-400'>
							{item.link}
						</a>
					</div>
				) : (
					<></>
				);
			})}
		</div>
	);
}

function OtherProducts({ otherProductRssFeed, selectedSev }: OtherProductsParams) {
	return (
		<div className='grid grid-cols-1 gap-y-2'>
			{otherProductRssFeed.items.map(item => {
				let sev = severityRegex.exec(item.title!)?.at(1);
				return sev?.toLowerCase() === selectedSev.toLowerCase() || selectedSev === 'All' ? (
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
						<a href={item.link} target='_blank' rel='noopener noreferrer' className='text-blue-700 dark:text-blue-400'>
							{item.link}
						</a>
					</div>
				) : (
					<></>
				);
			})}
		</div>
	);
}
