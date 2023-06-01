using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleVis.Models;
using SimpleVis.Repositories;

namespace SimpleVis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RamenRatingsController : ControllerBase
    {
        private readonly IRamenRatingsRepository repository;
        public RamenRatingsController(IRamenRatingsRepository _repository)
        {
            repository = _repository;
        }
        [HttpGet]
        public ActionResult<IEnumerable<RamenRating>> GetAllRamenRatings()
        {
            return Ok(repository.GetAllRamenRatings());
        }
        [HttpGet("diff-across-countries")]
        public ActionResult<IEnumerable<CountingRamen>> DifferentRamenAcrossCountries()
        {
            return Ok(repository.DifferentRamenAcrossCountries());
        }
        [HttpGet("top-ramen-across-countries")]
        public ActionResult<IEnumerable<CountingRamen>> TopRamenAcrossCountries()
        {
            return Ok(repository.TopRamenAcrossCountries());
        }
        [HttpGet("style-of-ramen")]
        public ActionResult<IEnumerable<CountingRamen>> CountStyleOfRamen()
        {
            return Ok(repository.CountStyleOfRamen());
        }
        [HttpGet("country-most-5-stars-ramen")]
        public ActionResult<IEnumerable<CountingRamen>> CountriesWithMost5Star()
        {
            return Ok(repository.CountriesWithMost5Star());
        }
        [HttpGet("five-star-ramen-style")]
        public ActionResult<IEnumerable<CountingRamen>> FiveStarRamenStyle()
        {
            return Ok(repository.FiveStarRamenStyle());
        }
    }
}
