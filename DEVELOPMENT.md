## Approach to components
- focus on API simplicity rather than flexibility
- avoid creating custom events unnecessarily, let native events flow through if they are sufficient
- for flexibility expose the underlying native elements (e.g. `input`, `select`, etc.) and allow users to manipulate them directly if needed
- use common code from `core.js`
- use colors and values from the theme CSS files (`src/themes/light.css`, `src/themes/dark.css`) for styling

## File structure
- `src/demo.html`
  - main demo page
  - renders demo of each component in a compact manner
  - also serves as a test page for development
  - imports `demoCommon.js` and individual component demo files (so that when a new component is added, only importing its demo file is necessary to have it show up in the demo page)
- `src/demoCommon.js`
  - common code for demo pages
  - contains common code used by component demo files
- `src/components/core.js`
  - common styles and utilities for all components
- `src/themes/[themeName].css`
  - contains theme-specific styles for the components
  - can be imported in `demo.html` to apply a specific theme to the demo page
- `src/components/[ComponentName]/[ComponentName].js`
  - individual component file
  - contains the implementation of a specific component
  - may import from `core.js`, may import other components (by `./` relative paths), should not import from `demoCommon.js`
  - the component doesn't register itself, only exports the component class
- `src/components/[ComponentName]/[ComponentName].demo.js`
  - contains code to render the demo of the component
  - shows how the component looks and behaves with various props
  - may use common code from `demoCommon.js`
  - demos register themselves in `demoCommon.js` for rendering in `demo.html`
- `src/components/main.js`
  - registers all components
  - reexports all components for easy import

## Code Style Guidelines
- 2 spaces for indentation
- No EOL semicolons in JS, obligatory EOL semicolons in CSS
- Prefix with semicolon lines starting with `(`, `[`, etc. to prevent ASI pitfalls
- Prefer single quotes for strings
- Prefer for loops over forEach
- No dangling promises (always use `await` or `void` to handle them)
- Use trailing commas in multi-line objects/arrays
- Treat abbreviations/acronyms as words in naming (e.g. `XmlParser`, `parseXml`, not `XMLParser`, `parseXML`)

## Visual/UX Guidelines
- use compact, clean UI, avoid unnecessary whitespace (paddings, etc.)
- use minimalistic styling
- avoid unnecessary clicking, dropdowns or modals
  - prefer split buttons to dropdowns with few fixed items
  - search inputs should be case and diacritics insensitive
- user actions should be achivable in minimum number of steps
- changes applied in one part of the UI propagate to the rest of the UI automatically
- avoid double scrollbars
- the app should be in light colors (no dark mode)
