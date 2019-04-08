
let cancelled = false;

export const setupServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function () { console.log('Service Worker Registered'); })
      .catch((err) => console.log('error registering service worker', err))
  }
}

export const setupInstall = () => {
  const cancelled = localStorage.getItem('installPromptCancelled') || false;
  if (!cancelled) {
    let installPromptEvent;
    window.addEventListener('beforeinstallprompt', e => {
      installPromptEvent = e;
      document.querySelector("#install-prompt").classList.toggle('is-hidden');
    });

    document.querySelector("#install-prompt-button").addEventListener('click', () => {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          document.querySelector("#install-prompt").classList.toggle('is-hidden');
          console.log('Adding To Home Screen');
        } else {
          document.querySelector("#install-prompt").classList.toggle('is-hidden');
          localStorage.setItem('installPromptCancelled', true);
        }
        installPromptEvent = null;
        document.querySelector("#install-prompt").classList.toggle('is-hidden');
      });
    });
  }
};
