/* eslint-disable react/jsx-child-element-spacing */
/* eslint-disable react/jsx-no-comment-textnodes */
import {Post} from '../../../Post';
import mobileStock from './mobile_stock.png';
import loadDataForPoll from './load_data_for_poll.png';
import setIntervalImage from './set_interval.png';
import pollInterval from './poll_interval.png';
import mobileStockExample from './mobile_stock_example.png';
import fetchExample from './fetch_example.png';
import supremeShirt from './supreme_shirt.png';
import jsonNetwork from './json_network.png';
import variantJson from './variant_json.png';
import {OldPost} from '../../../../client/components/oldpost';

export class AnatomyOfASupremeBot1 extends Post {
	public name = 'Anatomy of a Supreme Bot (Pt 1)';
	public image = undefined;
	public author = 'veritas';
	public slug = 'anatomy-of-a-supreme-bot-part-1';
	public date = new Date('24 Sep 2018');
	public hidden = false;
	public excerpt =
		'The Supreme bot market has become flooded with bots. They all do the same thing and claim to be better than the next. How exactly do they work?';

	public keywords = ['Supreme', 'Reverse Engineering', 'Bots'];

	public render() {
		return (
			<div>
				<OldPost />
				<p>
					The Supreme bot market has become flooded with bots. They all do the same thing and claim
					to be better than the next. How do they work exactly? Good question.
				</p>
				<p>
					Supreme bots fall under two categories. The first category is a bot that parses the DOM of
					the Supreme site and automates clicking and typing. The second category is a bot that uses
					Supreme’s mobile endpoints to fetch and post data. In this article we will be focusing on
					the second category of Supreme bots.
				</p>
				<p>
					These bots work in essentially work in 5 steps:
					<br />
					1. Find your item by keyword or some attribute and store its id
					<br />
					2. Use the id to go to the item endpoint and grab its style/sizing id
					<br />
					3. Add to cart
					<br />
					4. Checkout
					<br />
					5. Check if successful
				</p>
				<p>In this part we will only cover the finding of the item and style/sizing information.</p>
				<h1 id="finding-items">Finding items</h1>
				<p>
					It is common knowledge that Supreme updates their US site with new items at 11AM EST every
					Thursday. Supreme does this by fetching mobile_stock.json every 15 seconds.
					mobile_stock.json is the private endpoint Supreme uses to fetch and display items on their
					mobile site. It can be found at{' '}
					<a href="http://www.supremenewyork.com/mobile_stock.json" rel="noopener nofollow">
						https://www.supremenewyork.com/mobile_stock.json
					</a>
					. We can find this endpoint by switching to a mobile user-agent and opening up the network
					tab in your browser’s dev tools while on the Supreme shop page.
				</p>
				<figure>
					<img
						src={mobileStock.src}
						className="kg-image"
						alt=""
						loading="lazy"
						width="565"
						height="199"
					/>
					<figcaption>Supreme fetching mobile_stock.json</figcaption>
				</figure>
				<p>
					One interesting field to note in the network tab is the Initiator. This tells us which
					script and even which function has made the call to request mobile_stock. Peeking inside
					the script, you’re able to find a lot of interesting things about the Supreme site. We’re
					interested in the loadDataForPoll function.
				</p>
				<figure>
					<img
						src={loadDataForPoll.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="664"
						height="290"
					/>
					<figcaption>
						Supreme loadDataForPoll function that grabs mobile_stock and updates the site view.
					</figcaption>
				</figure>
				<figure>
					<img
						src={setIntervalImage.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="232"
						height="65"
					/>
					<figcaption>Supreme calling their function every _pollInterval ms.</figcaption>
				</figure>
				<figure>
					<img
						src={pollInterval.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="509"
						height="21"
					/>
					<figcaption>_pollInterval set to 15000ms (15 seconds)</figcaption>
				</figure>
				<p>
					We’re able to visit this endpoint ourselves from the browser. Simply head to the URL and
					voila.
				</p>
				<figure>
					<img
						src={mobileStockExample.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="552"
					/>
					<figcaption>Preview of the mobile_stock endpoint for FW18</figcaption>
				</figure>
				<p>
					Immediately, you’re able to view the name, id, image, price, and more of every single item
					in the shop as JSON. Most languages have JSON parsing libraries, find one of your choice.
				</p>
				<p>
					<strong>
						<strong>products_and_categories</strong>
					</strong>{' '}
					is an object that contains every category and its items. We only care about finding our
					desired item and to do so we have two choices:
					<br />
					1. Iterate through each category then iterate through each item until we find the desired.
					O(ci)
					<br />
					2. Only iterate through items inside the “new” category. O(i)
				</p>
				<p>
					Ultimately the choice is yours, option two is limited in that your bot wouldn’t work on
					restocks but has the advantage of not iterating through as many items. Let’s go with
					option 2 for simplicity sake.
				</p>
				<figure>
					<img
						src={fetchExample.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="233"
					/>
					<figcaption>
						An example of fetching and parsing mobile stock endpoint using Javascript
					</figcaption>
				</figure>
				<p>
					Keywords can be found by checking the{' '}
					<a
						href="https://www.supremenewyork.com/previews/fallwinter2018/all"
						rel="noopener nofollow"
					>
						Supreme preview page
					</a>{' '}
					or by checking EU drop if you’re in the US. Once finding your item, you want to store its
					id for the other steps.
				</p>
				<h1 id="finding-the-style-size">Finding the Style + Size</h1>
				<figure className="kg-card kg-image-card">
					<img
						src={supremeShirt.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="270"
					/>
				</figure>
				<p>
					When visiting an item on the Supreme site you’re able to pick your style and sizing
					information in order to add to cart and checkout. Supreme pulls this information from the
					item’s endpoint and we’re able to find it using the same technique we used to find the
					mobile_stock endpoint.
				</p>
				<figure>
					<img
						src={jsonNetwork.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="490"
						height="62"
					/>
					<figcaption>
						The item endpoint for the Hanes tee found inside the network tab on the item page
					</figcaption>
				</figure>
				<p>
					The endpoint follows the following format:
					https://www.supremenewyork.com/shop/&lt;id&gt;.json
					<br />
					&lt;id&gt; being the id found inside the mobile_stock for the desired item.
				</p>
				<figure>
					<img
						src={variantJson.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="647"
					/>
					<figcaption>A preview of the endpoint for the Hanes tee FW18</figcaption>
				</figure>
				<p>
					Inside the endpoint is an array named “styles” containing all of the style objects for the
					particular item. Inside each style object we’re able to find the style name, id, image
					URLs, and a sizes array containing each size name, its id, and whether or not its in
					currently in stock.
				</p>
				<p>
					Both the desired item’s style id and the size id are required for checkout so its
					important that you store these.
				</p>
				<p>
					You can grab the style id by iterating through the styles until you find an object that
					has a name field that matches your keyword. The same goes for grabbing the size id.
				</p>
				<p>
					The names for styles are usually released pre drops by various Supreme news sources and if
					you’re in US you can usually check the EU style names as they drop first.
				</p>
				<p>The next step is adding to cart which will be covered in part two</p>
				<p>Stay tuned</p>
			</div>
		);
	}
}
