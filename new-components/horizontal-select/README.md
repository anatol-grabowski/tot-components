# compact-horizontal-select

## Native HTML basis

This component is a visual alternative to a select dropdown or tabs. It provides a horizontally scrollable list of buttons representing options.

## Props (attributes / properties)

| Name | TypeScript type | Description |
| --- | --- | --- |
| `options` | `string \| Array<string \| { value?: string; id?: string; label?: string; disabled?: boolean }>` | Comma-separated labels or JSON array. |
| `value` | `string` | The currently selected option's value. |
| `disabled` | `boolean` | Boolean attribute/property. Disables all options. |

## Events

| Event | Type |
| --- | --- |
| `change` | `CustomEvent<{ value: string; item: { value: string; label: string; disabled?: boolean } }>` |

Dispatched when a non-disabled option is clicked.
