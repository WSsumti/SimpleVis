using SimpleVis.Models;

namespace SimpleVis.Repositories
{
    public interface IRamenRatingsRepository
    {
        List<RamenRating> GetAllRamenRatings();
        List<CountingRamen> DifferentRamenAcrossCountries();
        List<CountingRamen> TopRamenAcrossCountries();
        List<CountingRamen> CountStyleOfRamen();
        List<CountingRamen> CountriesWithMost5Star();
        List<CountingRamen> FiveStarRamenStyle();

    }
}