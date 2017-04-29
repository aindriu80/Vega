using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vega.Controllers.Resources;
using Vega.Models;

namespace Vega.Controllers
{
    // place end point at top of class - all methods
    // respond to api/vehicles


    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;

        public VehiclesController(IMapper mapper)
        {
            _mapper = mapper;
        }
        [HttpPost]
        // not using domain classes - implementation details
        // dealing with contracts, 

        public IActionResult CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            var vehicle = Mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            return Ok(vehicle);
        }
    }
}
