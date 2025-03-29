// Configurações
const API_URL = "https://docs.google.com/spreadsheets/d/1UMmNQwY8Y-aDBVOE8ix0OMOzqxvYtRVveVG2_b8gXzY/edit?usp=sharing; // Substitua pela sua URL

// Elementos da UI
const tg = window.Telegram.WebApp;
const elements = {
    balance: document.getElementById('balance'),
    referral: document.getElementById('referral'),
    referrals: document.getElementById('referrals')
};

// Inicialização
tg.expand();
loadUserData();

// Carrega dados do usuário
async function loadUserData() {
    if (tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        
        // Verifica se tem indicação na URL (ex: t.me/seubot?start=ref_123)
        const refId = tg.initDataUnsafe.start_param?.startsWith('ref_') 
            ? tg.initDataUnsafe.start_param.split('_')[1] 
            : null;

        // Registra usuário (ou atualiza)
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: "register",
                userId: user.id,
                userName: user.first_name,
                referredBy: refId
            })
        });
        
        updateUI(await response.json());
    }
}

// Atualiza a interface
function updateUI(data) {
    elements.balance.textContent = `Saldo: ${data.balance || 0} MOB`;
    elements.referrals.textContent = data.referrals || 0;
}

// Sistema de Indicações
elements.referral.addEventListener('click', () => {
    const user = tg.initDataUnsafe.user;
    const link = `https://t.me/${user.username}?start=ref_${user.id}`;
    tg.showAlert(`Indique amigos e ganhe 0.25%!\nSeu link: ${link}`);
});

// Simulação de Mineração (adicione sua lógica real depois)
document.getElementById('toggleMining').addEventListener('click', () => {
    tg.showAlert("Mineração iniciada (simulação)");
});
