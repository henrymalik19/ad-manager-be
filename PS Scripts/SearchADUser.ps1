Param(
    $Name
)

import-module activedirectory

if ($Name -eq "") {
    Get-ADUser -Filter * -properties * | Select-Object -property * -ExcludeProperty "protocolSettings" | ConvertTo-Json;
} else {
    Get-ADUser -Filter "Name -like '*$Name*'" -properties * | Select-Object -property * -ExcludeProperty "protocolSettings" | ConvertTo-Json;
};