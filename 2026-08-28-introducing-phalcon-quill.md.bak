---
layout: post
title: Introducing Phalcon Quill
image: /assets/files/2026-08-25-phalcon-quill.svg
date: 2026-08-25T12:00:00.000Z
tags:
  - phalcon
  - quill
  - tools
---
We have released [`phalcon/quill`](https://github.com/phalcon/quill), an API documentation generator that reads Zephir and PHP sources. It installs with Composer, is driven by a single config file, and every piece of markup it emits comes from a template you can override.

<!--more-->

## Why we built it

Phalcon lives in two codebases. `cphalcon` is written in Zephir and compiled into an extension; `phalcon` is the same framework implemented in plain PHP. Every documentation generator we looked at reads PHP, which covers half of what we needed and leaves the half that ships as an extension undocumented.

Quill reads both, into the same model.

## How it works

A reader knows one language and nothing about output. A formatter knows one output format and nothing about the language it came from. Between them sits a typed model:

```
ZephirReader  (phalcon/zephir)   ─┐                      ┌─> MarkdownFormatter (mkdocs pages)
                                  ├>  Model -> toArray() ┤
PhpReader     (nikic/php-parser) ─┘   (object graph)     └─> JsonFormatter     (model document)
```

That split is the whole design. Adding a formatter never means going back to a reader, so the model is deliberately complete: anything a reader can observe cheaply goes in, even when today's formatters ignore it.

`nikic/php-parser` ships with Quill, so the PHP reader always works. Reading `.zep` sources needs `phalcon/zephir`; selecting `language: zephir` without it fails with an explanation rather than a "class not found".

## Installing

```bash
composer require --dev phalcon/quill
```

Everything project-specific lives in a `quill.php` at your project root. Nothing about any particular repository is compiled into Quill:

```php
<?php

return [
    'language'   => 'zephir',
    'source'     => 'phalcon',
    'output'     => 'output/docs/api',
    'assets'     => 'output/docs/assets/css',
    'repository' => 'phalcon/cphalcon',
    'branch'     => '5.0.x',
    'prefix'     => 'phalcon',
    'extension'  => 'zep',
    'namespace'  => 'Phalcon',
    'templates'  => 'output/docs/templates',
];
```

Set `language` to `php` and point `source` and `extension` at your own tree and you are running against a PHP project. The `repository`, `branch` and `prefix` triple builds the "Source on GitHub" link on every class.

## Generating

```bash
vendor/bin/quill generate                             # every page
vendor/bin/quill generate encryption                  # only pages matching the filter
vendor/bin/quill generate --namespace=Phalcon\Config  # one namespace and below
vendor/bin/quill generate --format=json               # one model document instead
```

You get one page per top-level namespace segment, an index linking to the rest, and the formatter's static assets.

Two behaviors worth knowing. The registry is always built from every source file regardless of the filter, so cross-page links stay correct even on a narrow run. And a complete run prunes: a document in the output directory that the run did not produce is deleted, so a namespace that disappears takes its page with it. A filtered run is deliberately partial and never prunes.

## Templates are the point

The Markdown formatter emits no markup of its own. Every fragment it writes comes from a template, and `templates` in your config points at a directory that is consulted first, per name. Overriding one template is not vendoring the other nineteen.

The templates are small. This is the whole of `method.tpl`:

````
#### `{{name}}()` { #{{anchor}} }

```php
{{signature}}
```
{{description}}
````

And `summary-row.tpl`:

```html
<a class="api-item" href="#{{anchor}}">
<code class="vis vis-{{visibility}}">{{visibility}}</code>
{{returnType}}<code class="sig">{{signature}}</code>
{{description}}</a>
```

Slots are `{{name}}` and are substituted in a single pass, so a value that happens to contain `{{title}}` is text, not an instruction. A placeholder your template does not use is ignored, so a template may take fewer slots than it is handed. One it invents is fatal, and the error names every unsupplied token at once rather than the first.

Loops, ordering and conditionals stay in PHP. A section that renders nothing is handed an empty string rather than asked to decide, which keeps the templates readable by someone who is not a PHP developer.

Two small guardrails. A `.tpl` whose name is not in the shipped set, or one sitting above the format directory, is ignored with a warning naming it and the nearest real name; both would otherwise give you a successful run that applied no override. And a template's trailing newline is stripped, exactly one, so a fragment that must end in a newline is written with a blank final line, which is what your editor leaves behind anyway.

`api.css` carries selectors only. The colors come from `--api-*` custom properties it reads but does not define, which leaves the palette, and light and dark, to the site rendering the pages.

## Two formatters

| | `markdown` | `json` |
|---|---|---|
| Output | one page per namespace, plus an index | one `model.json` |
| Assets | `api.css` | none |
| Private members | filtered out | present, with visibility |
| Enums | rendered as classes | `structure.keyword: enum` |
| Traits | `Trait` badge, plus a `Used by` list | `structure.keyword: trait` |

The Markdown formatter is deliberately opinionated and the JSON one deliberately is not. `model.json` is the model as it stands, private members and all.

## Comparing two implementations

This part is optional, and it exists because of how we work rather than because a documentation generator needs it. If you only want API docs, skip it.

Because the model is the same shape whichever reader produced it, two model documents can be compared. That is how we keep `cphalcon` and `phalcon` aligned:

```bash
vendor/bin/quill generate --format=json --config=cphalcon/quill.php
vendor/bin/quill generate --format=json --config=phalcon/quill.php
vendor/bin/quill parity left.json right.json
```

`parity` reports definitions present on one side only and, for the shared ones, which members differ. It exits non-zero when anything differs, so it can gate a build. Adding `--namespace=` to both sides compares one subsystem at a time, which keeps the diff readable.

`docblocks` takes the same two documents and writes the documentation disagreements to a spreadsheet, one row per difference with a `winner` column to fill in. Rows where one side is blank are pre-filled; the rest are a human decision. Nothing here edits your source.

Names in the model are resolved as they are read. Both languages spell a parent three ways, as `\Foo`, as `Foo` behind a `use`, or as `Foo` meaning the sibling in the same namespace, and the readers resolve all three, so two trees that agree cannot look like they disagree.

`ClassDefinition::toArray()` carries a `version`, and `parity` refuses a document whose version it does not recognize rather than reporting the moved keys as differences.

## Links

- Repository: [github.com/phalcon/quill](https://github.com/phalcon/quill)
- Package: [packagist.org/packages/phalcon/quill](https://packagist.org/packages/phalcon/quill)
- Alignment tracking issue: [cphalcon#17428](https://github.com/phalcon/cphalcon/issues/17428)

Feedback and bug reports are welcome on the issue tracker.
