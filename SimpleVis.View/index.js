var margin = { top: 50, right: 40, bottom: 130, left: 60 };
var topics = [
  { 0: "diff-across-countries" },
  { 1: "top-ramen-across-countries" },
  { 2: "style-of-ramen" },
  { 3: "country-most-5-stars-ramen" },
  { 4: "five-star-ramen-style" },
];
var types = [{ 0: "v" }, { 1: "h" }, { 2: "p" }, { 3: "v" }, { 4: "p" }];

var titles = [
  { 0: "Different Ramen across Countries" },
  { 1: "Top Ramen Across Countries" },
  { 2: "Style Of Ramen" },
  { 3: "Country with most 5-stars Ramen" },
  { 4: "Five-star Ramen style" },
];

var axess = [
  { x: "Country", y: "Count" },
  { x: "Count", y: "Country" },
  { x: "Count", y: "Style" },
  { x: "Country", y: "Count" },
  { x: "Count", y: "Style" },
];
function showChart(x) {
  document.getElementById("chart").innerHTML = "";
  var els = document.getElementsByClassName("opt-btn");
  Array.prototype.forEach.call(els, function (el) {
    el.classList.remove("btn-secondary");
    el.classList.remove("btn-outline-secondary");
    el.classList.add("btn-outline-secondary");
  });
  Array.prototype.forEach.call(
    document.getElementsByClassName("o" + x),
    function (el) {
      el.classList.remove("btn-outline-secondary");
      el.classList.add("btn-secondary");
    }
  );
  var link = "http://localhost:5073/api/ramenratings/" + topics[x][x];
  if (types[x][x] == "v") {
    xX = axess[x]["x"];
    yY = axess[x]["y"];
    t = titles[x][x];
    d3.json(link).then(function (data) {
      var width =
        document.getElementById("chart").offsetWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("chart").offsetHeight -
        margin.top -
        margin.bottom;
      var svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var x = d3.scaleBand().range([0, width]).padding(0.1);
      var y = d3.scaleLinear().range([height, 0]);
      var colorScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return d.count;
          }),
        ])
        .range(["#FA8E8E", "#FF0000"]);

      x.domain(
        data.map(function (d) {
          return d.randomProps;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.count;
        }),
      ]);
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d.randomProps);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
          return y(d.count);
        })
        .attr("height", function (d) {
          return height - y(d.count);
        })
        .attr("fill", function (d) {
          return colorScale(d.count);
        })
        .on("mouseover", function (d, data) {
          mouseOver(svg, d, data);
        })
        .on("mouseout", function (d) {
          mouseOut(svg);
        });
      // Text transform 90 degree
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "-0.15em")
        .attr("transform", "rotate(-90)");

      svg.append("g").call(d3.axisLeft(y));
      svg
        .append("text")
        .attr("class", "legend")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 50)
        .style("text-anchor", "middle")
        .text(xX);

      svg
        .append("text")
        .attr("class", "legend")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .style("text-anchor", "middle")
        .text(yY);
      svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", -margin.top + 20)
        .style("text-anchor", "middle")
        .text(t)
        .style("color", "black");
    });
  } else if (types[x][x] == "h") {
    t = titles[x][x];
    xX = axess[x]["x"];
    yY = axess[x]["y"];
    d3.json(
      "http://localhost:5073/api/ramenratings/top-ramen-across-countries"
    ).then(function (data) {
      console.log(data);
      var margin = { top: 50, right: 40, bottom: 130, left: 70 };
      var width =
        document.getElementById("chart").offsetWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("chart").offsetHeight -
        margin.top -
        margin.bottom;
      var svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleBand().range([height, 0]).padding(0.1);
      x.domain([
        0,
        d3.max(data, function (d) {
          return d.count;
        }),
      ]);
      y.domain(
        data.map(function (d) {
          return d.randomProps;
        })
      );
      var colorScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return d.count;
          }),
        ])
        .range(["#FA8E8E", "#FF0000"]);
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", function (d) {
          return y(d.randomProps);
        })
        .attr("width", function (d) {
          return x(d.count);
        })
        .attr("height", y.bandwidth())
        .attr("fill", function (d) {
          return colorScale(d.count);
        })
        .on("mouseover", function (d, data) {
          mouseOver(svg, d, data);
        })
        .on("mouseout", function (d) {
          // Hide tooltip on mouseout
          // svg.select(".tooltip").remove();
          mouseOut(svg);
        });
      // Create the x-axis
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      // Create the y-axis
      svg.append("g").call(d3.axisLeft(y));
      svg.append("g").call(d3.axisLeft(y));
      svg
        .append("text")
        .attr("class", "legend")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 80)
        .style("text-anchor", "middle")
        .text(xX);

      svg
        .append("text")
        .attr("class", "legend")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .style("text-anchor", "middle")
        .text(yY);

      svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", -margin.top + 20)
        .style("text-anchor", "middle")
        .text(t)
        .style("color", "black");
    });
  } else {
    t = titles[x][x];
    var colors = [
      "red",
      "orange",
      "yellow",
      "blue",
      "green",
      "brown",
      "violet",
    ];

    var height =
      document.getElementById("chart").offsetHeight -
      margin.top -
      margin.bottom;
    var width =
      document.getElementById("chart").offsetHeight -
      margin.left -
      margin.right;
    var radius = Math.min(height, width) / 2;
    var total = 0;

    d3.json(link).then(function (data) {
      data.forEach(function (x) {
        total = total + x.count;
      });
      var svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", document.getElementById("chart").offsetWidth)
        .attr("height", document.getElementById("chart").offsetHeight)
        .append("g")
        .attr(
          "transform",
          "translate(" +
            radius +
            margin.left +
            margin.right +
            "," +
            (radius + 40) +
            margin.top +
            margin.bottom +
            ")"
        );

      var pie = d3.pie().value(function (d) {
        return d.count;
      });
      var arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
      var slices = svg
        .selectAll(".slice")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "slice")
        .on("mouseover", function (d, data) {
          // Show tooltip on hover
          // d3.select(this).attr("fill", "orange");
          svg
            .append("text")
            .attr("class", "help")
            .attr("x", d.x - 239)
            .attr("y", d.y - 300)
            .text(
              "Style: " +
                data.data.randomProps +
                ", Count: " +
                data.data.count +
                ", Percentage: " +
                (data.data.count / total) * 100
            );
        })
        .on("mouseout", function (d) {
          // Hide tooltip on mouseout
          // svg.select(".tooltip").remove();
          mouseOut(svg);
        });
      slices
        .append("path")
        .attr("d", arc)
        .attr("fill", function (d, i) {
          return colors[i % colors.length];
        })
        .attr("class", "slice");
      svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", margin.top - 250)
        .style("text-anchor", "middle")
        .text(t)
        .style("color", "black")
        .style("font-size", "20");
      // slices
      //   .append("text")
      //   .attr("transform", function (d) {
      //     return "translate(" + arc.centroid(d) + ")";
      //   })
      //   .attr("dy", ".35em")
      //   .text(function (d) {
      //     return d.data.randomProps;
      //   });
    });
  }
}

