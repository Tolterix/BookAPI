$folder = ($MyInvocation.MyCommand.Path -replace 'ResetDB.ps1','')

Write-Host $folder

Write-Host (npm i knex)
Write-Host (npm i pg)

$knexConfig = ([IO.File]::ReadAllText($folder + 'knexfile.js'))
#$knexConfig = (($knexConfig -split 'development: {')[1] -split '},')[0]
#$knexConfig | Select-String -Pattern 'host: '
$knexConfig = (($knexConfig -split 'module.exports = {')[1] -split '},')[0] | Select-String -Pattern 'host:'
$configs = [PSCustomObject]@{
    host = (($knexConfig -split "host: '")[1] -split "',")[0]
    user = (($knexConfig -split "user: '")[1] -split "',")[0]
    password = (($knexConfig -split "password: '")[1] -split "',")[0]
    port = (($knexConfig -split "port: '")[1] -split "'")[0]
}

Write-Host $configs

$dburl="postgresql://" + $configs.user + ":" + $configs.password + "@" + $configs.host + ":" + $configs.port
Write-Host ("drop database bookdb" | psql --csv $dburl | ConvertFrom-Csv)
Write-Host ("create database bookdb" | psql --csv $dburl | ConvertFrom-Csv)

$migrations = Get-ChildItem -Path ($folder + '\migrations')

foreach($migration in $migrations) {
    Write-Host "running migration: "$migration
    Write-Host (npx knex migrate:up $migration)
}

$seeds = Get-ChildItem -Path ($folder + 'seeds')

foreach($seed in $seeds) {
    Write-Host "running seed:      "$seed
    Write-Host (npx knex seed:run --specific=$seed)
}