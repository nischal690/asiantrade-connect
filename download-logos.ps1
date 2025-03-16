$logoUrls = @{
    "cova-logo.png" = "https://www.pasticceriacova.com/wp-content/uploads/2021/01/Cova_logo_black.png"
    "missoni-logo.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Missoni_logo.svg/2560px-Missoni_logo.svg.png"
    "n21-logo.png" = "https://www.numeroventuno.com/media/logo/stores/1/n21-logo-black.svg"
    "benedetta-bruzziches-logo.png" = "https://cdn.shopify.com/s/files/1/0070/7032/files/BB_logo_x320.png"
    "carel-paris-logo.png" = "https://www.carelparis.com/img/carel-paris-logo-1614934886.jpg"
    "fear-of-god-logo.png" = "https://fearofgod.com/cdn/shop/files/FOG_Wordmark_Black.png"
    "mugler-logo.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mugler_logo.svg/2560px-Mugler_logo.svg.png"
    "sophia-webster-logo.png" = "https://cdn.shopify.com/s/files/1/0588/1878/2603/files/SW_Logo_black_410x.png"
    "aspesi-logo.png" = "https://www.aspesi.com/on/demandware.static/Sites-Aspesi-Site/-/default/dw7a5a5c8d/images/logo.svg"
    "casadei-logo.png" = "https://www.casadei.com/on/demandware.static/-/Sites/default/dw8c4db695/images/casadei-logo.svg"
    "dodo-logo.png" = "https://www.dodo.it/on/demandware.static/-/Sites-DoDo-Library/default/dw3b0e9d9d/images/svg/logo-dodo.svg"
    "iceberg-logo.png" = "https://www.iceberg.com/on/demandware.static/-/Sites-Iceberg-Library/default/dw1c6e0d7d/images/logo.svg"
    "philipp-plein-logo.png" = "https://www.plein.com/on/demandware.static/-/Sites-PhilippPlein-Library/default/dw6e0e9e8d/images/logo/logo-plein.svg"
    "the-antipode-logo.png" = "https://www.the-antipode.com/wp-content/uploads/2023/06/cropped-Logo-The-Antipode-1.png"
    "visionnaire-logo.png" = "https://www.visionnaire-home.com/app/themes/visionnaire/dist/images/logo-visionnaire.svg"
}

$outputFolder = "public\brands\logos"

foreach ($logo in $logoUrls.GetEnumerator()) {
    $outputPath = Join-Path -Path $outputFolder -ChildPath $logo.Key
    Write-Host "Downloading $($logo.Key) to $outputPath"
    
    try {
        Invoke-WebRequest -Uri $logo.Value -OutFile $outputPath
        Write-Host "Successfully downloaded $($logo.Key)"
    }
    catch {
        Write-Host "Failed to download $($logo.Key): $_"
    }
}

Write-Host "All downloads completed!"