function showDataset() {
  document.getElementById("chart").innerHTML = "";
  var els = document.getElementsByClassName("opt-btn");
  Array.prototype.forEach.call(els, function (el) {
    el.classList.remove("btn-secondary");
    el.classList.remove("btn-outline-secondary");
    el.classList.add("btn-outline-secondary");
  });
  Array.prototype.forEach.call(
    document.getElementsByClassName("o-1"),
    function (el) {
      el.classList.remove("btn-outline-secondary");
      el.classList.add("btn-secondary");
    }
  );

  d3.json("http://localhost:5073/api/ramenratings/").then(function (data) {
    var width =
      document.getElementById("chart").offsetWidth - margin.left - margin.right;
    var height =
      document.getElementById("chart").offsetHeight -
      margin.top -
      margin.bottom;
    var testing = d3.select("table");
    if (testing.size() == 0) {
      d3.select("#chart")
        .append("table")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      var table = d3.select("table");
      var thead = table.append("thead");
      var tbody = table.append("tbody");
      var headers = [
        "Review",
        "Brand",
        "Variety",
        "Style",
        "Country",
        "Stars",
        "TopTen",
      ];
      thead
        .append("tr")
        .selectAll("th")
        .data(headers)
        .enter()
        .append("th")
        .text(function (d) {
          return d;
        });
      var rows = tbody.selectAll("tr").data(data).enter().append("tr");
      rows
        .selectAll("td")
        .data(function (row) {
          return headers.map(function (column) {
            return { column: column, value: row[column.toLowerCase()] };
          });
        })
        .enter()
        .append("td")
        .text(function (data) {
          return data.value;
        });
    }
  });
}
// d3.json("http://localhost:5073/api/ramenratings/diff-across-countries").then(
//   function (data) {
//     console.log(data);
//     var width =
//       document.getElementById("chart").offsetWidth - margin.left - margin.right;
//     var height =
//       document.getElementById("chart").offsetHeight -
//       margin.top -
//       margin.bottom;
//     var svg = d3
//       .select("#chart")
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//     var x = d3.scaleBand().range([0, width]).padding(0.1);
//     var y = d3.scaleLinear().range([height, 0]);
//     var colorScale = d3
//       .scaleLinear()
//       .domain([
//         0,
//         d3.max(data, function (d) {
//           return d.count;
//         }),
//       ])
//       .range(["#FA8E8E", "#FF0000"]);

