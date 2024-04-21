let Questions = [
    {
        soru: "Hücre zarının temel işlevi nedir?",
        cevaplar: ["Hücreyi desteklemek", "Hücre içine giren ve çıkan maddeleri kontrol etmek", "Hücrenin hareket teşvikini sağlamak", "Protein sentezlemek"],
        doğru: "B"
    },
    {
        soru: "Aşağıdakilerden hangileri bir sürüngen değildir?",
        cevaplar: ["Yılan", "Timsah", "Kurbağa", "Kertenkele"],
        doğru: "C"
    },
    {
        soru: "Aşağıdakilerden hangileri tek hücreliddir?",
        cevaplar: ["Solucan", "Amip", "Sinek", "Karayosunu"],
        doğru: "B"
    },
    {
        soru: "Bir hücrede hangisinin olması onun bitki hücresi olduğunu gösterir?",
        cevaplar: ["Hücre çeperi", "Loroplast", "Nişasta", "Sentrozom"],
        doğru: "A"
    },
    {
        soru: "Böceklerin kaç bacağı vardır?",
        cevaplar: ["4", "6", "8", "40"],
        doğru: "C"
    },
    {
        soru: "Hangisi omurgalı bir canlıdır?",
        cevaplar: ["Deniz anası", "Midye", "Kaplumbağa", "Yengeç"],
        doğru: "C"
    },
    {
        soru: "Gözün görme ile ilgili kısmı hangisidir?",
        cevaplar: ["Kornea", "Retina", "Tulumcuk", "Kesecik"],
        doğru: "B"
    },
    {
        soru: "Fotosentez işlemi sırasında hangi gaz ortamında salınır?",
        cevaplar: ["Karbon dioksit", "Azot", "Oksijen", "Hidrojen"],
        doğru: "C"
    },
    {
        soru: "DNA'nın ana işlevi nedir?",
        cevaplar: ["Hücre bölünmesini sağlamak", "Genetik bilgiyi depolamak", "Protein üretimi", "Savunma"],
        doğru: "B"
    },
    {
        soru: "Aşağıdakilerden hangisinin mitoz bölünmesi sonucu oluşur?",
        cevaplar: ["Gamet hücreleri", "Kök hücreleri", "Vücut hücreleri", "Sperm ve yumurta hücreleri"],
        doğru: "C"
    },
    {
        soru: "Hangi organ sistemi vücutta oksijen taşınmasını sağlar?",
        cevaplar: ["Sindirim sistemi", "Dolaşım sistemi", "Solunum sistemi", "Boşaltım sistemi"],
        doğru: "C"
    }
];

let currentQuestionIndex = -1;
let countdown;
let timeLeft = 30;
let isExtended = false;
let playerScore = 0;
let startTime;
let endTime;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', startGame);
function startGame() {
    currentQuestionIndex = -1;
    playerScore = 0;
    selectedQuestions = getRandomQuestions(Questions, 10);
    document.getElementById('player-score').textContent = '0';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('info-column').style.display = 'block';
    document.getElementById('score-board').style.display = 'none'; // Skor tablosunu gizle
    showNextQuestion();
    hideElement(document.getElementById('score-board'));
    resetTime();
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= Questions.length) {
        showResult(true, playerScore);
        return;
    }
    const question = Questions[currentQuestionIndex];
    const mainMenu = document.getElementById('mainMenu');
    mainMenu.innerHTML = `<h2>${question.soru}</h2>`;
    question.cevaplar.forEach((answer, i) => {
        const button = document.createElement('button');
        button.textContent = String.fromCharCode(65 + i) + ") " + answer;
        button.className = 'answerButton';
        button.onclick = () => checkAnswer(i, question.doğru);
        mainMenu.appendChild(button);
    });
    const feedback = document.createElement('div');
    feedback.id = 'feedback';
    mainMenu.appendChild(feedback);
    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.id = 'next-question';
    nextQuestionButton.className = 'menuButton';
    nextQuestionButton.textContent = 'Sonraki Soru';
    nextQuestionButton.style.display = 'none';
    nextQuestionButton.onclick = () => showNextQuestion();
    mainMenu.appendChild(nextQuestionButton);
    resetTime();
}

