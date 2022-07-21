/* eslint-disable react/jsx-child-element-spacing */
/* eslint-disable react/jsx-no-comment-textnodes */
import {Post} from '../../../Post';
import {OldPost} from '../../../../client/components/oldpost';
import img1 from './1.png';
import img2 from './2-1.png';
import img3 from './3.gif';
import img4 from './4-1.png';
import img5 from './5-1.png';
import img6 from './6-1.png';

export class AnatomyOfASupremeBot3 extends Post {
	public name = 'Anatomy of a Supreme Bot (Pt 3)';
	public image = undefined;
	public author = 'veritas';
	public slug = 'anatomy-of-a-supreme-bot-part-3';
	public date = new Date('25 Oct 2018');
	public hidden = false;
	public excerpt =
		' In this part I have something interesting that’s been going around the bot scene lately.';

	public keywords = ['Supreme', 'Reverse Engineering', 'Bots'];

	public render() {
		return (
			<div>
				<OldPost />
				<p>
					<strong>
						<strong>EDIT: This method is now patched</strong>
					</strong>
				</p>
				<p>
					Hello folks, due to the overwhelmingly positive feedback of the last two articles I’ve
					decided to continue this series. In this part I have something interesting that’s been
					going around the bot scene lately.
				</p>
				<h1 id="variants">Variants</h1>
				<p>
					At first, I had 0 clue what this word meant in the botting community. Context clues
					weren’t very useful because bot developers love keeping secrets and talking about
					techniques in abstract ways. Lucky for you, I like sharing my knowledge and I don’t get
					off on being vague to seem mysterious. So, what are variants?
				</p>
				<p>
					Variants are the size IDs passed into Supreme’s checkout.json cookie-sub. If you remember
					from part two, cookie-sub contains a JSON representation of the final size-id and the
					quantity.
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img1.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="228"
						height="26"
					/>
					<figcaption>The cookie-sub passed to checkout.json</figcaption>
				</figure>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img2.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="84"
						height="29"
					/>
					<figcaption>The JSON representation after decoding</figcaption>
				</figure>
				<p>
					Something interesting is that adding an item to cart is not necessary. The cookie-sub is
					all the information the checkout.json endpoint needs to cop your items!
				</p>
				<p>
					The next question is obvious, how do I get the ID of an item that doesn’t exist in
					mobile_stock.
				</p>
				<p>To answer this, let’s look at mobile_stock.</p>
				<figure className="kg-card kg-image-card">
					<img
						src={img3.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="500"
						height="270"
					/>
				</figure>
				<h1 id="to-mobile_stock-json-we-go-">To mobile_stock.json We Go!</h1>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img4.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="695"
						height="684"
					/>
					<figcaption>mobile_stock.json on Oct 25 2018</figcaption>
				</figure>
				<p>
					My first observation was that the items inside the “new” category are incremented by 1.
					This is major because this means we may be able to bruteforce items by trying a higher ID
					than the current highest.
				</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img5.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="700"
						height="536"
					/>
					<figcaption>JSON of an item</figcaption>
				</figure>
				<p>
					Looking at the item’s JSON I also notice that the size IDs are incremented by one. This is
					looking super EPIC. I won’t take full credit for the next discovery. I was pretty close,
					my initial attempts included finding correlation between mobile_stock ids and
					lookbook/preview item ids. The hint I was given is when everything clicked.
				</p>
				<h1 id="out-of-stock">Out of Stock</h1>
				<p>What happens when we checkout an item that’s out of stock? Only one way to find out.</p>
				<figure className="kg-card kg-image-card kg-card-hascaption">
					<img
						src={img6.src}
						className="kg-image"
						alt="Image for post"
						loading="lazy"
						width="279"
						height="254"
					/>
					<figcaption>Trying to checkout a sold out item.</figcaption>
				</figure>
				<p>
					Hm! Turns out that Supreme is pretty generous with the information given when an item has
					the outOfStock status. They give us the, item name, item color, item size, and more. Turns
					out, Supreme’s items are loaded into shop before drops. You can use this to now bruteforce
					later item IDs!
				</p>
				<p>
					Once you have the size ID before drop, you are at a HUGE advantage as you’re able to skip
					the parsing of mobile_stock and item JSON, skip the add.json endpoint, and go straight to
					your checkout.
				</p>
				<p>
					That’s all there is to it. The source is available on{' '}
					<a href="https://github.com/blastbots/supreme-variants-finder" rel="noopener nofollow">
						Github
					</a>
					.
				</p>
			</div>
		);
	}
}
