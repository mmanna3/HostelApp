# Crear acceso directo a BuenDia.Ps1

1. Click derecho y crear acceso directo
2. En location poner:

```
powershell.exe -ExecutionPolicy Bypass -File C:\Users\matia\source\repos\BlueServant\Scripts\BuenDia.ps1
```

# Debuguear backend

Cambiar en package.json la línea y proxy y poner

```
"proxy": "https://localhost:44372",
```

o la IP que sea

# Migraciones

## Agregar migración

**Consola:** dotnet ef migrations add [Nombre]

**NugetConsole:** add-migration [Nombre]

## Update-database

**Consola:** dotnet ef database update

**NugetConsole:** Update-database

## ¡Nunca borrar un archivo de migración!

Si querés borrar la última sin aplicar, ejecutar:

**Consola:** dotnet ef migrations remove

**NugetConsole:** remove-migration

Si querés borrar la última aplicada, tenés que revertir la base a la migración anterior y después sí borrarla.

**dotnet ef database update [NombreDeLaMigracionAnterior]**

Si querés revertir la primera, en vez de poner el nombre ponele 0.

## Para seedear

**Add-migration** sin ningún cambio en el DbContext

Va a crear una migración vacía

migrationBuilder.Sql(“LO QUE SEA”)
