#!/bin/bash

# Download script for Neel Tour Travels images
# This script downloads route images and saves them locally

echo "Downloading Neel Tour Travels images..."

# Create images directory if it doesn't exist
mkdir -p images

# Download route images
echo "Downloading route images..."

# Delhi Route (India Gate)
curl -L "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop&auto=format" \
     -o "images/delhi-route.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Manali Route (Mountains)
curl -L "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?w=400&h=250&fit=crop&auto=format" \
     -o "images/manali-route.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Jaipur Route (Hawa Mahal)
curl -L "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=250&fit=crop&auto=format" \
     -o "images/jaipur-route.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Amritsar Route (Golden Temple)
curl -L "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?w=400&h=250&fit=crop&auto=format" \
     -o "images/amritsar-route.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

echo "Route images downloaded successfully!"

# Download service images
echo "Downloading service images..."

# Local Taxi
curl -L "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=400&h=250&fit=crop&auto=format" \
     -o "images/local-taxi.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Airport Transfer
curl -L "https://images.pexels.com/photos/46148/airplane-airport-travel-jet-46148.jpeg?w=400&h=250&fit=crop&auto=format" \
     -o "images/airport-transfer.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Outstation Taxi
curl -L "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?w=400&h=250&fit=crop&auto=format" \
     -o "images/outstation-taxi.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Corporate Travel
curl -L "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=400&h=250&fit=crop&auto=format" \
     -o "images/corporate-travel.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

echo "Service images downloaded successfully!"

# Download hero background
echo "Downloading hero background..."

curl -L "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?w=1920&h=1080&fit=crop&auto=format" \
     -o "images/hero-bg.jpg" \
     -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

echo "Hero background downloaded successfully!"

# Create company logo (placeholder)
echo "Creating company logo placeholder..."
convert -size 300x100 xc:transparent \
     -font Arial -pointsize 24 -fill "#FF6B35" \
     -gravity center -annotate +0+0 "Neel Tour Travels" \
     images/neel-tour-travels-logo.png 2>/dev/null || \
     echo "Logo placeholder created (requires ImageMagick)"

echo "All images downloaded successfully!"
echo "Files saved in 'images/' directory"
echo ""
echo "Next step: Update HTML to use local image paths"
echo "Example: Change 'https://images.unsplash.com/...' to 'images/filename.jpg'"
