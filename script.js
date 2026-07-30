// ==============================
// Movie List
// ==============================

const movies = [
   {
    title: "Spider man Brand New Day",
    thumbnail: "SpidermanBrandNewDay.jpg",
    link: "https://youtube.com/shorts/v0cwqv2meZQ?si=n1WADw3CvlK6zhia"
   },
  {
    title: "Toy Story 5",
    thumbnail: "ToyStory5.jpg",
    link: "https://u.pcloud.link/publink/show?code=XZkCxc5Zi0MBHdwclnpEFMwN7aCYpHYRLi07"
  },
  {
    title: "Dhamaal 4",
    thumbnail: "dhamaal4.jpg",
    link: "https://u.pcloud.link/publink/show?code=XZ6zor5Z9UshU0I7dtR27aFr0qqrFYoNr6Ry"
  },
  {
    title: "Bhooth bangla",
    thumbnail: "Bhooth bangla.jpg",
    link: "Bhooth bangla.html"
  },
  {
    title: "Spider Man Homecoming",
    thumbnail: "SpiderManHomecoming.jpg",
    link: "https://u.pcloud.link/publink/show?code=XZ03ic5ZRCJiAxbnfupcywmfu0imf7Q6eIHV"
  },
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
    window.open(item.link, "_blank");
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
