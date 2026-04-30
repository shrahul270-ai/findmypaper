/* =========================================================
   PaperFlow ERP — Additional Modules (Reports, Support, etc.)
   ========================================================= */

const AnalyticsPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">SUPER_ADMIN // METRICS</div>
            <div class="page-header__title">ANALYTICS & REPORTS</div>
          </div>
          <button class="btn btn--primary">
            <span class="material-icons-round">download</span>EXPORT_REPORT
          </button>
        </div>

        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-title">GLOBAL_DISTRIBUTION_TRENDS</div>
          <div style="height:200px;margin-top:var(--space-md)">
            <canvas id="chart-analytics-dist" style="width:100%;height:200px"></canvas>
          </div>
        </div>
        
        <div class="two-col">
          <div class="card">
            <div class="section-title">CHURN_RATE</div>
            <div style="height:150px;margin-top:var(--space-md)">
              <canvas id="chart-analytics-churn" style="width:100%;height:150px"></canvas>
            </div>
          </div>
          <div class="card">
            <div class="section-title">PLATFORM_UPTIME</div>
            <div style="font-size:var(--text-title-large);font-weight:700;color:var(--color-success);margin:var(--space-md) 0">99.998%</div>
            <p style="color:var(--color-secondary-text)">SLA Objective met for current quarter.</p>
          </div>
        </div>
      </div>
    `;
  },
  afterRender() {
    const distCanvas = document.getElementById('chart-analytics-dist');
    if (distCanvas && window.PF_Charts) {
      PF_Charts.drawBarChart(distCanvas, ['JAN','FEB','MAR','APR','MAY'], [12000, 14000, 13500, 15000, 16200]);
    }
  }
};

const SupportPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">SUPER_ADMIN // OPERATIONS</div>
            <div class="page-header__title">SUPPORT TICKETS</div>
          </div>
        </div>
        
        <div class="filter-bar">
          <select><option>ALL STATUS</option><option>OPEN</option><option>RESOLVED</option></select>
          <div class="input-group" style="flex:1">
            <span class="material-icons-round input-icon" style="font-size:16px">search</span>
            <input type="text" class="form-input" placeholder="SEARCH_TICKETS...">
          </div>
        </div>

        <div class="card" style="padding:0;overflow:hidden">
          <table class="data-table">
            <thead>
              <tr><th>TICKET_ID</th><th>SUBJECT</th><th>AGENT</th><th>STATUS</th><th>PRIORITY</th><th>ACTION</th></tr>
            </thead>
            <tbody>
              ${window.PF_DATA ? window.PF_DATA.tickets.map(t => `
                <tr>
                  <td><code>${t.id}</code></td>
                  <td>${t.title}</td>
                  <td>Agent_882</td>
                  <td><span class="badge ${t.status==='OPEN'?'badge--warning':'badge--success'}">${t.status}</span></td>
                  <td><span class="badge badge--${t.priority==='HIGH'?'error':t.priority==='MEDIUM'?'warning':'neutral'}">${t.priority}</span></td>
                  <td><button class="btn btn--ghost btn--sm">VIEW</button></td>
                </tr>
              `).join('') : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
  afterRender() {}
};

const CustomersPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">AGENT // DIRECTORY</div>
            <div class="page-header__title">CUSTOMER_REGISTRY</div>
          </div>
          <button class="btn btn--primary">
            <span class="material-icons-round">person_add</span>ADD_CUSTOMER
          </button>
        </div>

        <div class="card" style="padding:0;overflow:hidden">
          <table class="data-table">
            <thead>
              <tr><th>CID</th><th>NAME</th><th>AREA</th><th>PAPERS</th><th>STATUS</th><th>BALANCE</th><th>ACTION</th></tr>
            </thead>
            <tbody>
              ${window.PF_DATA ? window.PF_DATA.customers.map(c => `
                <tr>
                  <td><code>${c.id}</code></td>
                  <td>${c.name}</td>
                  <td>${c.area}</td>
                  <td>${c.papers.join(', ')}</td>
                  <td><span class="badge ${c.status==='ACTIVE'?'badge--success':'badge--warning'}">${c.status}</span></td>
                  <td style="color:var(--color-primary);font-weight:700">₹${c.balance}</td>
                  <td><button class="btn btn--ghost btn--sm"><span class="material-icons-round" style="font-size:16px">edit</span></button></td>
                </tr>
              `).join('') : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
  afterRender() {}
};

const InventoryPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">AGENT // OPERATIONS</div>
            <div class="page-header__title">INVENTORY_MANAGEMENT</div>
          </div>
          <button class="btn btn--outline">
            <span class="material-icons-round">qr_code_scanner</span>SCAN_INVOICE
          </button>
        </div>

        <div class="card" style="padding:0;overflow:hidden">
          <table class="data-table">
            <thead>
              <tr><th>PUBLICATION</th><th>ORDERED</th><th>RECEIVED</th><th>DISTRIBUTED</th><th>VARIANCE</th></tr>
            </thead>
            <tbody>
              ${window.PF_DATA ? window.PF_DATA.inventory.map(i => {
                const variance = i.received - i.ordered;
                const vColor = variance < 0 ? 'var(--color-error)' : variance > 0 ? 'var(--color-warning)' : 'var(--color-success)';
                return `
                <tr>
                  <td style="font-weight:700">${i.paper}</td>
                  <td>${i.ordered}</td>
                  <td style="color:var(--color-primary);font-weight:700">${i.received}</td>
                  <td>${i.distributed}</td>
                  <td style="color:${vColor}">${variance > 0 ? '+'+variance : variance}</td>
                </tr>
              `}).join('') : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
  afterRender() {}
};

const ReportsPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">AGENT // FINANCE</div>
            <div class="page-header__title">FINANCIAL_REPORTS</div>
          </div>
        </div>
        
        <div class="two-col">
          <div class="card">
            <div class="section-title">REVENUE_VS_EXPENSE</div>
            <div style="height:180px;margin-top:var(--space-md)">
              <canvas id="chart-agent-report" style="width:100%;height:180px"></canvas>
            </div>
          </div>
          <div class="card card--accent">
            <div class="section-title">EXPORT_ENGINE</div>
            <p style="color:var(--color-secondary-text);margin:var(--space-md) 0">Generate compliant PDF/CSV reports for tax and audit purposes.</p>
            <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
              <button class="btn btn--primary btn--full"><span class="material-icons-round">description</span>MONTHLY P&L (PDF)</button>
              <button class="btn btn--outline btn--full"><span class="material-icons-round">table_chart</span>GST SUMMARY (CSV)</button>
              <button class="btn btn--outline btn--full"><span class="material-icons-round">people</span>HAWKER PAYROLL (CSV)</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  afterRender() {
    const canvas = document.getElementById('chart-agent-report');
    if (canvas && window.PF_Charts) {
      PF_Charts.drawBarChart(canvas, ['JUN', 'JUL', 'AUG', 'SEP'], [12000, 13400, 14100, 14820]);
    }
  }
};

const BillingAgentPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">AGENT // BILLING</div>
            <div class="page-header__title">CUSTOMER_BILLING</div>
          </div>
          <button class="btn btn--primary">
            <span class="material-icons-round">receipt_long</span>GENERATE_BILLS
          </button>
        </div>
        
        <div class="card">
          <div class="section-title">BILLING_CYCLE: ${new Date().toLocaleString('default',{month:'long',year:'numeric'}).toUpperCase()}</div>
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-top:var(--space-md)">
            <div style="flex:1">
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">TOTAL_EXPECTED</div>
              <div style="font-size:var(--text-title-large);font-weight:700;color:var(--color-primary)">₹42,500</div>
            </div>
            <div style="flex:1">
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">COLLECTED</div>
              <div style="font-size:var(--text-title-large);font-weight:700;color:var(--color-success)">₹28,400</div>
            </div>
            <div style="flex:1">
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">PENDING</div>
              <div style="font-size:var(--text-title-large);font-weight:700;color:var(--color-warning)">₹14,100</div>
            </div>
          </div>
          
          <div class="progress-bar" style="margin-top:var(--space-lg)">
            <div class="progress-bar__fill" style="width:66%"></div>
          </div>
          <div style="text-align:right;font-size:var(--text-label-small);color:var(--color-secondary-text);margin-top:4px">66% RECOVERY_RATE</div>
        </div>
      </div>
    `;
  },
  afterRender() {}
};

const HawkerCollectionPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">HAWKER: HK-9921</div>
            <div class="page-header__title">CASH_COLLECTION</div>
          </div>
        </div>
        
        <div class="card card--accent" style="margin-bottom:var(--space-lg);text-align:center">
          <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">TODAY'S_COLLECTION</div>
          <div style="font-size:42px;font-weight:800;color:var(--color-primary);margin:var(--space-sm) 0">₹2,840</div>
          <button class="btn btn--primary" onclick="PF.showToast('Depositing to Agency Account...','success')">
            <span class="material-icons-round">account_balance</span>REMIT_TO_AGENCY
          </button>
        </div>

        <div class="section-title" style="margin-bottom:var(--space-sm)">RECENT_TRANSACTIONS</div>
        <div class="card" style="padding:0;overflow:hidden">
          <div style="padding:var(--space-md);border-bottom:1px solid var(--color-divider);display:flex;justify-content:space-between">
            <div>
              <div style="font-weight:700">Sharma Residence</div>
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">CASH · 09:14 AM</div>
            </div>
            <div style="font-weight:700;color:var(--color-success)">+ ₹680</div>
          </div>
          <div style="padding:var(--space-md);border-bottom:1px solid var(--color-divider);display:flex;justify-content:space-between">
            <div>
              <div style="font-weight:700">Apt 4B, North Tower</div>
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">UPI · 08:42 AM</div>
            </div>
            <div style="font-weight:700;color:var(--color-success)">+ ₹450</div>
          </div>
          <div style="padding:var(--space-md);display:flex;justify-content:space-between">
            <div>
              <div style="font-weight:700">Gupta House</div>
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">CASH · 08:15 AM</div>
            </div>
            <div style="font-weight:700;color:var(--color-success)">+ ₹1,710</div>
          </div>
        </div>
      </div>
    `;
  },
  afterRender() {}
};
