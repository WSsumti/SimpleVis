namespace SimpleVis.Models
{
    public class RamenRating
    {
        public int Review { get; set; }
        public string Brand { get; set; }
        public string Variety { get; set; }
        public string Style { get; set; }
        public string Country { get; set; }
        public double Stars { get; set; }
        public string? TopTen { get; set; }
    }
}
