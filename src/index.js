import * as d3 from "d3"
import "./index.css"

// JSON DATA URL
const url =
    "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"

// SVG CANVAS SIZING
const margin = { top: 20, right: 20, bottom: 100, left: 60 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

// set ranges
const x = d3.scaleTime().range([0, width])
const y = d3.scaleLinear().range([height, 0])

const formatTime = d3.timeFormat("%B %Y")

const xAxis = d3.axisBottom(x)

const yAxis = d3.axisLeft(y)

const div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)

// SVG Canvas
const svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("fill", "#f2f2f2")

// GET DATA
d3.json(url, response => {
    const data = response.data.map(d => [new Date(Date.parse(d[0])), d[1]])

    x.domain(d3.extent(data, d => d[0]))
    y.domain([0, d3.max(data, d => d[1])])

    // Plot Rectangle based on data
    svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(new Date(d[0])))
        .attr("width", width / data.length + 1)
        .attr("y", d => y(d[1]))
        .attr("height", d => height - y(d[1]))
        .on("mouseover", d => {
            div.transition().duration(200).style("opacity", 0.9)
            div
                .html(
                    "<p>" +
                        formatTime(d[0]) +
                        "</p><p>GDP: $" +
                        d[1].toFixed(2) +
                        " Billion</p>"
                )
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY - 28 + "px")
        })

    svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)")

    svg.append("g").attr("class", "axis").call(yAxis)

    svg
        .append("text")
        .attr(
            "transform",
            "translate(" + width / 2 + " ," + (height + margin.top + 40) + ")"
        )
        .style("font-size", 10 + "px")
        .style("text-anchor", "middle")
        .text(
            "Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)"
        )

    svg
        .append("text")
        .style("font-size", 20 + "px")
        .attr("transform", "rotate(-90)")
        .attr("x", -250)
        .attr("y", 25)
        .text("Gross Domestic Product, USA")
})
