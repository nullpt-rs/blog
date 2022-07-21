/* eslint-disable react/jsx-child-element-spacing */
/* eslint-disable react/jsx-no-comment-textnodes */
import {Post} from '../../../Post';
import {OldPost} from '../../../../client/components/oldpost';
import img1 from './1.gif';
import img2 from './2.png';
import img3 from './3.png';
import img4 from './4.png';
import img5 from './5.png';
import img6 from './6.png';
import img7 from './7.png';
import img8 from './8.png';
import img9 from './9.png';
import img10 from './10.png';
import img11 from './11.png';
import img12 from './12.png';
import img13 from './13.png';
import img14 from './14.png';
import img15 from './16.png';
import img16 from './17.png';
import img17 from './18.png';

export class AnatomyOfASupremeBot2 extends Post {
	public name = 'Anatomy of a Supreme Bot (Pt 2)';
	public image = undefined;
	public author = 'veritas';
	public slug = 'anatomy-of-a-supreme-bot-part-2';
	public date = new Date('25 Sep 2018');
	public hidden = false;
	public excerpt =
		'The ultimate goal of a bot is to make it to checkout. Let’s get started on that!';

	public keywords = ['Supreme', 'Reverse Engineering', 'Bots'];

	public render() {
		return (
			<div>
				<OldPost />
				<p>
					In part 1 we covered how Supreme fetches data from the mobile_stock endpoint. We were able
					to use this data to fetch our desired item’s id, style id, and sizing id. Our ids are not
					very useful if we can’t do anything with them. The ultimate goal of a bot is to make it to
					checkout. Let’s get started on that!
				</p>
				<h1 id="add-to-cart">Add to Cart</h1>
				<p>How does adding to cart work you ask? Let’s open our network tab and find out.</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img1.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="921"
						height="532"
					/>
					<figcaption>/add endpoint showing when adding to cart</figcaption>
				</figure>
				<p>
					After clicking the “add to cart” button, Supreme sends a POST request to
					https://supremenewyork.com/shop/&lt;id&gt;/add
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img2.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="424"
						height="338"
					/>
					<figcaption>A request to Supreme’s add endpoint on the Hanes boxers</figcaption>
				</figure>
				<p>
					Looking at the form data, we notice fields <code>st</code> and <code>s</code> storing what
					seems to be IDs. If we check out the item’s json we can find out if this is true.
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img3.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="614"
					/>
					<figcaption>Boxer’s item json</figcaption>
				</figure>
				<p>
					Looking at our style’s first field we find our id 21347 and under size small we find id
					59764. So we send a POST request to the add endpoint with the correct form body and we’re
					all good right?!
				</p>
				<p>Not exactly.</p>
				<p>
					Opening up the request headers tab we’re able to find an interesting header:{' '}
					<code>x-csrf-token</code>
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img4.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="437"
						height="48"
					/>
				</figure>
				<p>
					x-csrf-tokens are used to prevent{' '}
					<a
						href="https://en.wikipedia.org/wiki/Cross-site_request_forgery"
						rel="noopener nofollow"
					>
						cross-site request forgery
					</a>
					. There has to be an easier way. And there is
				</p>
				<h1 id="mobile-user-agents">Mobile User-Agents</h1>
				<p>
					All endpoints found before have been found with a mobile user-agent. These user-agents are
					special because they allow the mobile version of the site to be loaded which often lack
					the security features that the desktop site has.
				</p>
				<p>
					Using a{' '}
					<a
						href="https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg"
						rel="noopener nofollow"
					>
						user-agent switcher
					</a>{' '}
					we’re able to switch to an iPhone user-agent and POST to the mobile endpoint instead of
					the desktop.
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img5.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="370"
						height="309"
					/>
					<figcaption>ATC request from the mobile site</figcaption>
				</figure>
				<p>
					The form data is essentially the same. We still have a style id and a size id being
					passed. This time, we also have a qty field. This is the quantity and for most items will
					be set to 1. Another thing to notice is that the endpoint locations are{' '}
					<strong>
						<strong>NOT</strong>
					</strong>{' '}
					the same.
				</p>
				<p>
					If you haven’t noticed already, the mobile endpoints end with .json. You will need to use
					a mobile user-agent to POST to this endpoint and set the <code>content-type</code> to{' '}
					<code>application/x-www-form-urlencoded</code>
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img6.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="308"
						height="53"
					/>
				</figure>
				<figure className="kg-card kg-image-card">
					<img
						src={img7.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="324"
						height="25"
					/>
				</figure>
				<p>
					The response from this request is an array containing all the items in your cart and
					whether or not they’re still in stock. The stock information is used to notify you when an
					item in your cart has been sold out.
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img8.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="350"
						height="51"
					/>
					<figcaption>Response from /add.json endpoint</figcaption>
				</figure>
				<p>Once you have all your items in cart, it’s time to checkout.</p>
				<h1 id="checkout">Checkout</h1>
				<p>
					At this point, you have two options. If you’re creating a browser extension, you’re able
					to head to the checkout page and autofill each field. This is what most if not all browser
					extensions do. Your second option is to do what we’re already doing and POST to the
					checkout endpoint. Lets view the second option.
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img9.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="633"
					/>
					<figcaption>The mobile checkout page</figcaption>
				</figure>
				<p>
					After putting in some fake data we’re ready to checkout and find which endpoint is
					contacted.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img10.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="543"
						height="60"
					/>
				</figure>
				<p>
					Time to process payment{' '}
					<strong>
						<strong>*click*</strong>
					</strong>
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img11.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="402"
						height="582"
					/>
				</figure>
				<p>
					Uh oh, there’s a captcha. Supreme added ReCAPTCHA to their checkout in March 2017 to
					combat bots. After completing the captcha we’re able to view the request
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img12.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="365"
						height="517"
					/>
				</figure>
				<p>
					All of your checkout information gets sent to{' '}
					<a href="https://www.supremenewyork.com/checkout.json" rel="noopener nofollow">
						https://www.supremenewyork.com/checkout.json
					</a>
				</p>
				<p>
					Everything here is pretty normal but one thing that may stand out is the{' '}
					<code>cookie-sub</code> . Placing the cooke-sub in a{' '}
					<a href="https://www.urldecoder.org/" rel="noopener nofollow">
						URL decoder
					</a>{' '}
					shows us what this truly is.
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img13.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="84"
						height="29"
					/>
				</figure>
				<p>
					59764 is the size ID for our item and 1 is the quantity. This is stored as JSON and URL
					encoded to create the cookie-sub.
				</p>
				<p>Let’s see what other fields we have to POST to checkout.json</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img14.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="355"
						height="194"
					/>
				</figure>
				<p>
					Oh darn, it’s that captcha response from the puzzle we completed earlier. This is bad
					because it means we need to complete a captcha for each checkout. Bots have two ways of
					handling this problem.
				</p>
				<p>
					One solution is whats called captcha harvesting. The idea is to have the bot user complete
					captchas while the harvester stores the g-recaptcha-response to use for checkout. dzt’s{' '}
					<a href="https://github.com/dzt/captcha-harvester" rel="noopener nofollow">
						captcha-harvester
					</a>{' '}
					is a popular choice.
				</p>
				<p>
					The second solution is to use a service like DeathByCaptcha or 2captcha to get captchas
					completed and use the response to checkout. This option is certainly slower than
					completing puzzles yourself as it can sometimes take up to 7 seconds for one completed
					puzzle.
				</p>
				<h1 id="captcha-bypass">Captcha Bypass</h1>
				<p>(This is now patched)</p>
				<p>
					A third but risky option is also available, its to not send a g-recaptcha-response in the
					form data at all. This wouldn’t work on most sites and shouldn’t work on Supreme but
					apparently the developers are too stupid to check for a valid captcha response
					server-side.
				</p>
				<p>
					This is risky because it can get patched at any moment on their side and probably will.
					Most bots flaunt this around as an amazing “captcha bypass” when all it really is, is
					luck.
				</p>
				<p>Go wild.</p>
				<h1 id="the-response">The Response</h1>
				<p>
					The response by the checkout endpoint is returned as JSON and will tell you if errors
					exist in the form or if you’re in the queue for checkout. In this case, we failed due to
					an incorrect credit card number. This is useful information to display errors to your
					user. If all information is correct, you’ll get a status of <code>queued</code> and a
					slug.
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img15.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="354"
						height="54"
					/>
					<figcaption>We’re in queue and we have a slug!</figcaption>
				</figure>
				<p>
					This slug comes in handy because it lets us see whether or not we’ve gotten the items in
					our cart.
				</p>
				<h1 id="checking-status">Checking Status</h1>
				<figure className="kg-card kg-image-card">
					<img
						src={img16.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="371"
						height="159"
					/>
				</figure>
				<p>
					After the checkout request follows a status.json GET request.{' '}
					<a
						href="https://www.supremenewyork.com/checkout/e4k60b1y8enq9oisu/status.json"
						rel="noopener nofollow"
					>
						https://www.supremenewyork.com/checkout/&lt;slug&gt;/status.json
					</a>
				</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img17.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="369"
						height="54"
					/>
				</figure>
				<p>
					The response to this is similar to the checkout.json response. Status will returned queued
					if checkout is still not complete. It will return failed if checkout has failed. Because
					status changes, it is important to poll this endpoint multiple times. You can choose an
					interval of your choice. Once every one second is a good place to start.
				</p>
				<h1 id="tada-">Tada!</h1>
				<p>
					That’s all there is to it. Supreme bots are not magic and anyone selling you one for $200
					is fooling you.
				</p>
				<p>
					Next part will talk more about anti-botting techniques that Supreme uses and perhaps even
					the decompiling of some bots to prove that they’re exactly alike.
				</p>
				<p>See you next time</p>
			</div>
		);
	}
}
