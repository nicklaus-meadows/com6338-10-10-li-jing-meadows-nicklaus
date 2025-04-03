
const apiKey = "3RQ083gc9pHrnxDrYLvfu1FtbGpBTxZGZsbPhZEQ";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;


fetch(url)
    .then((response) => response.json())
    .then((data) => {

        const title = data.title;
        const explanation = data.explanation;
        const imageUrl = data.url;


        document.querySelector(".title").textContent = title;
        document.querySelector(".description").textContent = explanation;
        document.getElementById("nasa-image").src = imageUrl;
    })
    .catch((error) => {

        console.error("Error fetching data from NASA API:", error);
    });
