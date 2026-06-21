# compact-navbar

`compact-navbar` is a compact navigation custom element implemented by the `CompactNavbar` class.

## Native HTML basis

The component is based on a native `<nav>` landmark. Inside the shadow DOM it renders a `role="tablist"` container with native `<button>` elements using `role="tab"`.

Unlike plain HTML, tab data is provided through one attribute, the current value is reflected to the host, and the component dispatches one structured `change` event. It does not include a built-in configuration button; use the `right` slot for icons or actions.

## Props / attributes

| Name | TypeScript type | Description |
| --- | --- | --- |
| `tabs` | `string \| Array<string \| { value?: string; id?: string; label?: string; disabled?: boolean }>` | Comma-separated labels or JSON array. JSON objects are normalized to `{ value: string; label: string; disabled: boolean }`. `disabled` is parsed but currently not applied by this component. |
| `value` | `string` | Selected tab value. If omitted, the first parsed tab value is used visually. |

## Events

| Event | Type |
| --- | --- |
| `change` | `CustomEvent<{ value: string; item: { value: string; label: string; disabled?: boolean } }>` |

`change` bubbles and is composed, so it can be handled outside shadow DOM boundaries.

## Slots

| Slot | Passed attributes | Type | Description |
| --- | --- | --- | --- |
| `left` | None | `{}` | Content shown before the tab strip, usually a title or logo. |
| `right` | None | `{}` | Content shown after the tab strip, usually actions such as a settings button. |

## Behavior and quirks

The component re-renders whenever `tabs` or `value` changes. Every render creates buttons from the parsed `tabs` attribute and marks the selected button with `aria-selected="true"`.

When a button is clicked, the host `value` attribute is updated before the `change` event is dispatched. Because the host stores selected state in an attribute, other code can observe or update selection without calling component methods.

The tab row scrolls horizontally when there is not enough width. Labels use a hidden bold pseudo-element to reserve space, so selected tabs becoming bold do not shift adjacent tabs.

The current implementation parses item-level `disabled`, but navbar buttons are still clickable. Use `compact-tabs` when disabled item behavior is required.
