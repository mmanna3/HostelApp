$carpetaActual = $PSScriptRoot
Set-Location ${carpetaActual}\..\Frontend
Get-ChildItem node_modules -Recurse | Remove-Item -Force -Recurse -Confirm:$false
yarn cache clean
yarn install