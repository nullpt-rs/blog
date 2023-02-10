import {Post} from './Post';
import {ensure} from '../types';

import {NewBeginnings} from './2022/12/new-beginnings/new-beginnings';




const ensurePosts = ensure<readonly Post[] | Post[]>();

export const posts = ensurePosts([
  new NewBeginnings()
] as const);
