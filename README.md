# 🤠 hatmel

Javascript HTML templates powered by template literals

## Usage

The simplest, fastest, lowest dependency template system is the one that is
already built into JavaScript - template literals.

Hatmel leans on tagged template literals to provide a safe way to generate html.

```javascript
import { html } from "hatmel";

function hello(name) {
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello Hatmel!</title>
      </head>
      <body>
        🤠 Hi ${name}
      </body>
    </html>
  `;
}
```

Expressions are escaped by default, so it's safe to use them in html attributes:

```javascript
html`<input type="text" value="${name}" />`;
```

But, Hatmel knows when a value comes from a nested `html` template literal and won't try to escape them again:

```javascript
html`
  <ul>
    <li>${html`<strong>Arbitrary</strong> example`}</li>
    <li>${html`<em>So</em> arbitrary`}</li>
  </ul>
`;
```

Hatmel automatically joins arrays in template literal expressions, for convenience:

```javascript
const names = ["Alice", "Dana", "Orlando"];
html`
  <ul>
    ${names.map((name) => html`<li>${name}</li>`)}
  </ul>
`;
```

Hatmel also, like JSX, doesn't output boolean values. That makes using operators possible:

```javascript
const selected = "Alice";
const names = ["Alice", "Dana", "Orlando"];

html`
  <ul>
    ${names.map(
      (name) => html`<li>${name} ${selected === name && "(Selected)"}</li>`,
    )}
  </ul>
`;
```

The `unsafe` function marks a string as being allowed to be used without escaping:

```javascript
unsafe("<p>Will not be escaped</p>");
```

This is useful in cases like loading html from disk, but should always be used
with caution.

## FAQ

<details>
  <summary>Isn't this just lit-html?</summary>
  No. lit-html processes templates a good bit more to enable updating them. Hatmel is drastically less intelligent, and just renders strings.
</details>

## License

MIT. See [LICENSE](/LICENSE) for more information.
