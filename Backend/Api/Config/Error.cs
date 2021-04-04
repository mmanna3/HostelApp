using Newtonsoft.Json;

namespace Api.Config
{
	public class Error
	{
		public int StatusCode { get; set; }
		public string Mensaje { get; set; }

		public override string ToString()
		{
			return JsonConvert.SerializeObject(this);
		}
	}
}