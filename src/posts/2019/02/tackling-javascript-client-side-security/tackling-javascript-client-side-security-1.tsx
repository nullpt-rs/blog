/* eslint-disable react/jsx-child-element-spacing */
/* eslint-disable react/jsx-no-comment-textnodes */
import {Post} from '../../../Post';
import {OldPost} from '../../../../client/components/oldpost';
import img1 from './1-1.png';
import img2 from './2-2.png';
import img3 from './3-1.png';
import img4 from './4-2.png';
import img5 from './5-2.png';
import img6 from './6-2.png';
import img7 from './7-1.png';
import img8 from './8-1.png';
import img9 from './9-1.png';
import img10 from './10-1.png';
import img11 from './11-1.png';
import img12 from './12-1.png';
import img13 from './13-1.png';
import img14 from './14-1.png';
import img15 from './15-1.png';
import img16 from './16-1.png';
import img17 from './17-1.png';
import img18 from './18-1.png';
import img19 from './19.png';
import img20 from './20.png';
import img21 from './21.png';
import img22 from './22.png';
import img23 from './23.png';
import img24 from './24.png';
import img25 from './25.png';
import img26 from './26.png';
import img27 from './27.png';

export class TacklingJavaScriptClientSideSecurity extends Post {
	public name = 'Tackling JavaScript Client-side Security (Part 1)';
	public image = undefined;
	public author = 'veritas';
	public slug = 'tackling-javascript-client-side-security-pt-1';
	public date = new Date('18 Feb 2019');
	public hidden = false;
	public excerpt =
		'The ultimate goal of a bot is to make it to checkout. Let’s get started on that!';

	public keywords = ['JScrambler', 'Reverse Engineering', 'Obfuscation'];

