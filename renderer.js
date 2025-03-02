const webview = document.getElementById('browser');
const urlInput = document.getElementById('url');
const backBtn = document.getElementById('back');
const forwardBtn = document.getElementById('forward');
const refreshBtn = document.getElementById('refresh');
const goBtn = document.getElementById('go');
const newTabBtn = document.getElementById('newTab');
const tabsContainer = document.getElementById('tabs');

let history = [];
let currentTabIndex = 0;
let tabs = [{ id: 0, url: "https://www.google.com" }];

function createNewTab(url = "https://www.google.com") {
    let newTabIndex = tabs.length;
    let newTab = document.createElement("div");
    newTab.classList.add("tab");
    newTab.textContent = `Tab ${newTabIndex + 1}`;
    newTab.dataset.index = newTabIndex;
    newTab.addEventListener("click", () => switchTab(newTabIndex));
    tabsContainer.appendChild(newTab);

    tabs.push({ id: newTabIndex, url });
    switchTab(newTabIndex);
}

function switchTab(index) {
    currentTabIndex = index;
    let tabData = tabs[index];
    webview.src = tabData.url;
    urlInput.value = tabData.url;
}

goBtn.addEventListener("click", () => {
    let url = urlInput.value.trim();
    if (!url.startsWith("http")) url = "https://" + url;

    history.push(url);
    tabs[currentTabIndex].url = url;
    webview.src = url;
});

backBtn.addEventListener("click", () => {
    if (webview.canGoBack()) webview.goBack();
});

forwardBtn.addEventListener("click", () => {
    if (webview.canGoForward()) webview.goForward();
});

refreshBtn.addEventListener("click", () => {
    webview.reload();
});

newTabBtn.addEventListener("click", () => {
    createNewTab();
});

webview.addEventListener("did-navigate", (event) => {
    history.push(event.url);
    urlInput.value = event.url;
});

function savePassword(username, password) {
    window.electronAPI.savePassword({ username, password });
}

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "t") createNewTab();
});
