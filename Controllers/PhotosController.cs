using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{


    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment _host;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PhotosController(IHostingEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _host = host;
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await _repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            // c:\wwwroot\
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var filename = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, filename);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //System.Drawing not in .NET Core at the moment

            var photo = new Photo { Filename = filename };
            vehicle.Photos.Add(photo);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Photo, PhotoResource>(photo));
        }

    }
}
