using System.Text;
using Api.Core;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;
using Api.Persistence.Repositories;
using Api.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Api.Config
{
    public static class StartupExtensionMethods
    {
        public static void ConfigurarExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }

        public static void ConfigurarAutenticacionJWT(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Secret(configuration)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        private static byte[] Secret(IConfiguration configuration)
        {
            var appSettings = configuration.GetSection("AppSettings").Get<AppSettings>();
            return Encoding.ASCII.GetBytes(appSettings.Secret);
        }

        public static void ConfigurarAppSettingsComoObjetoTipado(this IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
        }

        public static void ConfigurarInyeccionDeDependecias(this IServiceCollection services)
        {
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            
            services.AddScoped<IPasajeroService, PasajeroService>();
            services.AddScoped<IPasajeroRepository, PasajeroRepository>();

            services.AddScoped<IHabitacionService, HabitacionService>();
            services.AddScoped<IHabitacionRepository, HabitacionRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<ILoggerService, LoggerService>();

            services.AddScoped<IReservaService, ReservaService>();
            services.AddScoped<IReservaRepository, ReservaRepository>();

            services.AddScoped<ICamaRepository, CamaRepository>();
        }
    }
}