# Tumbler & Dabara - download real dish photos into the images folder
# Run from the website folder:
#   powershell -ExecutionPolicy Bypass -File download_photos.ps1

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ua = "TumblerDabaraStudentProject/1.0 (college project)"
$dir = Join-Path $PSScriptRoot "images"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

$photos = @(
  @("cold-coffee", "Ice_coffee_image.jpg"),
  @("badam-milk", "Badam_Milk_Drink.jpg"),
  @("lime-soda", "Nimbu_pani.JPG"),
  @("mango-lassi", "Tasty_Mango_lassi_picture.JPG"),
  @("medu-vada", "Medu_Vada_with_chutnies.jpg"),
  @("uttapam", "Uttapam.jpg"),
  @("rava-dosa", "Rava_dosa.JPG"),
  @("pongal", "Pongal_Dish.JPG"),
  @("mysore-dosa", "Mysore_Masala_Dosa.jpg"),
  @("veg-burger", "Veggie_burger_flickr_user_bradleyj_creative_commons.jpg"),
  @("paneer-wrap", "Kaati_roll.jpg"),
  @("pizza", "Eq_it-na_pizza-margherita_sep2005_sml.jpg"),
  @("pav-bhaji", "Pav_bhaji.jpg"),
  @("noodles", "Veg_Hakka_Noodles.jpg"),
  @("fries", "Fresh_french_fries.jpg"),
  @("garlic-bread", "Garlic_bread.jpg"),
  @("samosa", "Samosa_-_Homemade%2C_Jabalpur_-_Madhya_Pradesh_-_IMG_20210406_201834.jpg"),
  @("vada-pav", "Crunchy_Crispy_Vada_pav.jpg"),
  @("paneer-pakoda", "Paneer_Pakoras.jpg"),
  @("bonda", "Bondalu.JPG"),
  @("gulab-jamun", "Two_Gulab_Jamun_in_a_plate_01.jpg"),
  @("rasmalai", "Ras-Malai.jpg"),
  @("mysore-pak", "Ghee_Mysore_Pak.jpg"),
  @("kesari", "KEsari_baat.jpg"),
  @("gajar-halwa", "Gajar_Ka_Halwa_a_famous_Indian_Sweet_Dish_01.jpg"),
  @("kulfi", "Punjabi_Kulfi.JPG")
)

$ok = 0; $fail = @()
foreach ($p in $photos) {
  $name = $p[0]; $file = $p[1]
  $out = Join-Path $dir "$name.jpg"
  if (Test-Path $out) { Write-Host "already have $name.jpg"; $ok++; continue }
  $urls = @(
    "https://commons.wikimedia.org/wiki/Special:FilePath/$($file)?width=500",
    "https://commons.wikimedia.org/wiki/Special:FilePath/$file"
  )
  $done = $false
  foreach ($u in $urls) {
    try {
      Invoke-WebRequest -Uri $u -OutFile $out -UserAgent $ua -UseBasicParsing -TimeoutSec 60
      if ((Get-Item $out).Length -gt 5000) { $done = $true; break }
    } catch { }
  }
  if ($done) { Write-Host "OK   $name.jpg" -ForegroundColor Green; $ok++ }
  else { if (Test-Path $out) { Remove-Item $out }; Write-Host "FAIL $name" -ForegroundColor Red; $fail += $name }
  Start-Sleep -Milliseconds 400
}
Write-Host ""
Write-Host "$ok of $($photos.Count) photos saved in the images folder." -ForegroundColor Cyan
if ($fail.Count) { Write-Host "Could not download: $($fail -join ', ')" -ForegroundColor Yellow }
