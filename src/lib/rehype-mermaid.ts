import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

const hasClass = (node: Element | undefined, name: string): boolean => {
    const classes = node?.properties?.className;

    return Array.isArray(classes) && classes.includes(name);
};

/**
 * Turns a ```mermaid fence into `<pre class="mermaid">` holding the raw
 * diagram text. The Mermaid component renders it on the client; Shiki is
 * told to skip the `mermaid` language so the text reaches here unhighlighted.
 */
export function rehypeMermaid() {
    return (tree: Root): void => {
        visit(tree, 'element', (node: Element, index, parent) => {
            if (node.tagName !== 'pre' || parent === undefined || index === undefined) {
                return;
            }

            const code = node.children.find(
                (child): child is Element =>
                    child.type === 'element' && child.tagName === 'code'
            );

            if (!hasClass(code, 'language-mermaid')) {
                return;
            }

            parent.children[index] = {
                type: 'element',
                tagName: 'pre',
                properties: { className: ['mermaid'] },
                children: code?.children ?? [],
            };
        });
    };
}
