using Microsoft.EntityFrameworkCore;
using GisBackend.Models;

namespace GisBackend.Data
{
    public class GisDbContext : DbContext
    {
        public GisDbContext(DbContextOptions<GisDbContext> options) : base(options) { }

        public DbSet<DivisionInfo> DivisionInfos { get; set; }
        public DbSet<DistrictInfo> DistrictInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed Data: 2022 Census Info
            modelBuilder.Entity<DivisionInfo>().HasData(
                // PCode 10 matches "Barishal" in your JSON snippet
                new DivisionInfo { Id=1, PCode=10, Name="Barishal", Population="9,100,102", Area="13,225 km²", Density="688 /km²", Literacy="77.6%" },
                new DivisionInfo { Id=2, PCode=20, Name="Chattogram", Population="33,202,326", Area="33,909 km²", Density="979 /km²", Literacy="78.4%" },
                new DivisionInfo { Id=3, PCode=30, Name="Dhaka", Population="44,215,107", Area="20,509 km²", Density="2,156 /km²", Literacy="83.6%" },
                new DivisionInfo { Id=4, PCode=40, Name="Khulna", Population="17,416,645", Area="22,284 km²", Density="782 /km²", Literacy="76.8%" },
                new DivisionInfo { Id=5, PCode=45, Name="Mymensingh", Population="12,225,498", Area="10,485 km²", Density="1,146 /km²", Literacy="67.1%" },
                new DivisionInfo { Id=6, PCode=50, Name="Rajshahi", Population="20,353,119", Area="18,153 km²", Density="1,121 /km²", Literacy="73.2%" },
                new DivisionInfo { Id=7, PCode=55, Name="Rangpur", Population="17,610,956", Area="16,185 km²", Density="1,088 /km²", Literacy="70.8%" },
                new DivisionInfo { Id=8, PCode=60, Name="Sylhet", Population="11,034,863", Area="12,635 km²", Density="873 /km²", Literacy="76.0%" }
            );
        }
    }
}