// User Data Management
function loadUserData() {
    const nick = localStorage.getItem('minerNick') || 'CRYPTO_MINER';
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
    
    addLog('Configurations saved to local storage');
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

// Mining Simulation
let miningInterval;
let currentHashrate = 0;
const maxHashrate = 100;

function startMining() {
    document.getElementById('miner-status').textContent = "ONLINE";
    document.getElementById('miner-status').className = "stat-value on";
    
    // Start with random hashrate
    currentHashrate = Math.floor(Math.random() * 30) + 20;
    updateMiningDisplay();
    
    miningInterval = setInterval(() => {
        // Random hashrate fluctuation
        const fluctuation = Math.floor(Math.random() * 20) - 10;
        currentHashrate = Math.min(maxHashrate, Math.max(10, currentHashrate + fluctuation));
        updateMiningDisplay();
    }, 1500);
    
    addLog('Mining started - MOB blockchain connected');
    addLog(`Initial hashrate: ${currentHashrate} H/s`);
}

function stopMining() {
    clearInterval(miningInterval);
    document.getElementById('miner-status').textContent = "OFFLINE";
    document.getElementById('miner-status').className = "stat-value off";
    document.getElementById('hash-rate').textContent = "0 H/s";
    document.getElementById('hash-progress').style.width = '0%';
    currentHashrate = 0;
    addLog('Mining stopped');
}

function updateMiningDisplay() {
    document.getElementById('hash-rate').textContent = `${currentHashrate} H/s`;
    const progressPercent = (currentHashrate / maxHashrate) * 100;
    document.getElementById('hash-progress').style.width = `${progressPercent}%`;
    
    // Change color based on hashrate
    if(currentHashrate > 70) {
        document.getElementById('hash-progress').style.background = 'linear-gradient(90deg, var(--crypto-primary), #00ff00)';
    } else if(currentHashrate > 40) {
        document.getElementById('hash-progress').style.background = 'linear-gradient(90deg, var(--crypto-primary), var(--crypto-secondary))';
    } else {
        document.getElementById('hash-progress').style.background = 'linear-gradient(90deg, var(--crypto-primary), #ff5555)';
    }
}

// Update current time
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
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
    addLog('MOB Miner v1.0 initialized');
    addLog('Configure your miner nickname and wallet address');
    
    // Update time every second
    setInterval(updateTime, 1000);
    updateTime();
});
