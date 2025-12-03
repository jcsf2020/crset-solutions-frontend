# Contributing to CRSET Solutions Frontend

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others succeed

## Getting Started

### Fork & Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/crset-solutions-frontend.git
cd crset-solutions-frontend

# Add upstream remote
git remote add upstream https://github.com/jcsf2020/crset-solutions-frontend.git
```

### Create Feature Branch

```bash
# Update main
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feat/your-feature-name
```

## Development

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Format with Prettier
- Use meaningful variable names
- Add comments for complex logic

### Commit Messages

Follow conventional commits:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

Example:
```bash
git commit -m "feat: add language switcher to header"
```

## Testing

```bash
# Run tests
pnpm test

# Run Lighthouse audit
pnpm lighthouse

# Check TypeScript
pnpm type-check

# Check ESLint
pnpm lint
```

## Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin feat/your-feature-name
   ```

3. **Create Pull Request**
   - Go to GitHub
   - Click "Compare & pull request"
   - Fill in the PR template
   - Reference related issues

4. **PR Title Format**
   ```
   feat: add feature description
   fix: fix bug description
   docs: update docs
   ```

5. **Wait for Review**
   - Address feedback
   - Update code as needed
   - Re-request review

6. **Merge**
   - Squash commits if needed
   - Merge to main

## Reporting Issues

### Bug Report

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment (OS, browser, etc.)

### Feature Request

Include:
- Description of the feature
- Use case/motivation
- Proposed solution
- Alternative solutions

## Documentation

- Update README.md for major changes
- Add comments to complex code
- Update CHANGELOG.md
- Add examples for new features

## Performance Guidelines

- Keep bundle size minimal
- Optimize images
- Lazy load components
- Use React.memo for expensive components
- Profile with Lighthouse

## Security Guidelines

- Never commit secrets or API keys
- Use environment variables
- Enable RLS on database tables
- Validate user input
- Sanitize output
- Keep dependencies updated

## Translation Guidelines

When adding new content:

1. Add English text to `messages/en.json`
2. Add Portuguese translation to `messages/pt.json`
3. Use `useTranslations()` hook in components
4. Test both language versions

Example:
```json
{
  "home.title": "Welcome",
  "home.description": "This is the home page"
}
```

## Questions?

- Check existing issues and discussions
- Ask in GitHub Discussions
- Email: contact@crsetsolutions.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🙏
