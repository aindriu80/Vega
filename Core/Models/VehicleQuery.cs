﻿using Vega.Extentions;

namespace Vega.Core.Models
{
    public class VehicleQuery : IQueryObject
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string Sortby { get; set; }
        public bool IsSortAscending { get; set; }

    }
}
