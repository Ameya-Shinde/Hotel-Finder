const locate = document.getElementById("location");
const searchBtn = document.getElementById("srchBtn");
const res = document.getElementById("rest");
let hotelsArray = [];

async function fetchData() {
    try {
        const response = await fetch("https://hotelslists.free.beeceptor.com/gethotels", {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '36a15ea47bmshdb65c38f227a7ecp19d657jsn9cd7b32db248',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        });
        const jsonResponse = await response.json();
        hotelsArray = jsonResponse.data;

        // Display all hotels initially
        displayHotels(hotelsArray);
    } catch (error) {
        console.error(error);
    }
}

function displayHotels(hotels) {
    res.innerHTML = "";
    hotels.forEach((hotel) => {
        const resDiv = document.createElement("div");
        resDiv.innerHTML = `
            <div class="imgContainer">
                <img src="${hotel.imgUrl}" alt="Hotel Front">
            </div>
            <div class="hDetails">
                <p>Hotel Name: ${hotel.name}</p>
                <p>Hotel Price: ₹${hotel.price} / Night</p>
                <p>Guest Rating: ${hotel["guest rating"]}</p>
                <p>Availability: ${hotel.dates}</p>
            </div>`;
        resDiv.classList = "results";
        res.appendChild(resDiv);
    });
}

fetchData();

searchBtn.addEventListener("click", () => {
    const searchTerm = locate.value.trim().toLowerCase();
    const filteredHotels = hotelsArray.filter((hotel) => hotel.location.toLowerCase().includes(searchTerm));
	
    displayHotels(filteredHotels);
});

