// Authentication System for Nexus Tech Hub
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkSession();
        this.attachEventListeners();
        this.updateUI();
    }

    attachEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(new FormData(loginForm));
            });
        }

        // Registration form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(new FormData(registerForm));
            });
        }

        // Logout buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('logout-btn') || e.target.closest('.logout-btn')) {
                e.preventDefault();
                this.handleLogout();
            }
        });

        // Tab switching
        const tabButtons = document.querySelectorAll('.auth-tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(button.dataset.tab);
            });
        });
    }

    async handleLogin(formData) {
        const submitBtn = document.querySelector('#loginForm button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            formData.append('action', 'login');

            const response = await fetch('login.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.currentUser = result.user;
                this.updateUI();
                this.showNotification(result.message, 'success');

                // Redirect after successful login
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                this.showNotification(result.message, 'error');
            }

        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    async handleRegister(formData) {
        const submitBtn = document.querySelector('#registerForm button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating Account...';

            formData.append('action', 'register');

            const response = await fetch('login.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.currentUser = result.user;
                this.updateUI();
                this.showNotification(result.message, 'success');

                // Redirect after successful registration
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                this.showNotification(result.message, 'error');
            }

        } catch (error) {
            console.error('Registration error:', error);
            this.showNotification('Registration failed. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    async handleLogout() {
        try {
            const response = await fetch('login.php', {
                method: 'POST',
                body: new URLSearchParams({ action: 'logout' })
            });

            const result = await response.json();

            if (result.success) {
                this.currentUser = null;
                this.updateUI();
                this.showNotification(result.message, 'info');

                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }

        } catch (error) {
            console.error('Logout error:', error);
            // Force logout on frontend even if backend fails
            this.currentUser = null;
            this.updateUI();
            window.location.href = 'index.html';
        }
    }

    async checkSession() {
        try {
            const response = await fetch('login.php', {
                method: 'POST',
                body: new URLSearchParams({ action: 'check_session' })
            });

            const result = await response.json();

            if (result.success && result.logged_in) {
                this.currentUser = result.user;
            } else {
                this.currentUser = null;
            }

            this.updateUI();

        } catch (error) {
            console.error('Session check error:', error);
            this.currentUser = null;
            this.updateUI();
        }
    }

    updateUI() {
        const isLoggedIn = this.isLoggedIn();

        // Update navigation links
        const loginLinks = document.querySelectorAll('.login-link');
        const accountLinks = document.querySelectorAll('.account-link');
        const logoutLinks = document.querySelectorAll('.logout-link');

        loginLinks.forEach(link => {
            link.style.display = isLoggedIn ? 'none' : 'block';
        });

        accountLinks.forEach(link => {
            link.style.display = isLoggedIn ? 'block' : 'none';
        });

        logoutLinks.forEach(link => {
            link.style.display = isLoggedIn ? 'block' : 'none';
        });

        // Update user name in navigation
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(element => {
            element.textContent = isLoggedIn ? this.currentUser.name : '';
        });

        // Update account page content
        this.updateAccountPage();

        // Update header icons
        this.updateHeaderIcons();
    }

    updateAccountPage() {
        const loginSection = document.getElementById('loginSection');
        const accountSection = document.getElementById('accountSection');

        if (loginSection && accountSection) {
            if (this.isLoggedIn()) {
                loginSection.style.display = 'none';
                accountSection.style.display = 'block';

                // Update account info
                const userNameDisplay = document.getElementById('userNameDisplay');
                const userEmailDisplay = document.getElementById('userEmailDisplay');
                const userRoleDisplay = document.getElementById('userRoleDisplay');

                if (userNameDisplay) userNameDisplay.textContent = this.currentUser.name;
                if (userEmailDisplay) userEmailDisplay.textContent = this.currentUser.email;
                if (userRoleDisplay) userRoleDisplay.textContent = this.currentUser.role.charAt(0).toUpperCase() + this.currentUser.role.slice(1);

            } else {
                loginSection.style.display = 'block';
                accountSection.style.display = 'none';
            }
        }
    }

    updateHeaderIcons() {
        // Update header to show user name instead of "My Account"
        const accountLink = document.querySelector('.account-link');
        if (accountLink && this.isLoggedIn()) {
            accountLink.innerHTML = `<i class="fas fa-user"></i> ${this.currentUser.name.split(' ')[0]}`;
        }
    }

    switchTab(tabName) {
        // Hide all tabs
        const tabContents = document.querySelectorAll('.auth-tab-content');
        tabContents.forEach(content => content.style.display = 'none');

        // Remove active class from all buttons
        const tabButtons = document.querySelectorAll('.auth-tab-btn');
        tabButtons.forEach(button => button.classList.remove('active'));

        // Show selected tab
        const selectedTab = document.getElementById(tabName + 'Tab');
        const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);

        if (selectedTab) selectedTab.style.display = 'block';
        if (selectedButton) selectedButton.classList.add('active');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#0066cc'
        };
        return colors[type] || colors.info;
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
