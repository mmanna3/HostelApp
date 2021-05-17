using Api.Core.Entidades;
using Api.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Config
{
	public class AppDbContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Habitacion> Habitaciones { get; set; }
        public DbSet<HabitacionCompartida> HabitacionesCompartidas { get; set; }
        public DbSet<HabitacionPrivada> HabitacionesPrivadas { get; set; }

        public DbSet<Reserva> Reservas { get; set; }

        public DbSet<CamaIndividual> CamasIndividuales { get; set; }
        public DbSet<CamaMatrimonial> CamasMatrimoniales { get; set; }
        public DbSet<CamaCuchetaDeAbajo> CamasCuchetasDeAbajo { get; set; }
        public DbSet<CamaCuchetaDeArriba> CamasCuchetasDeArriba { get; set; }
        public DbSet<CamaCucheta> CamasCuchetas { get; set; }
        public DbSet<Huesped> Huespedes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            CamasConTipo(builder);

            HabitacionesConTipo(builder);

            builder.Entity<ReservaCama>()
                .HasKey(x => new { x.ReservaId, x.CamaId });
            builder.Entity<ReservaCama>()
                .HasOne(x => x.Reserva)
                .WithMany(x => x.ReservaCamas)
                .HasForeignKey(x => x.ReservaId);
            builder.Entity<ReservaCama>()
                .HasOne(x => x.Cama)
                .WithMany(x => x.ReservaCamas)
                .HasForeignKey(x => x.CamaId);

            builder.Entity<Huesped>()
	            .HasIndex(h => h.DniOPasaporte)
	            .IsUnique();

            builder.Entity<Reserva>()
	            .Property(x => x.Estado)
	            .HasDefaultValue(ReservaEstadoEnum.CheckinPendiente);
        }

        private static void HabitacionesConTipo(ModelBuilder builder)
        {
	        builder.Entity<Habitacion>()
		        .ToTable("Habitaciones")
		        .HasDiscriminator<string>("Tipo");

            builder.Entity<HabitacionPrivada>()
	            .Property(p => p.Precio)
	            .HasColumnType("decimal(18,2)");
        }

        private static void CamasConTipo(ModelBuilder builder)
        {
	        builder.Entity<Cama>()
		        .ToTable("Camas")
		        .HasDiscriminator<string>("Tipo");

	        builder.Entity<CamaIndividual>()
		        .HasOne(b => b.Habitacion)
		        .WithMany(a => a.CamasIndividuales)
		        .OnDelete(DeleteBehavior.Restrict);

	        builder.Entity<CamaMatrimonial>()
		        .HasOne(b => b.Habitacion)
		        .WithMany(a => a.CamasMatrimoniales)
		        .OnDelete(DeleteBehavior.Restrict);

	        builder.Entity<CamaCucheta>()
		        .HasOne(b => b.Habitacion)
		        .WithMany(a => a.CamasCuchetas)
		        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

