import {Post} from './Post';
import {ensure} from '../types';

import {NewBlog} from './2022/05/new-blog/new-blog';

const ensurePosts = ensure<readonly Post[] | Post[]>();

export const posts = ensurePosts([
  new NewBlog()
] as const);
