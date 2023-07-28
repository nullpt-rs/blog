import type { MDXComponents } from 'mdx/types';
import { Code } from 'bright';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        pre: Code
    }
}