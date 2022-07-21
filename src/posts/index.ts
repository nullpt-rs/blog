import {Post} from './Post';
import {ensure} from '../types';

import {NewBlog} from './2022/05/new-blog/new-blog';
import { AnatomyOfASupremeBot1 } from './2018/9/anatomy-of-a-supreme-bot-1/anatomy-of-a-supreme-bot-1';
import { AnatomyOfASupremeBot2 } from './2018/9/anatomy-of-a-supreme-bot-2/anatomy-of-a-supreme-bot-2';
import { AnatomyOfASupremeBot3 } from './2018/10/anatomy-of-a-supreme-bot-3/anatomy-of-a-supreme-bot-3';
import { TacklingJavaScriptClientSideSecurity } from './2019/02/tackling-javascript-client-side-security/tackling-javascript-client-side-security-1';

const ensurePosts = ensure<readonly Post[] | Post[]>();

export const posts = ensurePosts([
  new NewBlog(),
  new TacklingJavaScriptClientSideSecurity(),
  new AnatomyOfASupremeBot3(),
  new AnatomyOfASupremeBot2(),
  new AnatomyOfASupremeBot1(),
] as const);
