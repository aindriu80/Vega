﻿namespace Vega.Extentions
{
    public interface IQueryObject
    {
        string Sortby { get; set; }
        bool IsSortAscending { get; set; }
    }
}