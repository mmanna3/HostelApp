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

### Consola

```
dotnet ef migrations add [Nombre]
```

### Nuget

```
add-migration [Nombre]
```

## Update-database

### Consola

```
dotnet ef database update
```

### Nuget

```
Update-database
```

## ¡Nunca borrar un archivo de migración!

Si querés borrar la última sin aplicar, ejecutar:

### Consola

```
dotnet ef migrations remove
```

### Nuget

```
remove-migration
```

Si querés borrar la última aplicada, tenés que revertir la base a la migración anterior y después sí borrarla.

```
dotnet ef database update [NombreDeLaMigracionAnterior]
```

Si querés revertir la primera, en vez de poner el nombre ponele 0.

## Para seedear

```
Add-migration (sin ningún cambio en el DbContext)
```

Va a crear una migración vacía, algo como migrationBuilder.Sql(“LO QUE SEA”)

# Seed usuario prueba

```
INSERT INTO Usuarios ([Nombre], [Apellido], [Username], [PasswordHash], [PasswordSalt])
VALUES (N'prueba-prueba', N'esuserypass', N'prueba', 0x4D959FA1DCA42C13CEDBD5539892920729FE08A4FC09D859A07226291EC60962D246EB681DD621F1060056C1E7FE3F5B6AE98361C85D80EEC8F4904A444B006A, 0xDFBB22A565EC0C068D658366DE7663754352BBC7600EF2DDF8A8CBF4FF2896EDAC4ED46A1B9A037152E88287B86A9F8C53BCBE90DD1F5F61D726DFDBFC324BC7B008814EE3063FB535610ADAC2BD7EBB9DF5F8152018AEA6CE92F9734564B65BFA857C49C7118D62033DB55A5BE4021160D1490DE74BF2E4F6BD3CED9034BE38)
```

# Ejecutar tests cypress de un solo archivo

```
yarn cy-run --spec 'cypress/integration/reservas/creacion/cabecera-huesped.e2e.ts'
```

# Crear enum

Es una property más de la clase en cuestión, pero tenés que decirle por FluentApi en AppDbContext cuál es el valor default (sino es 0)

# Levantar BD en Docker

## Instalar docker y crear container con imagen

## Levantar container
```
open -a docker
docker start InstanciaSQLServer		# Cambiarle el nombre
```

## Conectarse desde DBeaver

Plugin: SQL Server
host: localhost
port: 1433
database/schema: master (en realidad es hostelapp_dev)
username: sa
password: Buk0wski