using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Vega.Models
{
    public class VegaDbContext : DbContext
    {
        //public VegaDbContext()
        //    : base("DefaultConnection")
        //{ }


        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {
        }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Make>().ToTable("Make");
            modelBuilder.Entity<Model>().ToTable("Model");
        }

    }
}

