let timer;
let timerDuration = 300; // 5 minutes in seconds
let currentEmail = '';
let inboxEmails = [];

function startTimer() {
    clearInterval(timer);
    let timeRemaining = timerDuration;
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            generateTempEmail();
        } else {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function generateTempEmail() {
    const emailPrefix = Math.random().toString(36).substring(2, 15);
    const emailDomain = "tempemail.com";
    currentEmail = `${emailPrefix}@${emailDomain}`;
    document.getElementById("email-display").innerText = currentEmail;
    startTimer();
    inboxEmails = []; // Clear the inbox for the new email
    clearInbox();
}

function refreshInbox() {
    loadInbox();
}

function copyEmail() {
    navigator.clipboard.writeText(currentEmail).then(() => {
        alert("Email copied to clipboard");
    });
}

function clearInbox() {
    document.getElementById("email-list").innerHTML = '';
}

function loadInbox() {
    // Simulate receiving new emails
    inboxEmails.push(`New email for ${currentEmail} at ${new Date().toLocaleTimeString()}`);
    const inbox = document.getElementById("email-list");
    inbox.innerHTML = ''; // Clear the current list
    inboxEmails.forEach(email => {
        const li = document.createElement('li');
        li.innerText = email;
        inbox.appendChild(li);
    });
}

generateTempEmail();
