// AftOS Performance and Privacy Extension

// Initialize the Extension
window.addEventListener('load', () => {
    initPFBG();
    console.log('PFBG ⚙️ Extension Loaded.');
});

// PFBG Menu Creation
function initPFBG() {
    const pfbgBtn = document.createElement('button');
    pfbgBtn.textContent = 'PFBG ⚙️';
    pfbgBtn.classList.add('pfbg-btn');
    pfbgBtn.addEventListener('click', openPFBGMenu);
    document.body.appendChild(pfbgBtn);

    const pfbgMenu = document.createElement('div');
    pfbgMenu.classList.add('pfbg-menu', 'hidden');
    pfbgMenu.innerHTML = `
        <h2>PFBG ⚙️ Settings</h2>
        <div>
            <h3>Privacy</h3>
            <label>
                <input type="checkbox" id="privacy-mode"> Strict Privacy Mode
            </label>
        </div>
        <div>
            <h3>FPS Boost</h3>
            <button id="remove-app">Remove App</button>
            <button id="restore-app">Restore App</button>
        </div>
        <div>
            <h3>Browser Start Site</h3>
            <input type="text" id="start-site" placeholder="Enter start site URL" />
            <button id="save-start-site">Save</button>
        </div>
        <div>
            <h3>GitHub Forking</h3>
            <input type="text" id="github-link" placeholder="Paste GitHub URL" />
            <button id="fork-app">Fork App</button>
        </div>
        <button onclick="this.parentElement.classList.add('hidden')">Close</button>
    `;
    document.body.appendChild(pfbgMenu);

    // Load Saved Settings
    document.getElementById('privacy-mode').checked = localStorage.getItem('privacy') === 'true';
    document.getElementById('start-site').value = localStorage.getItem('start-site') || '';

    // Event Listeners
    document.getElementById('privacy-mode').addEventListener('change', (e) => {
        localStorage.setItem('privacy', e.target.checked);
        alert('Privacy Mode ' + (e.target.checked ? 'Enabled' : 'Disabled'));
    });

    document.getElementById('save-start-site').addEventListener('click', () => {
        const site = document.getElementById('start-site').value;
        if (site.startsWith('http')) {
            localStorage.setItem('start-site', site);
            alert('Start Site Updated');
        } else {
            alert('Invalid URL');
        }
    });

    const apps = Array.from(document.querySelectorAll('.app'));
    let removedApps = [];

    document.getElementById('remove-app').addEventListener('click', () => {
        if (removedApps.length < 2 && apps.length > 0) {
            const app = apps.pop();
            app.style.display = 'none';
            removedApps.push(app);
            alert('App Removed');
        } else {
            alert('Max 2 apps can be removed');
        }
    });

    document.getElementById('restore-app').addEventListener('click', () => {
        if (removedApps.length > 0) {
            const app = removedApps.pop();
            app.style.display = 'block';
            apps.push(app);
            alert('App Restored');
        } else {
            alert('No apps to restore');
        }
    });

    document.getElementById('fork-app').addEventListener('click', () => {
        const link = document.getElementById('github-link').value;
        if (link.startsWith('https://github.com/')) {
            const iframe = document.createElement('iframe');
            iframe.src = link.replace('github.com', 'raw.githack.com').replace('/blob/', '/');
            iframe.classList.add('app');
            document.body.appendChild(iframe);
            alert('App Forked');
        } else {
            alert('Invalid GitHub URL');
        }
    });

    pfbgBtn.addEventListener('click', () => {
        pfbgMenu.classList.toggle('hidden');
    });
}
