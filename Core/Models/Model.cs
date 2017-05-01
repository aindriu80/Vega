﻿using System.ComponentModel.DataAnnotations;

namespace Vega.Core.Models
{
    
    public class Model
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public Make Make { get; set; }
        public int MakeId { get; set; }
    }
}
