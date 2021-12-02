import React, {useRef, useEffect} from 'react';

const ReactRogue = ({width, height, titlesize}) => {
	const canvasRef = useRef();
	useEffect(() => {
		console.log('Draw to canvas');
	});
return (
	<canvas
		ref= {canvasRef}
		width= {width * titlesize}
		height= {height * titlesize}
		style={{ border: '1px solid black' }}
	></canvas>
	);
};

export default ReactRogue;