import { Post } from './Post';
import { ensure } from '../types';

import { NewBlog } from './2022/05/new-blog/new-blog';
import { AnatomyOfASupremeBot1 } from './2018/9/anatomy-of-a-supreme-bot-1/anatomy-of-a-supreme-bot-1';
import { AnatomyOfASupremeBot2 } from './2018/9/anatomy-of-a-supreme-bot-2/anatomy-of-a-supreme-bot-2';
import { AnatomyOfASupremeBot3 } from './2018/10/anatomy-of-a-supreme-bot-3/anatomy-of-a-supreme-bot-3';
import { TacklingJavaScriptClientSideSecurity } from './2019/02/tackling-javascript-client-side-security/tackling-javascript-client-side-security-1';
import { ReverseEngineeringTikTok } from './2022/12/reverse-engineering-tiktok-vm-obfuscation/reverse-engineering-tiktok';
import { TheModernizationOfTheLatrine } from './2021/03/the-modernization-of-the-latrine/the-modernization-of-the-latrine';
import { DevirtualizingNike } from './2023/01/devirtualizing-nike-bot-protection/devirtualizing-nike';
import { ForgingPasskeys } from './2025/06/forging-passkeys/forging-passkeys';

const ensurePosts = ensure<readonly Post[] | Post[]>();

export const posts = ensurePosts([
	new DevirtualizingNike(),
	new ReverseEngineeringTikTok(),
	new NewBlog(),
	new TheModernizationOfTheLatrine(),
	new TacklingJavaScriptClientSideSecurity(),
	new AnatomyOfASupremeBot3(),
	new AnatomyOfASupremeBot2(),
	new AnatomyOfASupremeBot1(),
	new ForgingPasskeys(),
] as const);
