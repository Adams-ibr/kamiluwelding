# Deployment Guide for Kamilu Welding

This guide covers all deployment options for the Kamilu Welding React application.

## Quick Start

### Option 1: Interactive Menu
```bash
./deploy-quick.sh
```

### Option 2: Direct Commands
```bash
# Build and preview locally
./deploy-quick.sh build

# Deploy to Netlify
./deploy-quick.sh netlify

# Deploy to Vercel
./deploy-quick.sh vercel

# Deploy to GitHub Pages
./deploy-quick.sh github
```

## Full Deployment Script

The main deployment script (`deploy.sh`) provides comprehensive deployment options:

### Basic Usage
```bash
./deploy.sh [OPTIONS] [PLATFORM]
```

### Available Platforms
- `netlify` - Deploy to Netlify
- `vercel` - Deploy to Vercel
- `github-pages` - Deploy to GitHub Pages
- `server` - Deploy to custom server

### Options
- `-h, --help` - Show help message
- `-t, --test` - Run tests before deployment
- `-s, --skip-build` - Skip the build step
- `-i, --install` - Install dependencies before building

### Examples
```bash
# Deploy to Netlify with fresh install
./deploy.sh -i netlify

# Deploy to Vercel with tests
./deploy.sh -t -i vercel

# Deploy existing build to GitHub Pages
./deploy.sh --skip-build github-pages
```

## Platform-Specific Setup

### Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `./deploy.sh netlify`

Configuration is handled by `netlify.toml`.

### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `./deploy.sh vercel`

Configuration is handled by `vercel.json`.

### GitHub Pages
1. Ensure you have push access to the repository
2. Deploy: `./deploy.sh github-pages`

The script will create and manage the `gh-pages` branch automatically.

### Custom Server
Set environment variables:
```bash
export SERVER_HOST="your-server.com"
export SERVER_USER="username"
export SERVER_PATH="/path/to/web/directory"
```

Then deploy:
```bash
./deploy.sh server
```

## Automated Deployment (CI/CD)

### GitHub Actions
The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Triggers on pushes to `main` branch
- Builds the application
- Deploys to GitHub Pages automatically

### Environment Variables
For automated deployments, set these secrets in your GitHub repository:
- `GEMINI_API_KEY` - Your Gemini API key (if using AI features)

## Local Development

### Build and Preview
```bash
npm run build
npm run preview
```

### Development Server
```bash
npm run dev
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   chmod +x deploy.sh deploy-quick.sh
   ```

2. **Missing Dependencies**
   ```bash
   ./deploy.sh -i [platform]
   ```

3. **Build Failures**
   - Check Node.js version (requires 18+)
   - Ensure all environment variables are set
   - Run `npm install` to update dependencies

4. **Deployment Failures**
   - Verify CLI tools are installed and authenticated
   - Check network connectivity
   - Ensure proper permissions for target platform

### Environment Variables
Create a `.env.local` file for local development:
```
GEMINI_API_KEY=your_api_key_here
```

## File Structure
```
├── deploy.sh              # Main deployment script
├── deploy-quick.sh         # Quick deployment menu
├── netlify.toml           # Netlify configuration
├── vercel.json            # Vercel configuration
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml
└── DEPLOYMENT.md          # This guide
```

## Support

If you encounter issues:
1. Check the logs for specific error messages
2. Ensure all prerequisites are installed
3. Verify your authentication with the target platform
4. Check network connectivity and permissions

For platform-specific issues, consult:
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)