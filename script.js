// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Chat functionality
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Sample responses - these will be replaced by Gemini API responses
const sampleResponses = {
    "hypertension": {
        "medication": "Amlodipine 5mg - Take once daily in the morning",
        "alternatives": "Lisinopril 10mg, Losartan 50mg",
        "foodsToEat": ["Leafy greens (spinach, kale)", "Berries and bananas", "Whole grains", "Low-fat dairy products"],
        "foodsToAvoid": ["High sodium foods", "Processed meats", "Caffeinated beverages", "Alcohol"],
        "exercises": [
            { name: "Deep Breathing", instruction: "Practice deep breathing for 5 minutes, 3 times daily" },
            { name: "Walking", instruction: "30 minutes of brisk walking daily" }
        ],
        "additionalTips": "Monitor your blood pressure regularly and maintain a consistent sleep schedule. Reduce stress through mindfulness meditation."
    },
    "diabetes": {
        "medication": "Metformin 500mg - Take twice daily with meals",
        "alternatives": "Glipizide 5mg, Januvia 100mg",
        "foodsToEat": ["Non-starchy vegetables", "Whole grains", "Lean proteins", "Healthy fats"],
        "foodsToAvoid": ["Sugary drinks", "Processed carbohydrates", "Fried foods", "Full-fat dairy"],
        "exercises": [
            { name: "Walking", instruction: "30 minutes of walking after meals" },
            { name: "Strength Training", instruction: "Light resistance training 3 times per week" }
        ],
        "additionalTips": "Monitor your blood sugar levels regularly. Stay hydrated and maintain a consistent eating schedule."
    }
};

// Function to add user message to chat
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user');
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to add bot message to chat
function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot');
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to process user input - REPLACE THIS FUNCTION with the Gemini API function below when ready
function processUserInput(input) {
    // Display thinking message
    addBotMessage("Thinking...");
    
    // Simulate API delay
    setTimeout(() => {
        // Remove the thinking message
        chatMessages.removeChild(chatMessages.lastChild);
        
        // Convert input to lowercase for matching
        const lowercaseInput = input.toLowerCase();
        
        // Check if input matches any of our sample conditions
        let response = "";
        let condition = null;
        
        if (lowercaseInput.includes("hypertension") || lowercaseInput.includes("high blood pressure")) {
            condition = "hypertension";
        } else if (lowercaseInput.includes("diabetes") || lowercaseInput.includes("blood sugar")) {
            condition = "diabetes";
        }
        
        if (condition) {
            const data = sampleResponses[condition];
            
            response = `
                <h4>Recommended Medication</h4>
                <p><strong>${data.medication}</strong></p>
                <p><strong>Alternatives:</strong> ${data.alternatives}</p>
                
                <h4>Diet Recommendations</h4>
                <h5>Foods to Include:</h5>
                <ul>
                    ${data.foodsToEat.map(food => `<li>${food}</li>`).join('')}
                </ul>
                
                <h5>Foods to Avoid:</h5>
                <ul>
                    ${data.foodsToAvoid.map(food => `<li>${food}</li>`).join('')}
                </ul>
                
                <h4>Recommended Exercises</h4>
                ${data.exercises.map(exercise => `
                    <p><strong>${exercise.name}:</strong> ${exercise.instruction}</p>
                `).join('')}
                
                <h4>Additional Tips</h4>
                <p>${data.additionalTips}</p>
            `;
        } else {
            response = `I don't have specific information about "${input}". Please try asking about common conditions like hypertension or diabetes, or specific medications.`;
        }
        
        addBotMessage(response);
    }, 1500);
}

// Event listener for send button
if (sendButton) {
    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            processUserInput(message);
        }
    });
}

// Event listener for Enter key
if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                addUserMessage(message);
                userInput.value = '';
                processUserInput(message);
            }
        }
    });
}

// Form submission prevention
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .step, .response-example');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .response-example');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation
    animateOnScroll();
    
    // Trigger animation on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// ======================================================================
// GEMINI API INTEGRATION - UNCOMMENT AND ADD YOUR API KEY TO USE GEMINI
// ======================================================================


// REPLACE the processUserInput function above with this function when you're ready to use Gemini API
async function processUserInput(input) {
    // Display thinking message
    addBotMessage("Thinking...");
    
    try {
        // ================ ADD YOUR API KEY HERE ================
        const API_KEY = "AIzaSyBePHu5sWcv0jLFanyNVlUaHriemVbVHAU"; 
        // ======================================================
        
        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
        
        const requestData = {
            contents: [{
                parts: [{
                    text: `User is asking about medication, diet, exercises, and relaxation techniques for: ${input}. 
                    Provide a detailed response with recommended medication (with dosage and timing) in bold text, 
                    alternative medications, foods to eat and avoid, recommended exercises with instructions, 
                    and additional health tips. Format the response with clear headings and organized lists.`
                }]
            }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 800,
            }
        };
        
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        // Remove the thinking message
        chatMessages.removeChild(chatMessages.lastChild);
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const botResponse = data.candidates[0].content.parts[0].text;
            addBotMessage(botResponse);
        } else {
            addBotMessage("I'm sorry, I couldn't process your request. Please try again.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        
        // Remove the thinking message
        chatMessages.removeChild(chatMessages.lastChild);
        
        addBotMessage("Sorry, there was an error processing your request. Please try again later.");
    }
}
