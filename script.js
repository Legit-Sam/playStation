document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("giftCardForm");
    const progressBar = document.getElementById("progressBar");
    const submitButton = form.querySelector("button");
    const alertContainer = document.getElementById("alertContainer");

    let giftCardsSubmitted = 0;
    const maxCards = 2; // Max number of required gift cards
    let uploadedFiles = []; // Store uploaded files

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const psnID = document.getElementById("psnID").value.trim();
        const cardType = document.getElementById("cardType").value;
        const giftCardImages = document.getElementById("giftCardImage").files;

        if (!psnID) {
            showAlert("Please enter your PlayStation ID.", "error");
            return;
        }

        if (!cardType) {
            showAlert("Please select a gift card type.", "error");
            return;
        }

        if (giftCardImages.length === 0) {
            showAlert("Please upload at least one gift card image.", "error");
            return;
        }

        // Store selected files for submission later
        for (let i = 0; i < giftCardImages.length; i++) {
            uploadedFiles.push(giftCardImages[i]);
        }

        giftCardsSubmitted++;

        // Update progress bar
        progressBar.style.width = `${(giftCardsSubmitted / maxCards) * 100}%`;

        // Update button text
        if (giftCardsSubmitted < maxCards) {
            submitButton.textContent = "Upload More";
            showAlert("Add more gift cards to complete the process.", "warning");
        } else {
            submitButton.textContent = "Send Email";
            submitButton.dataset.ready = "true"; // Mark button as ready for sending
        }
    });

    submitButton.addEventListener("click", async function () {
        if (submitButton.textContent !== "Send Email") {
            return;
        }

        const psnID = document.getElementById("psnID").value.trim();
        const cardType = document.getElementById("cardType").value;

        if (!psnID) {
            showAlert("Please enter your PlayStation ID.", "error");
            return;
        }

        if (!cardType) {
            showAlert("Please select a gift card type.", "error");
            return;
        }

        if (uploadedFiles.length === 0) {
            showAlert("Please upload at least one gift card image.", "error");
            return;
        }

        const formData = new FormData();
        formData.append("psnID", psnID);
        formData.append("cardType", cardType);

        // Append all stored files
        uploadedFiles.forEach((file) => {
            formData.append("giftCardImage", file); // Ensure the field name matches backend
        });

        try {
            let response = await fetch("http://localhost:5000/send-email", {
                method: "POST",
                body: formData,
            });

            let result = await response.json();

            if (response.ok) {
                showAlert(result.message || "Gift card sent successfully!", "success");

                // Reset form after successful submission
                form.reset();
                uploadedFiles = [];
                giftCardsSubmitted = 0;
                progressBar.style.width = "0%";
                submitButton.textContent = "Upload Gift Card";
                delete submitButton.dataset.ready;
            } else {
                showAlert(result.message || "Failed to send gift card. Try again.", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showAlert("Failed to send gift card. Try again.", "error");
        }
    });

    // Function to show animated alerts
    function showAlert(message, type) {
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert", type);
        alertDiv.textContent = message;

        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 4000);
    }
});
