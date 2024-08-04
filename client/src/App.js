import React, { useEffect, useState } from 'react';
import BirthsBarChart from './components/birthsBarChart';
import axios from 'axios';
import './App.css';

function App() {
  const [births, setBirths] = useState([]);
  const [municipalitySelected, setMunicipalitySelected] = useState([]);
  const [yearSelected, setYearSelected] = useState([]);
  const [genderSelected, setGenderSelected] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  // Initialize theme state based on localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark';
  });

  useEffect(() => {
    // Fetch data 
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/births');
        setBirths(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // Visual Setting Dark/Light theme
    localStorage.setItem('theme', theme);
    document.body.className = theme;

  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Selection from query options
  const handleOptionChange = (e, setSelected, allOptions) => {
    const { options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);

    if (selectedValues.includes("select-all")) {
      setSelected(allOptions);
    } else {
      setSelected(selectedValues);
    }
  };

  const areAllOptionsSelected = () => {
    return municipalitySelected.length > 0 && yearSelected.length > 0 && genderSelected.length > 0;
  };
  const showResults = areAllOptionsSelected();

  // Filter data
  const filterData = () => births
    .filter(item => municipalitySelected.includes(item.municipality))
    .map(item => ({
      municipality: item.municipality,
      births: Object.keys(item.births)
        .filter(year => yearSelected.includes(year))
        .reduce((acc, year) => {
          acc[year] = {
            male: genderSelected.includes("male") ? item.births[year].male : 0,
            female: genderSelected.includes("female") ? item.births[year].female : 0
          };
          return acc;
        }, {})
    }));

  const filteredData = filterData();
  const selectedYears = yearSelected.length > 0 ? yearSelected : ['2016', '2017', '2018', '2019', '2020'];

  // Show BarChart for selection
  const handleBarChartSelection = () => {
    setShowBarChart(true);
    setShowTable(false);
  };

  // Show Table for selection
  const handleTableSelection = () => {
    setShowBarChart(false);
    setShowTable(true);
  };

  // Sort data if `isSorted` is true
  const sortedFilteredData = isSorted
    ? filteredData.sort((a, b) => {
      if (a.municipality < b.municipality) return -1;
      if (a.municipality > b.municipality) return 1;
      return 0;
    })
    : filteredData;

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  return (
    <div className="App">
      <h1>Birth Statistics by Municipality (2016-2020)</h1>
      <button className="top-right-button" onClick={toggleTheme}> Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode </button>
      <p>
        Welcome to our birth statistics dashboard! The data presented here is sourced from the Statistics Sweden (SCB) database,
        which is the official government agency responsible for producing official statistics in Sweden. The SCB is a reliable
        and authoritative source, providing accurate and comprehensive data on various aspects of Swedish society.
        Here, you will find detailed information on the number of births from 2016 to 2020, broken down by municipality and gender.
        We hope you find this information useful and insightful.
      </p>
      {/* START: Options Area */}
      <div className="options-container">
        <div className="rectangle-box">
          <label htmlFor="dropdowns" className="options-label"> Select Options to Compare Data</label>
          <div className="dropdown-group">
            {/* Select Muncipalities to compare */}
            <div className="dropdown-wrapper">
              <label htmlFor="municipalities-dropdown" className="dropdown-label">Municipalities</label>
              <select id="municipalities-dropdown" multiple className="dropdown" value={municipalitySelected}
                onChange={(e) => handleOptionChange(e, setMunicipalitySelected, births.map(item => item.municipality))}>
                <option value="select-all">Select All</option>
                {births.map((item) => (
                  <option key={item.municipality} value={item.municipality}>{item.municipality}</option>
                ))}
              </select>
            </div>
            {/* Select Years to compare */}
            <div className="dropdown-wrapper">
              <label htmlFor="municipalities-dropdown" className="dropdown-label">Years</label>
              <select id="year-dropdown" multiple className="dropdown" value={yearSelected}
                onChange={(e) => handleOptionChange(e, setYearSelected, ["2016", "2017", "2018", "2019", "2020"])}>
                <option value="select-all">Select All</option>
                {["2016", "2017", "2018", "2019", "2020"].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            {/* Select Gender to compare */}
            <div className="dropdown-wrapper">
              <label htmlFor="municipalities-dropdown" className="dropdown-label">Genders</label>
              <select id="gender-dropdown" multiple className="dropdown" value={genderSelected}
                onChange={(e) => handleOptionChange(e, setGenderSelected, ["male", "female"])}>
                <option value="select-all">Select All</option>
                {["male", "female"].map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
            <div className="button-container">
              <button disabled={!showResults || showBarChart} onClick={handleBarChartSelection}> Show bar chart view </button>
              <button disabled={!showResults || showTable} onClick={handleTableSelection}>Show table view </button>
              <div className="checkbox-container">
                <input type="checkbox" id="myCheckbox" disabled={!showResults || showBarChart} onChange={toggleSort} />
                <label htmlFor="myCheckbox" className="checkbox-label"> Sort municipalities alphabetically </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END: Options Area */}
      {/* ----------------------- */}
      {/* START: Data in Table View */}
      {
        showTable && (<table>
          <thead>
            <tr>
              <th>Municipality</th>
              {selectedYears.map(year => (
                <th key={year} colSpan={2}>{year}</th>
              ))}
            </tr>
            <tr>
              <th></th>
              {selectedYears.map(year => (
                <React.Fragment key={year}>
                  <th className="males">Males</th>
                  <th className="females">Females</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedFilteredData.map((item) => (
              <tr key={item.municipality}>
                <td className="left-align">{item.municipality}</td>
                {selectedYears.map((year) => (
                  <React.Fragment key={year}>
                    <td className="males">{item.births[year]?.male || "-"}</td>
                    <td className="females">{item.births[year]?.female || "-"}</td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>)
      }
      {/* END: Data in Table View */}
      {/* ----------------------- */}
      {/* START: Data in BarChart View */}
      {
        showBarChart && (<BirthsBarChart data={filteredData} />)
      }
      {/* END: Data in BarChart View */}
    </div >
  );
}

export default App;
