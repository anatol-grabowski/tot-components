# compact-tabs

## Native HTML basis

The component is based on a row of native `<button>` elements in a `role="tablist"` container. There is no native HTML `<tabs>` element, so this component provides a small custom wrapper around accessible button markup.

Unlike plain buttons, options are provided through one attribute, selected state is reflected to the host, item-level disabled states are supported, and a structured `change` event is emitted.

## Props (attributes)

| Name | TypeScript type | Description |
| --- | --- | --- |
| `options` | `string \| Array<string \| { value?: string; id?: string; label?: string; disabled?: boolean }>` | Comma-separated labels or JSON array. JSON objects are normalized to `{ value: string; label: string; disabled: boolean }`. |
| `value` | `string` | Selected option value. If omitted, the first parsed option value is used visually. |
| `disabled` | `boolean` | Boolean attribute. When present, all option buttons are disabled. |

## Events

| Event | Type |
| --- | --- |
| `change` | `CustomEvent<{ value: string; item: { value: string; label: string; disabled?: boolean } }>` |

`change` bubbles and is composed, so it can be handled outside shadow DOM boundaries.

## Slots

This component does not define slots.

| Slot | Passed attributes | Type | Description |
| --- | --- | --- | --- |
| None | None | `never` | All rendered content comes from the `options` attribute. |

## Behavior

The component re-renders whenever `options`, `value`, or `disabled` changes. It creates one native button per parsed option and marks the selected option with `aria-selected="true"`.

When a button is clicked, the host `value` attribute is updated before the `change` event is dispatched. Disabled items and globally disabled tabs cannot be clicked by the browser because they are rendered as disabled buttons.

The row scrolls horizontally on narrow screens. Labels use a hidden bold pseudo-element to reserve space, so selected tabs becoming bold do not shift neighboring tabs.

The component does not implement keyboard arrow-key navigation beyond the native focus and activation behavior provided by buttons.
