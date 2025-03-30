// User Data Management
function loadUserData() {
    const nick = localStorage.getItem('minerNick') || 'Miner';
    const wallet = localStorage.getItem('minerWallet') || '';
    
    document.getElementById('user-nick').textContent = nick;
    document.getElementById('wallet-address').textContent = 
        wallet.length > 10 ? wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4) : wallet;
}

function saveUserData() {
    const nick = document.getElementById('user-nick').textContent.trim();
    const wallet = document.getElementById('wallet-address').textContent.trim();
    
    localStorage.setItem('minerNick', nick);
    localStorage.setItem('minerWallet', wallet);
    
    addLog('Configurações salvas com sucesso');
    document.getElementById('wallet-address').textContent = 
        wallet.length > 10 ? wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4) : wallet;
}

// Log Management
function addLog(message) {
    const logContainer = document.getElementById('log-container');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Miner Simulation
let miningInterval;
let fakeHashrate = 0;

function startMining() {
    document.getElementById('miner-status').textContent = "Minerando";
    document.getElementById('miner-status').style.color = "#2ecc71";
    
    fakeHashrate = Math.floor(Math.random() * 100) + 50;
    updateHashrate();
    
    miningInterval = setInterval(() => {
        fakeHashrate += Math.floor(Math.random() * 20) - 10;
        if(fakeHashrate < 30) fakeHashrate = 30;
        updateHashrate();
    }, 2000);
    
    addLog('Mineração iniciada');
}

function stopMining() {
    clearInterval(miningInterval);
    document.getElementById('miner-status').textContent = "Parado";
    document.getElementById('miner-status').style.color = "#e74c3c";
    document.getElementById('hash-rate').textContent = "0 H/s";
    addLog('Mineração parada');
}

function updateHashrate() {
    document.getElementById('hash-rate').textContent = `${fakeHashrate} H/s`;
}

// Event Listeners
document.getElementById('wallet-address').addEventListener('blur', function() {
    const wallet = this.textContent.trim();
    if(wallet.length > 10) {
        this.textContent = wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4);
    }
});

document.getElementById('wallet-address').addEventListener('click', function() {
    const fullWallet = localStorage.getItem('minerWallet') || '';
    if(fullWallet) {
        this.textContent = fullWallet;
        this.focus();
    }
});

document.getElementById('save-btn').addEventListener('click', saveUserData);

document.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            this.blur();
            saveUserData();
        }
    });
});

document.getElementById('start-btn').addEventListener('click', startMining);
document.getElementById('stop-btn').addEventListener('click', stopMining);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    addLog('Sistema pronto. Configure seu nick e carteira.');
});
