namespace GisBackend.Models
{
    public class DivisionInfo
    {
        public int Id { get; set; }
        public int PCode { get; set; }
        public string Name { get; set; } = string.Empty; // e.g., "Dhaka"
        public string Population { get; set; } = string.Empty;
        public string Area { get; set; } = string.Empty;
        public string Density { get; set; } = string.Empty;
        public string Literacy { get; set; } = string.Empty;
    }
}