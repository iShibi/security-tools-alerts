'use client';
import { useState } from 'react';
import { RssFeedType } from '../page';

const severityRegex = /Severity:\s*(\w+)\)/;
type SevType = 'All' | 'None' | 'Medium' | 'High';
type PaloAltoProductsType = 'All' | 'Cortex';

export function PaloAlto({ paloAltoRssFeed }: PaloAltoParams) {
	const [selectedSev, changeSev] = useState<SevType>('All');
	const [showOnlyCortex, toggleShowOnlyCortex] = useState<boolean>(false);
	return (
		<div className='grid grid-cols-1 gap-y-4 px-4'>
			<div className='flex gap-x-2'>
				<div className='flex border select-none border-dotted border-slate-800 rounded-md px-1 shadow-md'>
					<input
						id='cortex-checkbox'
						type='checkbox'
						checked={showOnlyCortex}
						onChange={e => toggleShowOnlyCortex(!showOnlyCortex)}
						name='Cortex'
						className='cursor-pointer'
					/>
					<label htmlFor='cortex-checkbox' className='block p-1 cursor-pointer'>
						Show Only Cortex
					</label>
				</div>
				<div className='flex border select-none border-dotted border-slate-800 rounded-md shadow-md'>
					<label htmlFor='severity-dropdown' className='block p-1 cursor-pointer'>
						Severity
					</label>
					<select
						name=''
						id='severity-dropdown'
						onChange={e => changeSev(e.target.value as SevType)}
						className='block cursor-pointer w-fit rounded-r-md p-1 outline-none border shadow-sm'
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
	);
}

function OtherProducts({ otherProductRssFeed, selectedSev }: OtherProductsParams) {
	return (
		<div className='grid grid-cols-1 gap-y-2'>
			{otherProductRssFeed.items.map(item => {
				let sev = severityRegex.exec(item.title!)?.at(1);
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
	);
}
