'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { MicroSoft } from './Components/MicroSoft';
import { PaloAlto } from './Components/PaloAlto';
import { Splunk } from './Components/Splunk';
import { RssFeedType } from './page';

export function SwitchReportComponent({
	paloAltoRssFeed,
	microSoftRssFeed,
	splunkRssFeed,
}: SwitchReportComponentProps) {
	return (
		<Tabs.Root className='TabsRoot' defaultValue='tab1'>
			<Tabs.List className='TabsList flex justify-center pt-4 pb-4' aria-label=''>
				<Tabs.Trigger
					className='TabsTrigger w-fit rounded-tl-md border border-b-2 border-gray-200 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 dark:border-gray-600'
					value='tab1'
				>
					Palo Alto
				</Tabs.Trigger>
				<Tabs.Trigger
					className='TabsTrigger w-fit border border-b-2 border-gray-200 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 dark:border-gray-600'
					value='tab2'
				>
					Microsoft
				</Tabs.Trigger>
				<Tabs.Trigger
					className='TabsTrigger w-fit rounded-tr-md border border-b-2 border-gray-200 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 dark:border-gray-600'
					value='tab3'
				>
					Splunk
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content className='TabsContent' value='tab1'>
				<PaloAlto paloAltoRssFeed={paloAltoRssFeed} />
			</Tabs.Content>
			<Tabs.Content className='TabsContent' value='tab2'>
				<MicroSoft microSoftRssFeed={microSoftRssFeed} />
			</Tabs.Content>
			<Tabs.Content className='TabsContent' value='tab3'>
				<Splunk splunkRssFeed={splunkRssFeed} />
			</Tabs.Content>
		</Tabs.Root>
	);
}

export interface SwitchReportComponentProps {
	paloAltoRssFeed: RssFeedType;
	microSoftRssFeed: RssFeedType;
	splunkRssFeed: RssFeedType;
}
