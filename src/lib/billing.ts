import { prisma } from './prisma';

export const BillingEngine = {
  /**
   * Calculate monthly bill for a customer
   * @param customerId 
   * @param month (0-11)
   * @param year 
   */
  async calculateMonthlyBill(customerId: string, month: number, year: number) {
    const customer = await prisma.customer.findUnique({
      where: { userId: customerId },
      include: { user: true }
    });

    if (!customer) throw new Error("Customer not found");

    // 1. Calculate Active Days in Month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let activeDays = daysInMonth;

    // TODO: Fetch Pause/Skip logs from database to adjust activeDays
    // const skips = await prisma.subscriptionLog.findMany({ ... })
    // activeDays -= skips.length;

    // 2. Base Price Calculation (Mocking newspaper price for now)
    const paperPricePerDay = 5.0; // ₹5 per day
    const grossAmount = activeDays * paperPricePerDay;

    // 3. Arrears / Previous Balance
    const previousBalance = customer.currentBalance;
    const totalDue = grossAmount + previousBalance;

    return {
      customerId,
      customerName: customer.user.name,
      period: `${month + 1}/${year}`,
      activeDays,
      grossAmount,
      previousBalance,
      totalDue
    };
  },

  /**
   * Generate bills for all active customers
   */
  async generateAllBills() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const customers = await prisma.customer.findMany({
      where: { subscriptionStatus: 'ACTIVE' }
    });

    const results = [];
    for (const customer of customers) {
      const billData = await this.calculateMonthlyBill(customer.userId, month, year);
      
      // Save bill to Database
      const newBill = await prisma.bill.create({
        data: {
          customerId: customer.userId,
          amount: billData.totalDue,
          periodStart: new Date(year, month, 1),
          periodEnd: new Date(year, month + 1, 0),
          isPaid: false
        }
      });

      results.push(newBill);
    }

    return results;
  }
};
