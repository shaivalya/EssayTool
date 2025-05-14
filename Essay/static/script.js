let backspaceCount = 0;
const maxBackspaces = 3;

const textarea = document.getElementById("essayBox");
const counter = document.getElementById("backspaceCount");
const warningMsg = document.getElementById("warningMsg");
const resultDiv = document.getElementById("result");

textarea.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
        if (backspaceCount >= maxBackspaces) {
            e.preventDefault();
            warningMsg.textContent = "Backspace limit reached!";
        } else {
            backspaceCount++;
            counter.textContent = backspaceCount;
            warningMsg.textContent = "";
        }
    }
});

function submitEssay() {
    const content = document.getElementById("essayBox").value.trim();
    if (!content) {
        alert("Please write something before submitting.");
        return;
    }

    // Show a loading message while waiting for response
    document.getElementById("result").style.display = 'none';  // Hide result section initially
    document.getElementById("result").innerHTML = "<p>Loading...</p>";

    // Simulate a delay before submitting (to increase response time)
    setTimeout(() => {
        fetch("/correct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: content })
        })
        .then(res => res.json())
        .then(data => {
            // Check if there were no grammar issues (no corrections)
            let feedbackMessage = "You have done well!";
            if (data.corrected !== data.original) {
                feedbackMessage = "Your essay has been corrected.";
            }

            // Update the UI with the corrected text, sentiment, and feedback message
            document.getElementById("result").style.display = 'block'; // Show result section
            document.getElementById("result").innerHTML = `
                <h3>Corrected Essay:</h3>
                <p>${data.corrected}</p>
                <p><strong>Sentiment:</strong> ${data.sentiment}</p>
                <p>${feedbackMessage}</p>
            `;
        })
        .catch(err => {
            alert("Error connecting to the server.");
            console.error(err);
        });
    }, 2000); // Simulate a delay of 2 seconds
}






    
  