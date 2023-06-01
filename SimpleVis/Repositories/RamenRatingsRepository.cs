using SimpleVis.Models;
using System.Data.SqlClient;

namespace SimpleVis.Repositories
{
    public class RamenRatingsRepository : IRamenRatingsRepository
    {
        private readonly IConfiguration _configuration;
        public RamenRatingsRepository(IConfiguration configuration)
        {
               _configuration = configuration;
        }
        public List<CountingRamen> CountriesWithMost5Star()
        {
            List<CountingRamen> res = new List<CountingRamen>();
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Default")))
            {
                try
                {
                    connection.Open();
                    string query = "select Count(Country) as count, Country from RamenRatings where Stars = 5 group by Country order by Count(Country) desc";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.CommandType = System.Data.CommandType.Text;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            res.Add(new CountingRamen()
                            {
                                Count = Int32.Parse(reader["count"].ToString()),
                                RandomProps = reader["Country"].ToString(),

                            });
                        }
                    }
                    connection.Close();
                }
                catch (SqlException e)
                {
                    Console.WriteLine(e.Message);
                }
            };
            return res;
        }

        public List<CountingRamen> CountStyleOfRamen()
        {
            List<CountingRamen> res = new List<CountingRamen>();
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Default")))
            {
                try
                {
                    connection.Open();
                    string query = "select Count(Style) as count, Style from RamenRatings group by Style order by Count(Style) desc";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.CommandType = System.Data.CommandType.Text;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            res.Add(new CountingRamen()
                            {
                                Count = Int32.Parse(reader["count"].ToString()),
                                RandomProps = reader["Style"].ToString(),

                            });
                        }
                    }
                    connection.Close();
                }
                catch (SqlException e)
                {
                    Console.WriteLine(e.Message);
                }
            };
            return res;
        }

        public List<CountingRamen> DifferentRamenAcrossCountries()
        {
            List<CountingRamen> res = new List<CountingRamen>();
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Default")))
            {
                try
                {
                    connection.Open();
                    string query = "select Count(Country) as count, Country from RamenRatings group by Country order by Count(Country) desc";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.CommandType = System.Data.CommandType.Text;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            res.Add(new CountingRamen()
                            {
                                Count = Int32.Parse(reader["count"].ToString()),
                                RandomProps = reader["Country"].ToString(),

                            });
                        }
                    }
                    connection.Close();
                }
                catch (SqlException e)
                {
                    Console.WriteLine(e.Message);
                }
            };
            return res;
        }

        public List<CountingRamen> FiveStarRamenStyle()
        {
            List<CountingRamen> res = new List<CountingRamen>();
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Default")))
            {
                try
                {
                    connection.Open();
                    string query = "select Count(Style) as count, Style from RamenRatings where Stars = 5 group by Style order by Count(Style) desc";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.CommandType = System.Data.CommandType.Text;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            res.Add(new CountingRamen()
                            {
                                Count = Int32.Parse(reader["count"].ToString()),
                                RandomProps = reader["Style"].ToString(),

                            });
                        }
                    }
                    connection.Close();
                }
                catch (SqlException e)
                {
                    Console.WriteLine(e.Message);
                }
            };
            return res;
        }

        public List<RamenRating> GetAllRamenRatings()
        {
            List<RamenRating> res = new List<RamenRating>();
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Default")))
            {
                try
                {
                    connection.Open();
                    string query = "select top 20 * from RamenRatings";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.CommandType = System.Data.CommandType.Text;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read()) 
                        {
                            res.Add(new RamenRating()
                            {
                                Review = Int32.Parse(reader["Review"].ToString()),
                                Brand = reader["Brand"].ToString(),
                                Variety = reader["Variety"].ToString(),
                                Style = reader["Style"].ToString(),
                                Country = reader["Country"].ToString(),
                                Stars = double.Parse(reader["Stars"].ToString()),
                                TopTen = reader["TopTen"].ToString()
                            });
                        }
                    }
                    connection.Close();
                }
                catch (SqlException e)
                {
                    Console.WriteLine(e.Message);
                }
            };
            return res;
        }

        public List<CountingRamen> TopRamenAcrossCountries()
        {
            List<CountingRamen> res = new List<CountingRamen>();
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Default")))
            {
                try
                {
                    connection.Open();
                    string query = "select Count(Country) as count, Country from RamenRatings where TopTen is not null group by Country order by Count(Country) desc";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.CommandType = System.Data.CommandType.Text;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            res.Add(new CountingRamen()
                            {
                                Count = Int32.Parse(reader["count"].ToString()),
                                RandomProps = reader["Country"].ToString(),

                            });
                        }
                    }
                    connection.Close();
                }
                catch (SqlException e)
                {
                    Console.WriteLine(e.Message);
                }
            };
            return res;
        }
    }
}
