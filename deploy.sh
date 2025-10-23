#!/bin/bash

# Kamilu Welding Deployment Script
# This script builds and deploys the React application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="kamiluwelding"
BUILD_DIR="dist"
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    log_success "All dependencies are installed"
}

# Install project dependencies
install_dependencies() {
    log_info "Installing project dependencies..."
    npm install
    log_success "Dependencies installed successfully"
}

# Run tests (if available)
run_tests() {
    log_info "Running tests..."
    if npm run test --if-present; then
        log_success "Tests passed"
    else
        log_warning "No tests found or tests failed"
    fi
}

# Build the project
build_project() {
    log_info "Building the project..."
    
    # Clean previous build
    if [ -d "$BUILD_DIR" ]; then
        log_info "Cleaning previous build..."
        rm -rf "$BUILD_DIR"
    fi
    
    # Build the project
    npm run build
    
    if [ -d "$BUILD_DIR" ]; then
        log_success "Build completed successfully"
    else
        log_error "Build failed - no dist directory found"
        exit 1
    fi
}

# Deploy to different platforms
deploy_to_netlify() {
    log_info "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir="$BUILD_DIR"
    log_success "Deployed to Netlify successfully"
}

deploy_to_vercel() {
    log_info "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    vercel --prod
    log_success "Deployed to Vercel successfully"
}

deploy_to_github_pages() {
    log_info "Deploying to GitHub Pages..."
    
    # Check if gh-pages branch exists
    if git show-ref --verify --quiet refs/heads/gh-pages; then
        log_info "gh-pages branch exists"
    else
        log_info "Creating gh-pages branch"
        git checkout --orphan gh-pages
        git rm -rf .
        git commit --allow-empty -m "Initial gh-pages commit"
        git checkout main
    fi
    
    # Deploy to gh-pages
    git subtree push --prefix="$BUILD_DIR" origin gh-pages
    log_success "Deployed to GitHub Pages successfully"
}

deploy_to_server() {
    log_info "Deploying to server via SCP..."
    
    if [ -z "$SERVER_HOST" ] || [ -z "$SERVER_PATH" ] || [ -z "$SERVER_USER" ]; then
        log_error "Server deployment requires SERVER_HOST, SERVER_PATH, and SERVER_USER environment variables"
        exit 1
    fi
    
    # Create backup on server
    ssh "$SERVER_USER@$SERVER_HOST" "mkdir -p $BACKUP_DIR && cp -r $SERVER_PATH/* $BACKUP_DIR/ 2>/dev/null || true"
    
    # Upload new files
    scp -r "$BUILD_DIR"/* "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"
    
    log_success "Deployed to server successfully"
}

# Main deployment function
deploy() {
    local platform=$1
    
    case $platform in
        "netlify")
            deploy_to_netlify
            ;;
        "vercel")
            deploy_to_vercel
            ;;
        "github-pages"|"gh-pages")
            deploy_to_github_pages
            ;;
        "server")
            deploy_to_server
            ;;
        *)
            log_error "Unknown platform: $platform"
            log_info "Available platforms: netlify, vercel, github-pages, server"
            exit 1
            ;;
    esac
}

# Show usage
show_usage() {
    echo "Usage: $0 [OPTIONS] [PLATFORM]"
    echo ""
    echo "Options:"
    echo "  -h, --help          Show this help message"
    echo "  -t, --test          Run tests before deployment"
    echo "  -s, --skip-build    Skip the build step"
    echo "  -i, --install       Install dependencies before building"
    echo ""
    echo "Platforms:"
    echo "  netlify             Deploy to Netlify"
    echo "  vercel              Deploy to Vercel"
    echo "  github-pages        Deploy to GitHub Pages"
    echo "  server              Deploy to custom server (requires env vars)"
    echo ""
    echo "Examples:"
    echo "  $0 netlify                    # Deploy to Netlify"
    echo "  $0 -t -i vercel              # Install deps, run tests, deploy to Vercel"
    echo "  $0 --skip-build github-pages # Deploy existing build to GitHub Pages"
}

# Parse command line arguments
SKIP_BUILD=false
RUN_TESTS=false
INSTALL_DEPS=false
PLATFORM=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -t|--test)
            RUN_TESTS=true
            shift
            ;;
        -s|--skip-build)
            SKIP_BUILD=true
            shift
            ;;
        -i|--install)
            INSTALL_DEPS=true
            shift
            ;;
        *)
            if [ -z "$PLATFORM" ]; then
                PLATFORM=$1
            else
                log_error "Unknown option: $1"
                show_usage
                exit 1
            fi
            shift
            ;;
    esac
done

# Main execution
main() {
    log_info "Starting deployment for $PROJECT_NAME"
    log_info "Timestamp: $(date)"
    
    # Check dependencies
    check_dependencies
    
    # Install dependencies if requested
    if [ "$INSTALL_DEPS" = true ]; then
        install_dependencies
    fi
    
    # Run tests if requested
    if [ "$RUN_TESTS" = true ]; then
        run_tests
    fi
    
    # Build project unless skipped
    if [ "$SKIP_BUILD" = false ]; then
        build_project
    else
        log_info "Skipping build step"
        if [ ! -d "$BUILD_DIR" ]; then
            log_error "No build directory found and build step was skipped"
            exit 1
        fi
    fi
    
    # Deploy if platform specified
    if [ -n "$PLATFORM" ]; then
        deploy "$PLATFORM"
    else
        log_success "Build completed. Specify a platform to deploy:"
        log_info "Available platforms: netlify, vercel, github-pages, server"
    fi
    
    log_success "Deployment process completed!"
}

# Run main function
main "$@"