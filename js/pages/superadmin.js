/* =========================================================
   PaperFlow ERP — Super Admin Dashboard Page
   ========================================================= */
const SuperAdminPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">SYSTEM_ROOT // SUPER_ADMIN</div>
            <div class="page-header__title cursor-blink">PAPERFLOW_HQ</div>
          </div>
          <div class="icon-box icon-box--primary">
            <span class="material-icons-round">security</span>
          </div>
        </div>

        <!-- System Status -->
        <div class="log-bar" style="margin-bottom:var(--space-md)">
          <span class="status-dot status-dot--green"></span>
          <span>SaaS_ENGINE: ONLINE</span>
          <span style="color:var(--color-divider)">|</span>
          <span>NODES: 128</span>
          <span style="color:var(--color-divider)">|</span>
          <span>VER: 2.4.0</span>
          <span class="log-bar__text" style="margin-left:auto;text-align:right">UPTIME: 99.98%</span>
        </div>

        <!-- Global Metrics -->
        <div class="section-header">
          <span class="section-title">GLOBAL_NETWORK_METRICS</span>
          <button class="btn btn--outline btn--sm" onclick="PF.navigate('analytics')">
            <span class="material-icons-round">analytics</span>VIEW_ALL
          </button>
        </div>
        <div class="stats-grid stats-grid--4" style="margin-bottom:var(--space-lg)">
          ${this._statCard('TOTAL_AGENTS', '142', '+4.2%', 'up', 'group')}
          ${this._statCard('MONTHLY_SaaS', '$8.4k', '+12%', 'up', 'payments')}
          ${this._statCard('ACTIVE_USERS', '3.2k', '-1.5%', 'down', 'people')}
          ${this._statCard('SYSTEM_LOAD', '24%', 'STABLE', 'stable', 'memory')}
        </div>

        <!-- Revenue Chart -->
        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-header">
            <span class="section-title" style="font-size:var(--text-title-medium);font-weight:700;color:var(--color-primary-text)">SaaS_REVENUE_FLOW</span>
            <span style="font-size:var(--text-label-small);color:var(--color-secondary-text)">6M_WINDOW</span>
          </div>
          <div style="height:180px;margin:var(--space-md) 0">
            <canvas id="chart-saas-revenue" style="width:100%;height:180px"
              data-chart="line"
              data-labels="JAN,FEB,MAR,APR,MAY,JUN"
              data-values="4200,5100,4800,6200,7800,8400"></canvas>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:var(--text-label-small)">
            <span style="color:var(--color-secondary-text)">AVG_LTV: $1,240</span>
            <span style="color:var(--color-error)">CHURN: 1.2%</span>
          </div>
        </div>

        <!-- Agent Onboarding List -->
        <div class="section-header">
          <span class="section-title">RECENT_AGENT_ONBOARDING</span>
          <button class="btn btn--ghost btn--sm" onclick="PF.navigate('agent-list')">VIEW_ALL →</button>
        </div>
        <div class="card" style="margin-bottom:var(--space-lg)">
          ${PF_DATA.agents.slice(0,4).map(a => this._agentRow(a)).join('')}
        </div>

        <!-- Core Operations -->
        <div class="section-title" style="margin-bottom:var(--space-sm)">CORE_OPERATIONS</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
          <button class="btn btn--primary btn--lg btn--full" onclick="PF.navigate('agent-onboarding')">
            <span class="material-icons-round">person_add</span>NEW_AGENT
          </button>
          <button class="btn btn--outline btn--lg btn--full" onclick="PF.navigate('billing')">
            <span class="material-icons-round">payments</span>BILLING_GEN
          </button>
        </div>

        <!-- Distribution Donut -->
        <div class="two-col" style="margin-bottom:var(--space-lg)">
          <div class="card">
            <div class="section-title" style="margin-bottom:var(--space-sm)">COPY_DISTRIBUTION</div>
            <div style="height:160px">
              <canvas id="chart-distribution" style="width:100%;height:160px"></canvas>
            </div>
            <div class="chart-legend">
              ${['TOI','HT','TH','ET'].map((l,i)=>`<div class="chart-legend__item"><div class="chart-legend__dot" style="background:${['#8CFF00','#30D158','#FFD60A','#64B5F6'][i]}"></div>${l}</div>`).join('')}
            </div>
          </div>
          <div class="card">
            <div class="section-title" style="margin-bottom:var(--space-sm)">SUPPORT_TICKETS</div>
            ${PF_DATA.tickets.slice(0,3).map(t => `
              <div class="ticket-row" onclick="PF.navigate('support')">
                <span class="ticket-row__id">${t.id}</span>
                <span class="ticket-row__title">${t.title}</span>
                <span class="badge badge--${t.priority==='HIGH'?'error':t.priority==='MEDIUM'?'warning':'neutral'}">${t.priority}</span>
              </div>
            `).join('')}
            <button class="btn btn--ghost btn--sm" style="margin-top:var(--space-sm)" onclick="PF.navigate('support')">VIEW ALL TICKETS →</button>
          </div>
        </div>

        <!-- System Log -->
        <div class="log-bar">
          <span class="material-icons-round">terminal</span>
          <span class="log-bar__text">LOG: 08:14:55 - Subscription payment verified for Agent_ID_882 | Status: CONFIRMED | Plan: Enterprise</span>
        </div>
      </div>`;
  },

  _statCard(label, value, change, trend, icon) {
    const cls = trend === 'up' ? 'stat-card__change--up' : trend === 'down' ? 'stat-card__change--down' : 'stat-card__change--stable';
    const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
    return `
      <div class="stat-card hover-lift">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span class="stat-card__label">${label}</span>
          <span class="material-icons-round" style="font-size:16px;color:var(--color-secondary-text)">${icon}</span>
        </div>
        <div class="stat-card__value counter">${value}</div>
        <div class="stat-card__change ${cls}">${arrow} ${change}</div>
      </div>`;
  },

  _agentRow(a) {
    const statusBadge = a.status === 'ACTIVE' ? 'badge--success' : a.status === 'PENDING' ? 'badge--warning' : 'badge--error';
    return `
      <div class="agent-row">
        <div class="avatar">${a.initials}</div>
        <div class="agent-row__info">
          <div class="agent-row__name">${a.name}</div>
          <div class="agent-row__meta">${a.plan} · Due: ${a.due}</div>
        </div>
        <span class="badge ${statusBadge}">${a.status}</span>
        <span class="agent-row__revenue">$${a.revenue}</span>
      </div>`;
  },

  afterRender() {
    const revenueCanvas = document.getElementById('chart-saas-revenue');
    if (revenueCanvas) {
      PF_Charts.drawLineChart(revenueCanvas, PF_DATA.revenueChart.labels, PF_DATA.revenueChart.data, { filled: true });
    }
    const distCanvas = document.getElementById('chart-distribution');
    if (distCanvas) {
      PF_Charts.drawDonutChart(distCanvas, ['TOI','HT','TH','ET'], [85,60,45,90], ['#8CFF00','#30D158','#FFD60A','#64B5F6']);
    }
  }
};
