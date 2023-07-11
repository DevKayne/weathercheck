import "./App.css";
import axios, * as others from "axios";

function App() {
  // Get ICAO Code
  async function handleICAO(e) {
    e.preventDefault();
    let icao = e.target.icao.value.toUpperCase();
    document.getElementById("icaoform").reset();
    fetchMetar(icao);
  }

  function fetchMetar(icao) {
    axios
      .get(`https://api.chrisgardiner.org/airport/${icao}`)
      .then(function (response) {
        setMetar(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function setMetar(data) {
    console.log(data);
    // Setting Data
    document.getElementById("airportname").innerText = data.name;
    document.getElementById("windinfo").innerText =
      `${data.weather.wind.direction}/${data.weather.wind.speed}` ||
      "Unknown Wind";
    document.getElementById("cloudinfo").innerHTML =
      data.weather.wx.cld || "Null Cloud";
    document.getElementById("visinfo").innerText =
      `${data.weather.wx.vis}m` || "Unknown Visiblity";
    document.getElementById("tempinfo").innerText =
      `${data.weather.temp}°C` || "Unknown Temperature";
    document.getElementById("qnhinfo").innerText =
      data.weather.qnh || "Unknown QNH";
    if (data) {
      document.getElementById("wxinfo").style.display = "block";
    } else {
      document.getElementById("wxinfo").style.display = "none";
    }
  }

  return (
    <div className="App">
      <div className="form">
        <h1 className="heading">METAR API</h1>
        <form id="icaoform" onSubmit={handleICAO}>
          <input
            type="text"
            placeholder="Enter an Airport ICAO Here"
            name="icao"
          />
          <button className="fetchbtn" type="submit">
            GET METAR
          </button>
        </form>
      </div>

      <div id="wxinfo">
        <h1 id="airportname"></h1>
        <h3>
          Wind: <span id="windinfo"></span>
        </h3>
        <h3>
          Cloud: <span id="cloudinfo"></span>
        </h3>
        <h3>
          Visibility: <span id="visinfo"></span>
        </h3>
        <h3>
          Temperature: <span id="tempinfo"></span>
        </h3>
        <h3>
          QNH: <span id="qnhinfo"></span>
        </h3>
      </div>
    </div>
  );
}

export default App;
