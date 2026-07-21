// Premium Screen JS

const plans = document.querySelectorAll(".plan");
const continueBtn = document.querySelector(".continue-btn");
const dots = document.querySelectorAll(".dots span");

// -------------------------
// Plan Selection
// -------------------------
plans.forEach(plan => {
    plan.addEventListener("click", () => {

        plans.forEach(p => p.classList.remove("selected"));

        plan.classList.add("selected");

    });
});
// -------------------------
// Auto Slider Dots
// -------------------------
let currentDot = 0;

setInterval(() => {

    dots[currentDot].classList.remove("active");

    currentDot++;

    if (currentDot >= dots.length) {
        currentDot = 0;
    }

    dots[currentDot].classList.add("active");

}, 2500);
// =============================
// Payment Popup
// =============================

const paymentPopup = document.getElementById("paymentPopup");
const closePopup = document.querySelector(".close-popup");
const payBtn = document.getElementById("payBtn");
const successMsg = document.getElementById("successMsg");

// Continue Button
document.querySelector(".continue-btn").addEventListener("click", () => {
    paymentPopup.style.display = "flex";
});

// Close Button
closePopup.addEventListener("click", () => {
    paymentPopup.style.display = "none";
    successMsg.innerHTML = "";
});

// Pay Button
payBtn.addEventListener("click", () => {

    const utr = document.getElementById("utr").value.trim();
    const amount = document.getElementById("amount").value.trim();

    if (utr === "" || amount === "") {
        alert("Please enter UTR Number and Amount");
        return;
    }

    successMsg.innerHTML = "✘ Incorrect UTR number and amount entered";

    setTimeout(() => {
        paymentPopup.style.display = "none";
        successMsg.innerHTML = "";
        document.getElementById("utr").value = "";
        document.getElementById("amount").value = "";
    }, 20000);

});