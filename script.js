document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault(); const { name, email, phone, year, branch } = {name: document.getElementById('name').value, email: document.getElementById('email').value, phone: document.getElementById('phone').value, year: document.getElementById('year').value, branch: document.getElementById('branch').value}; const message = document.getElementById('message');
    if (!name || !email || !phone || !year || !branch) { message.textContent = 'All fields required!'; return; }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { message.textContent = 'Invalid email!'; return; }
    if (!/^\d{10}$/.test(phone)) { message.textContent = 'Phone must be 10 digits!'; return; }
    fetch('/api/registrations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, year, branch }) }).then(res => res.text()).then(data => message.textContent = data);
});

    // Validation
    if (!name || !email || !phone || !year || !branch) {
        message.textContent = 'All fields are required!';
        message.style.color = 'red';
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        message.textContent = 'Invalid email!';
        message.style.color = 'red';
        return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
        message.textContent = 'Phone must be 10 digits!';
        message.style.color = 'red';
        return;
    }

    message.textContent = 'Form is valid! Ready to send.';
    message.style.color = 'green';