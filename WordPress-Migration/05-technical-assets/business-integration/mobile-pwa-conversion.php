<?php
/**
 * Mobile PWA (Progressive Web App) Conversion - Nexus TechHub
 *
 * Service worker implementation, offline functionality, push notifications,
 * add-to-home-screen capability, and background sync for UAE mobile users
 */

// PWA Manager Class
class Nexus_PWA_Manager {

    private $pwa_config;
    private $service_worker_version;
    private $offline_pages;

    public function __construct() {
        $this->service_worker_version = '1.0.0';
        $this->init_pwa_config();
        $this->init_offline_pages();

        add_action('init', array($this, 'init'));
        add_action('wp_head', array($this, 'add_pwa_meta_tags'));
        add_action('wp_head', array($this, 'add_manifest_link'));
        add_action('wp_footer', array($this, 'register_service_worker'));
        add_action('template_redirect', array($this, 'serve_manifest'));
        add_action('template_redirect', array($this, 'serve_service_worker'));
        add_action('wp_ajax_pwa_install_prompt', array($this, 'handle_install_prompt'));
        add_action('wp_ajax_nopriv_pwa_install_prompt', array($this, 'handle_install_prompt'));
    }

    public function init() {
        // Add PWA rewrite rules
        add_rewrite_rule('^manifest\.json$', 'index.php?nexus_pwa=manifest', 'top');
        add_rewrite_rule('^sw\.js$', 'index.php?nexus_pwa=service_worker', 'top');
        add_rewrite_rule('^offline\.html$', 'index.php?nexus_pwa=offline', 'top');

        // Add query vars
        add_filter('query_vars', array($this, 'add_query_vars'));

        // Flush rewrite rules if needed
        if (get_option('nexus_pwa_rewrite_rules_flushed') !== $this->service_worker_version) {
            flush_rewrite_rules();
            update_option('nexus_pwa_rewrite_rules_flushed', $this->service_worker_version);
        }

        // Create offline content cache
        $this->create_offline_cache();
    }

