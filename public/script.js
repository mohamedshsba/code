document.getElementById('hostButton').addEventListener('click', () => {
    document.getElementById('hostSection').style.display = 'block';
    document.getElementById('verifySection').style.display = 'none';
});

document.getElementById('verifyButton').addEventListener('click', () => {
    document.getElementById('verifySection').style.display = 'block';
    document.getElementById('hostSection').style.display = 'none';
});

function hostLogin() {
    const password = document.getElementById('hostPassword').value;

    fetch('/host', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    })
    .then(response => {
        if (!response.ok) throw new Error('كلمة مرور خاطئة');
        return response.json();
    })
    .then(codes => {
        const codesList = document.getElementById('codesList');
        codesList.innerHTML = '';
        codes.forEach(code => {
            const codeElem = document.createElement('div');
            codeElem.textContent = code.code;
            codesList.appendChild(codeElem);
        });
    })
    .catch(error => alert(error.message));
}

function addCode() {
    fetch('/add-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(newCode => {
        const codesList = document.getElementById('codesList');
        const codeElem = document.createElement('div');
        codeElem.textContent = newCode.code;
        codesList.appendChild(codeElem);
    });
}

function verifyCode() {
    const code = document.getElementById('userCode').value;

    fetch('/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    })
    .then(response => {
        if (!response.ok) throw new Error('الرمز غير صالح أو انتهت صلاحيته');
        return response.text();
    })
    .then(message => {
        document.getElementById('verifyMessage').textContent = message;
    })
    .catch(error => alert(error.message));
}