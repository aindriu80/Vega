using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Models;

namespace Vega.Persistence
{
    public class VehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }
        public async Task<Vehicle> GetVehicle(int id)
        {
            return await _context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);

        }
    }
}
