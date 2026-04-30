/* =========================================================
   PaperFlow ERP — Hawker Pages
   ========================================================= */

/* ---- HAWKER MANAGEMENT (Agent View) ---- */
const HawkerManagementPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">FLEET_OPERATIONS // HAWKERS</div>
            <div class="page-header__title">HAWKER MANAGEMENT</div>
          </div>
          <button class="btn btn--primary" onclick="PF.showToast('Register Hawker — Coming Soon','success')">
            <span class="material-icons-round">add</span>REGISTER_HAWKER
          </button>
        </div>

        <!-- Search -->
        <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-md)">
          <div class="input-group" style="flex:1">
            <span class="material-icons-round input-icon" style="font-size:16px">search</span>
            <input type="text" class="form-input" placeholder="SEARCH_BY_ID_OR_NAME" oninput="HawkerManagementPage.filter(this.value)">
          </div>
          <button class="btn btn--outline">
            <span class="material-icons-round">tune</span>
          </button>
        </div>

        <!-- Map -->
        <div class="map-placeholder" style="margin-bottom:var(--space-md)">
          <div class="map-grid"></div>
          <div style="position:relative;z-index:1;text-align:center">
            <span class="material-icons-round" style="font-size:32px;color:var(--color-primary);display:block">map</span>
            <span style="font-size:var(--text-label-small);color:var(--color-secondary-text)">GEO_TRACKING_VIEW</span>
            <div style="margin-top:var(--space-sm);display:flex;gap:var(--space-xl);justify-content:center">
              ${PF_DATA.hawkers.filter(h=>h.status==='ONLINE').map(h=>`
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
                  <span class="material-icons-round" style="font-size:20px;color:var(--color-primary)">location_on</span>
                  <span style="font-size:var(--text-label-small)">${h.id}</span>
                </div>`).join('')}
            </div>
          </div>
          <div class="map-placeholder__overlay">
            <div style="display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;align-items:center;gap:4px;font-size:var(--text-label-small)">
                <span class="status-dot status-dot--green"></span> ${PF_DATA.hawkers.filter(h=>h.status==='ONLINE').length} ACTIVE
              </div>
              <div style="display:flex;align-items:center;gap:4px;font-size:var(--text-label-small)">
                <span class="status-dot status-dot--red"></span> ${PF_DATA.hawkers.filter(h=>h.status==='OFFLINE').length} OFFLINE
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="two-col" style="margin-bottom:var(--space-md)">
          <div class="card" style="display:flex;flex-direction:column;gap:4px">
            <span class="section-title">AVG_EFFICIENCY</span>
            <span style="font-size:var(--text-title-large);font-weight:700;color:var(--color-success)">98.4%</span>
          </div>
          <div class="card" style="display:flex;flex-direction:column;gap:4px">
            <span class="section-title">GEO_SYNC</span>
            <span style="font-size:var(--text-title-large);font-weight:700">STABLE</span>
          </div>
        </div>

        <!-- Hawker List -->
        <div class="section-header">
          <span class="section-title">PERSONNEL_REGISTRY</span>
          <span style="font-size:var(--text-label-small);color:var(--color-hint)">COUNT: ${PF_DATA.hawkers.length}</span>
        </div>
        <div id="hawker-list" style="display:flex;flex-direction:column;gap:var(--space-sm)">
          ${PF_DATA.hawkers.map(h => this._hawkerCard(h)).join('')}
        </div>

        <div class="log-bar" style="margin-top:var(--space-md)">
          <span class="material-icons-round">terminal</span>
          <span class="log-bar__text">GEO_FENCE_ALERT: HK-741 entered NORTH_PLAZA boundary</span>
          <span class="log-bar__time">06:45:22</span>
        </div>
      </div>`;
  },

  _hawkerCard(h) {
    const isOnline = h.status === 'ONLINE';
    return `
      <div class="hawker-card">
        <div class="hawker-card__header">
          <div class="avatar">${h.name.charAt(0)}</div>
          <div class="hawker-card__info">
            <div class="hawker-card__name">${h.name}</div>
            <div class="hawker-card__meta">${h.id} · ${h.area}</div>
          </div>
          <span class="badge ${isOnline ? 'badge--success' : 'badge--error'}">${h.status}</span>
        </div>
        <div style="margin:var(--space-sm) 0">
          <div style="display:flex;justify-content:space-between;font-size:var(--text-label-small);color:var(--color-secondary-text);margin-bottom:4px">
            <span>DELIVERY_PROGRESS</span>
            <span>${h.progress_text || h.delivered + '/' + h.total}</span>
          </div>
          <div class="progress-bar ${isOnline?'':'progress-bar--error'}">
            <div class="progress-bar__fill" style="width:${h.progress}%"></div>
          </div>
        </div>
        <div class="hawker-card__stats">
          <div class="hawker-card__stat">
            <span class="hawker-card__stat-val">★${h.rating}</span>
            <span>RATING</span>
          </div>
          <div class="hawker-card__stat">
            <span class="hawker-card__stat-val">${h.time}</span>
            <span>CHECK_IN</span>
          </div>
          <div class="hawker-card__stat">
            <span class="hawker-card__stat-val">${h.accuracy}</span>
            <span>ACCURACY</span>
          </div>
          <div style="margin-left:auto;display:flex;gap:4px">
            <button class="btn btn--ghost btn--sm tooltip" data-tip="Call Hawker">
              <span class="material-icons-round" style="font-size:14px">phone</span>
            </button>
            <button class="btn btn--ghost btn--sm tooltip" data-tip="View Route">
              <span class="material-icons-round" style="font-size:14px">route</span>
            </button>
          </div>
        </div>
      </div>`;
  },

  filter(q) {
    const list = document.getElementById('hawker-list');
    if (!list) return;
    const filtered = PF_DATA.hawkers.filter(h =>
      h.name.toLowerCase().includes(q.toLowerCase()) ||
      h.id.toLowerCase().includes(q.toLowerCase()) ||
      h.area.toLowerCase().includes(q.toLowerCase())
    );
    list.innerHTML = filtered.map(h => this._hawkerCard(h)).join('');
  },

  afterRender() {}
};

/* ---- HAWKER MOBILE HOME ---- */
const HawkerHomePage = {
  _checkedIn: false,

  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">HAWKER_ID: HK-9921</div>
            <div class="page-header__title">GOOD MORNING</div>
          </div>
          <div class="icon-box icon-box--primary">
            <span class="material-icons-round">directions_bike</span>
          </div>
        </div>

        <!-- Check-In Zone -->
        <div class="checkin-zone" id="checkin-zone" style="margin-bottom:var(--space-lg)">
          <span class="material-icons-round checkin-zone__icon">fingerprint</span>
          <div class="checkin-zone__title">ATTENDANCE CHECK-IN</div>
          <div class="checkin-zone__sub">GEO_LOCATION + SELFIE_VERIFY required</div>
          <div style="font-size:var(--text-label-small);color:var(--color-secondary-text);position:relative;z-index:1">
            📍 Depot: SECTOR_12 HUB &nbsp;|&nbsp; Dist: 0.3km
          </div>
          <button class="btn btn--primary btn--lg" id="btn-checkin" onclick="HawkerHomePage.checkIn()">
            <span class="material-icons-round">check_circle</span>CONFIRM_ATTENDANCE
          </button>
        </div>

        <!-- Today's Inventory -->
        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-title" style="margin-bottom:var(--space-md)">TODAY'S_PICKUP // DEPOT_A</div>
          ${PF_DATA.inventory.slice(0,4).map(p => `
            <div class="inventory-row">
              <div class="inventory-row__paper">${p.paper}</div>
              <div class="progress-bar inventory-row__progress">
                <div class="progress-bar__fill" style="width:${Math.round(p.distributed/p.ordered*100)}%"></div>
              </div>
              <div class="inventory-row__count">${p.received.toLocaleString()}</div>
            </div>`).join('')}
          <div style="margin-top:var(--space-md);padding-top:var(--space-sm);border-top:1px solid var(--color-divider);display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:var(--text-label-medium);font-weight:700">TOTAL_COPIES</span>
            <span style="font-size:var(--text-title-medium);font-weight:700;color:var(--color-primary)">7,430</span>
          </div>
        </div>

        <!-- Delivery List Preview -->
        <div class="card" style="margin-bottom:var(--space-lg)">
          <div class="section-header">
            <span class="section-title">DELIVERY_LIST</span>
            <button class="btn btn--ghost btn--sm" onclick="PF.navigate('hawker-delivery')">VIEW_ALL →</button>
          </div>
          ${PF_DATA.deliveryList.slice(0,4).map(d => `
            <div class="delivery-item">
              <div class="delivery-item__check ${d.done ? 'done' : ''}" onclick="this.classList.toggle('done')">
                ${d.done ? '<span class="material-icons-round" style="font-size:14px">check</span>' : ''}
              </div>
              <div class="delivery-item__info">
                <div class="delivery-item__addr">${d.addr}</div>
                <div class="delivery-item__paper">${d.paper}</div>
              </div>
            </div>`).join('')}
        </div>

        <!-- Cash Collection -->
        <div class="card card--accent">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-sm)">
            <div class="section-title">CASH_COLLECTION</div>
            <span style="font-size:var(--text-title-medium);font-weight:700;color:var(--color-primary)">₹2,840</span>
          </div>
          <div style="font-size:var(--text-label-small);color:var(--color-secondary-text);margin-bottom:var(--space-md)">Collected from 18 customers today</div>
          <button class="btn btn--primary btn--full">
            <span class="material-icons-round">payments</span>LOG_COLLECTION
          </button>
        </div>

        <div class="log-bar" style="margin-top:var(--space-md)">
          <span class="material-icons-round">terminal</span>
          <span class="log-bar__text">STATUS: Awaiting attendance confirmation | GEO_LOCK: ACTIVE</span>
        </div>
      </div>`;
  },

  checkIn() {
    const btn = document.getElementById('btn-checkin');
    const zone = document.getElementById('checkin-zone');
    if (!btn || !zone) return;
    btn.innerHTML = '<span class="spinner"></span> VERIFYING...';
    btn.disabled = true;
    setTimeout(() => {
      zone.style.borderColor = 'var(--color-success)';
      zone.querySelector('.checkin-zone__title').textContent = 'ATTENDANCE_CONFIRMED';
      zone.querySelector('.checkin-zone__icon').textContent = 'verified';
      zone.querySelector('.checkin-zone__icon').style.color = 'var(--color-success)';
      btn.innerHTML = '<span class="material-icons-round">check</span>CHECKED_IN: 05:47 AM';
      btn.className = 'btn btn--outline btn--lg';
      btn.style.borderColor = 'var(--color-success)';
      btn.style.color = 'var(--color-success)';
      PF.showToast('Attendance confirmed! ✓', 'success');
    }, 1500);
  },

  afterRender() {}
};

