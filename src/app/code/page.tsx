'use client';
import { Element } from '@/class/Frame';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useGetFrameDetailsQuery, useGetImageQuery } from '../../service/figma';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getCookie } from 'cookies-next';


export default function Home() {
	const nodeId = getCookie('nodeId') || '';
	console.log(nodeId);
	const { isSuccess, data: figmaData } = useGetFrameDetailsQuery({});
	// const { data, isSuccess: ImageSuccess } = useGetImageQuery(
	// 	'2c73ef3f3a20216ec63f509ecf5646e49ec3ab02'
	// );
	// if (ImageSuccess) {
	// 	console.log(data);
	// } 
	let Div;
	if(nodeId)
	{
		Div = new Element(figmaData?.nodes[nodeId].document);
	}
	// let Div = new Element(figmaData?.nodes[`${nodeId}`].document);
	// if(isSuccess) {
	// 	console.log(Div.createHtmlComponent());
	// }

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
	return (<div style={{
		display: 'flex',
		flexDirection: 'column',
		padding: '20px',
		gap: '20px',
	}}>
		{isSuccess && Div && Div.CreateReactComponent()}
		{
			isSuccess && Div && <SyntaxHighlighter language='css' style={nightOwl} wrapLines={true} wrapLongLines={true} >
				{Div.createInlineHTMLCSSReact()}
			</SyntaxHighlighter>
		}

	</div>);
}
