namespace Vega.Extentions
{
    public interface IQueryObject
    {
        string Sortby { get; set; }
        bool IsSortAscending { get; set; }
        int Page { get; set; }

        byte PageSize { get; set; }

    }
}