//     x.domain(
//       data.map(function (d) {
//         return d.randomProps;
//       })
//     );
//     y.domain([
//       0,
//       d3.max(data, function (d) {
//         return d.count;
//       }),
//     ]);
//     svg
//       .selectAll(".bar")
//       .data(data)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", function (d) {
//         return x(d.randomProps);
//       })
//       .attr("width", x.bandwidth())
//       .attr("y", function (d) {
//         return y(d.count);
//       })
//       .attr("height", function (d) {
//         return height - y(d.count);
//       })
//       .attr("fill", function (d) {
//         return colorScale(d.count);
//       })
//       .on("mouseover", function (d, data) {
//         mouseOver(svg, d, data);
//       })
//       .on("mouseout", function (d) {
//         mouseOut(svg);
//       });

//     // Create the x-axis
//     svg
//       .append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x))
//       .selectAll("text")
//       .style("text-anchor", "end")
//       .attr("dx", "-0.8em")
//       .attr("dy", "-0.15em")
//       .attr("transform", "rotate(-90)");

//     // Create the y-axis
//     svg.append("g").call(d3.axisLeft(y));
//     svg
//       .append("text")
//       .attr("class", "legend")
//       .attr("x", width / 2)
//       .attr("y", height + margin.bottom - 50)
//       .style("text-anchor", "middle")
//       .text("Country");

//     svg
//       .append("text")
//       .attr("class", "legend")
//       .attr("transform", "rotate(-90)")
//       .attr("x", -height / 2)
//       .attr("y", -margin.left + 20)
//       .style("text-anchor", "middle")
//       .text("Count");

//     // Add title
//     svg
//       .append("text")
//       .attr("class", "title")
//       .attr("x", width / 2)
//       .attr("y", -margin.top + 20)
//       .style("text-anchor", "middle")
//       .text("Different Ramen across Country")
//       .style("color", "black");
//   }
// );

// d3.json(
//   "http://localhost:5073/api/ramenratings/top-ramen-across-countries"
// ).then(function (data) {
//   console.log(data);
//   var margin = { top: 50, right: 40, bottom: 130, left: 60 };
//   var width =
//     document.getElementById("chart").offsetWidth - margin.left - margin.right;
//   var height =
//     document.getElementById("chart").offsetHeight - margin.top - margin.bottom;

//   var svg = d3
//     .select("#chart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//   var x = d3.scaleLinear().range([0, width]);
//   var y = d3.scaleBand().range([height, 0]).padding(0.1);
//   x.domain([
//     0,
//     d3.max(data, function (d) {
//       return d.count;
//     }),
//   ]);
//   y.domain(
//     data.map(function (d) {
//       return d.randomProps;
//     })
//   );
//   var colorScale = d3
//     .scaleLinear()
//     .domain([
//       0,
//       d3.max(data, function (d) {
//         return d.count;
//       }),
//     ])
//     .range(["#FA8E8E", "#FF0000"]);

//   svg
//     .selectAll(".bar")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", 0)
//     .attr("y", function (d) {
//       return y(d.randomProps);
//     })
//     .attr("width", function (d) {
//       return x(d.count);
//     })
//     .attr("height", y.bandwidth())
//     .attr("fill", function (d) {
//       return colorScale(d.count);
//     })
//     .on("mouseover", function (d) {
//       // Show tooltip on hover
//       // d3.select(this).attr("fill", "orange");
//       console.log(d.x);
//       console.log(d.y);
//       svg
//         .append("text")
//         .attr("class", "tooltip")
//         .attr("x", d.x - 139)
//         .attr("y", d.y - 100)
//         .text("Count: " + d.count + ", Country: " + d.randomProps);
//     })
//     .on("mouseout", function (d) {
//       // Hide tooltip on mouseout
//       // svg.select(".tooltip").remove();
//     });

//   // Create the x-axis
//   svg
//     .append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Create the y-axis
//   svg.append("g").call(d3.axisLeft(y));
// });

// function
function mouseOver(svg, d, data) {
  svg
    .append("text")
    .attr("class", "help")
    .attr("x", d.x - 139)
    .attr("y", d.y - 100)
    .text("Count: " + data.count + ", Country: " + data.randomProps);
}
function mouseOut(svg) {
  svg.select(".help").remove();
}
