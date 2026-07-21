# Contributing to AI Roleplay Platform

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/Ai-roleplay-platform.git
cd Ai-roleplay-platform

# Install dependencies
cd apps/api && npm install && cd ../web && npm install

# Set up environment
cp ../.env.example ../.env

# Run development servers
npm run dev  # in each app directory
```

## Code Standards

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Documentation

- Update README.md for new features
- Document API endpoints
- Add inline code comments
- Create issue templates

## Pull Request Process

1. Update documentation
2. Add/update tests
3. Follow code style guide
4. Reference related issues
5. Ensure CI passes
6. Request review from maintainers

## Reporting Issues

- Use issue templates
- Provide clear reproduction steps
- Include error messages
- Specify environment details

## Feature Requests

- Describe the feature clearly
- Explain the use case
- Provide examples
- Discuss potential implementation

## Community Guidelines

- Be respectful to all contributors
- Follow code of conduct
- Help others learn and grow
- Share knowledge and experience

Thanks for contributing! 🎉
