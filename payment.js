// Retrieve booking data from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const bookingData = JSON.parse(localStorage.getItem('bookingData'));

  if (bookingData) {
    document.getElementById('customerName').textContent = bookingData.name;
    document.getElementById('customerEmail').textContent = bookingData.email;
    document.getElementById('customerPhone').textContent = bookingData.phone;
    document.getElementById('eventDate').textContent = bookingData.eventDate;
    document.getElementById('eventType').textContent = bookingData.eventType;
    document.getElementById('venueType').textContent = bookingData.venueType;
    document.getElementById('city').textContent = bookingData.city;
    document.getElementById('people').textContent = bookingData.people;
  } else {
    // If no booking data, redirect back
    alert('No booking information found. Please complete the booking form first.');
    window.location.href = 'new.html';
  }
});

// Handle payment method selection
const paymentMethodSelect = document.getElementById('paymentMethod');
const paymentSections = {
  upi: document.getElementById('upiSection'),
  card: document.getElementById('cardSection'),
  netbanking: document.getElementById('netbankingSection'),
  wallet: document.getElementById('walletSection')
};

paymentMethodSelect.addEventListener('change', (e) => {
  // Hide all sections
  Object.values(paymentSections).forEach(section => {
    section.style.display = 'none';
  });

  // Show selected section
  const selectedMethod = e.target.value;
  if (paymentSections[selectedMethod]) {
    paymentSections[selectedMethod].style.display = 'block';
  }
});

// Format card number with spaces
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
  });
}

// Format expiry date
const expiryDateInput = document.getElementById('expiryDate');
if (expiryDateInput) {
  expiryDateInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
  });
}

// Handle form submission
document.getElementById('paymentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const termsAccepted = document.getElementById('terms').checked;

  if (!termsAccepted) {
    alert('Please accept the terms and conditions');
    return;
  }

  if (amount < 1000) {
    alert('Minimum booking amount is ₹1000');
    return;
  }

  // Simulate payment processing
  const paymentData = {
    amount: amount,
    paymentMethod: paymentMethod,
    bookingData: JSON.parse(localStorage.getItem('bookingData')),
    timestamp: new Date().toISOString()
  };

  // Show processing message
  const payBtn = document.querySelector('.pay-btn');
  const originalText = payBtn.innerHTML;
  payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
  payBtn.disabled = true;

  // Simulate API call (replace with actual payment gateway integration)
  setTimeout(() => {
    // Store payment data
    localStorage.setItem('paymentData', JSON.stringify(paymentData));

    // Show success message
    alert('Payment Successful! Thank you for your booking. We will contact you soon.');

    // Clear booking data
    localStorage.removeItem('bookingData');

    // Redirect to home page
    window.location.href = 'new.html';
  }, 2000);
});