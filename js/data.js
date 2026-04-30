/* =========================================================
   PaperFlow ERP — Mock Data
   ========================================================= */
const defaultData = {
  agents: [
    { id: 'AGT-001', initials: 'NK', name: 'North Karnataka News', plan: 'Enterprise', status: 'ACTIVE', revenue: 450, due: 'OCT 12', hawkers: 18, customers: 420, copies: 1840 },
    { id: 'AGT-002', initials: 'SD', name: 'Star Distributors', plan: 'Basic', status: 'ACTIVE', revenue: 120, due: 'OCT 15', hawkers: 6, customers: 180, copies: 520 },
    { id: 'AGT-003', initials: 'MA', name: 'Metro Agency', plan: 'Pro', status: 'PENDING', revenue: 280, due: 'OCT 01', hawkers: 12, customers: 310, copies: 980 },
    { id: 'AGT-004', initials: 'PS', name: 'Pune Samachar Hub', plan: 'Pro', status: 'ACTIVE', revenue: 280, due: 'NOV 05', hawkers: 10, customers: 290, copies: 870 },
    { id: 'AGT-005', initials: 'BN', name: 'Bangalore News Co.', plan: 'Enterprise', status: 'ACTIVE', revenue: 450, due: 'NOV 10', hawkers: 22, customers: 680, copies: 2400 },
    { id: 'AGT-006', initials: 'HV', name: 'Hyderabad Voice', plan: 'Basic', status: 'BLOCKED', revenue: 0, due: 'SEP 01', hawkers: 3, customers: 90, copies: 0 },
  ],
  hawkers: [
    { id: 'HK-902', name: 'RAJESH KUMAR', area: 'SECTOR_12', status: 'ONLINE', progress: 80, delivered: 142, total: 180, rating: 4.9, time: '05:15 AM', accuracy: '99.2%' },
    { id: 'HK-741', name: 'AMIT SINGH', area: 'NORTH_PLAZA', status: 'ONLINE', progress: 45, delivered: 68, total: 150, rating: 4.7, time: '05:30 AM', accuracy: '97.5%' },
    { id: 'HK-112', name: 'SURESH RAINA', area: 'OLD_TOWN', status: 'OFFLINE', progress: 0, delivered: 0, total: 210, rating: 4.2, time: 'N/A', accuracy: '94.0%' },
    { id: 'HK-554', name: 'VIKRAM ADITYA', area: 'GREEN_VALLEY', status: 'ONLINE', progress: 95, delivered: 190, total: 200, rating: 5.0, time: '05:02 AM', accuracy: '100%' },
    { id: 'HK-338', name: 'DEEPAK VERMA', area: 'EAST_BLOCK', status: 'ONLINE', progress: 62, delivered: 93, total: 150, rating: 4.5, time: '05:45 AM', accuracy: '96.8%' },
  ],
  customers: [
    { id: 'CUS-001', name: 'Arun Sharma', area: 'SECTOR_12', papers: ['TOI', 'HT'], status: 'ACTIVE', balance: 340, paused: false },
    { id: 'CUS-002', name: 'Priya Patel', area: 'NORTH_PLAZA', papers: ['ET'], status: 'PAUSED', balance: 120, paused: true },
    { id: 'CUS-003', name: 'Rahul Singh', area: 'OLD_TOWN', papers: ['TOI'], status: 'ACTIVE', balance: 180, paused: false },
    { id: 'CUS-004', name: 'Meena Reddy', area: 'GREEN_VALLEY', papers: ['HT', 'TH'], status: 'ACTIVE', balance: 220, paused: false },
    { id: 'CUS-005', name: 'Sanjay Joshi', area: 'EAST_BLOCK', papers: ['TOI', 'ET'], status: 'OVERDUE', balance: -80, paused: false },
  ],
  inventory: [
    { paper: 'Times of India', ordered: 3200, received: 3100, distributed: 2980, surplus: 120 },
    { paper: 'Hindustan Times', ordered: 1800, received: 1800, distributed: 1750, surplus: 50 },
    { paper: 'The Hindu', ordered: 900, received: 850, distributed: 820, surplus: 30 },
    { paper: 'Economic Times', ordered: 1200, received: 1200, distributed: 1180, surplus: 20 },
    { paper: 'Deccan Herald', ordered: 600, received: 580, distributed: 560, surplus: 20 },
  ],
  tickets: [
    { id: '#T-441', title: 'Payment gateway not connecting', agent: 'Metro Agency', priority: 'HIGH', status: 'OPEN', time: '2h ago' },
    { id: '#T-440', title: 'Hawker app crash on delivery mark', agent: 'Star Distributors', priority: 'MEDIUM', status: 'IN_PROGRESS', time: '5h ago' },
    { id: '#T-439', title: 'WhatsApp bill not sending', agent: 'North Karnataka News', priority: 'LOW', status: 'RESOLVED', time: '1d ago' },
    { id: '#T-438', title: 'Customer portal login issue (OTP)', agent: 'Hyderabad Voice', priority: 'HIGH', status: 'OPEN', time: '2d ago' },
  ],
  deliveryList: [
    { addr: '12-A, Rose Garden', paper: 'TOI + HT', done: true },
    { addr: '14-B, Rose Garden', paper: 'TOI', done: true },
    { addr: '15, Sunrise Apt', paper: 'ET', done: false },
    { addr: '18, MG Road', paper: 'TOI + TH', done: false },
    { addr: '22, Lake View', paper: 'HT', done: false },
    { addr: '25, Palm Heights', paper: 'TOI', done: false },
  ],
  revenueChart: {
    labels: ['JAN','FEB','MAR','APR','MAY','JUN'],
    data: [4200, 5100, 4800, 6200, 7800, 8400]
  },
  distributionChart: {
    labels: ['TOI','HT','TH','ET'],
    data: [85, 60, 45, 90]
  },
  agentRevenueChart: {
    labels: ['JAN','FEB','MAR','APR','MAY','JUN'],
    data: [10200, 11800, 10900, 13400, 14200, 14820]
  }
};

const savedData = localStorage.getItem('PF_DATA');
window.PF_DATA = savedData ? JSON.parse(savedData) : defaultData;

window.PF_SAVE_DATA = function() {
  localStorage.setItem('PF_DATA', JSON.stringify(window.PF_DATA));
};
