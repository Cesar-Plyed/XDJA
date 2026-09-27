# CONTRIBUTING.md

## Contributing to XDJA Construction Website

Thank you for your interest in contributing to the XDJA Construction website. This document provides guidelines and instructions for contributing.

## Code of Conduct

All contributors are expected to:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on code and ideas, not individuals
- Report problematic behavior to project maintainers

## Getting Started

### 1. Fork the Repository

```bash
git clone https://github.com/YOUR-USERNAME/XDJA.git
cd XDJA
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

Follow the code style guidelines below.

### 4. Test Your Changes

```bash
npm run dev      # Test locally
npm run build    # Check production build
npm run lint     # Verify code quality
```

### 5. Commit with Clear Messages

```bash
git commit -m "feat: add new feature description"
```

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring without feature changes
- `test:` - Adding or updating tests
- `chore:` - Dependency updates or configuration changes

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Code Style Guidelines

### TypeScript

- Use strict type definitions
- Avoid `any` type unless absolutely necessary
- Use interfaces for component props
- Export components as named exports

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

export default Button;
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract complex logic into custom hooks
- Use proper TypeScript typing

```typescript
// Good
const MyComponent: FC<MyProps> = ({ prop1, prop2 }) => {
  const [state, setState] = useState('');
  
  return <div>{state}</div>;
};
```

### SCSS/CSS

- Use BEM naming convention
- Group related properties
- Use CSS variables for theming
- Avoid deep nesting (max 3 levels)

```scss
// Good
.button {
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
  
  &__label {
    font-weight: 600;
  }
}
```

### Naming Conventions

- **Variables/Functions**: `camelCase`
- **Components**: `PascalCase`
- **CSS Classes**: `kebab-case` or `block__element--modifier`
- **Constants**: `UPPER_SNAKE_CASE`

## Pull Request Process

### Before Submitting

1. Ensure all tests pass: `npm run lint`
2. Build succeeds: `npm run build`
3. No TypeScript errors: Check editor output
4. Updated relevant documentation
5. Added translations to both ES and EN if needed

### PR Description Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Testing
Describe how to test these changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

## Adding New Features

### Components

1. Create new file in `src/components/`
2. Use TypeScript with proper interfaces
3. Add corresponding styles in `src/styles/`
4. Export from `src/components/index.ts`
5. Add translations for new text to `src/i18n/translations.json`

### Translations

When adding new text:

1. Add key to both `es` and `en` objects in `translations.json`
2. Use dot notation for nested keys: `section.subsection.key`
3. Keep translations consistent in tone and style
4. Use the `useI18n()` hook in components

### Styles

1. Create `src/styles/component-name.scss`
2. Use CSS variables for colors and sizes
3. Ensure dark theme support
4. Test responsive design at breakpoints: 320px, 768px, 1024px

## Bug Reports

When reporting bugs:

1. Use the GitHub Issues template
2. Include reproduction steps
3. Specify browser and OS
4. Attach screenshots if applicable
5. Check if issue already exists

## Performance Considerations

When contributing:

1. Avoid unnecessary re-renders
2. Lazy load images when possible
3. Use React.memo for expensive components
4. Keep bundle size in mind
5. Test with Lighthouse

## Accessibility Standards

All contributions must meet WCAG 2.1 AA standards:

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios >= 4.5:1
- Alternative text for images

## Deployment

Only repository maintainers can merge to `main` and deploy.

Changes are automatically deployed to production when merged to `main`.

## Questions?

Contact the development team or open a discussion on GitHub.

---

**Thank you for contributing to XDJA Construction!**