	public render() {
		return (
			<div>
				<OldPost />
				<figure className="kg-card kg-image-card">
					<img
						src={img1.src}
						className="kg-image"
						alt=""
						loading="lazy"
						width="700"
						height="340"
					/>
				</figure>
				<p>
					Jscrambler, a leader in JavaScript Client-side security makes claims to “Bullet-proof your
					Web Application in 2 minutes” but what have they done to make these claims? And does it
					really bulletproof your application?
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img2.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="341"
					/>
				</figure>
				<p>
					Jscrambler employs various techniques to both obfuscate the code and prevent real-time
					debugging/tampering. A list of the techniques is provided by the Jscrambler product page
					and even contains docs to what each feature does (This will be extremely helpful)
				</p>
				<h1 id="getting-a-sample-to-reverse">Getting a Sample To Reverse</h1>
				<p>
					The first step in reversing Jscrambler is to get our hands on an obfuscated sample. Lucky
					for us, we’re able to sign up and demo their protection using a game they provide. Even
					better, they provide the unprotected version as well! This is useful for comparison.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img3.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="336"
					/>
				</figure>
				<p>
					The Playground App is more than enough for us to pick apart how Jscrambler works and how
					to reverse its effects. Clicking on View App brings you to the page where you’re able to
					fine-tune the protection to your liking.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img4.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="336"
					/>
				</figure>
				<p>
					You’re then able to protect the app and run it. Pressing the Run Source and Run Protected
					buttons will create an iframe with the running application. We’re then able to get the
					source though the Chrome Dev Tools
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img5.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="336"
					/>
				</figure>
				<h1 id="side-by-side-comparison">Side by Side Comparison</h1>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img6.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="311"
					/>
					<figcaption>Original code on the left, Jscrambler protected code on right</figcaption>
				</figure>
				<p>
					Looking at the obfuscated code vs the original code a few things stood out to me. The
					first being the difference in lines of code. The protected application sits at 907 lines
					of code while the original only contains 559. This nearly double in LoC had to be coming
					from somewhere. The second thing I noticed was all of the obfuscated function calls and
					string references. A quick glance at their docs brings me to what they call{' '}
					<a
						href="https://docs.jscrambler.com/code-integrity/documentation/transformations/string-concealing"
						rel="noopener nofollow"
					>
						String Concealing
					</a>
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img7.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="336"
					/>
				</figure>
				<p>
					Our protected code is littered with calls to the decode routines so I had a bright idea to
					isolate the decode functions by copying them to a different file.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img8.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="317"
					/>
				</figure>
				<p>
					Jumping to the function using ctrl + clicking on one of them brings me to the top of the
					file where many similar functions are defined. After multiple scrolls I notice our code
					starts but is wrapped around what seems to be an IIFE
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img9.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="567"
						height="123"
					/>
				</figure>
				<p>
					Copying all the functions above this IIFE into another file and removing them from the
					protected code brings our lines of code from 907 down to 629. This means the majority of
					the increase in LoC we noticed was due to these decode/encode algorithms.
				</p>
				<h1 id="extracting-data-from-functions">Extracting Data From Functions</h1>
				<p>
					My next idea was to try and test one of decode functions by just running it and hoping to
					get no errors.
				</p>
				<p>Well, let’s try that.</p>
				<p>
					To do this, I grabbed one of the calls to the decode function and console.log it in my
					file with all the decode functions.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img10.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="254"
						height="34"
					/>
				</figure>
				<p>Now, lets call node testing.js</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img11.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="625"
						height="222"
					/>
				</figure>
				<p>
					a3U is not defined, hmm. I check back to the protected code and realize a3U is pointing to
					a global variable named A1aa
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img12.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="170"
						height="42"
					/>
				</figure>
				<p>So I change a3U in the test to A1aa</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img13.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="271"
						height="26"
					/>
				</figure>
				<p>And try running it again</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img14.src}
						className="kg-image"
						alt=""
						loading="lazy"
						width="615"
						height="38"
					/>
				</figure>
				<h1 id="it-returns-toint-">It Returns toInt!</h1>
				<p>
					At this point I was very excited. This means I was able to isolate these functions and use
					them to deobfuscate the code a bit.
				</p>
				<p>Woohoo!</p>
				<p>
					I even went a step further and used a for loop to try printing out any other strings we
					can get.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img15.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="285"
						height="119"
					/>
				</figure>
				<p>And now to run it.</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img16.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="596"
						height="549"
					/>
				</figure>
				<p>Awesome! We get a bunch of strings and function names.</p>
				<p>
					Only one problem. I don’t really want to sit here and replace each occurrence by hand.
					Whatever, I’ll just write a script that uses Regex to find these functions and replace
					them with the results using eval.
				</p>
				<h1 id="stop-">STOP!</h1>
				<p>
					While this technique would technically work and is what I started out with, there is a
					better way to do this and its using an AST.
				</p>
				<p>
					An Abstract Syntax Tree (AST) is a tree that represents the syntax of a language. For us
					this means we can pick apart functions and function calls given a set of criteria.
				</p>
				<p>Great, now where do we start?</p>
				<p>
					<a href="https://github.com/jquery/esprima" rel="noopener nofollow">
						Esprima
					</a>{' '}
					is a popular parser and is what we’ll be using to do this.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img17.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="476"
					/>
				</figure>
				<p>
					Esprima has an example of removing console calls from a program using their tool. I will
					be using this as the base to find all the calls to the decode functions and replace them.
					One tool useful for this is{' '}
					<a href="https://astexplorer.net/" rel="noopener nofollow">
						ASTExplorer
					</a>{' '}
					which allows you to explore the syntax tree of the code you provide.
				</p>
				<p>
					First step, identifying the decode functions and storing their name so we can find
					occurrences in the code.
				</p>
				<p>
					Pasting one of these functions in ASTExplorer lets us know we’re dealing with an
					ExpressionStatement
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img18.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="412"
					/>
				</figure>
				<p>What we care about is K3U or the property identifier</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img19.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="456"
						height="408"
					/>
				</figure>
				<p>
					We know each decode function belongs to A1aa so we’ll use that to extract the function
					names.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img20.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="436"
					/>
				</figure>
				<p>Using this code we’re able to print the decode functions out and take a look.</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img21.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="635"
						height="191"
					/>
				</figure>
				<p>Great, but we only care about the function name.</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img22.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="68"
					/>
				</figure>
				<figure className="kg-card kg-image-card">
					<img
						src={img23.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="638"
						height="192"
					/>
				</figure>
				<p>
					Cool! We got the function names now we need to replace each call to them in the code with
					their returned value. I return to ASTExplorer but this time inspect a line where one of
					these decode functions is called.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img24.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="382"
					/>
				</figure>
				<p>
					The call is defined as a CallExpression. Inside the CallExpression contains other
					information such as the arguments passed, callee, and types.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img25.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="351"
						height="405"
					/>
				</figure>
				<figure className="kg-card kg-image-card">
					<img
						src={img26.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="648"
					/>
				</figure>
				<p>
					Using ASTExplorer we’re able to build another predicate which checks if the function is a
					CallExpression and its callee’s property name is one of our decode functions. Now we just
					want to replace these calls with their actual value!
				</p>
				<h1 id="the-final-result">The Final Result</h1>
				<p>
					Remember our obfuscated code comparison from above? Well this is how the comparison looks
					after running our script!
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img27.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="227"
					/>
				</figure>
				<p>
					Suddenly a lot more readable! Some function names aren’t recoverable because they aren’t
					encoded but instead changed into some random garbage. Now that the code is in a more
					readable state you’re able to look through the file and figure out what it does!
				</p>
				<p>
					The next part of this series will cover what control flow obfuscation is and how to tackle
					it.
				</p>
				<p>
					Source to the script available{' '}
					<a
						href="https://gist.github.com/char/78881ce52466cd6d78f459fe1b969ca4"
						rel="noopener nofollow"
					>
						<strong>
							<strong>here</strong>
						</strong>
					</a>
				</p>
			</div>
		);
	}
}
