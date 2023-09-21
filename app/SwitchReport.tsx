'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { Cortex } from './Cortex';
import { Defender } from './Defender';

export function SwitchReportComponent({ cortexRssFeed, defenderRssFeed }: SwitchReportComponentProps) {
	return (
		<Tabs.Root className='TabsRoot' defaultValue='tab1'>
			<Tabs.List className='TabsList flex justify-center pb-4 pt-4' aria-label=''>
				<Tabs.Trigger
					className='TabsTrigger ml-2 w-fit rounded-tl-md border border-b-2 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500'
					value='tab1'
				>
					Cortex
				</Tabs.Trigger>
				<Tabs.Trigger
					className='TabsTrigger mr-2 w-fit rounded-tr-md border border-b-2 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500'
					value='tab2'
				>
					Defender
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content className='TabsContent' value='tab1'>
				<Cortex cortexRssFeed={cortexRssFeed} />
			</Tabs.Content>
			<Tabs.Content className='TabsContent' value='tab2'>
				<Defender defenderRssFeed={defenderRssFeed} />
			</Tabs.Content>
		</Tabs.Root>
	);
}

export interface SwitchReportComponentProps {
	cortexRssFeed: string;
	defenderRssFeed: string;
}
