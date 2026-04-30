/* =========================================================
   PaperFlow ERP — Agent Onboarding Wizard Page
   ========================================================= */

const AgentOnboardingPage = {
  render() {
    return `
      <div class="page stagger">
        <!-- Header -->
        <div class="page-header animate-in">
          <div class="page-header__info">
            <div class="page-header__label">PROTOCOL: AGENT_ONBOARDING</div>
            <div class="page-header__title cursor-blink">AGENCY CONFIGURATION</div>
          </div>
        </div>

        <!-- Progress Steps -->
        <div class="wizard-steps animate-in" style="animation-delay:0.1s">
          <div class="step-indicator completed">01</div>
          <div class="step-connector completed"></div>
          <div class="step-indicator active">02</div>
          <div class="step-connector"></div>
          <div class="step-indicator">03</div>
        </div>

        <!-- Section 1: Identity -->
        <div class="wizard-section animate-in" style="animation-delay:0.2s">
          <div class="wizard-section__title">MODULE_01: CORE_IDENTITY</div>
          
          <div style="display:flex;flex-direction:column;gap:var(--space-md)">
            <div class="form-field">
              <label class="form-label">LEGAL AGENCY NAME</label>
              <div class="input-group">
                <input type="text" id="onboard-agent-name" class="form-input" style="padding-left:var(--space-md)" placeholder="e.g. Metro News Agency">
              </div>
            </div>
            
            <div class="form-field">
              <label class="form-label">DISTRIBUTION HUB ADDRESS</label>
              <div class="input-group">
                <span class="material-icons-round input-icon">location_on</span>
                <input type="text" id="onboard-agent-addr" class="form-input" placeholder="Enter full depot address">
              </div>
            </div>

            <div class="two-col">
              <div class="form-field">
                <label class="form-label">TAX / GSTIN</label>
                <div class="input-group">
                  <input type="text" class="form-input" style="padding-left:var(--space-md)" placeholder="Optional">
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">OFFICE CONTACT</label>
                <div class="input-group">
                  <span class="material-icons-round input-icon">phone</span>
                  <input type="text" class="form-input" placeholder="+91 ...">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Settlement -->
        <div class="wizard-section wizard-section--accent animate-in" style="animation-delay:0.3s">
          <div class="wizard-section__title">MODULE_02: FINANCIAL_SETTLEMENT</div>
          <p style="font-size:var(--text-body-small);color:var(--color-secondary-text);margin-bottom:var(--space-md)">
            Configure direct-to-agent UPI payment routing. All payments will skip the Super Admin and route directly to this account.
          </p>
          
          <div style="display:flex;flex-direction:column;gap:var(--space-md)">
            <div style="padding:var(--space-md);background:var(--color-surface-2);border:1px solid var(--color-divider)">
              <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-sm)">
                <span style="font-size:var(--text-label-small);color:var(--color-secondary-text)">UPI_GATEWAY_CREDENTIALS</span>
                <span class="material-icons-round" style="color:var(--color-success);font-size:16px">security</span>
              </div>
              <div class="form-field">
                <label class="form-label">UPI ID / VPA</label>
                <div class="input-group" style="background:var(--color-surface)">
                  <input type="text" class="form-input" style="padding-left:var(--space-md)" placeholder="agency@upi">
                  <span class="material-icons-round input-icon" style="color:var(--color-success)">check_circle</span>
                </div>
              </div>
            </div>

            <div class="qr-upload-zone">
              <span class="material-icons-round">qr_code_2</span>
              <div class="qr-upload-zone__title" style="color:var(--color-primary)">UPLOAD_STATIC_QR_CODE</div>
              <div class="qr-upload-zone__sub">PNG or JPG, max 5MB</div>
            </div>
          </div>
        </div>

        <!-- Section 3: Preferences -->
        <div class="wizard-section animate-in" style="animation-delay:0.4s">
          <div class="wizard-section__title">SYSTEM_PREFERENCES</div>
          <div style="display:flex;flex-direction:column">
            <div class="switch-row">
              <div class="switch-label">AUTO_GENERATE_WHATSAPP_BILLS</div>
              <label class="switch"><input type="checkbox" checked><span class="switch-slider"></span></label>
            </div>
            <div class="divider"></div>
            <div class="switch-row">
              <div class="switch-label">ENABLE_GEO_FENCING_ATTENDANCE</div>
              <label class="switch"><input type="checkbox" checked><span class="switch-slider"></span></label>
            </div>
            <div class="divider"></div>
            <div class="switch-row">
              <div class="switch-label">PRO_RATA_HOLIDAY_ADJUSTMENT</div>
              <label class="switch"><input type="checkbox"><span class="switch-slider"></span></label>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex;flex-direction:column;gap:var(--space-md);margin-top:var(--space-xl)" class="animate-in" style="animation-delay:0.5s">
          <button class="btn btn--primary btn--lg btn--full" onclick="AgentOnboardingPage.submit()">
            INITIALIZE_SYSTEM_SYNC <span class="material-icons-round" style="margin-left:8px">arrow_forward</span>
          </button>
          <button class="btn btn--ghost btn--full" onclick="PF.showToast('Draft Saved','neutral')">
            SAVE_DRAFT_AND_EXIT
          </button>
        </div>

        <div class="log-bar" style="margin-top:var(--space-xl)">
          <span class="material-icons-round">terminal</span>
          <span class="log-bar__text">SECURE_ENCRYPTION_ACTIVE // RSA-4096 // Awaiting finalization</span>
        </div>
      </div>`;
  },
  
  submit() {
    const nameEl = document.getElementById('onboard-agent-name');
    const name = nameEl && nameEl.value.trim() !== '' ? nameEl.value.trim() : 'New Agency ' + Math.floor(Math.random() * 1000);
    const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase().substring(0, 2);
    
    const newAgent = {
      id: 'AGT-' + String(PF_DATA.agents.length + 1).padStart(3, '0'),
      initials: initials,
      name: name,
      plan: 'Basic',
      status: 'PENDING',
      revenue: 0,
      due: 'N/A',
      hawkers: 0,
      customers: 0,
      copies: 0
    };
    
    PF_DATA.agents.unshift(newAgent);
    if (window.PF_SAVE_DATA) window.PF_SAVE_DATA();
    
    PF.showToast('System Sync Initialized. Agent ' + name + ' added.', 'success');
    setTimeout(() => PF.navigate('agent-list'), 1500);
  },

  afterRender() {}
};
