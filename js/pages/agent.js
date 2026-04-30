/* =========================================================
   PaperFlow ERP — Agent Pages
   ========================================================= */

/* ---- AGENT DASHBOARD ---- */
const AgentDashboardPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">SECTOR 07 // MORNING SUMMARY</div>
            <div class="page-header__title">PAPERFLOW ERP</div>
          </div>
          <div class="icon-box icon-box--primary">
            <span class="material-icons-round">sensors</span>
          </div>
        </div>

        <!-- Status Bar -->
        <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-lg);padding-bottom:var(--space-sm);border-bottom:1px solid var(--color-divider)">
          <span class="badge badge--success"><span class="status-dot status-dot--green" style="margin-right:4px"></span>LIVE_FEED: ACTIVE</span>
          <span class="badge badge--neutral">UPTIME: 99.9%</span>
          <span class="badge badge--primary">SYNC: STABLE</span>
        </div>

        <!-- Distribution Metrics -->
        <div class="section-header"><span class="section-title">DISTRIBUTION_METRICS</span></div>
        <div class="stats-grid stats-grid--4" style="margin-bottom:var(--space-lg)">
          ${this._metric('TOTAL_COPIES', '4,820', 'PCS', '+12%', 'up')}
          ${this._metric('DELIVERY_RATE', '94.2', '%', '-0.4%', 'down')}
          ${this._metric('ACTIVE_HAWKERS', '42', 'USR', '0%', 'stable')}
          ${this._metric('PENDING_COLL.', '₹1,240', '', '+5.2%', 'up')}
        </div>

        <!-- Stock Chart -->
        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-header">
            <span style="font-weight:700;text-transform:uppercase;font-size:var(--text-label-large)">STOCK_LEVELS // DEPOT_A</span>
            <span style="font-size:var(--text-label-small);color:var(--color-secondary-text)">REFRESH: 06:00</span>
          </div>
          <div style="height:180px;margin:var(--space-sm) 0">
            <canvas id="chart-stock" style="width:100%;height:180px"></canvas>
          </div>
          <div class="stock-bar-row">
            <div class="stock-item">
              <div class="stock-item__val">8,400</div>
              <div class="stock-item__label">ORDERED</div>
            </div>
            <div class="divider--vertical" style="height:32px"></div>
            <div class="stock-item">
              <div class="stock-item__val" style="color:var(--color-success)">7,920</div>
              <div class="stock-item__label">RECEIVED</div>
            </div>
            <div class="divider--vertical" style="height:32px"></div>
            <div class="stock-item">
              <div class="stock-item__val" style="color:var(--color-warning)">480</div>
              <div class="stock-item__label">PENDING</div>
            </div>
          </div>
        </div>

        <!-- Revenue + Agent Revenue Chart -->
        <div class="morning-summary-card" style="margin-bottom:var(--space-lg)">
          <div>
            <div class="title">MONTHLY_REVENUE</div>
            <div class="value">₹14,820.50</div>
            <div style="font-size:var(--text-label-small);opacity:0.6;margin-top:4px">+8.4% vs last month</div>
          </div>
          <button class="btn btn--primary btn--sm" onclick="PF.navigate('reports')">
            <span class="material-icons-round">bar_chart</span>EXPORT_LOGS
          </button>
        </div>

        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-header">
            <span class="section-title">REVENUE_TREND</span>
            <span style="font-size:var(--text-label-small);color:var(--color-secondary-text)">6M_WINDOW</span>
          </div>
          <div style="height:160px">
            <canvas id="chart-agent-rev" style="width:100%;height:160px"></canvas>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="section-title" style="margin-bottom:var(--space-sm)">SYSTEM_OPERATIONS</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-sm);margin-bottom:var(--space-lg)">
          <button class="btn btn--primary btn--full" onclick="PF.navigate('customers')">
            <span class="material-icons-round">person_add</span>NEW_CUSTOMER
          </button>
          <button class="btn btn--outline btn--full" onclick="PF.navigate('inventory')">
            <span class="material-icons-round">qr_code_scanner</span>SCAN_INVOICE
          </button>
          <button class="btn btn--outline btn--full" onclick="PF.navigate('billing-agent')">
            <span class="material-icons-round">receipt_long</span>GEN_BILLS
          </button>
        </div>

        <!-- P&L Summary -->
        <div class="two-col" style="margin-bottom:var(--space-lg)">
          <div class="card">
            <div class="section-title" style="margin-bottom:var(--space-sm)">P&L_SUMMARY</div>
            <div style="display:flex;flex-direction:column;gap:var(--space-xs)">
              ${[
                ['Revenue', '₹14,820', 'success'],
                ['Purchase Cost', '₹8,240', 'error'],
                ['Hawker Pay', '₹2,100', 'secondary-text'],
                ['Gross Profit', '₹4,480', 'primary'],
              ].map(([k,v,c]) => `
                <div style="display:flex;justify-content:space-between;font-size:var(--text-body-medium);padding:var(--space-xs) 0;border-bottom:1px solid var(--color-divider)">
                  <span style="color:var(--color-secondary-text)">${k}</span>
                  <span style="font-weight:700;color:var(--color-${c})">${v}</span>
                </div>`).join('')}
            </div>
          </div>
          <div class="card">
            <div class="section-title" style="margin-bottom:var(--space-sm)">TOP_HAWKERS</div>
            ${PF_DATA.hawkers.slice(0,3).map(h => `
              <div style="display:flex;align-items:center;gap:var(--space-sm);padding:var(--space-xs) 0;border-bottom:1px solid var(--color-divider)">
                <div class="avatar avatar--sm">${h.name.charAt(0)}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:var(--text-label-medium);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${h.name}</div>
                  <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">${h.area}</div>
                </div>
                <span style="font-size:var(--text-label-medium);font-weight:700;color:var(--color-primary)">★${h.rating}</span>
              </div>`).join('')}
          </div>
        </div>

        <div class="log-bar">
          <span class="material-icons-round">terminal</span>
          <span class="log-bar__text">LOG: 06:42:11 - Distribution started in Area_4 | Hawkers deployed: 38/42 | Copies loaded: 7,920</span>
        </div>
      </div>`;
  },

  _metric(label, value, unit, change, trend) {
    const cls = trend === 'up' ? 'stat-card__change--up' : trend === 'down' ? 'stat-card__change--down' : 'stat-card__change--stable';
    const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
    return `
      <div class="stat-card hover-lift">
        <div class="stat-card__label">${label}</div>
        <div class="stat-card__value">${value} <span style="font-size:var(--text-label-small);color:var(--color-hint)">${unit}</span></div>
        <div class="stat-card__change ${cls}">${arrow} ${change}</div>
      </div>`;
  },

  afterRender() {
    const stockCanvas = document.getElementById('chart-stock');
    if (stockCanvas) PF_Charts.drawBarChart(stockCanvas, ['TOI','HT','TH','ET'], [85,60,45,90]);
    const revCanvas = document.getElementById('chart-agent-rev');
    if (revCanvas) PF_Charts.drawLineChart(revCanvas, PF_DATA.agentRevenueChart.labels, PF_DATA.agentRevenueChart.data, { filled: true });
  }
};

/* ---- AGENT LIST PAGE ---- */
const AgentListPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">FLEET_OPERATIONS // AGENTS</div>
            <div class="page-header__title">AGENT_REGISTRY</div>
          </div>
          <button class="btn btn--primary" onclick="PF.navigate('agent-onboarding')">
            <span class="material-icons-round">person_add</span>ONBOARD_AGENT
          </button>
        </div>

        <div class="filter-bar">
          <select id="agent-filter-plan">
            <option value="">ALL_PLANS</option>
            <option>Basic</option><option>Pro</option><option>Enterprise</option>
          </select>
          <select id="agent-filter-status">
            <option value="">ALL_STATUS</option>
            <option>ACTIVE</option><option>PENDING</option><option>BLOCKED</option>
          </select>
          <div class="input-group" style="flex:1">
            <span class="material-icons-round input-icon" style="font-size:16px">search</span>
            <input type="text" class="form-input" placeholder="SEARCH_AGENT..." id="agent-search" oninput="AgentListPage.filter()">
          </div>
        </div>

        <div class="card" style="padding:0;overflow:hidden">
          <table class="data-table" id="agent-table">
            <thead>
              <tr>
                <th>AGENT_ID</th><th>NAME</th><th>PLAN</th><th>STATUS</th>
                <th>HAWKERS</th><th>CUSTOMERS</th><th>REVENUE</th><th>ACTIONS</th>
              </tr>
            </thead>
            <tbody id="agent-tbody">
              ${PF_DATA.agents.map(a => this._row(a)).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  _row(a) {
    const s = a.status === 'ACTIVE' ? 'badge--success' : a.status === 'PENDING' ? 'badge--warning' : 'badge--error';
    return `
      <tr>
        <td><code style="font-size:var(--text-label-small);color:var(--color-secondary-text)">${a.id}</code></td>
        <td><div style="display:flex;align-items:center;gap:var(--space-sm)">
          <div class="avatar avatar--sm">${a.initials}</div>${a.name}</div></td>
        <td><span class="badge badge--neutral">${a.plan}</span></td>
        <td><span class="badge ${s}">${a.status}</span></td>
        <td>${a.hawkers}</td>
        <td>${a.customers}</td>
        <td style="color:var(--color-primary);font-weight:700">$${a.revenue}</td>
        <td>
          <div style="display:flex;gap:4px">
            <button class="btn btn--ghost btn--sm tooltip" data-tip="View Details"><span class="material-icons-round" style="font-size:14px">visibility</span></button>
            <button class="btn btn--ghost btn--sm tooltip" data-tip="${a.status==='BLOCKED'?'Unblock':'Block'}" style="color:${a.status==='BLOCKED'?'var(--color-success)':'var(--color-error)'}">
              <span class="material-icons-round" style="font-size:14px">${a.status==='BLOCKED'?'lock_open':'block'}</span>
            </button>
          </div>
        </td>
      </tr>`;
  },

  filter() {
    const q = document.getElementById('agent-search')?.value.toLowerCase() || '';
    const tbody = document.getElementById('agent-tbody');
    if (!tbody) return;
    const filtered = PF_DATA.agents.filter(a => a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q));
    tbody.innerHTML = filtered.map(a => this._row(a)).join('');
  },

  afterRender() {}
};

/* ---- BILLING PAGE ---- */
const BillingPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">FINANCE_MODULE // SaaS</div>
            <div class="page-header__title">SAAS_BILLING</div>
          </div>
          <button class="btn btn--primary btn--sm">
            <span class="material-icons-round">download</span>EXPORT_CSV
          </button>
        </div>

        <div class="stats-grid stats-grid--4" style="margin-bottom:var(--space-lg)">
          ${AgentDashboardPage._metric('TOTAL_COLLECTED','$8,400','','+12%','up')}
          ${AgentDashboardPage._metric('PENDING_DUES','$1,200','','-','stable')}
          ${AgentDashboardPage._metric('OVERDUE','$280','','HIGH','down')}
          ${AgentDashboardPage._metric('ACTIVE_SUBS','136','','→ 142 total','stable')}
        </div>

        <div class="card" style="padding:0;overflow:hidden">
          <table class="data-table">
            <thead><tr><th>AGENT</th><th>PLAN</th><th>DUE_DATE</th><th>AMOUNT</th><th>STATUS</th><th>ACTION</th></tr></thead>
            <tbody>
              ${PF_DATA.agents.map(a => `
                <tr>
                  <td><div style="display:flex;align-items:center;gap:var(--space-sm)">
                    <div class="avatar avatar--sm">${a.initials}</div>${a.name}</div></td>
                  <td><span class="badge badge--neutral">${a.plan}</span></td>
                  <td style="color:var(--color-secondary-text)">${a.due}</td>
                  <td style="color:var(--color-primary);font-weight:700">$${a.revenue}</td>
                  <td><span class="badge ${a.status==='ACTIVE'?'badge--success':a.status==='PENDING'?'badge--warning':'badge--error'}">${a.status}</span></td>
                  <td><button class="btn btn--outline btn--sm"><span class="material-icons-round">receipt</span>INVOICE</button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },
  afterRender() {}
};
