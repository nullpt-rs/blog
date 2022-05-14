/* eslint-disable react/iframe-missing-sandbox */
// Slightly broken rule

import {parse} from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import Image from 'next/image';
import {Post} from '../../../Post';
import firstBlogPost from './first-blog-post.webp';
import secondGuide from './second-guide.webp';
import youngVeritas from './young-veritas.webp';
import lastPost from './last-post.webp';
import guitarAnimation from './guitar-animation.gif';
import {useEffect, useState} from 'react';
import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../../client/components/highlighter';
import Head from 'next/head';

export class NewBlog extends Post {
	public name = 'The Story of nullpt.rs';
  public image = undefined;
  public author = 'veritas';
	public slug = 'the-story-of-nullptrs';
	public date = new Date('12 May 2022');
	public hidden = false;
	public excerpt = 'New and improved simplified blog';
	public keywords = ['Blog', 'React', 'TypeScript', 'Ghost'];

	public render() {
		return (
			<>
				<Head>
					<meta key="title" property="og:title" content={this.name} />
				</Head>
				<ContentWrapper />
			</>
		);
	}
}

const DetailedBody = () => (
	<>
		<p>
			My adventures in blogging began in 2007 at the age of eight. In typical veritas fashion, my
			first blog post reads:
		</p>
		<blockquote>If i made a promise sorrry i was out sick but anyways ill be posting now</blockquote>
		<p>
			My first ever blog post was an ode to procrastination and ADHD. Knowing I had zero readers at the time,
			I still felt an obligation to create the best Club Penguin guides an eight year old could possibly provide.
			All from the comfort of my shared living room computer.
		</p>
		<figure className="text-center w-2/4 mx-auto">
			<Image src={firstBlogPost.src} alt="My first blog post" width={550} height={389} />
			<figcaption>My first ever blog post</figcaption>
		</figure>
		<p>
			And that I did. Well... sort of. My first guide detailed how to "exploit" the game in order
			to allow your avatar use special item animations without the item appearing equipped. (i.e. penguins
			with guitars equipped would be shown strumming their guitar when playing the dancing animation)
		</p>
		<figure className="text-center w-1/4 mx-auto">
			<Image src={guitarAnimation.src} alt="Club Penguin avatar strumming a red electric guitar." width={128} height={128} />
			<figcaption>Club Penguin avatar strumming a red electric guitar.</figcaption>
		</figure>
		<p>
			The title, bold and proud, "<span style={{fontWeight: "800"}}>dance without the clothes</span>".
			Uh... Cut me some slack, I was eight!
			The content wasn't any better. Void of any punctuation, images, capitalization, and structure, the guide
			goes as follows:
		</p>
		<blockquote>first open the player card then put ur gutiar on dont put anything else on close the player card open the player card take off the guitar dont close the player card then put on the tour guide hat still dont close the player card now dance. done</blockquote>
		<p>
			As terrible as this post was, it motivated me to write my next groundbreaking guide.
			Published on Jun 29, 2007, this guide teaches the reader how to glitch their penguin to
			equip two instruments at once (The game would
			normally remove one instrument when trying to equip another).
			The title you ask? "Under Construction!!!!!!!! 2 Things At One (not hacking)". Yep, the blog was definitely under construction alright.
			The one cool thing about this particular post is that it included images this time! The guide:
		</p>
		<blockquote>First open ur player card the put only ur guitar.After Close the player card.AfterWards open u player card again then take of the guitar and put the drum sticks on (DONT CLOSE UR PLAYER CARD) now dance note:THIS WORKS WITH ANY ANIMATION ITEM</blockquote>
		<figure className="text-center w-1/2 mx-auto">
			<Image src={secondGuide.src} alt="My second guide on my blog" width={535} height={424} />
			<figcaption>My second guide on my blog</figcaption>
		</figure>
		<p>
			Crossed out text indicated that this method was now patched. This post was
			a step up from my first two and I didn't stop there. A few more posts followed, up until
			Nov 30, 2008, with a post titled:
		</p>
		<h1>Appoligies</h1>
		<blockquote>Sorry people i havent been posting in days So sorry i keep my promise i will start posting from now on
			On the bright side i joined a production owned by Mr artic 1 and is called bpp productions here are the updates on clubpenguin.
		</blockquote>
		<figure className="text-center w-1/2 mx-auto">
			<Image src={lastPost.src} alt="My final blog post on this site" width={540} height={1185} />
			<figcaption>My final blog post on this site</figcaption>
		</figure>
		<p>The blog comes full circle with an apology reminiscient of my first ever post.
			I mention joining a production. A term used to describe a group of friends who recorded,
			edited, and produced Club Penguin music videos. A video production team. Very impressive considering
			we were all younger than ten at this time. Below is a Club Penguin music video for Cascada's
			{" "}<i>Evacuate the Dancefloor</i> that I am featured in.
		</p>
		<b className="text-2xl"><span className="text-red-600">WARNING</span>: This video contains flashing lights which may not be suitable for photosensitive epilepsy.</b>
		<figure className="text-center mx-auto">
			<iframe allowFullScreen className="mx-auto" width="560" height="315" src="https://www.youtube.com/embed/gwAyAPuR1xc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
			<figcaption>"Evacuate The Dancefloor" Club Penguin Music Video from 2009 that I am featured in</figcaption>
		</figure>
		<p>I didn't know it at the time, but this would be my last ever post on the blog. On this particular blog. I never stopped blogging.
			I had over ten club penguin blogs that I've created over the years. Each iteration better than the last.
			Everything from the name, theme, content, images, and free .tk domains. Blogging was in my DNA. But as I grew older, my interest in the world of Club Penguin waned, and as a result, my blogging days came to a halt.
		</p>
		<h1><span className="bg-red-700 p-2">Supreme</span> Enters the Ring</h1>
		<p>Supreme. A New York-based skate company turned billion-dollar clothing and lifestyle brand
			most known by their iconic bright red rectangle stamped in Futura Heavy Oblique.
			Some of their products are known to sell out in a matter of *seconds*. As a result, automation
			is often used by those who want to either: (a) purchase products for themselves or (b) resell them for <a href="https://stockx.com/supreme-clay-brick-red">an absurd markup</a>.
		</p>
		<p>The problems I now faced were larger than my eight-year-old self could have imagined.
			At this point (2017), the logic behind bots was not publicized. Bots having features
			such as being able to retrieve early links could be the difference between bots that could purchase hundreds
			vs bots that were a few seconds too late. This "exploit" is exactly what gained me my notoriety in the
			e-commerce automation scene. Many bot developers were not fond of me publicizing what was once considered
			a valuable private resource.
		</p>
		<small>related content: <a href="https://nullpt.rs/anatomy-of-a-supreme-bot-pt-3/">Anatomy of a Supreme Bot (Pt 3)</a></small>
		<p>The drama that ensued was not my intention, although I must say it was at times fun.
			My goal was to end the gatekeeping by demystifying the lucrative field of "sneaker botting".
			This required me to first learn about how these tools were built.
		</p>
		<p>My first posts covered how bots work on an HTTP request level. Pretty elementary level stuff
			for new bot developers. As time went on and e-commerce automation grew, companies began catching onto these tactics.
			As a result, these anti-bot companies employed more vigorous bot detection techniques.
			My content now shifted toward more advanced reverse-engineering topics. Mostly combatting obfuscation
			techniques used in these anti-bot scripts. As the topics become more advanced, the balance between being
			easy to follow for beginners and engaging and informative enough for those more advanced becomes harder. A long-winded blog
			post explaining how to achieve a very specific goal covering A-Z may be too niche for anyone to follow.
			This causes the reader to become disengaged. I've received much praise for nullpt.rs blog posts but I knew I could make it better.
		</p>
		<p>Equipped with a beautiful <a href="https://en.wikipedia.org/wiki/WYSIWYG">WYSIWYG</a> editor only second to Medium, nullpt.rs previous blogging platform, Ghost, allowed the ability to write and preview blog posts quickly.
			This wasn't enough. The posts needed to be interactive to fully capture the reader. As a result, nullpt.rs now uses
			a forked version of Alistair Smith's <a href="https://github.com/alii/blog">blog</a> project. Blog posts are now treated as a playground instead of a textbook.
		</p>
		<p>Now, readers can interact with custom components created to help demonstrate the purpose of the reading.
		</p>
		<p>Let's see it in action.</p>
		<p>Below is a snippet of code that uses Babel on user input and reverses any StringLiteral present inside the code. The transformed output is updated on the right.</p>
		<Highlighter language="javascript">
			{stripIndent(`const ast = parse(code);
traverse(ast, {
  StringLiteral(path) {
    path.node.value = path.node.value.split('').reverse().join('');
  }
});
setTransformedCode(generate(ast).code);`)}
		</Highlighter>
		<ASTEditor/>
		<p>Pretty neat, right?</p>
		<p>A big thank you to all nullpt.rs readers. I've received great feedback over the years. Blogging has allowed me to explore my curiosity
			in ways unimaginable. It has introduced me to some of my now closest friends. It will take me some time to migrate all old posts to fit
			this new format as I'd like to reimagine them instead of copy-paste. You can still read them <a href="https://old.nullpt.rs/">here</a>.
		</p>
		<figure className="text-center mx-auto w-1/2">
			<Image src={youngVeritas.src} alt="A very young veritas seated at the family computer. Likely writing for his Club Penguin blog." width={2159} height={2159} />
			<figcaption>A very young veritas seated at the family computer. Likely writing for his Club Penguin blog.</figcaption>
		</figure>
	</>
  );

  const TldrBody = () => (
	<>
		<h1>TL;DR</h1>
		<p>I started blogging in 2007 at the age of eight by writing Club Penguin guides on how to
			perform fun glitches. Initially, my blogs sucked. By the end of my Club Penguin
			blogging journey, they still sucked, but got a tadbit better. Eventually, I transfered my blogging
			skills into the e-commerce automation scene. As the content became more complex
			in nature I needed to find a way to make the content more engaging. This inspired the switch
			from Ghost CMS to a custom fork of <a href="https://github.com/alii">Alistair Smith</a>'s blog repo.
			I can code custom interactive components like this:
		</p>
		<ASTEditor />
		<p>
			It will take me some time to migrate all old posts to fit this new format as I'd like to reimagine them instead of copy-paste them.
			You can still read them <a href="https://old.nullpt.rs/">here</a>.
		</p>
	</>
    );
