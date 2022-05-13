import {stripIndents} from 'common-tags';
import {Post} from '../../../Post';

export class Goals extends Post {
	public name = 'Goals';
	public date = new Date('2 January 2022');
	public slug = 'goals';
	public keywords = ['goals', '2022'];
	public hidden = false;
	public excerpt = stripIndents`	
        My goals for the year
    `;

	render() {
		return (
			<>
				<h1>goals</h1>

				<p>
					hello everyone! happy 2022. i wanted a place to quickly jot down what i wanted to achieve
					this year by myself. i'm not the biggest fan of lists but it is indeed satisfactory to be
					able to check something off as completed. 2021 was a fantastic year but i felt that i
					could lose motivation in something remarkably quickly. i recognise i have poor sleeping
					patterns and i dont follow many healthy work/life balance practices so this would
					definitely be something i'd like to pursue this year. i know i can work a lot more than i
					do already!
				</p>

				<p>briefly, here's what i'd like to get done...</p>

				<ul>
					<li>as mentioned above, a consistent sleeping pattern</li>
					<li>visit florida and possibly new york to see internet friends</li>
					<li>buy a car by working n hours (i have the value worked out)</li>
					<li>start a passive income stream, but idea for this is tbc</li>
					<li>work outside of my bedroom where possible</li>
					<li>maintain this blog, maybe a new post once or twice a month</li>
				</ul>
			</>
		);
	}
}
