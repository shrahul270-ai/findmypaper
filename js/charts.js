/* =========================================================
   PaperFlow ERP — Chart Renderer (Canvas-based, no deps)
   ========================================================= */
const PF_Charts = {
  _getThemeColor(name) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-' + name).trim();
  },

  drawLineChart(canvas, labels, data, opts = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight || 180;
    ctx.clearRect(0, 0, W, H);

    const PAD = { t: 16, r: 16, b: 32, l: 48 };
    const chartW = W - PAD.l - PAD.r;
    const chartH = H - PAD.t - PAD.b;
    const max = Math.max(...data) * 1.15;
    const min = 0;

    const primary = this._getThemeColor('primary');
    const divider = this._getThemeColor('divider');
    const secText = this._getThemeColor('secondary-text');

    // Grid lines
    const gridLines = 4;
    ctx.strokeStyle = divider;
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridLines; i++) {
      const y = PAD.t + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(PAD.l, y);
      ctx.lineTo(PAD.l + chartW, y);
      ctx.stroke();
      // Label
      const val = Math.round(max - (max - min) * (i / gridLines));
      ctx.fillStyle = secText;
      ctx.font = `10px 'Roboto Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(val >= 1000 ? (val/1000).toFixed(1)+'k' : val, PAD.l - 6, y + 4);
    }

    // Points
    const pts = data.map((v, i) => ({
      x: PAD.l + (i / (data.length - 1)) * chartW,
      y: PAD.t + chartH - ((v - min) / (max - min)) * chartH
    }));

    // Fill area
    if (opts.filled !== false) {
      const grad = ctx.createLinearGradient(0, PAD.t, 0, PAD.t + chartH);
      grad.addColorStop(0, primary + '28');
      grad.addColorStop(1, primary + '00');
      ctx.beginPath();
      ctx.moveTo(pts[0].x, PAD.t + chartH);
      pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length-1].x, PAD.t + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Line
    ctx.beginPath();
    ctx.strokeStyle = primary;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Dots
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = primary;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();
    });

    // X Labels
    ctx.fillStyle = secText;
    ctx.font = `10px 'Roboto Mono', monospace`;
    ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      ctx.fillText(l, pts[i].x, H - 4);
    });
  },

  drawBarChart(canvas, labels, data, opts = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight || 180;
    ctx.clearRect(0, 0, W, H);

    const PAD = { t: 16, r: 16, b: 32, l: 40 };
    const chartW = W - PAD.l - PAD.r;
    const chartH = H - PAD.t - PAD.b;
    const max = Math.max(...data) * 1.2;

    const primary = this._getThemeColor('primary');
    const divider = this._getThemeColor('divider');
    const secText = this._getThemeColor('secondary-text');
    const n = data.length;
    const groupW = chartW / n;
    const barW = groupW * 0.55;

    // Grid
    ctx.strokeStyle = divider;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PAD.t + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(PAD.l, y);
      ctx.lineTo(PAD.l + chartW, y);
      ctx.stroke();
      const val = Math.round(max * (1 - i/4));
      ctx.fillStyle = secText;
      ctx.font = `10px 'Roboto Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(val, PAD.l - 4, y + 4);
    }

    // Bars
    data.forEach((v, i) => {
      const barH = (v / max) * chartH;
      const x = PAD.l + i * groupW + (groupW - barW) / 2;
      const y = PAD.t + chartH - barH;
      const grad = ctx.createLinearGradient(0, y, 0, PAD.t + chartH);
      grad.addColorStop(0, primary);
      grad.addColorStop(1, primary + '80');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, barH);

      // Value on top
      ctx.fillStyle = primary;
      ctx.font = `bold 10px 'Roboto Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(v, x + barW/2, y - 4);

      // Label
      ctx.fillStyle = secText;
      ctx.font = `10px 'Roboto Mono', monospace`;
      ctx.fillText(labels[i], x + barW/2, H - 4);
    });
  },

  drawDonutChart(canvas, labels, data, colors) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight || 160;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const r = Math.min(cx, cy) - 16;
    const inner = r * 0.6;
    const total = data.reduce((a, b) => a + b, 0);
    let start = -Math.PI / 2;

    const primary = this._getThemeColor('primary');
    const secText = this._getThemeColor('secondary-text');

    data.forEach((v, i) => {
      const angle = (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = colors[i] || primary;
      ctx.fill();
      start += angle;
    });

    // Hole
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim();
    ctx.fill();

    // Center label
    ctx.fillStyle = this._getThemeColor('primary-text');
    ctx.font = `bold 16px 'Roboto Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toLocaleString(), cx, cy - 8);
    ctx.fillStyle = secText;
    ctx.font = `10px 'Roboto Mono', monospace`;
    ctx.fillText('TOTAL', cx, cy + 10);
  },

  initAll() {
    // Redraw all charts on window resize
    window.addEventListener('resize', () => {
      document.querySelectorAll('[data-chart]').forEach(el => {
        const type = el.dataset.chart;
        const labels = (el.dataset.labels || '').split(',');
        const data = (el.dataset.values || '').split(',').map(Number);
        if (type === 'line') this.drawLineChart(el, labels, data, { filled: true });
        else if (type === 'bar') this.drawBarChart(el, labels, data);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => PF_Charts.initAll());
