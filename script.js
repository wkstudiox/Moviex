// ==============================
// MovieX Video List
// Sirf yahan naye video add karo
// ==============================

const videos = [
    {
    title: "Dhamaal 4",
    video: "videos/Dhamaal 4.mp4",
    thumbnail: "thumbnails/Dhamaal 4.jpg"
  },
  {
    title: "Movie 1",
    video: "videos/movie1.mp4",
    thumbnail: "thumbnails/movie1.jpg"
  },
  {
    title: "Movie 2",
    video: "videos/movie2.mp4",
    thumbnail: "thumbnails/movie2.jpg"
  },
  {
    title: "Movie 3",
    video: "videos/movie3.mp4",
    thumbnail: "thumbnails/movie3.jpg"
  }

  // Example:
  // ,
  // {
  //   title:"Movie 4",
  //   video:"videos/movie4.mp4",
  //   thumbnail:"thumbnails/movie4.jpg"
  // }
];

// ==============================

const videoList = document.getElementById("videoList");

videos.forEach(item => {

    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
        <video
    poster="${item.thumbnail}"
    preload="metadata"
    controls
    playsinline
    controlsList="nodownload noplaybackrate"
    disablePictureInPicture
>
            <source src="${item.video}" type="video/mp4">
        </video>

        <div class="video-title">
            ${item.title}
        </div>

        <div class="controls">
            <button class="fullscreen-btn">
                ⛶ Fullscreen
            </button>
        </div>
    `;

    const video = card.querySelector("video");
    const fullscreenBtn = card.querySelector(".fullscreen-btn");

    fullscreenBtn.addEventListener("click", async () => {
    try {
        // Video play hona zaroori hai
        if (video.paused) {
            await video.play();
        }

        // Fullscreen
        if (video.requestFullscreen) {
            await video.requestFullscreen();
        } else if (video.webkitEnterFullscreen) {
            // iPhone Safari
            video.webkitEnterFullscreen();
        } else if (video.webkitRequestFullscreen) {
            await video.webkitRequestFullscreen();
        }

        // Landscape lock (agar browser support karta ho)
        if (screen.orientation && screen.orientation.lock) {
            try {
                await screen.orientation.lock("landscape");
            } catch (e) {
                console.log("Landscape lock not supported");
            }
        }

    } catch (err) {
        console.log(err);
    }
});

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
