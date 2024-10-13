'use client';
import { Element } from '@/class/Frame';
import { useGetFrameDetailsQuery, useGetImageQuery } from '../../service/figma';
import { createElement } from 'react';

export default function Home() {
	const { isSuccess, data: figmaData } = useGetFrameDetailsQuery({});
	// const { data, isSuccess: ImageSuccess } = useGetImageQuery(
	// 	'2c73ef3f3a20216ec63f509ecf5646e49ec3ab02'
	// );
	// if (ImageSuccess) {
	// 	console.log(data);
	// }
	let Div = new Element(figmaData?.nodes['16:2'].document);

	// return (
	// 	<div>
	// 		<h1>Figma Data</h1>
	// 		{/* <pre>{JSON.stringify(data?.nodes['16:2'].document, null, 2)}</pre> */}
	// 		{/* {Div.getHTML()} */}
	// 		{/* {isSuccess && <pre>{JSON.stringify(figmaData, null, 2)}</pre>} */}
	// 		{isSuccess && Div.CreateFrame()}
	// 	</div>
	// );
	// return createElement(
	// 	'h1',
	// 	{ className: 'greeting' },
	// 	'Hello ',
	// 	createElement('i', null, 'data'),
	// 	'. Welcome!'
	// );
	return isSuccess && Div.CreateReactComponent();
}
