# CompactCheckbox

## Description
- a labeled checkable input component based on the native `<input type="checkbox">` element
- provides indeterminate state support and styled custom appearance

## Props
| Name            | Type      | Default | Read-only | Reflected | Description                                      |
| --------------- | --------- | ------- | --------- | --------- | ------------------------------------------------ |
| `label`         | `string`  | `''`    | No        | Yes       | Text label displayed next to the checkbox        |
| `checked`       | `boolean` | `false` | No        | Yes       | Whether the checkbox is currently checked        |
| `disabled`      | `boolean` | `false` | No        | Yes       | Whether the checkbox is disabled                 |
| `indeterminate` | `boolean` | `false` | No        | Yes       | Whether the checkbox is in an indeterminate state|

## Events
| Name     | Type          | Description                                                                        |
| -------- | ------------- | ---------------------------------------------------------------------------------- |
| `change` | `CustomEvent` | Emitted when the checkbox state changes. Detail contains `{ checked: boolean }`    |

## Slots
This component does not use any slots.

## Usage
```html
<compact-checkbox label="Accept Terms and Conditions"></compact-checkbox>

<script>
  const checkbox = document.querySelector('compact-checkbox');
  checkbox.addEventListener('change', (event) => {
    console.log('Checkbox is now:', event.detail.checked);
  });
</script>
```

## Implementation
- extends `HTMLElement`
- generates a unique ID per instance to link the internal `<label>` with the `<input>`
- syncs standard attributes (`checked`, `disabled`, `indeterminate`) with the native input element
- when clicked or toggled, removes `indeterminate` state natively
- overrides native element behavior by wrapping it inside styling with a unified structure
- label text can be provided via `label` attribute or directly in `textContent`
