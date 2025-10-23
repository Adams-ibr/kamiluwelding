#!/bin/bash

# Quick deployment script for development
# This script provides shortcuts for common deployment tasks

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Quick build and preview
quick_build() {
    log_info "Quick build and preview..."
    npm run build
    npm run preview
}

# Quick deploy to Netlify
quick_netlify() {
    log_info "Quick deploy to Netlify..."
    ./deploy.sh -i netlify
}

# Quick deploy to Vercel
quick_vercel() {
    log_info "Quick deploy to Vercel..."
    ./deploy.sh -i vercel
}

# Quick deploy to GitHub Pages
quick_github() {
    log_info "Quick deploy to GitHub Pages..."
    ./deploy.sh -i github-pages
}

# Show menu
show_menu() {
    echo "Kamilu Welding - Quick Deploy Menu"
    echo "=================================="
    echo "1. Build and Preview"
    echo "2. Deploy to Netlify"
    echo "3. Deploy to Vercel"
    echo "4. Deploy to GitHub Pages"
    echo "5. Exit"
    echo ""
    read -p "Choose an option (1-5): " choice
    
    case $choice in
        1) quick_build ;;
        2) quick_netlify ;;
        3) quick_vercel ;;
        4) quick_github ;;
        5) exit 0 ;;
        *) echo "Invalid option" && show_menu ;;
    esac
}

# If no arguments, show menu
if [ $# -eq 0 ]; then
    show_menu
else
    case $1 in
        "build") quick_build ;;
        "netlify") quick_netlify ;;
        "vercel") quick_vercel ;;
        "github") quick_github ;;
        *) echo "Usage: $0 [build|netlify|vercel|github]" ;;
    esac
fi