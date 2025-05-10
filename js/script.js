document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const form = document.getElementById('voting-form');
    const categories = document.querySelectorAll('.category');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    const categoriesCompleted = document.getElementById('categories-completed');
    const paymentModal = document.getElementById('payment-modal');
    const nomineeNameEl = document.getElementById('nominee-name');
    const categoryNameEl = document.getElementById('category-name');
    const cancelPaymentBtn = document.getElementById('cancel-payment');
    const proceedPaymentBtn = document.getElementById('proceed-payment');
    const toast = document.getElementById('toast');
    const nameInput = document.getElementById('voter-name');
    const emailInput = document.getElementById('voter-email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    
    // For storing selected paid nominees
    let paidVotes = {};
    let currentPaystackLink = '';
    
    // Update progress bar
    function updateProgress() {
        const total = categories.length;
        let completed = 0;
        
        categories.forEach(category => {
            const categoryName = category.getAttribute('data-category');
            const selectedRadio = document.querySelector(`input[name="${categoryName}"]:checked`);
            if (selectedRadio) {
                completed++;
            }
        });
        
        const percentage = (completed / total) * 100;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}% Complete`;
        categoriesCompleted.textContent = `${completed}/${total} Categories`;
    }
    
    // Event listeners for radio buttons
    categories.forEach(category => {
        const categoryName = category.getAttribute('data-category');
        const isPaid = category.hasAttribute('data-paid');
        
        const radioButtons = category.querySelectorAll(`input[name="${categoryName}"]`);
        
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                if (isPaid) {
                    // Store the selected paid nominee
                    const nomineeName = this.value;
                    const paystackLink = this.getAttribute('data-paystack-link');
                    
                    // Open payment modal
                    nomineeNameEl.textContent = nomineeName;
                    categoryNameEl.textContent = categoryName.replace('-', ' ');
                    currentPaystackLink = paystackLink;
                    paymentModal.style.display = 'flex';
                    
                    // Uncheck the radio button until payment is completed
                    this.checked = false;
                } else {
                    // Update progress for non-paid categories
                    updateProgress();
                }
            });
        });
    });
    
    // Cancel payment button
    cancelPaymentBtn.addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });
    
    // Proceed to payment button
    proceedPaymentBtn.addEventListener('click', function() {
        // Redirect to Paystack
        window.location.href = currentPaystackLink;
        
        // In a real application, you would handle the payment callback
        // For this demo, we'll just simulate a successful payment
        setTimeout(() => {
            paymentModal.style.display = 'none';
            
            // Show success toast
            toast.textContent = 'Redirecting to Paystack';
            toast.className = 'toast show';
            
            setTimeout(() => {
                toast.className = 'toast';
            }, 3000);
            
            // Update progress
            updateProgress();
        }, 500);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate name and email
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        if (!isValid) {
            return;
        }
        
        // Check if at least one category is selected
        let hasSelection = false;
        categories.forEach(category => {
            const categoryName = category.getAttribute('data-category');
            const selectedRadio = document.querySelector(`input[name="${categoryName}"]:checked`);
            if (selectedRadio) {
                hasSelection = true;
            }
        });
        
        if (!hasSelection) {
            toast.textContent = 'Please vote in at least one category.';
            toast.className = 'toast show error';
            
            setTimeout(() => {
                toast.className = 'toast';
            }, 3000);
            
            return;
        }
        
        // Submit form - in a real application, you would send this data to your server
        toast.textContent = 'Thank you! Your votes have been submitted successfully.';
        toast.className = 'toast show';
        
        setTimeout(() => {
            toast.className = 'toast';
            // Reset form
            form.reset();
            updateProgress();
        }, 3000);
    });
    
    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Initialize progress
    updateProgress();
});


// Set a fixed target date (exactly 40 days from March 19, 2025)
const targetDate = new Date('May 15, 2025 00:00:00').getTime();
        
// Update the countdown every second
const countdownTimer = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the target date
    const distance = targetDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the results
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    
    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        
        document.querySelector(".countdown-title").innerText = "Event Has Begun!";
    }
}, 1000);