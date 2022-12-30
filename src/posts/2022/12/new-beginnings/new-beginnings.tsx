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
                <p>Under construction.</p>
            </div>
        );
    }
}