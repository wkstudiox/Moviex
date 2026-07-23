// ==============================
// Movie List
// ==============================

const movies = [
  {
    title: "Dhamaal 4",
    thumbnail: "dhamaal4.jpg",
    link: "dhamaal4.html"
  },
  {
    title: "Movie 1",
    thumbnail: "movie1.jpg",
    link: "movie1.html"
  },
  {
    title: "Movie 2",
    thumbnail: "movie2.jpg",
    link: "movie2.html"
  },
  {
    title: "Movie 3",
    thumbnail: "movie3.jpg",
    link: "movie3.html"
  }
];

// ==============================
// Show Thumbnails
// ==============================

const videoList = document.getElementById("videoList");

videoList.innerHTML = "";

movies.forEach(item => {

    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
        <img src="${item.thumbnail}" class="movie-thumbnail" alt="${item.title}">
        <div class="video-title">${item.title}</div>
    `;
    card.onclick = () => {
    window.location.href = item.link;
};

    videoList.appendChild(card);

});
// ==============================
// SEARCH MOVIES
// ==============================

const searchBox = document.getElementById("searchBox");
const notFound = document.getElementById("notFound");

searchBox.addEventListener("input", () => {

    const value = searchBox.value.toLowerCase().trim();

    const cards = document.querySelectorAll(".video-card");

    let found = false;

    cards.forEach(card => {

        const title = card.querySelector(".video-title")
            .innerText
            .toLowerCase();

        if(title.includes(value)){

            card.style.display = "block";
            found = true;

        }else{

            card.style.display = "none";

        }

    });

    if(found || value === ""){

        notFound.style.display = "none";

    }else{

        notFound.style.display = "block";

    }

});

// ==============================
// TELEGRAM SEND REQUEST
// ==============================

const sendBtn = document.getElementById("sendBtn");
const movieRequestInput = document.getElementById("movieRequest");

sendBtn.addEventListener("click", async () => {
    const movieName = movieRequestInput.value.trim();

    if (!movieName) {
        alert("Please enter a movie name!");
        return;
    }

    const botToken = "7446321729:AAH1BrcN2VNQdpXqigiWomS7ce0Uojn1CvM";
    const chatId = "6469722152";
    const message = `New Movie Request from MovieX: ${movieName}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        if (response.ok) {
            alert("✅ Movie request sent successfully to admin!");
            movieRequestInput.value = ""; // Clear input
        } else {
            alert("❌ Failed to send. Please try again.");
        }
    } catch (error) {
        console.error("Error sending to Telegram:", error);
        alert("❌ Network error. Please check your connection.");
    }
});
let unlocked = false;

const popup = document.getElementById("popup");
const unlockBtn = document.getElementById("unlockBtn");
const closeBtn = document.getElementById("closeBtn");
// Popup sirf ek baar dikhana (refresh par nahi)
if (sessionStorage.getItem("popupShown") === "true") {
    popup.style.display = "none";
}
unlockBtn.onclick = () => {

    unlocked = true;

    window.open("https://yt.openinapp.co/5taj7", "_blank");
};

closeBtn.onclick = () => {

    if (!unlocked) {
        alert("Please click Unlock first.");
        return;
    }

    // Session me yaad rakho ki popup close ho chuka hai
    sessionStorage.setItem("popupShown", "true");

    popup.style.display = "none";

};