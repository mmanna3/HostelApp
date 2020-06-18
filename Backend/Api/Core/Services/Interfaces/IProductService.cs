﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> ListAsync();
    }
}