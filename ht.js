const apiKey = "3RQ083gc9pHrnxDrYLvfu1FtbGpBTxZGZsbPhZEQ";
const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;

const container = document.getElementById("neo-container");

function renderNEOs(neos) {
  neos.forEach((neo) => {
    const {
      name,
      absolute_magnitude_h,
      estimated_diameter: {
        meters: { estimated_diameter_min, estimated_diameter_max }
      },
      is_potentially_hazardous_asteroid
    } = neo;

    const neoItem = document.createElement("div");
    neoItem.classList.add("neo-item", "border", "p-3", "rounded");

    const title = document.createElement("h5");
    title.textContent = `Name: ${name}`;

    const details = document.createElement("p");
    details.innerHTML = `
      <strong>Magnitude:</strong> ${absolute_magnitude_h} <br>
      <strong>Estimated Diameter (meters):</strong> ${estimated_diameter_min} - ${estimated_diameter_max} <br>
      <strong>Potentially Hazardous:</strong> ${is_potentially_hazardous_asteroid ? "Yes" : "No"}
    `;

    neoItem.appendChild(title);
    neoItem.appendChild(details);
    container.appendChild(neoItem);
  });
}

const storedNEOs = localStorage.getItem("neoData");

if (storedNEOs) {
  const parsedData = JSON.parse(storedNEOs);
  renderNEOs(parsedData);
} else {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const neos = data.near_earth_objects;
      localStorage.setItem("neoData", JSON.stringify(neos));
      renderNEOs(neos);
    })
    .catch((error) => {
      console.error("Error fetching NEO data:", error);
    });
}
