param(
    $Name
)

import-module activedirectory

if ($Name -eq "") {
    Get-ADGroup -Filter * -properties * | Select-Object -property * -ExcludeProperty "protocolSettings" | ConvertTo-Json;
} else {
    Get-ADGroup -Filter "Name -like '*$Name*'" -properties * | Select-Object -property * -ExcludeProperty "protocolSettings" | ConvertTo-Json;
};