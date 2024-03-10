'use client';

import { useEffect, useRef, useState } from 'react';

export default function () {
	const [vendor, setVendor] = useState('');
	const [renderer, setRenderer] = useState('');
	const canvas = useRef<HTMLCanvasElement>();
	useEffect(() => {
		if (canvas.current) {
			const gl = canvas.current.getContext('webgl');
			const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
			if (gl && debugInfo) {
				setVendor(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
				setRenderer(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
			}
		}
	}, []);

	return (
		<div>
			{/* @ts-ignore */}
			<canvas ref={canvas} width="0" height="0" />
			{vendor && renderer && (
				<>
					<p>
						And here's a demo of that in action (This is using JavaScript to pull your GPU
						information):
					</p>
					<code>{`Vendor: ${vendor} Renderer: ${renderer}`}</code>
				</>
			)}
		</div>
	);
}
