---
title: "Example Writing Post"
summary: "A short one-line summary shown on the writing card."
date: "2026-01-01"
---

## Heading 2

Regular paragraph text. You can use **bold**, *italic*, and ***bold italic*** together. You can also use ~~strikethrough~~ if supported.

### Heading 3

#### Heading 4

---

## Links

- Inline link: [Google](https://google.com)
- Another link: [GitHub](https://github.com)

## Lists

### Unordered

- First item
- Second item with **bold**
- Third item with a [link](https://example.com)
  - Nested item
  - Another nested item

### Ordered

1. Step one
2. Step two
3. Step three

## Blockquotes

> This is a blockquote. Use it for callouts, quotes, or emphasis.

> "You can also put quoted text inside." — Attribution

## Code

### Inline code

Use `inline code` for short references like variable names or commands.

### Code blocks

Python:

```python
def hello(name: str) -> str:
    return f"Hello, {name}!"

result = hello("world")
print(result)
```

JavaScript:

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

console.log(greet("world"));
```

Plain (no language specified):

```
This is a plain code block.
No syntax highlighting applied.
```

## Tables

| Feature       | Status   | Notes                    |
|---------------|----------|--------------------------|
| Bold          | Works    | Use `**text**`           |
| Italic        | Works    | Use `*text*`             |
| Links         | Works    | Use `[text](url)`        |
| Code blocks   | Works    | Use triple backticks     |
| Tables        | Works    | Use pipe `|` syntax      |
| Blockquotes   | Works    | Use `>` prefix           |

## Combining Elements

1. **Bold in a list** with a [link](https://example.com)
2. *Italic in a list* with `inline code`
3. A list item with a blockquote below:

> Blockquote after a list item.

---

That covers the main markdown features supported by the renderer.
