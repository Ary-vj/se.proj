// Change header background on scroll
window.addEventListener("scroll", function() {
  const header = document.querySelector(".head");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-question');
faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    const answer = item.nextElementSibling;
    // Close other answers
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.nextElementSibling.style.maxHeight = null;
      }
    });
    // Toggle current answer
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Handle Service Booking Form Submission
const serviceForm = document.querySelector('.service-form');
if (serviceForm) {
  serviceForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = {
      name: serviceForm.querySelector('[name="name"]').value,
      email: serviceForm.querySelector('[name="email"]').value,
      phone: serviceForm.querySelector('[name="phone"]').value,
      eventDate: serviceForm.querySelector('[name="event-date"]').value,
      eventType: serviceForm.querySelector('[name="event-type"]').value,
      venueType: serviceForm.querySelector('[name="venue-type"]').value,
      city: serviceForm.querySelector('[name="city"]').value,
      people: serviceForm.querySelector('[name="people"]').value,
      notes: serviceForm.querySelector('[name="notes"]').value
    };

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.eventDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Store data in localStorage
    localStorage.setItem('bookingData', JSON.stringify(formData));

    // Show confirmation message
    alert('Thank you! Redirecting to payment page...');

    // Redirect to payment page
    window.location.href = 'payment.html';
  });
}