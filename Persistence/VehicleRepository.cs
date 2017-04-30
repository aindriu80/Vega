using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Models;
namespace Vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _context;
        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeReleated = true)
        {
            if (!includeReleated)
                return await _context.Vehicles.FindAsync();
            return await _context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }
        //public async Task<Vehicle> GetVehicleWithMake(int id)
        //{

        //}
        public void Add(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }
        public void Remove(Vehicle vehicle)
        {
            _context.Remove(vehicle);
        }
    }
}
