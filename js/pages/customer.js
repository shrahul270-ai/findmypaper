/* =========================================================
   PaperFlow ERP — Customer Portal Pages
   ========================================================= */

const CustomerPortalPage = {
  render() {
    const c = PF_DATA.customers[0];
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">SUBSCRIBER_PORTAL // ${c.id}</div>
            <div class="page-header__title">MY ACCOUNT</div>
          </div>
          <div class="icon-box icon-box--primary">
            <span class="material-icons-round">person</span>
          </div>
        </div>

        <!-- Subscription Info -->
        <div class="card card--accent" style="margin-bottom:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-md)">
            <div class="avatar avatar--lg">${c.name.charAt(0)}</div>
            <div>
              <div style="font-size:var(--text-title-medium);font-weight:700">${c.name}</div>
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">${c.area} · ${c.papers.join(' + ')}</div>
              <span class="badge ${c.status==='ACTIVE'?'badge--success':'badge--warning'}" style="margin-top:4px">${c.status}</span>
            </div>
            <div style="margin-left:auto;text-align:right">
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">BALANCE_DUE</div>
              <div style="font-size:var(--text-title-large);font-weight:700;color:var(--color-primary)">₹${c.balance}</div>
            </div>
          </div>
        </div>

        <!-- Holiday Mode -->
        <div class="card" style="margin-bottom:var(--space-md)">
          <div class="switch-row">
            <div>
              <div style="font-size:var(--text-label-medium);font-weight:600;text-transform:uppercase">HOLIDAY_MODE</div>
              <div style="font-size:var(--text-label-small);color:var(--color-secondary-text);margin-top:2px">Pause delivery. Pro-rata auto-deducted.</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="holiday-toggle" ${c.paused?'checked':''} onchange="CustomerPortalPage.toggleHoliday(this)">
              <span class="switch-slider"></span>
            </label>
          </div>
          <div id="holiday-msg" style="display:${c.paused?'block':'none'};margin-top:var(--space-sm);padding:var(--space-sm);background:rgba(255,214,10,0.1);border:1px solid var(--color-warning);font-size:var(--text-label-small);color:var(--color-warning)">
            ⚠ DELIVERY_PAUSED. Bill adjusted for paused days.
          </div>
        </div>

        <!-- Quick Pay -->
        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-title" style="margin-bottom:var(--space-md)">ONE_CLICK_PAYMENT</div>
          <div class="qr-display">
            <div class="qr-box">
              <span class="material-icons-round">qr_code_2</span>
            </div>
            <div style="font-size:var(--text-label-small);color:var(--color-secondary-text)">agency@upi · Direct-to-Agent</div>
            <div style="font-size:var(--text-title-medium);font-weight:700;color:var(--color-primary)">₹${c.balance}</div>
          </div>
          <button class="btn btn--primary btn--full btn--lg" onclick="PF.showToast('Redirecting to UPI payment...','success')">
            <span class="material-icons-round">payments</span>PAY_NOW // UPI
          </button>
        </div>

        <!-- Delivery Calendar -->
        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-title" style="margin-bottom:var(--space-md)">DELIVERY_CALENDAR // ${new Date().toLocaleString('default',{month:'long',year:'numeric'}).toUpperCase()}</div>
          <div class="delivery-calendar">
            ${['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => `<div class="cal-day cal-day--header">${d}</div>`).join('')}
            ${this._buildCalendar()}
          </div>
          <div style="display:flex;gap:var(--space-md);margin-top:var(--space-md);flex-wrap:wrap">
            <span class="chart-legend__item"><div style="width:12px;height:12px;background:var(--color-primary-glow);border:1px solid var(--color-primary)"></div>DELIVERED</span>
            <span class="chart-legend__item"><div style="width:12px;height:12px;background:rgba(255,69,58,0.1);border:1px solid var(--color-error)"></div>MISSED</span>
            <span class="chart-legend__item"><div style="width:12px;height:12px;background:rgba(255,214,10,0.1);border:1px solid var(--color-warning)"></div>PAUSED</span>
          </div>
        </div>

        <!-- Bills History -->
        <div class="section-title" style="margin-bottom:var(--space-sm)">BILLING_HISTORY</div>
        <div class="card" style="margin-bottom:var(--space-md)">
          ${[
            {month:'SEP 2024',amount:'₹680',status:'PAID'},
            {month:'AUG 2024',amount:'₹720',status:'PAID'},
            {month:'JUL 2024',amount:'₹680',status:'PAID'},
          ].map(b => `
            <div class="customer-bill-row">
              <span class="customer-bill-row__month">${b.month}</span>
              <span class="badge badge--success">${b.status}</span>
              <span class="customer-bill-row__amount">${b.amount}</span>
              <button class="btn btn--ghost btn--sm tooltip" data-tip="Download PDF">
                <span class="material-icons-round" style="font-size:14px">download</span>
              </button>
            </div>`).join('')}
        </div>

        <!-- Complaint -->
        <div class="card card--accent">
          <div class="section-title" style="margin-bottom:var(--space-sm)">RAISE_COMPLAINT</div>
          <p style="font-size:var(--text-body-small);color:var(--color-secondary-text);margin-bottom:var(--space-md)">Paper not received? Notify your agent instantly.</p>
          <button class="btn btn--outline btn--full" onclick="PF.showToast('Complaint raised. Hawker notified. 🔔','success')">
            <span class="material-icons-round">report_problem</span>PAPER_NOT_RECEIVED
          </button>
        </div>
      </div>`;
  },

  toggleHoliday(el) {
    const msg = document.getElementById('holiday-msg');
    if (msg) msg.style.display = el.checked ? 'block' : 'none';
    const c = PF_DATA.customers[0];
    c.paused = el.checked;
    c.status = el.checked ? 'PAUSED' : 'ACTIVE';
    if (window.PF_SAVE_DATA) window.PF_SAVE_DATA();
    PF.showToast(el.checked ? 'Holiday mode ON — delivery paused' : 'Holiday mode OFF — delivery resumed', 'success');
    // Refresh page state slightly delayed to show toast
    setTimeout(() => PF.navigate('customer-portal'), 1500);
  },

  _buildCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();

    const statuses = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const r = Math.random();
      if (d > today) statuses[d] = '';
      else if (d >= today - 3 && d <= today - 1) statuses[d] = 'missed';
      else if (d === today - 5 || d === today - 6) statuses[d] = 'paused';
      else statuses[d] = 'delivered';
    }

    let html = '';
    for (let i = 0; i < firstDay; i++) html += '<div class="cal-day cal-day--empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const st = statuses[d] ? `cal-day--${statuses[d]}` : '';
      const isToday = d === today;
      html += `<div class="cal-day ${st}" style="${isToday ? 'outline:2px solid var(--color-primary);' : ''}">${d}</div>`;
    }
    return html;
  },

  afterRender() {}
};

/* ---- CUSTOMER BILLS PAGE ---- */
const CustomerBillsPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">FINANCE // SUBSCRIBER</div>
            <div class="page-header__title">DIGITAL_LEDGER</div>
          </div>
        </div>
        <div class="card">
          <table class="data-table">
            <thead><tr><th>MONTH</th><th>COPIES</th><th>PAUSED</th><th>AMOUNT</th><th>STATUS</th><th>RECEIPT</th></tr></thead>
            <tbody>
              ${[
                {month:'OCT 2024',copies:28,paused:0,amount:'₹840',status:'DUE'},
                {month:'SEP 2024',copies:30,paused:0,amount:'₹680',status:'PAID'},
                {month:'AUG 2024',copies:30,paused:2,amount:'₹632',status:'PAID'},
                {month:'JUL 2024',copies:31,paused:0,amount:'₹700',status:'PAID'},
              ].map(b => `
                <tr>
                  <td style="font-weight:600">${b.month}</td>
                  <td>${b.copies}</td>
                  <td style="color:${b.paused?'var(--color-warning)':'var(--color-secondary-text)'}">${b.paused} days</td>
                  <td style="font-weight:700;color:var(--color-primary)">${b.amount}</td>
                  <td><span class="badge ${b.status==='PAID'?'badge--success':'badge--warning'}">${b.status}</span></td>
                  <td>
                    ${b.status==='PAID'
                      ? '<button class="btn btn--ghost btn--sm"><span class="material-icons-round" style="font-size:14px">download</span>PDF</button>'
                      : '<button class="btn btn--primary btn--sm"><span class="material-icons-round" style="font-size:14px">payments</span>PAY</button>'}
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },
  afterRender() {}
};
