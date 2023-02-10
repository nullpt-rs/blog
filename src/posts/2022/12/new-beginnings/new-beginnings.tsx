import {Post} from "../../../Post";


export class NewBeginnings extends Post {
    public name = 'New Beginnings';
    public image = undefined;
    public author = 'parker';
    public slug = 'new-beginnings';
    public date = new Date('29 Dec 2022');
    public hidden = false;
    public excerpt = 
        'Aspiring to enter the cybersecurity field, with much thanks to alii, I decided to start a blog to document my journey.'
    public keywords = ['Cybersecurity', 'CTF', 'Hacking', 'Security', 'Virtual Machine'];

    public render() {
        return (
            <div>
                <h1>Who Am I?</h1>
                    <p>
                        I am a 21 year old information security student (hopefully this will change!) who has always had a passion being around technology,
                        especially computers. However, I was more into playing video games instead of the technology itself. I grew up being pretty proficient
                        and had a knack for computers because of this - or, at least I thought I did. 
                    </p>
                    <p>
                        After talking to someone who is already in the field, I realized I actually knew very little about my machine. Sure, I can easily
                        familiarize and navigate myself around new applications and technologies, but if I were to get thrown into a helpdesk role, I wouldn't
                        last a day. Thankfully, I took this as a sign to pursue this passion I had for computers, specifically the security aspect.
                    </p>
                <h1>What To Expect</h1>
                    <p>
                        This blog is meant to help express my thoughts and understanding of topics/concepts that I find interesting. It'll be easier to refer
                        back to should I forget anything and need some form of reference. But hopefully sometime in the future this will be useful for someone else.
                    </p>
                <h1>Skills</h1>
                    <p>
                        At the moment, I am currently CompTIA Network+ and Security+ certified.
                        I haven't been able to focus much on applying any knowledge into any projects as all my time was put into studying for
                        my certifications. As of writing this (02/08/2023) that will no longer be the case. I've got a couple of small projects that I'm
                        looking forward to revising which, hopefully soon, will be published on this site.
                    </p>
                    <p>
                        Basic to intermediate understanding of JavaScript, HTML, and Python. After finishing up the Security+, I plan on making a
                        blog post of some scripts that were made for HackTheBox. Solid grasp on Splunk, Snort, and BurpSuite. More on those in the
                        future.
                    </p>
               <h1>And One Last Thing...</h1>
                    <p>
                        I would also like to give where credit is due. Much thanks to <a href="https://github.com/alii">alii</a> for providing
                        a very clean templete for this website and saving me from building it all myself. Jokes aside, this will make great
                        practice since I am very new to TypeScript and Next.js. That's all from me!
                    </p>
            </div>
        );
    }
}
