import Stripe from 'stripe';

import { logAudit } from '@/lib/audit';
import { Env } from '@/libs/Env';

const stripe = new Stripe(Env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') ?? '';
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      Env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    await logAudit({
      actorId: 'stripe',
      action: 'invoice.paid',
      entity: invoice.id,
      metadata: { amount_paid: invoice.amount_paid, customer: invoice.customer },
    });
  }

  return Response.json({ received: true });
}