/* ---- HAWKER DELIVERY LIST ---- */
const HawkerDeliveryPage = {
  render() {
    return `
      <div class="page stagger">
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">HAWKER: HK-9921 // TODAY</div>
            <div class="page-header__title">DELIVERY_LIST</div>
          </div>
          <span class="badge badge--success">${PF_DATA.deliveryList.filter(d=>d.done).length}/${PF_DATA.deliveryList.length} DONE</span>
        </div>

        <div class="log-bar" style="margin-bottom:var(--space-md)">
          <span class="status-dot status-dot--green"></span>
          <span>ROUTE: SECTOR_12 → NORTH_PLAZA → OLD_TOWN</span>
        </div>

        <div class="card">
          ${PF_DATA.deliveryList.map((d, i) => `
            <div class="delivery-item" id="delivery-${i}">
              <div class="delivery-item__check ${d.done ? 'done' : ''}" onclick="HawkerDeliveryPage.toggle(${i}, this)">
                ${d.done ? '<span class="material-icons-round" style="font-size:14px">check</span>' : ''}
              </div>
              <div class="delivery-item__info">
                <div class="delivery-item__addr ${d.done ? '' : ''}" style="${d.done ? 'text-decoration:line-through;opacity:0.5' : ''}">${d.addr}</div>
                <div class="delivery-item__paper">${d.paper}</div>
              </div>
              ${d.done
                ? '<span class="badge badge--success" style="font-size:9px">DELIVERED</span>'
                : '<button class="btn btn--primary btn--sm" onclick="HawkerDeliveryPage.markDone(' + i + ',this)"><span class="material-icons-round">check</span>MARK</button>'
              }
            </div>`).join('')}
        </div>

        <div style="margin-top:var(--space-md);display:grid;grid-template-columns:1fr 1fr;gap:var(--space-sm)">
          <button class="btn btn--outline btn--full" onclick="PF.showToast('Complaint lodged','success')">
            <span class="material-icons-round">report_problem</span>NO_SUPPLY
          </button>
          <button class="btn btn--primary btn--full" onclick="PF.navigate('hawker-collection')">
            <span class="material-icons-round">payments</span>COLLECT_CASH
          </button>
        </div>
      </div>`;
  },

  toggle(idx, el) {
    const d = PF_DATA.deliveryList[idx];
    d.done = !d.done;
    if (window.PF_SAVE_DATA) window.PF_SAVE_DATA();
    PF.navigate('hawker-delivery');
  },

  markDone(idx, btn) {
    PF_DATA.deliveryList[idx].done = true;
    if (window.PF_SAVE_DATA) window.PF_SAVE_DATA();
    PF.navigate('hawker-delivery');
    PF.showToast('Delivery marked ✓', 'success');
  },

  afterRender() {}
};