    // Initialize PWA configuration
    private function init_pwa_config() {
        $this->pwa_config = array(
            'name' => 'Nexus TechHub - UAE Mobile Repair Parts',
            'short_name' => 'NexusTH',
            'description' => 'UAE\'s Premier Mobile Repair Parts Supplier - Quality iPhone, Samsung, and iPad components',
            'start_url' => '/',
            'display' => 'standalone',
            'orientation' => 'portrait-primary',
            'theme_color' => '#10b981',
            'background_color' => '#ffffff',
            'categories' => array('shopping', 'business', 'productivity'),
            'lang' => 'en-AE',
            'dir' => 'ltr',
            'scope' => '/',
            'icons' => array(
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-72x72.png',
                    'sizes' => '72x72',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-96x96.png',
                    'sizes' => '96x96',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-128x128.png',
                    'sizes' => '128x128',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-144x144.png',
                    'sizes' => '144x144',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-152x152.png',
                    'sizes' => '152x152',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-192x192.png',
                    'sizes' => '192x192',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-384x384.png',
                    'sizes' => '384x384',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/icon-512x512.png',
                    'sizes' => '512x512',
                    'type' => 'image/png',
                    'purpose' => 'maskable any'
                )
            ),
            'screenshots' => array(
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/screenshot-mobile.png',
                    'sizes' => '375x812',
                    'type' => 'image/png',
                    'form_factor' => 'narrow'
                ),
                array(
                    'src' => get_template_directory_uri() . '/assets/images/pwa/screenshot-desktop.png',
                    'sizes' => '1280x720',
                    'type' => 'image/png',
                    'form_factor' => 'wide'
                )
            ),
            'shortcuts' => array(
                array(
                    'name' => 'iPhone Parts',
                    'short_name' => 'iPhone',
                    'description' => 'Browse iPhone repair parts',
                    'url' => '/product-category/iphone-parts/',
                    'icons' => array(
                        array(
                            'src' => get_template_directory_uri() . '/assets/images/pwa/shortcut-iphone.png',
                            'sizes' => '96x96'
                        )
                    )
                ),
                array(
                    'name' => 'Samsung Parts',
                    'short_name' => 'Samsung',
                    'description' => 'Browse Samsung repair parts',
                    'url' => '/product-category/samsung-parts/',
                    'icons' => array(
                        array(
                            'src' => get_template_directory_uri() . '/assets/images/pwa/shortcut-samsung.png',
                            'sizes' => '96x96'
                        )
                    )
                ),
                array(
                    'name' => 'WhatsApp Support',
                    'short_name' => 'Support',
                    'description' => 'Contact via WhatsApp',
                    'url' => 'https://wa.me/971585531029',
                    'icons' => array(
                        array(
                            'src' => get_template_directory_uri() . '/assets/images/pwa/shortcut-whatsapp.png',
                            'sizes' => '96x96'
                        )
                    )
                )
            )
        );
    }

    // Initialize offline pages
    private function init_offline_pages() {
        $this->offline_pages = array(
            'essential' => array(
                '/',
                '/shop/',
                '/product-category/iphone-parts/',
                '/product-category/samsung-parts/',
                '/product-category/ipad-parts/',
                '/my-account/',
                '/contact/'
            ),
            'products' => array(
                // Top 20 most viewed products will be cached dynamically
            ),
            'assets' => array(
                get_template_directory_uri() . '/style.css',
                get_template_directory_uri() . '/assets/css/nexus-main.css',
                get_template_directory_uri() . '/assets/js/nexus-main.js',
                get_template_directory_uri() . '/assets/images/nexus-logo.png'
            )
        );
    }

    // Add PWA meta tags
    public function add_pwa_meta_tags() {
        ?>
        <!-- PWA Meta Tags -->
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="<?php echo esc_attr($this->pwa_config['short_name']); ?>">
        <meta name="application-name" content="<?php echo esc_attr($this->pwa_config['short_name']); ?>">
        <meta name="theme-color" content="<?php echo esc_attr($this->pwa_config['theme_color']); ?>">
        <meta name="msapplication-TileColor" content="<?php echo esc_attr($this->pwa_config['theme_color']); ?>">
        <meta name="msapplication-navbutton-color" content="<?php echo esc_attr($this->pwa_config['theme_color']); ?>">

        <!-- Apple Touch Icons -->
        <link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_template_directory_uri(); ?>/assets/images/pwa/icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/assets/images/pwa/icon-180x180.png">

        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/assets/images/pwa/icon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/assets/images/pwa/icon-16x16.png">

        <!-- Apple Splash Screens -->
        <link rel="apple-touch-startup-image" href="<?php echo get_template_directory_uri(); ?>/assets/images/pwa/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)">
        <link rel="apple-touch-startup-image" href="<?php echo get_template_directory_uri(); ?>/assets/images/pwa/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)">
        <link rel="apple-touch-startup-image" href="<?php echo get_template_directory_uri(); ?>/assets/images/pwa/splash-1242x2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)">

        <!-- PWA Install Banner Styles -->
        <style>
        .pwa-install-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
            color: white;
            padding: 15px 20px;
            display: none;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
        }

        .pwa-install-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
        }

        .pwa-install-text {
            flex: 1;
        }

        .pwa-install-title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .pwa-install-description {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .pwa-install-actions {
            display: flex;
            gap: 10px;
            margin-left: 20px;
        }

        .pwa-install-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background 0.2s;
        }

        .pwa-install-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .pwa-install-btn.primary {
            background: white;
            color: #10b981;
            font-weight: bold;
        }

        .pwa-install-btn.primary:hover {
            background: #f9fafb;
        }

        @media (max-width: 768px) {
            .pwa-install-content {
                flex-direction: column;
                gap: 15px;
            }

            .pwa-install-actions {
                margin-left: 0;
                width: 100%;
            }

            .pwa-install-btn {
                flex: 1;
                text-align: center;
            }
        }
        </style>
        <?php
    }

    // Add manifest link
    public function add_manifest_link() {
        echo '<link rel="manifest" href="' . home_url('/manifest.json') . '">' . "\n";
    }

    // Register service worker
    public function register_service_worker() {
        ?>
        <script>
        // PWA Service Worker Registration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                }).then(function(registration) {
                    console.log('Nexus TechHub PWA: Service Worker registered successfully');

                    // Check for updates
                    registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content available, show update notification
                                showUpdateNotification();
                            }
                        });
                    });
                }).catch(function(error) {
                    console.log('Nexus TechHub PWA: Service Worker registration failed');
                });
            });
        }

        // PWA Install Prompt
        let deferredPrompt;
        let installBannerShown = false;

        window.addEventListener('beforeinstallprompt', function(e) {
            e.preventDefault();
            deferredPrompt = e;

            // Show custom install banner after 30 seconds
            setTimeout(function() {
                if (!installBannerShown && !localStorage.getItem('pwa-install-dismissed')) {
                    showInstallBanner();
                }
            }, 30000);
        });

        function showInstallBanner() {
            installBannerShown = true;

            const banner = document.createElement('div');
            banner.className = 'pwa-install-banner';
            banner.innerHTML = `
                <div class="pwa-install-content">
                    <div class="pwa-install-text">
                        <div class="pwa-install-title">Install Nexus TechHub App</div>
                        <div class="pwa-install-description">Get faster access to UAE mobile repair parts</div>
                    </div>
                    <div class="pwa-install-actions">
                        <button class="pwa-install-btn primary" onclick="installPWA()">Install</button>
                        <button class="pwa-install-btn" onclick="dismissInstallBanner()">Not Now</button>
                    </div>
                </div>
            `;

            document.body.appendChild(banner);
            banner.style.display = 'block';

            // Auto-hide after 10 seconds
            setTimeout(function() {
                if (banner.parentNode) {
                    dismissInstallBanner();
                }
            }, 10000);
        }

        function installPWA() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(function(choiceResult) {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('Nexus TechHub PWA: User accepted the install prompt');
                        // Track installation
                        gtag('event', 'pwa_install', {
                            'event_category': 'PWA',
                            'event_label': 'User Installed App'
                        });
                    }
                    deferredPrompt = null;
                });
            }
            dismissInstallBanner();
        }

        function dismissInstallBanner() {
            const banner = document.querySelector('.pwa-install-banner');
            if (banner) {
                banner.remove();
            }
            localStorage.setItem('pwa-install-dismissed', 'true');
        }

        function showUpdateNotification() {
            // Show update notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 15px 20px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 300px;
            `;
            notification.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">Update Available</div>
                <div style="font-size: 0.9rem; margin-bottom: 10px;">A new version of Nexus TechHub is available</div>
                <button onclick="updatePWA()" style="background: white; color: #10b981; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-weight: bold;">Update Now</button>
                <button onclick="this.parentNode.remove()" style="background: transparent; color: white; border: 1px solid white; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 5px;">Later</button>
            `;

            document.body.appendChild(notification);

            // Auto-remove after 10 seconds
            setTimeout(function() {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 10000);
        }

        function updatePWA() {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({action: 'skipWaiting'});
                window.location.reload();
            }
        }

        // PWA Analytics Tracking
        window.addEventListener('appinstalled', function(evt) {
            console.log('Nexus TechHub PWA: App was installed');
            gtag('event', 'pwa_installed', {
                'event_category': 'PWA',
                'event_label': 'App Installed Successfully'
            });
        });

        // Track PWA usage
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
            gtag('event', 'pwa_usage', {
                'event_category': 'PWA',
                'event_label': 'App Opened in Standalone Mode'
            });
        }

        // Background Sync for Orders (when online)
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            // Register background sync for pending orders
            navigator.serviceWorker.ready.then(function(registration) {
                return registration.sync.register('nexus-order-sync');
            }).catch(function(error) {
                console.log('Background sync registration failed');
            });
        }

        // Push Notifications Setup
        if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
            // Request notification permission after user interaction
            document.addEventListener('click', function() {
                if (Notification.permission === 'default') {
                    requestNotificationPermission();
                }
            }, { once: true });
        }

        function requestNotificationPermission() {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    console.log('Nexus TechHub PWA: Notification permission granted');
                    subscribeUserToPush();
                }
            });
        }

        function subscribeUserToPush() {
            navigator.serviceWorker.ready.then(function(registration) {
                const vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY'; // Replace with actual VAPID key

                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });
            }).then(function(subscription) {
                console.log('User is subscribed to push notifications');

                // Send subscription to server
                fetch('/wp-admin/admin-ajax.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'action=save_push_subscription&subscription=' + encodeURIComponent(JSON.stringify(subscription))
                });
            }).catch(function(error) {
                console.log('Failed to subscribe user to push notifications');
            });
        }

        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
        </script>
        <?php
    }