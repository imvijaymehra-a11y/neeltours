# Download script for Neel Tour Travels images (PowerShell)
# This script downloads route images and saves them locally

Write-Host "Downloading Neel Tour Travels images..."

# Create images directory if it doesn't exist
if (-not (Test-Path "images")) {
    New-Item -ItemType Directory -Path "images"
}

# Function to download image with retry
function Download-Image {
    param(
        [string]$Url,
        [string]$OutputFile,
        [string]$Description
    )
    
    Write-Host "Downloading $Description..."
    
    try {
        # Use Invoke-WebRequest with user agent
        Invoke-WebRequest -Uri $Url -OutFile $OutputFile -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        Write-Host "✓ Downloaded $Description" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to download $Description" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Download route images
Write-Host "Downloading route images..." -ForegroundColor Cyan

# Delhi Route (India Gate)
Download-Image -Url "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop&auto=format" -OutputFile "images/delhi-route.jpg" -Description "Delhi Route (India Gate)"

# Manali Route (Mountains)
Download-Image -Url "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?w=400&h=250&fit=crop&auto=format" -OutputFile "images/manali-route.jpg" -Description "Manali Route (Mountains)"

# Jaipur Route (Hawa Mahal)
Download-Image -Url "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=250&fit=crop&auto=format" -OutputFile "images/jaipur-route.jpg" -Description "Jaipur Route (Hawa Mahal)"

# Amritsar Route (Golden Temple)
Download-Image -Url "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?w=400&h=250&fit=crop&auto=format" -OutputFile "images/amritsar-route.jpg" -Description "Amritsar Route (Golden Temple)"

# Download service images
Write-Host "Downloading service images..." -ForegroundColor Cyan

# Local Taxi
Download-Image -Url "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=400&h=250&fit=crop&auto=format" -OutputFile "images/local-taxi.jpg" -Description "Local Taxi Service"

# Airport Transfer
Download-Image -Url "https://images.pexels.com/photos/46148/airplane-airport-travel-jet-46148.jpeg?w=400&h=250&fit=crop&auto=format" -OutputFile "images/airport-transfer.jpg" -Description "Airport Transfer Service"

# Outstation Taxi
Download-Image -Url "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?w=400&h=250&fit=crop&auto=format" -OutputFile "images/outstation-taxi.jpg" -Description "Outstation Taxi Service"

# Corporate Travel
Download-Image -Url "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=400&h=250&fit=crop&auto=format" -OutputFile "images/corporate-travel.jpg" -Description "Corporate Travel Service"

# Download hero background
Write-Host "Downloading hero background..." -ForegroundColor Cyan
Download-Image -Url "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?w=1920&h=1080&fit=crop&auto=format" -OutputFile "images/hero-bg.jpg" -Description "Hero Background"

# Create company logo placeholder
Write-Host "Creating company logo placeholder..." -ForegroundColor Cyan
try {
    # Create a simple text-based logo using .NET
    Add-Type -AssemblyName System.Drawing
    $bitmap = New-Object System.Drawing.Bitmap(300, 100)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::Transparent)
    
    $font = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 107, 53)) # FF6B35
    $point = New-Object System.Drawing.PointF(10, 30)
    
    $graphics.DrawString("Neel Tour Travels", $font, $brush, $point)
    $bitmap.Save("images/neel-tour-travels-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bitmap.Dispose()
    
    Write-Host "✓ Logo placeholder created" -ForegroundColor Green
}
catch {
    Write-Host "! Logo creation failed (manual creation required)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Download completed!" -ForegroundColor Green
Write-Host "Files saved in 'images\' directory" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next step: Update HTML to use local image paths" -ForegroundColor Yellow
Write-Host "Example: Change 'https://images.unsplash.com/...' to 'images/filename.jpg'" -ForegroundColor Gray
