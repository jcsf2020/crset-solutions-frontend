Param(
  [Parameter(Mandatory=$true)][string]$platform,
  [Parameter(Mandatory=$true)][string]$role,
  [Parameter(Mandatory=$true)][string]$company,
  [Parameter(Mandatory=$true)][string]$url,
  [ValidateSet("applied","submitted","sent","email_drafted","todo")][string]$status="applied"
)

$day = Get-Date -Format 'yyyy-MM-dd'
$base = "reports/$day/$platform"
New-Item -ItemType Directory -Force -Path $base | Out-Null

$statusPath = "reports/$day/status.md"
if (!(Test-Path $statusPath)) {
  Set-Content $statusPath "# Outreach - $day`nTargets: RemoteOK, WeWorkRemotely, Agency-PT, Agency-ES, Spare`nGoal: 5 applications (Next.js + FastAPI)`n`n## Submissions`n- [ ] RemoteOK -`n- [ ] WeWorkRemotely -`n- [ ] Agency-PT -`n- [ ] Agency-ES -`n- [ ] Spare -`n`n## Notes`n"
}

$notePath = "$base/notes.md"
if (!(Test-Path $notePath)) {
  Set-Content $notePath "# $platform - $day`nJob: $role`nLink: $url`nStatus: drafted`nNotes:`n"
}
Add-Content $notePath "`n---`nSubmitted: $(Get-Date -Format s)Z`nRole: $role`nCompany: $company`nURL: $url`nStatus: $status"

$tracker = "tracker/apps.csv"
if (!(Test-Path $tracker)) { Set-Content $tracker 'date,platform,job_title,company,url,status,notes' }

$pattern = "^$day,$platform,.*$"
$replacement = "$day,$platform,$role,$company,$url,$status,"
$content = Get-Content $tracker
$matched = $false
$content = $content | ForEach-Object { if ($_ -match $pattern) { $matched = $true; $replacement } else { $_ } }
if (-not $matched) { $content += $replacement }
$content | Set-Content $tracker

$sm = Get-Content $statusPath -Raw
$sm = $sm -replace "(- \[ \] $platform\s*-)", "- [x] $platform -"
$sm | Set-Content $statusPath

Write-Host "Recorded: $platform / $role / $company / $status"
