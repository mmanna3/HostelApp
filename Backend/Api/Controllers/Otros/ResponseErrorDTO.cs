namespace Api.Controllers.DTOs
{
    public static class ResponseErrorDTO
    {
        public static object Build(string errorMessage)
        {
            return new
            {
                errors = new
                {
                    Error = errorMessage
                }
            };
        }

    }
}
