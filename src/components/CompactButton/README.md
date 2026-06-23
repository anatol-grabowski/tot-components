# CompactButton

## Description
- a customizable button component based on the native `<button>` element
- supports different visual variants and disabled state

## Props
| Name       | Type                                      | Default     | Read-only | Reflected | Description                          |
| ---------- | ----------------------------------------- | ----------- | --------- | --------- | ------------------------------------ |
| `variant`  | `'primary' \| 'secondary' \| 'danger'`    | `'secondary'`| No        | Yes       | Visual styling variant of the button |
| `disabled` | `boolean`                                 | `false`     | No        | Yes       | Whether the button is disabled       |

## Events
| Name            | Type          | Description                                    |
| --------------- | ------------- | ---------------------------------------------- |
| -               | -             | -                                              |

## Slots
| Name      | Description                  |
| --------- | ---------------------------- |
| `default` | Inner contents of the button |

## Usage
```html
<compact-button variant="primary">Submit</compact-button>

<script>
  const btn = document.querySelector('compact-button')
  btn.addEventListener('click', () => {
    console.log('Button was clicked!')
  })
</script>
```

## Implementation
- relies on `buttonStyle` from `core.js` for styling

