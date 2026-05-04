import { NextResponse } from 'next/server';
import { BillingEngine } from '@/lib/billing';
import { WhatsAppService } from '@/lib/notifications';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log("Starting bulk billing generation...");
    
    // 1. Generate all bills using engine
    const bills = await BillingEngine.generateAllBills();

    // 2. Fetch customers for these bills to send notifications
    // Note: In a real app, this would be queued to avoid timeout
    for (const bill of bills) {
      const customer = await prisma.customer.findUnique({
        where: { userId: bill.customerId },
        include: { user: true }
      });

      if (customer && customer.user.phone) {
        await WhatsAppService.sendBillAlert(
          customer.user.name,
          customer.user.phone,
          bill.amount,
          `${new Date().getMonth() + 1}/${new Date().getFullYear()}`
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `${bills.length} bills generated and notifications sent.` 
    });

  } catch (error: any) {
    console.error("Billing Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
