// Enhanced PWA Manager for Nexus TechHub - Mobile-First UAE Market
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import styles from './EnhancedPWAManager.module.css';

export default function EnhancedPWAManager() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [offlineData, setOfflineData] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle');

  // Enhanced service worker registration with update detection
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', registration.scope);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
                toast.info('App update available! Refresh to get the latest version.');
              }
            });
          });

          // Register for background sync
          if ('sync' in registration) {
            await registration.sync.register('background-sync');
          }

          // Register for periodic sync (24 hours)
          if ('periodicSync' in registration) {
            const status = await navigator.permissions.query({
              name: 'periodic-background-sync',
            });

            if (status.state === 'granted') {
              await registration.periodicSync.register('daily-sync', {
                minInterval: 24 * 60 * 60 * 1000,
              });
            }
          }

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      });
    }
  }, []);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      toast.success('Back online! Syncing data...');
      
      // Trigger background sync when coming back online
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then(registration => {
          return registration.sync.register('background-sync');
        });
      }
      
      setTimeout(() => setSyncStatus('idle'), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('You are offline. Some features may be limited.');
      loadOfflineData();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load offline data from IndexedDB
  const loadOfflineData = useCallback(async () => {
    try {
      if ('indexedDB' in window) {
        // In a real app, you would use a library like Dexie.js
        // For demo, we'll simulate offline data
        const mockOfflineData = {
          products: [
            {
              id: 1,
              name: 'iPhone 14 Pro Max LCD Screen',
              price: 299.99,
              image: '/images/products/iphone-14-pro-max-lcd.jpg',
              inStock: true
            },
            {
              id: 2,
              name: 'Samsung Galaxy S23 Battery',
              price: 89.99,
              image: '/images/products/samsung-s23-battery.jpg',
              inStock: true
            }
          ],
          categories: ['iPhone Parts', 'Samsung Parts', 'iPad Parts', 'Repair Tools'],
          lastSync: new Date().toISOString()
        };
        
        setOfflineData(mockOfflineData);
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  }, []);

  // PWA install prompt handling
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone ||
                         document.referrer.includes('android-app://');

    setIsInstalled(isStandalone);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);

      const lastDismissed = localStorage.getItem('pwaInstallDismissed');
      const showAgain = !lastDismissed ||
                        (Date.now() - parseInt(lastDismissed)) > (7 * 24 * 60 * 60 * 1000);

      if (!isStandalone && showAgain) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      toast.success('Nexus TechHub app installed successfully!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Notification permission handling
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);

      if (Notification.permission === 'default' && 
          !localStorage.getItem('notificationPromptDismissed')) {
        const timer = setTimeout(() => {
          setShowNotificationPrompt(true);
        }, 10000); // Show after 10 seconds

        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Handle app install
  const handleInstall = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const choiceResult = await installPrompt.userChoice;
    
    setInstallPrompt(null);
    setShowInstallBanner(false);

    if (choiceResult.outcome === 'accepted') {
      toast.success('Installing Nexus TechHub app...');
    }
  };

  // Handle install dismissal
  const handleDismissInstall = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwaInstallDismissed', Date.now().toString());
  };

  // Handle notification permission
  const handleEnableNotifications = async () => {
    if (!('Notification' in window)) {
      toast.error('Notifications not supported in this browser');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      setShowNotificationPrompt(false);

      if (permission === 'granted') {
        // Subscribe to push notifications
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          
          // In production, you would use your VAPID keys
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'demo-key'
            )
          });

          // Send subscription to server
          await fetch('/api/notifications/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
          });

          // Show welcome notification
          setTimeout(() => {
            new Notification('Welcome to Nexus TechHub!', {
              body: 'You will receive updates about orders, repairs, and special offers.',
              icon: '/icons/icon-192x192.svg',
              badge: '/icons/badge-72x72.svg',
              tag: 'welcome',
              requireInteraction: false
            });
          }, 1000);

          toast.success('Notifications enabled successfully!');
        }
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast.error('Failed to enable notifications');
    }
  };

  // Handle notification dismissal
  const handleDismissNotifications = () => {
    setShowNotificationPrompt(false);
    localStorage.setItem('notificationPromptDismissed', 'true');
  };

  // Handle app update
  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  };

  // Helper function for VAPID key conversion
  const urlBase64ToUint8Array = (base64String) => {
    if (!base64String) return new Uint8Array();

    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  return (
    <>
      {/* Connection Status */}
      <div className={`${styles.connectionStatus} ${isOnline ? styles.online : styles.offline}`}>
        <span className={styles.statusIcon}>
          {isOnline ? '🟢' : '🔴'}
        </span>
        <span className={styles.statusText}>
          {isOnline ? 'Online' : 'Offline Mode'}
        </span>
        {syncStatus === 'syncing' && (
          <span className={styles.syncIndicator}>⚡ Syncing...</span>
        )}
      </div>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className={styles.installBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerIcon}>
              <img src="/icons/icon-192x192.svg" alt="Nexus TechHub" />
            </div>
            <div className={styles.bannerText}>
              <h3>Install Nexus TechHub App</h3>
              <p>Get faster access and offline browsing</p>
              <ul className={styles.benefits}>
                <li>✅ Offline product browsing</li>
                <li>✅ Push notifications for orders</li>
                <li>✅ Faster loading times</li>
                <li>✅ Home screen access</li>
              </ul>
            </div>
          </div>
          <div className={styles.bannerActions}>
            <button className={styles.installBtn} onClick={handleInstall}>
              Install App
            </button>
            <button className={styles.dismissBtn} onClick={handleDismissInstall}>
              Not Now
            </button>
          </div>
        </div>
      )}

      {/* Notification Permission Prompt */}
      {showNotificationPrompt && notificationPermission === 'default' && (
        <div className={styles.notificationPrompt}>
          <div className={styles.promptContent}>
            <div className={styles.promptIcon}>🔔</div>
            <div className={styles.promptText}>
              <h3>Stay Updated</h3>
              <p>Get notifications for order updates, repair status, and exclusive offers</p>
            </div>
          </div>
          <div className={styles.promptActions}>
            <button className={styles.enableBtn} onClick={handleEnableNotifications}>
              Enable Notifications
            </button>
            <button className={styles.dismissBtn} onClick={handleDismissNotifications}>
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* App Update Available */}
      {updateAvailable && (
        <div className={styles.updateBanner}>
          <div className={styles.updateContent}>
            <span className={styles.updateIcon}>🔄</span>
            <div className={styles.updateText}>
              <strong>Update Available</strong>
              <p>A new version of Nexus TechHub is ready</p>
            </div>
          </div>
          <button className={styles.updateBtn} onClick={handleUpdate}>
            Update Now
          </button>
        </div>
      )}

      {/* Offline Data Indicator */}
      {!isOnline && offlineData && (
        <div className={styles.offlineIndicator}>
          <span className={styles.offlineIcon}>📱</span>
          <div className={styles.offlineText}>
            <strong>Offline Mode Active</strong>
            <p>Browsing {offlineData.products?.length} cached products</p>
            <small>Last synced: {new Date(offlineData.lastSync).toLocaleString()}</small>
          </div>
        </div>
      )}
    </>
  );
}