const ContentWrapper = () => {
  const [tldrMode, setTldrMode] = useState<boolean>(false);

  return (
	<>
		<input
			type="checkbox" value="tldr" onChange={e => {
setTldrMode(e.target.checked);
			}} />
		<label className="p-2">TL;DR Mode</label>
		<div className="py-4">
			{tldrMode ? <TldrBody /> : <DetailedBody />}
		</div>
	</>
  );
};

const ASTEditor = () => {
  const [code, setCode] = useState<string>("console.log('Try editing me');");
  const [transformedCode, setTransformedCode] = useState<string>("console.log('Try editing me');");

  useEffect(() => {
    try {
      const ast = parse(code);
      traverse(ast, {
        StringLiteral(path) {
          path.node.value = path.node.value.split('').reverse().join('');
        }
      });
      setTransformedCode(generate(ast).code);
    } catch {
      setTransformedCode("// could not parse JS");
    }
  }, [code]);

  return (
	<div className="flex">
		<div className="flex-1 mx-4">
			<span>Your code</span>
			<input
				className="bg-neutral-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-800 dark:border-blue-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text" name="" id=""
				value={code} onChange={e => {
 setCode(e.target.value);
				}} />
		</div>
		<div className="flex-1 mx-4">
			<span>Transformed output</span>
			<Highlighter>
				{stripIndent(transformedCode)}
			</Highlighter>
		</div>
	</div>
  );
};
