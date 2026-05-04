export const WhatsAppService = {
  /**
   * Send Bill Generation Alert
   */
  async sendBillAlert(customerName: string, phone: string, amount: number, period: string) {
    const message = `*PAPERFLOW_ERP: BILL_GENERATED*\n\n` +
                    `Hello ${customerName},\n` +
                    `Your bill for ${period} has been generated.\n\n` +
                    `Total Amount: *₹${amount}*\n` +
                    `Due Date: 10th of this month.\n\n` +
                    `Please login to your portal to pay and upload screenshot.\n` +
                    `Link: http://paperflow.io/customer/billing\n\n` +
                    `_Generated via PaperFlow SaaS_`;

    console.log(`[WhatsApp API] Sending to ${phone}: \n${message}`);
    // Real implementation would call Twilio/Wati API here
  },

  /**
   * Send Payment Approval Notification
   */
  async sendPaymentApproval(customerName: string, phone: string, amount: number) {
    const message = `*PAPERFLOW_ERP: PAYMENT_VERIFIED*\n\n` +
                    `Dear ${customerName},\n` +
                    `Your payment of *₹${amount}* has been successfully verified by our system.\n\n` +
                    `Your ledger has been updated. Thank you for your business!\n\n` +
                    `_PaperFlow ERP: Reliable & Transparent_`;

    console.log(`[WhatsApp API] Sending to ${phone}: \n${message}`);
  },

  /**
   * Send Attendance Alert to Agent
   */
  async sendAttendanceAlert(agentPhone: string, hawkerName: string) {
    const message = `*PAPERFLOW_ERP: HAWKER_CHECK_IN*\n\n` +
                    `Hawker *${hawkerName}* has marked attendance and is ready for dispatch.\n\n` +
                    `Check dashboard for location details.`;

    console.log(`[WhatsApp API] Sending to ${agentPhone}: \n${message}`);
  }
};
