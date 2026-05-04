export const WhatsAppService = {
  /**
   * Send OTP for Login/Signup
   */
  async sendOTP(phone: string, otp: string) {
    const message = `*PAPERFLOW_ERP: SECURITY_CODE*\n\n` +
                    `Your OTP for PaperFlow access is: *${otp}*.\n\n` +
                    `Do not share this code with anyone. Valid for 5 minutes.\n\n` +
                    `_PaperFlow ERP System Security_`;

    console.log(`[WhatsApp API] Sending OTP to ${phone}: \n${message}`);
    // Real implementation: axios.post('API_URL', { phone, message, ... })
  },

  /**
   * Send Bill Generation Alert
   */
  async sendBillAlert(customerName: string, phone: string, amount: number, period: string) {
    const message = `*PAPERFLOW_ERP: BILL_GENERATED*\n\n` +
                    `Hello ${customerName},\n` +
                    `Your bill for ${period} has been generated.\n\n` +
                    `Total Amount: *₹${amount}*\n` +
                    `Link: http://paperflow.io/customer/billing\n\n` +
                    `_Generated via PaperFlow SaaS_`;

    console.log(`[WhatsApp API] Sending to ${phone}: \n${message}`);
  },

  /**
   * Send Payment Approval Notification
   */
  async sendPaymentApproval(customerName: string, phone: string, amount: number) {
    const message = `*PAPERFLOW_ERP: PAYMENT_VERIFIED*\n\n` +
                    `Dear ${customerName},\n` +
                    `Your payment of *₹${amount}* has been successfully verified.\n\n` +
                    `_PaperFlow ERP: Reliable & Transparent_`;

    console.log(`[WhatsApp API] Sending to ${phone}: \n${message}`);
  }
};
