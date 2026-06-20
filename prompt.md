create a simple library of web-components in a single *.js file
- Use the attached file for style inspiration
- use no frameworks or libraries
- should be script type="module" compatible
- add documentation for each component clearly describing its props/attributes, events, expected behavior, and any other relevant information
- make them mobile friendly and color blind friendly
- make sure the components don't overflow out of the screen (e.g. tooltips/hints)


Must have components
- **navbar** with some tabs and a configuration icon on the right
- **tab selector**
- **button** (primary, secondary, danger)
- **split button**
- **labeled checkbox**
- **labeled dropdown**
- **labeled input**
- **labeled textarea** (with a button to go fullscreen)
- **box** (a rounded card for an item in some list)
- **dropdown** (select)
- **horizontal select** (a horizontally scrollable bar of buttonlike options, one can be selected)
  - elements close to each other, no space wasted
- **audio player** - shows audio as a wave represenation of the audio (like in advanced music players) not just as a horizontal bar, allowing to seek to a position, displaying current time and total length of the audio
- **audio recorder** with record (red circle in another circle), stop (red square, when recording), pause (two vertical bars) buttons and displaying the length of the recording and a wave representation (may use the audio player component somehow) allowing to play the recording after recorded
  - make sure to request browser permissions for microphone access and handle cases where permission is denied
- **modal window** (should be fullscreen on smaller screens, scroll of the content below the modal should not be possible, close cross in the corner, closable by escape or "back" button on mobile)
- **dialog**
- **message** - info/warning/success/error text
- **toast** (android like)
- simple **stacked bar chart**  
- simple **line chart**
- simple **horizontal bar chart**
- **table** - nothing fancy, should expect data provided as an object
- a complex **tooltip** with styled content inside
  - default tooltip direction is to the right and down of the parent component,  Other direction if not enough space
- a simple **hint** text with plain text
  - default direction for hints down and to the right of the cursor, Other direction if not enough space
- **ordered list**
- **unordered list**
- **file input*** (with dashed border - supports drag and drop)
- **tag selector** - an input combined with a list of tags/labels/chips before it, entering arbitrary text and pressing space twice or enter adds a tag, each tag has a cross to remove it (only when hovered/clicked on mobile)


create a demo page with all the components
- draw them in different states
- mobile browser location bar should never dissapear when the app window is scrolled down



## Code Style Guidelines
- 2 spaces for indentation
- No EOL semicolons in JS, obligatory EOL semicolons in CSS
- Prefix with semicolon lines starting with `(`, `[`, etc. to prevent ASI pitfalls
- Prefer single quotes for strings
- Prefer for loops over forEach
- No dangling promises (always use `await` or `void` to handle them)
- Use trailing commas in multi-line objects/arrays
- Treat abbreviations/acronyms as words in naming (e.g. `XmlParser`, `parseXml`, not `XMLParser`, `parseXML`)
- use gemini-2.5-flash model by default (if the app makes requests to gemini) and store the key to local storage as GEMINI_API_KEY

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
