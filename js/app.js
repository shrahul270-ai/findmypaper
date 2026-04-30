/* =========================================================
   PaperFlow ERP — Main Application Core
   ========================================================= */

const PF = {
  currentRole: 'superadmin',
  currentPage: null,
  
  // Toast Notification System
  showToast(message, type = 'neutral') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3s
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // Router
  navigate(pageId) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    // Add active class to corresponding nav item
    const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (navItem) navItem.classList.add('active');

    // Default routes mapping
    const ROUTES = {
      // Super Admin
      'superadmin-dashboard': typeof SuperAdminPage !== 'undefined' ? SuperAdminPage : null,
      'agent-onboarding': typeof AgentOnboardingPage !== 'undefined' ? AgentOnboardingPage : null,
      'agent-list': typeof AgentListPage !== 'undefined' ? AgentListPage : null,
      'billing': typeof BillingPage !== 'undefined' ? BillingPage : null,
      'analytics': typeof AnalyticsPage !== 'undefined' ? AnalyticsPage : this._fallbackPage('Analytics', 'analytics'),
      'support': typeof SupportPage !== 'undefined' ? SupportPage : this._fallbackPage('Support Tickets', 'support_agent'),

      // Agent
      'agent-dashboard': typeof AgentDashboardPage !== 'undefined' ? AgentDashboardPage : null,
      'hawker-management': typeof HawkerManagementPage !== 'undefined' ? HawkerManagementPage : null,
      'customers': typeof CustomersPage !== 'undefined' ? CustomersPage : this._fallbackPage('Customers', 'people'),
      'inventory': typeof InventoryPage !== 'undefined' ? InventoryPage : this._fallbackPage('Inventory', 'inventory_2'),
      'reports': typeof ReportsPage !== 'undefined' ? ReportsPage : this._fallbackPage('Reports', 'bar_chart'),
      'billing-agent': typeof BillingAgentPage !== 'undefined' ? BillingAgentPage : this._fallbackPage('Billing', 'receipt_long'),

      // Hawker
      'hawker-home': typeof HawkerHomePage !== 'undefined' ? HawkerHomePage : null,
      'hawker-delivery': typeof HawkerDeliveryPage !== 'undefined' ? HawkerDeliveryPage : null,
      'hawker-collection': typeof HawkerCollectionPage !== 'undefined' ? HawkerCollectionPage : this._fallbackPage('Cash Collection', 'payments'),

      // Customer
      'customer-portal': typeof CustomerPortalPage !== 'undefined' ? CustomerPortalPage : null,
      'customer-bills': typeof CustomerBillsPage !== 'undefined' ? CustomerBillsPage : null,
      'customer-calendar': typeof CustomerPortalPage !== 'undefined' ? CustomerPortalPage : null
    };

    const component = ROUTES[pageId];
    if (component) {
      this.currentPage = pageId;
      mainContent.innerHTML = component.render();
      if (typeof component.afterRender === 'function') {
        setTimeout(() => component.afterRender(), 50); // slight delay to ensure DOM is updated
      }
    } else {
      mainContent.innerHTML = `<div class="page"><div class="section-title">Page not found: ${pageId}</div></div>`;
    }

    // Close sidebar on mobile after navigation
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  },

  _fallbackPage(title, icon) {
    return {
      render() {
        return `
          <div class="page stagger">
            <div class="page-header animate-in">
              <div class="page-header__info">
                <div class="page-header__label">MODULE_IN_DEVELOPMENT</div>
                <div class="page-header__title">${title}</div>
              </div>
              <div class="icon-box icon-box--primary">
                <span class="material-icons-round">${icon}</span>
              </div>
            </div>
            <div class="card" style="text-align:center;padding:var(--space-xl)">
              <span class="material-icons-round" style="font-size:48px;color:var(--color-secondary-text);margin-bottom:var(--space-md)">construction</span>
              <div class="section-title">COMING_SOON</div>
              <p style="color:var(--color-secondary-text);margin-top:var(--space-sm)">This module is currently being built by the engineering team.</p>
            </div>
          </div>
        `;
      },
      afterRender() {}
    };
  },

  login(role) {
    this.currentRole = role;
    
    document.getElementById('screen-login').classList.remove('active');
    document.getElementById('screen-login').classList.add('hidden');
    
    const appScreen = document.getElementById('screen-app');
    appScreen.classList.remove('hidden');
    appScreen.classList.add('active');

    // Update Role Badge
    const roleMap = {
      'superadmin': { label: 'SUPER_ADMIN', icon: 'shield' },
      'agent': { label: 'AGENT', icon: 'store' },
      'hawker': { label: 'HAWKER', icon: 'directions_bike' },
      'customer': { label: 'CUSTOMER', icon: 'person' }
    };
    document.getElementById('sidebar-role-label').textContent = roleMap[role].label;
    document.getElementById('sidebar-role-badge').querySelector('.material-icons-round').textContent = roleMap[role].icon;

    // Show corresponding nav
    ['superadmin', 'agent', 'hawker', 'customer'].forEach(r => {
      document.getElementById(`nav-${r}`).classList.add('hidden');
    });
    document.getElementById(`nav-${role}`).classList.remove('hidden');

    // Navigate to default page
    const defaultPages = {
      'superadmin': 'superadmin-dashboard',
      'agent': 'agent-dashboard',
      'hawker': 'hawker-home',
      'customer': 'customer-portal'
    };
    this.navigate(defaultPages[role]);

    this.showToast(`Logged in as ${roleMap[role].label}`, 'success');
  },

  logout() {
    document.getElementById('screen-app').classList.remove('active');
    document.getElementById('screen-app').classList.add('hidden');
    
    const loginScreen = document.getElementById('screen-login');
    loginScreen.classList.remove('hidden');
    loginScreen.classList.add('active');
  }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Add toast styles if missing
  const style = document.createElement('style');
  style.textContent = `
    .toast { position: fixed; bottom: var(--space-md); right: var(--space-md); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); background: var(--color-surface-2); color: var(--color-primary-text); font-family: var(--font-mono); font-size: var(--text-label-small); box-shadow: 0 8px 24px rgba(0,0,0,0.5); border: 1px solid var(--color-divider); z-index: 1000; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); opacity: 0; transform: translateY(20px); pointer-events: none; }
    .toast--success { border-color: var(--color-success); color: var(--color-success); }
    .toast--error { border-color: var(--color-error); color: var(--color-error); }
    .toast--warning { border-color: var(--color-warning); color: var(--color-warning); }
  `;
  document.head.appendChild(style);

  // Login role selection
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // Login button
  document.getElementById('btn-login').addEventListener('click', () => {
    const activeRole = document.querySelector('.role-btn.active').dataset.role;
    PF.login(activeRole);
  });

  // Logout button
  document.getElementById('btn-logout').addEventListener('click', () => {
    PF.logout();
  });

  // Sidebar toggle for mobile
  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Nav Links setup
  document.querySelectorAll('.nav-item[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      PF.navigate(e.currentTarget.dataset.page);
    });
  });
});