function checkAnswer(selected, correct) {
    clearInterval(countdown);
    const answerButtons = document.querySelectorAll('.answerButton');
    answerButtons.forEach((button, index) => {
        button.disabled = true; // Tüm butonları devre dışı bırak
        const isCorrect = String.fromCharCode(65 + index) === correct;
        
        if (isCorrect) {
            button.classList.add('correct'); // Doğru cevabı yeşil yap
        }
        
        if (index === selected && !isCorrect) {
            button.classList.add('wrong'); // Yanlış seçilen cevabı kırmızı yap
        }
    });

    const feedback = document.getElementById('feedback');
    if (String.fromCharCode(65 + selected) === correct) {
        feedback.textContent = "Doğru!";
        feedback.style.color = "green";
        playerScore += 10;
        document.getElementById('player-score').textContent = playerScore;
        document.getElementById('next-question').style.display = 'block';
    } else {
        feedback.textContent = "Yanlış!";
        feedback.style.color = "red";
        setTimeout(() => showResult(false, playerScore), 2000);
    }
}


function resetTime() {
    clearInterval(countdown);
    timeLeft = 30;
    isExtended = false;
    document.getElementById('ask-friend').disabled = false;
    startCountdown();
}

function startCountdown() {
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateCountdown();
        } else {
            clearInterval(countdown);
            showResult(false, playerScore);
        }
    }, 1000);
}

function updateCountdown() {
    const countdownText = document.getElementById('countdown-text');
    const countdownCircle = document.getElementById('countdown-circle').querySelector('circle');
    countdownText.textContent = timeLeft > 0 ? timeLeft : '';
    const totalDuration = isExtended ? 90 : 30;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (timeLeft / totalDuration) * circumference;
    countdownCircle.style.strokeDashoffset = offset;
}

function extendTime() {
    if (!isExtended) {
        timeLeft += 30;
        isExtended = true;
        document.getElementById('ask-friend').disabled = true;
        updateCountdown();
    }
}

// Oyun bittiğinde veya bir skor kaydedildiğinde skorları güncelleyen fonksiyon
function showResult(isWin, score) {
    setTimeout(function() {
        const resultContainer = document.getElementById('result-container');
        const resultMessage = document.getElementById('result-message');
        const finalScore = document.getElementById('final-score');
        showElement(document.getElementById('score-board'));
        showSaveScoreOption(score); // Bu fonksiyonun çağrısını ekleyin

        resultMessage.textContent = isWin ? "Tebrikler, Kazandınız!" : "Üzgünüz, Kaybettiniz!";
        finalScore.textContent = score;
        resultContainer.style.display = 'block';

        // Sadece yeni bir skor olduğunda skor kaydetme seçeneğini göster
        if (isWin) {
            showSaveScoreOption(score);
        }

        document.getElementById('restart-game').onclick = function() {
            startGame();
        };

        document.getElementById('go-home').onclick = function() {
            window.location.href = 'index.html';
        };
    }, 3000);
}


function loadAndDisplayScores() {
    const highScoresList = document.getElementById('high-score-list');
    // localStorage'dan skorları çek, eğer yoksa boş bir dizi ata
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Skor listesini temizle
    highScoresList.innerHTML = '';

    // Her bir skor için bir <li> elementi oluştur ve bu elemente skor bilgisini ekle
    scores.forEach(score => {
        const scoreElement = document.createElement('li');
        // Burada `score.name` ve `score.score` kullanarak metni düzgün bir şekilde oluşturuyoruz
        scoreElement.textContent = `${score.name}: ${score.score}`;
        highScoresList.appendChild(scoreElement);
    });
}


