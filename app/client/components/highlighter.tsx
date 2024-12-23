import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/darcula';
import light from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-dune-light';

type Style = Record<`hljs-${string}`, string>;

export function Highlighter({
	children,
	language = 'typescript',
}: {
	children: string;
	language?: string;
}) {
	return (
		<div className="no-pre-margin">
			<div className="hidden block">
				<SyntaxHighlighter language={language} style={dark as Style}>
					{children}
				</SyntaxHighlighter>
			</div>

			<div className="hidden">
				<SyntaxHighlighter language={language} style={light as Style}>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
