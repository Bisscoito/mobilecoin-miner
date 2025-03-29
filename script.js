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
