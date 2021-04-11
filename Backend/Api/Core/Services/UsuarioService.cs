using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Core.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;

        public UsuarioService(IUsuarioRepository usuarioRepository, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _usuarioRepository = usuarioRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Usuario> Autenticar(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                throw new AppException("El password es requerido");

            var usuario = await _usuarioRepository.ObtenerPorNombreDeUsuario(username);

            if (usuario == null)
                throw new AppException("Usuario inexistente");

            if (!VerificarHash(password, usuario.PasswordHash, usuario.PasswordSalt))
                throw new AppException("Clave incorrecta");

            return usuario;
        }

        public string ObtenerToken(int usuarioId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, usuarioId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
        }

        public async Task<Usuario> Crear(Usuario usuario, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("El password es requerido");

            var usuarioConElMismoUsername = await _usuarioRepository.ObtenerPorNombreDeUsuario(usuario.Username);

            if (usuarioConElMismoUsername != null)
                throw new AppException($@"Ya existe un usuario '{usuario.Username}'");

            CrearHash(password, out var passwordHash, out var passwordSalt);

            usuario.PasswordHash = passwordHash;
            usuario.PasswordSalt = passwordSalt;

            _usuarioRepository.Crear(usuario);
            await _unitOfWork.CompleteAsync();

            return usuario;
        }

        public async Task<Usuario> ObtenerPorId(int id)
        {
            var usuario = await _usuarioRepository.ObtenerPorId(id);
            return usuario;
        }

        private static void CrearHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerificarHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", nameof(storedSalt));

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) 
                        return false;
                }
            }

            return true;
        }
    }
}
