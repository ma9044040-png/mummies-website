// --- SMOOTH SCROLL REVEAL ---
window.onscroll = () => {
    let winScroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById("progress-bar").style.width = (winScroll / height) * 100 + "%";
    
    document.querySelectorAll(".card").forEach(c => {
        if (c.getBoundingClientRect().top < window.innerHeight - 100) c.classList.add("visible");
    });
};

// --- MUMMY GALLERY LOGIC ---
function showMummy(name, desc) {
    const box = document.getElementById('mummy-info-box');
    document.getElementById('m-name').innerText = name;
    document.getElementById('m-desc').innerText = desc;
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// --- ROYAL SCRIBE (STABILIZED VERSION) ---
function translateGlyphs() {
    const input = document.getElementById('glyphInput').value.toUpperCase();
    const map = {
        'A': '𓄿', 'B': '𓃀', 'C': '𓎼', 'D': '𓂓', 'E': '𓇋', 'F': '𓆑', 
        'G': '𓎼', 'H': '𓄿', 'I': '𓇋', 'J': '𓆎', 'K': '𓎡', 'L': '𓃭', 
        'M': '𓅓', 'N': '𓈖', 'O': '𓅱', 'P': '𓆵', 'Q': '𓈴', 'R': '𓂋', 
        'S': '𓋴', 'T': '𓏏', 'U': '𓅱', 'V': '𓆑', 'W': '𓅱', 'X': '𓐍', 
        'Y': '𓇋', 'Z': '𓊃', ' ': ' '
    };
    
    let res = "";
    for(let char of input) {
        res += (map[char] || char);
    }
    
    const output = document.getElementById('glyphOutput');
    // We update innerText twice to force the browser to trigger a font re-render
    output.innerText = "";
    setTimeout(() => {
        output.innerText = res || "---";
    }, 10);
}

// --- IMPERIAL TYCOON GAME ---
let gold = 0;
let pClick = 1;
let pSec = 0;
let shop = {
    amulet: { cost: 20, inc: 2, type: 'click' },
    scribe: { cost: 100, inc: 5, type: 'sec' },
    priest: { cost: 600, inc: 30, type: 'sec' },
    pyramid: { cost: 10000, inc: 200, type: 'sec' }
};

function mineGold() {
    gold += pClick;
    updateUI();
}

function buy(id) {
    let item = shop[id];
    if (gold >= item.cost) {
        gold -= item.cost;
        if (item.type === 'click') pClick += item.inc;
        else pSec += item.inc;
        item.cost = Math.floor(item.cost * 2.5); // Increase price
        updateUI();
    }
}

function updateUI() {
    document.getElementById('gold-count').innerText = Math.floor(gold);
    for (let key in shop) {
        document.getElementById('c-'+key).innerText = shop[key].cost;
    }
}

// Tick income every second
setInterval(() => {
    gold += pSec;
    updateUI();
}, 1000);
