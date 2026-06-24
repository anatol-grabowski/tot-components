# Custom Elements library
- a collection of custom elements (web components) that can be used in web development
- no external dependencies, all code is self-contained within the library
- vanilla JS implementation, no frameworks or builder tools used

- Follow guidelines in [DEVELOPMENT.md](DEVELOPMENT.md) when adding new components or modifying existing ones
- See [src/demo.html](src/demo.html) for a demo of all components

Usage:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/anatol-grabowski/tot-components@main/src/themes/light.css">
<script type="module" src="https://cdn.jsdelivr.net/gh/anatol-grabowski/tot-components@main/src/components/index.js"></script>

<body class="tot-theme-light">
  <tot-button>Click me</tot-button>
</body>
```

