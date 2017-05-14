namespace Vega.Core.Models
{
    public class VehicleQuery
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string Sortby { get; set; }
        public bool IsSortAscending { get; set; }

    }
}
