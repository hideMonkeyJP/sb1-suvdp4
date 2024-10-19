// CSVデータをJavaScriptオブジェクトに変換
const gameData = [
    {
        date: "4月1日",
        scene: "入学式",
        character: "佐藤美咲",
        dialogue: "ねえねえ、あなたも新入生？私は佐藤美咲よ。よろしくね！",
        choices: [
            { text: "こちらこそ、よろしく！僕はHARUKIだ。", affection: 5 },
            { text: "あ、はい...HARUKIです。", affection: 2 }
        ]
    },
    {
        date: "4月15日",
        scene: "図書館",
        character: "山田太郎",
        dialogue: "あ、HARUKIくんだよね。一緒に勉強してもいい？",
        choices: [
            { text: "もちろん！一緒に頑張ろう", affection: 5 },
            { text: "ごめん、今は集中したいんだ...", affection: -3 }
        ]
    },
    {
        date: "5月1日",
        scene: "公園",
        character: "鈴木花子",
        dialogue: "おはよう、HARUKI！良い天気だね。一緒に走る？",
        choices: [
            { text: "いいね！一緒に走ろう", affection: 7 },
            { text: "ごめん、今日はペースを上げたいんだ", affection: -2 }
        ]
    }
];

let currentScene = 0;
const affection = {
    "佐藤美咲": 0,
    "山田太郎": 0,
    "鈴木花子": 0
};

function updateScene() {
    const scene = gameData[currentScene];
    document.getElementById("date").textContent = scene.date;
    document.getElementById("scene-description").textContent = scene.scene;
    document.getElementById("character-dialogue").textContent = `${scene.character}: ${scene.dialogue}`;
    document.getElementById("choice1").textContent = scene.choices[0].text;
    document.getElementById("choice2").textContent = scene.choices[1].text;
    
    // HARUKIの画像を表示
    const harukiImage = document.getElementById("haruki-image");
    if (harukiImage) {
        harukiImage.style.display = "block";
    }
}

function updateAffection() {
    document.getElementById("misaki-affection").textContent = affection["佐藤美咲"];
    document.getElementById("taro-affection").textContent = affection["山田太郎"];
    document.getElementById("hanako-affection").textContent = affection["鈴木花子"];
}

function makeChoice(choiceIndex) {
    const scene = gameData[currentScene];
    affection[scene.character] += scene.choices[choiceIndex].affection;
    currentScene++;

    if (currentScene < gameData.length) {
        updateScene();
        updateAffection();
    } else {
        endGame();
    }
}

function endGame() {
    const sceneContainer = document.getElementById("scene-container");
    const choicesContainer = document.getElementById("choices-container");
    const harukiImage = document.getElementById("haruki-image");

    if (sceneContainer) {
        sceneContainer.innerHTML = "<h2>ゲーム終了</h2><p>HARUKIの高校生活は終わりました。</p>";
    }

    if (choicesContainer) {
        choicesContainer.style.display = "none";
    }

    if (harukiImage) {
        harukiImage.style.display = "none";
    }
}

function safeGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id "${id}" not found`);
    }
    return element;
}

export function setupGame() {
    const choice1 = safeGetElement("choice1");
    const choice2 = safeGetElement("choice2");

    if (choice1) {
        choice1.addEventListener("click", () => makeChoice(0));
    }

    if (choice2) {
        choice2.addEventListener("click", () => makeChoice(1));
    }

    updateScene();
    updateAffection();
}