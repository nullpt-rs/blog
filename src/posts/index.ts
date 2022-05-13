import {Post} from './Post';
import {ensure} from '../types';

import {Goals} from './2022/01/goals/goals';
import {ServerlessDiscordOAuth} from './2022/01/serverless-discord-oauth/serverless-discord-oauth';
import {Mochip} from './2022/01/mochip/mochip';
import {ZeroKbBlog} from './2022/01/zero-kb-blog/zero-kb-blog';
import {OpenSource} from './2022/03/open-source/open-source';

const ensurePosts = ensure<readonly Post[] | Post[]>();

export const posts = ensurePosts([
	new OpenSource(),
	new Mochip(),
	new ZeroKbBlog(),
	new ServerlessDiscordOAuth(),
	new Goals(),
] as const);
