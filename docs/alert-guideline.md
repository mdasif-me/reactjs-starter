# Alert System Guideline

## Installation & Setup

Already configured in your project! Just use the hook in any component.

## Basic Usage

```tsx
import { useAlert } from '@/hooks/use-alert'

function MyComponent() {
  const { showAlert } = useAlert()

  return (
    <button
      onClick={() =>
        showAlert({
          type: 'confirm',
          title: 'Are you sure?',
          confirmAction: { label: 'Yes', onClick: () => {} },
        })
      }
    >
      Delete
    </button>
  )
}
```

## Alert Types Cheat Sheet

| Type      | When to Use                      | Icon |
| --------- | -------------------------------- | ---- |
| `success` | Operation completed successfully | ✓    |
| `error`   | Operation failed                 | ✗    |
| `warning` | Warning/caution needed           | ⚠   |
| `info`    | General information              | ℹ   |
| `confirm` | Need user confirmation           | ?    |

## Button Variants Cheat Sheet

| Variant   | Color   | When to Use                          |
| --------- | ------- | ------------------------------------ |
| `primary` | Blue    | Normal positive actions              |
| `danger`  | Red     | Destructive actions (delete, logout) |
| `default` | Outline | Neutral/secondary actions            |

## Complete Config Template

```typescript
showAlert({
  // Required
  type: 'confirm',
  title: 'Dialog Title',

  // Optional
  description: 'Dialog description',
  icon: <MyIcon />,
  iconSrc: '/path/to/icon.svg',
  iconAlt: 'Icon alt text',

  // Confirm button
  confirmAction: {
    label: 'Confirm',
    onClick: async () => {
      // Your action here
    },
    variant: 'primary', // or 'danger', 'default'
    isLoading: false,
  },

  // Cancel button (optional)
  cancelAction: {
    label: 'Cancel',
    onClick: () => {},
    variant: 'default',
  },
})
```

## Common Scenarios

### Delete Something

```tsx
showAlert({
  type: 'confirm',
  title: 'Delete Item?',
  description: 'This cannot be undone.',
  confirmAction: {
    label: 'Delete',
    onClick: () => deleteItem(),
    variant: 'danger',
  },
  cancelAction: { label: 'Cancel', onClick: () => {} },
})
```

### Success Message

```tsx
showAlert({
  type: 'success',
  title: 'Saved!',
  description: 'Changes saved successfully.',
  confirmAction: { label: 'OK', onClick: () => {} },
})
```

### Error Handling

```tsx
showAlert({
  type: 'error',
  title: 'Error',
  description: error.message,
  confirmAction: { label: 'OK', onClick: () => {} },
})
```

### Confirmation with Async Action

```tsx
showAlert({
  type: 'confirm',
  title: 'Save Changes?',
  confirmAction: {
    label: 'Save',
    onClick: async () => {
      await saveData() // Auto-closes when done
    },
  },
  cancelAction: { label: 'Cancel', onClick: () => {} },
})
```

## Hooks & Context

### useAlert() Hook

```tsx
const { showAlert, hideAlert } = useAlert()

// showAlert(config) - Display alert
// hideAlert() - Close alert
```

### AlertProvider

Already wrapped in App.tsx - no action needed!

### AlertDisplay

Already rendered in App.tsx - no action needed!

## File Locations

- Hook: `src/hooks/use-alert.ts`
- Context: `src/context/alert-context.ts`
- Provider: `src/context/alert-context-provider.tsx`
- Display: `src/shared/components/alert-display.tsx`

## Docs

- **Full Guide**: `docs/alert-system.md`
- **Examples**: `docs/alert-examples.md`
- **Refactoring Summary**: `docs/alert-refactoring-summary.md`

## Troubleshooting

### "useAlert must be used within AlertProvider"

- Make sure component is inside `<AlertProvider>` (it is in App.tsx)
- Check that you're calling hook at component level, not in callbacks

### Alert not showing

- Verify `<AlertDisplay />` is in App.tsx ✓
- Check you're calling `showAlert()` not `show()` ✓
- Ensure alert config is valid ✓

### Eslint errors

All new files pass ESLint checks ✓

---

## Import Statement

```tsx
import { useAlert } from '@/hooks/use-alert'
```

That's it! Start using `showAlert()` in your components.
