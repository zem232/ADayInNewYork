# November 8, 2016 in New York
Walking through a typical day in the life of a New Yorker, as represented by 311 data.

## Data
* [311 Data](https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9)
	* I gathered 311 Data for the days of November 8, 2016 and November 9, 2016 and made separate files for each day.
* [NTA Shapefile](https://data.cityofnewyork.us/City-Government/Neighborhood-Tabulation-Areas/cpf4-rkhq)
	* I then performed a spatial join & aggregated complaints by NTA region.
	* The total count and descriptor mode for each of the days were calculated
	* The total count and mode of complaint descriptor for each hour was also calculated.
* [Python notebook of data cleaning and aggregation](Data_Harvesting_Processing.ipynb)
* [The final geojson file](trump_Elec_DayOf.geojson)

## References
* [Sliding Scale, W3schools.com](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider)
* [Custom scroller and template, Boostrap](https://bootstrapious.com/p/bootstrap-sidebar)
* Fonts, Fontawesome

[Take me to website!](https://zem232.github.io/ADayInNewYork/)
