// --- SELEÇÃO DE ELEMENTOS DO DOM ---
const passwordDisplay = document.getElementById('password-display');
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const includeUppercase = document.getElementById('include-uppercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const customInput = document.getElementById('custom-password-input');
const testResult = document.getElementById('test-result');

const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?+';

lengthSlider.addEventListener('input', (e) => {
    lengthValue.innerText = e.target.value;
    generatePassword();
});

generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
    let charSet = LOWERCASE_CHARS;
    let password = '';
    
    if (includeUppercase.checked) charSet += UPPERCASE_CHARS;
    if (includeNumbers.checked) charSet += NUMBER_CHARS;
    if (includeSymbols.checked) charSet += SYMBOL_CHARS;

    const length = lengthSlider.value;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    passwordDisplay.value = password;
    updateStrengthMeter(password);
}

function getPasswordScore(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 16) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
}

function updateStrengthMeter(password) {
    const strength = getPasswordScore(password);

    const width = (strength / 5) * 100;
    strengthBar.style.width = `${width}%`;

    if (strength <= 2) {
        strengthBar.style.backgroundColor = '#9c27b0'; 
        strengthText.innerText = 'Fraca (Ballas Country)';
        strengthText.style.color = '#e1bee7'; 
    } else if (strength <= 4) {
        strengthBar.style.backgroundColor = '#ff9800'; 
        strengthText.innerText = 'Média';
        strengthText.style.color = '#ffe0b2';
    } else {
        strengthBar.style.backgroundColor = '#4caf50'; 
        strengthText.innerText = 'FORTE (Grove Street 4 Life)';
        strengthText.style.color = '#c8e6c9';
    }
}

copyBtn.addEventListener('click', () => {
    if (!passwordDisplay.value) return;
    
    navigator.clipboard.writeText(passwordDisplay.value);
    
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
});

if (customInput) {
    customInput.addEventListener('input', () => {
        const password = customInput.value;
        
        if (password === '') {
            testResult.innerText = 'Aguardando digitação...';
            testResult.style.color = '#a0a0a0';
            testResult.style.borderColor = 'transparent';
            customInput.style.borderColor = '#333';
            return;
        }

        const strength = getPasswordScore(password);

        if (strength <= 2) {
            testResult.innerText = '⚠️ FRACA: Território Ballas (Perigoso)';
            testResult.style.color = '#e1bee7';
            testResult.style.borderColor = '#9c27b0';
            customInput.style.borderColor = '#9c27b0';
        } else if (strength <= 4) {
            testResult.innerText = '⚠️ MÉDIA: Cuidado nas ruas';
            testResult.style.color = '#ffe0b2';
            testResult.style.borderColor = '#ff9800';
            customInput.style.borderColor = '#ff9800';
        } else {
            testResult.innerText = '✅ FORTE: Grove Street 4 Life (Seguro)';
            testResult.style.color = '#c8e6c9';
            testResult.style.borderColor = '#4caf50';
            customInput.style.borderColor = '#4caf50';
        }
    });
}

generatePassword();