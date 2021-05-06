using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Usuario;
using Api.Persistence.Config;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using Respawn;

namespace Api.IntegrationTests
{
    public class BaseAutenticadoIT
    {
        protected TestServer _server;
        protected HttpClient _httpClient;
        private const string USERNAME = "Usuario";
        private const string PASSWORD = "C0ntr4s3n1a";

        [OneTimeSetUp]
        public async Task OneTimeSetup()
        {
            InicializarServidor();

            await InicializarBaseDeDatos();

            await InicializarHttpClientAutenticado();

            EjecutarUnaSolaVez();
        }

        [SetUp]
        public virtual async Task Setup()
        {
            await ResetearBaseDeDatosExcluyendoUsuarioYMigraciones();
        }

        protected virtual async Task InicializarHttpClientAutenticado()
        {
            _httpClient = _server.CreateClient();
            var token = await ObtieneTokenDeUsuarioAutenticado();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        private void InicializarServidor()
        {
            var projectDir = Directory.GetCurrentDirectory();
            var configPath = Path.Combine(projectDir, "appsettings.json");
            var webHostBuilder = WebHost.CreateDefaultBuilder().UseStartup<Startup>()
                .ConfigureAppConfiguration((context, conf) => { conf.AddJsonFile(configPath); });

            _server = new TestServer(webHostBuilder);
        }

        private async Task InicializarBaseDeDatos()
        {
            using var scope = _server.Services.CreateScope();
            await using var context = scope.ServiceProvider.GetService<AppDbContext>();
            await context.Database.MigrateAsync();

            await ResetearBaseDeDatosExcluyendoMigraciones();

        }

        protected async Task ResetearBaseDeDatosExcluyendoMigraciones()
        {
            using var scope = _server.Services.CreateScope();
            await using var context = scope.ServiceProvider.GetService<AppDbContext>();
            
            var checkpoint = new Checkpoint
            {
                TablesToIgnore = new[]
                {
                    "__EFMigrationsHistory",
                }
            };
            
            await checkpoint.Reset(context.Database.GetDbConnection().ConnectionString);
        }

        private async Task ResetearBaseDeDatosExcluyendoUsuarioYMigraciones()
        {
            using var scope = _server.Services.CreateScope();
            await using var context = scope.ServiceProvider.GetService<AppDbContext>();

            var checkpoint = new Checkpoint
            {
                TablesToIgnore = new[]
                {
                    "__EFMigrationsHistory",
                    "Usuario"
                }
            };

            await checkpoint.Reset(context.Database.GetDbConnection().ConnectionString);
        }

        private async Task<string> ObtieneTokenDeUsuarioAutenticado()
        {
            await RegistrarUnUsuario();
            var autenticacionResponse = await AutenticarUnUsuario();

            dynamic objetoResponse = await autenticacionResponse.Content.ReadAsAsync<JObject>();

            return objetoResponse.token.ToString();
        }

        private async Task RegistrarUnUsuario()
        {
            var body = new RegistrarDTO
            {
                Nombre = "Agent",
                Apellido = "Cooper",
                Username = USERNAME,
                Password = PASSWORD
            };

            await _httpClient.PostAsJsonAsync("/api/usuarios/registrar", body);
        }

        private async Task<HttpResponseMessage> AutenticarUnUsuario()
        {
            var body = new
            {
                username = USERNAME,
                password = PASSWORD
            };

            return await _httpClient.PostAsJsonAsync("/api/usuarios/autenticar", body);
        }

        protected virtual void EjecutarUnaSolaVez()
        {

        }
    }
}