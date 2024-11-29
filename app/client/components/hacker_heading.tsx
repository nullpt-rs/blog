'use client';
import React, { useEffect, useState } from 'react';

interface HackerHeadingProps {
	text: string;
	duration?: number;
}

const getRandomChars = (length: number) => {
	const randomChars = [
		'A',
		'a',
		'B',
		'b',
		'C',
		'c',
		'D',
		'd',
		'E',
		'e',
		'F',
		'f',
		'G',
		'g',
		'H',
		'h',
		'I',
		'i',
		'J',
		'j',
		'K',
		'k',
		'L',
		'l',
		'M',
		'm',
		'N',
		'n',
		'O',
		'o',
		'P',
		'p',
		'Q',
		'q',
		'R',
		'r',
		'S',
		's',
		'T',
		't',
		'U',
		'u',
		'V',
		'v',
		'W',
		'w',
		'X',
		'x',
		'Y',
		'y',
		'Z',
		'z',
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'!',
		'@',
		'#',
		'$',
		'%',
		'^',
		'&',
		'*',
		'(',
		')',
		'-',
		'=',
		'+',
		'_',
		'[',
		']',
		'{',
		'}',
		'\\',
		'|',
		';',
		':',
		'"',
		"'",
		',',
		'.',
		'<',
		'>',
		'/',
		'?',
		'~',
		'`',
		'§',
		'€',
	];

	let result = '';
	for (let i = 0; i < length; i++) {
		result += randomChars[Math.floor(Math.random() * randomChars.length)];
	}
	return result;
};

const HackerHeading: React.FC<HackerHeadingProps> = ({ text, duration = 500 }) => {
	const [displayText, setDisplayText] = useState<string>(getRandomChars(text.length));
	const [isDecrypting, setIsDecrypting] = useState<boolean>(false);

	useEffect(() => {
		const decryptText = () => {
			let index = 0;
			const randomChars = [
				'A',
				'a',
				'B',
				'b',
				'C',
				'c',
				'D',
				'd',
				'E',
				'e',
				'F',
				'f',
				'G',
				'g',
				'H',
				'h',
				'I',
				'i',
				'J',
				'j',
				'K',
				'k',
				'L',
				'l',
				'M',
				'm',
				'N',
				'n',
				'O',
				'o',
				'P',
				'p',
				'Q',
				'q',
				'R',
				'r',
				'S',
				's',
				'T',
				't',
				'U',
				'u',
				'V',
				'v',
				'W',
				'w',
				'X',
				'x',
				'Y',
				'y',
				'Z',
				'z',
			];
			const interval = setInterval(() => {
				let currentText = '';
				for (let i = 0; i < text.length; i++) {
					if (i <= index) {
						currentText += text[i]; // Add actual character
					} else {
						currentText += randomChars[Math.floor(Math.random() * randomChars.length)]; // Add random char
					}
				}
				setDisplayText(currentText);

				if (index < text.length - 1) {
					index++;
				} else {
					clearInterval(interval);
				}
			}, duration / text.length);
		};

		if (!isDecrypting) {
			setIsDecrypting(true);
			decryptText();
		}
	}, [text, duration, isDecrypting]);

	return (
		<div className="w-full">
			<h1 className="text-lg font-mono text-green-400">{displayText}</h1>
		</div>
	);
};

export default HackerHeading;
