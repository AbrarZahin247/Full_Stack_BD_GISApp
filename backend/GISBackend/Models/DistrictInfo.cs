namespace GisBackend.Models
{
    public class DistrictInfo
    {
        public int Id { get; set; }
        public int DistrictPCode { get; set; } // Unique ID for the District (e.g., 3026)
        public int DivisionPCode { get; set; } // Link to Parent Division (e.g., 30)
        
        public string Name { get; set; } = string.Empty;
        public string Population { get; set; } = string.Empty;
        public string Area { get; set; } = string.Empty;
        public string Density { get; set; } = string.Empty;
        public string Literacy { get; set; } = string.Empty;
    }
}