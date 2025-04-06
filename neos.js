const apiKey = "3RQ083gc9pHrnxDrYLvfu1FtbGpBTxZGZsbPhZEQ";
const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;


fetch(url)
    .then((response) => response.json())
    .then((data) => {

        const neos = data.near_earth_objects;


        const container = document.getElementById("neo-container");

        neos.forEach((neo) => {
            const neoItem = document.createElement("div");
            neoItem.classList.add("neo-item", "border", "p-3", "rounded");


            const title = document.createElement("h5");
            title.textContent = `Name: ${neo.name}`;

            const details = document.createElement("p");
            details.innerHTML = `
        <strong>Magnitude:</strong> ${neo.absolute_magnitude_h} <br>
        <strong>Estimated Diameter (meters):</strong> ${neo.estimated_diameter.meters.estimated_diameter_min
                } - ${neo.estimated_diameter.meters.estimated_diameter_max} <br>
        <strong>Potentially Hazardous:</strong> ${neo.is_potentially_hazardous_asteroid ? "Yes" : "No"
                }
      `;


            neoItem.appendChild(title);
            neoItem.appendChild(details);
            container.appendChild(neoItem);
        });
    })
    .catch((error) => {
        console.error("Error fetching NEO data:", error);
    });