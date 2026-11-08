$files = @(
  'c:\front end\nextPortofolio\.next\static\chunks\2n83taneb58g6.css',
  'c:\front end\nextPortofolio\.next\static\chunks\3atrr3xqq0f1u.css',
  'c:\front end\nextPortofolio\.next\dev\static\chunks\app_globals_css_1igg3k2._.single.css'
)
$needles = @('@keyframes','word-in','fade-up','float','blob','marquee','wheel','toast-in','reveal-in-view','anim-fade-up','animate-float')
foreach ($f in $files) {
  Write-Host '===' $f
  if (!(Test-Path $f)) { Write-Host '  (missing)'; continue }
  $c = Get-Content -Raw $f
  foreach ($k in $needles) {
    $found = $c -match [regex]::Escape($k)
    Write-Host '   ' $k '=>' $found
  }
}