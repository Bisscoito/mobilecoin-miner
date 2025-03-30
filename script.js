// Configurações
const MOCK_API_URL = "https://SEU_ID.mockapi.io/mobilecoin-miner";
let isMining = false;
let miningInterval;

// Elementos
const tg = window.Telegram.WebApp;
const elements = {
  balance: document.getElementById('balance'),
  hashrate: document.getElementById('hashrate'),
  time: document.getElementById('time'),
  toggleBtn: document.getElementById('toggleMining')
};

// Inicia ao carregar
tg.expand();
setupMining();

// Configura mineração
function setupMining() {
  elements.toggleBtn.addEventListener('click', async () => {
    if (isMining) {
      stopMining();
    } else {
      await startMining();
    }
  });
}

// Inicia mineração
async function startMining() {
  if (!tg.initDataUnsafe.user) return;
  
  isMining = true;
  elements.toggleBtn.textContent = 'Parar Mineração';
  
  // Registra na API
  await fetch(`${MOCK_API_URL}/mining`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: tg.initDataUnsafe.user.id,
      startTime: new Date().toISOString()
    })
  });

  // Atualiza UI
  miningInterval = setInterval(updateMiningStats, 1000);
}

// Para mineração
function stopMining() {
  isMining = false;
  clearInterval(miningInterval);
  elements.toggleBtn.textContent = 'Iniciar Mineração';
}

// Atualiza estatísticas
async function updateMiningStats() {
  const response = await fetch(`${MOCK_API_URL}/mining?userId=${tg.initDataUnsafe.user.id}`);
  const data = await response.json();
  
  elements.hashrate.textContent = `${data.currentHashrate} H/s`;
  elements.balance.textContent = `Saldo: ${data.balance} MOB`;
  elements.time.textContent = formatTime(data.miningTime);
}

// Formata tempo
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
/* User Bar Styles */
.user-bar {
    background: #2c3e50;
    color: white;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.user-info {
    display: flex;
    gap: 15px;
}

[contenteditable="true"] {
    padding: 3px 8px;
    border-radius: 3px;
    min-width: 100px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
}

[contenteditable="true"]:focus {
    background: #fff;
    color: #333;
    outline: none;
}

[contenteditable="true"][data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #95a5a6;
    font-style: italic;
}

.save-btn {
    background: #27ae60;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 10px;
    transition: background 0.3s;
}

.save-btn:hover {
    background: #2ecc71;
}

/* Miner Logs Styles */
.miner-logs {
    margin-top: 30px;
    padding-top: 15px;
    border-top: 1px solid #34495e;
}

.log-container {
    height: 200px;
    overflow-y: auto;
    background: #1a1a1a;
    border: 1px solid #34495e;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    border-radius: 5px;
    color: #ecf0f1;
}

.log-entry {
    margin-bottom: 5px;
    padding-bottom: 3px;
    border-bottom: 1px solid #2c3e50;
    line-height: 1.4;
}

@media (max-width: 600px) {
    .user-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .user-info {
        width: 100%;
        flex-direction: column;
        gap: 5px;
    }
    
    .save-btn {
        margin-left: 0;
        width: 100%;
    }
}