// Oyun bittiğinde veya bir skor kaydedildiğinde skorları güncelleyen fonksiyon
function saveScore(newScore) {
function saveScore(newScore) {
    const playerName = document.getElementById('player-name-input').value;
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];

    // İsim kontrolü yapılması
    let isNameExist = false;
    scores.forEach(score => {
        if (score.name === playerName) {
            // Eğer isim zaten listede varsa, skoru güncelle
            score.score = newScore;
            isNameExist = true;
        }
    });

    // Eğer isim listede yoksa, yeni bir giriş olarak ekle
    if (!isNameExist) {
        scores.push({ name: playerName, score: newScore });
    }

    // Skorları büyükten küçüğe sırala
    scores.sort((a, b) => b.score - a.score);

    // En iyi 10 skoru sakla
    localStorage.setItem('highScores', JSON.stringify(scores.slice(0, 10)));

    // Skorları yeniden yükle ve göster
    loadAndDisplayScores();
}



// Sayfa yüklendiğinde skorları yükle ve göster
document.addEventListener('DOMContentLoaded', loadAndDisplayScores);

// "Ana Sayfaya Dön" butonunun işlevselliği
document.getElementById('go-home').addEventListener('click', function() {
    // Burada sayfayı yeniden yükleyebilir veya başka bir yöntemle ana menüye dönebilirsiniz
    window.location.href = 'index.html'; // Örnek olarak sayfayı yeniden yüklemek kullanılmıştır
    loadAndDisplayScores(); // Sayfa yeniden yüklendiğinde skorları tekrar yükle ve göster
});
document.getElementById('save-score').addEventListener('click', function() {
    const playerName = document.getElementById('player-name').value;
    const score = document.getElementById('final-score').textContent;
    
    if (!playerName) {
        alert("Lütfen adınızı girin.");
        return;
    }

    // Mevcut skorları yükle
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // Yeni skoru ekle
    scores.push({ name: playerName, score: parseInt(score) });
    scores.sort((a, b) => b.score - a.score); // Skorları büyükten küçüğe sırala
    
    // En iyi 10 skoru sakla
    localStorage.setItem('highScores', JSON.stringify(scores.slice(0, 10)));
    
    // Skorları yeniden yükle ve göster
    loadAndDisplayScores();
    
    // İsim ve skor kaydedildikten sonra input alanını temizle
    document.getElementById('player-name').value = '';
});
function showSaveScoreOption(playerScore) {
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];
    let isScoreHighEnough = false;

    if (scores.length < 10) {
        isScoreHighEnough = true;
    } else {
        // En düşük skoru bulmak için skorları küçükten büyüğe sıralayın
        scores.sort((a, b) => a.score - b.score);
        const lowestHighScore = scores[0].score; // En düşük skor, sıralı listede ilk sırada olacaktır.
        if (playerScore > lowestHighScore) {
            isScoreHighEnough = true;
        }
    }

    const saveScoreMessage = document.getElementById('save-score-message');
    const saveScoreContainer = document.getElementById('save-score-container');

    if (isScoreHighEnough) {
        saveScoreMessage.textContent = "Tebrikler! Yüksek skorlar listesine girebilirsiniz.";
        saveScoreContainer.style.display = 'block';
    } else {
        saveScoreMessage.textContent = "Maalesef yüksek skorlar listesine giremediniz.";
        saveScoreContainer.style.display = 'none';
    }
}


function hideElement(element) {
    element.classList.remove('visible');
    element.classList.add('hidden');
}

// Elementi gösterme fonksiyonu
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}
window.onload = function() {
    var scoreBoard = document.getElementById('score-board');
    var scoreBoardHeight = scoreBoard.scrollHeight + 'px';
    scoreBoard.style.height = scoreBoardHeight;
}

let selectedQuestions = []; // Seçilen soruları saklamak için boş bir dizi

function startGame() {
    currentQuestionIndex = -1;
    playerScore = 0;
    document.getElementById('player-score').textContent = '0';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('info-column').style.display = 'block';
    document.getElementById('score-board').style.display = 'none'; // Skor tablosunu gizle
    selectedQuestions = getRandomQuestions(Questions, 10); // Rastgele 10 soru seç
    showNextQuestion();
    hideElement(document.getElementById('score-board'));
    resetTime();
}

function showNextQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length - 1) {
        showResult(true, playerScore);
        return;
    }
    currentQuestionIndex++;
    const question = selectedQuestions[currentQuestionIndex];
    const mainMenu = document.getElementById('mainMenu');
    mainMenu.innerHTML = `<h2>${question.soru}</h2>`;
    question.cevaplar.forEach((answer, i) => {
        const button = document.createElement('button');
        button.textContent = String.fromCharCode(65 + i) + ") " + answer;
        button.className = 'answerButton';
        button.onclick = () => checkAnswer(i, question.doğru);
        mainMenu.appendChild(button);
    });
    const feedback = document.createElement('div');
    feedback.id = 'feedback';
    mainMenu.appendChild(feedback);
    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.id = 'next-question';
    nextQuestionButton.className = 'menuButton';
    nextQuestionButton.textContent = 'Sonraki Soru';
    nextQuestionButton.style.display = 'none';
    nextQuestionButton.onclick = () => showNextQuestion();
    mainMenu.appendChild(nextQuestionButton);
    resetTime();
}
function getRandomQuestions(sourceArray, neededElements) {
    const shuffled = [...sourceArray].sort(() => 0.5 - Math.random()); // Diziyi karıştır
    return shuffled.slice(0, neededElements); // İlk 'neededElements' sayıda elemanı al
}
// 10. soru şıklarının seçilmesini dinle
var options10 = document.querySelectorAll('#question-10 input[type="radio"]');
options10.forEach(function(option) {
    option.addEventListener('change', function() {
        if (this.checked) {
            // Doğru seçenek işaretlendiğinde
            if (this.value === "true") {
                // Sonraki soru butonuna otomatik tıkla
                document.querySelector('#next-question-btn').click();
            }
        }
    });
});
// Skor kaydetme ve isim yazma işlevlerini sola taşı
function saveScore(newScore) {
    // Fonksiyon içeriği burada...
}

function showSaveScoreOption(score) {
    // Fonksiyon içeriği burada...
}
document.addEventListener('DOMContentLoaded', function() {
    var startGameButton = document.getElementById('start-game');
    if (startGameButton) {
        startGameButton.addEventListener('click', startGame);
    } else {
        console.log('Start game button not found');
    }
});
function showResult(isWin, playerScore) {
    // Oyun sonucunu gösteren diğer işlemler...
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const finalScore = document.getElementById('final-score');

    // Sonuç mesajını ve skoru ayarla
    resultMessage.textContent = isWin ? "Tebrikler, Kazandınız!" : "Üzgünüz, Kaybettiniz!";
    finalScore.textContent = playerScore;

    // Sonuç ekranını göster
    resultContainer.style.display = 'block';

    // Skor kaydetme seçeneğini gösterme kontrolü
    showSaveScoreOption(playerScore);
}
// Ses dosyalarını tanımla
var dogruCevapSesi = new Audio('sounds/dogruCevapSesi.mp3');
var girisSesi = new Audio('sounds/girisSesi.mp3');
var sonSorudakiDogruCevapSesi = new Audio('sounds/sonSorudakiDogruCevapSesi.mp3');
var soruBaslangicSesi = new Audio('sounds/soruBaslangicSesi.mp3');
var yanlisCevapSesi = new Audio('sounds/yanlisCevapSesi.mp3');

// Ses dosyalarını oynatmak için fonksiyonlar
function playDogruCevapSesi() {
    dogruCevapSesi.play();
}

function playGirisSesi() {
    girisSesi.play();
}

function playSonSorudakiDogruCevapSesi() {
    sonSorudakiDogruCevapSesi.play();
}

function playSoruBaslangicSesi() {
    soruBaslangicSesi.play();
}

function playYanlisCevapSesi() {
    yanlisCevapSesi.play();
}
