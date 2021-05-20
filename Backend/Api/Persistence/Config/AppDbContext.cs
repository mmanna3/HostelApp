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

			ReservaCama(builder);

			ReservaHabitacionPrivada(builder);

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

			builder.Entity<CamaCucheta>()
				.HasOne(b => b.Abajo)
				.WithOne(a => a.CamaCucheta)
				.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<CamaCucheta>()
				.HasOne(b => b.Arriba)
				.WithOne(a => a.CamaCucheta)
				.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<CamaCucheta>()
				.HasOne(a => a.Abajo).WithOne(b => b.CamaCucheta)
				.HasForeignKey<CamaCuchetaDeAbajo>(e => e.CamaCuchetaId);

			builder.Entity<CamaCucheta>()
				.HasOne(a => a.Arriba).WithOne(b => b.CamaCucheta)
				.HasForeignKey<CamaCuchetaDeArriba>(e => e.CamaCuchetaId);
		}

        private static void ReservaCama(ModelBuilder builder)
        {
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
        }

        private static void ReservaHabitacionPrivada(ModelBuilder builder)
        {
	        builder.Entity<ReservaHabitacionPrivada>()
		        .HasKey(x => new { x.ReservaId, x.HabitacionPrivadaId });
	        
	        builder.Entity<ReservaHabitacionPrivada>()
		        .HasOne(x => x.Reserva)
		        .WithMany(x => x.ReservaHabitacionesPrivadas)
		        .HasForeignKey(x => x.ReservaId);

	        builder.Entity<ReservaHabitacionPrivada>()
		        .HasOne(x => x.HabitacionPrivada)
		        .WithMany(x => x.ReservaHabitacionesPrivadas)
		        .HasForeignKey(x => x.HabitacionPrivadaId);
        }
	}
}

