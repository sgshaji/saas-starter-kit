import { buttonVariants } from '@/components/ui/buttonVariants';

import { PricingCard } from './PricingCard';
import { PricingFeature } from './PricingFeature';

export const PricingInformation = () => (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    <PricingCard
      planId="free"
      price={0}
      interval="month"
      button={(
        <div className="mt-4">
          <a className={buttonVariants({ variant: 'outline' })} href="/sign-up">
            Get Started
          </a>
        </div>
      )}
    >
      <PricingFeature>1 Team Member</PricingFeature>
      <PricingFeature>1 Project</PricingFeature>
      <PricingFeature>Email Support</PricingFeature>
    </PricingCard>

    <PricingCard
      planId="premium"
      price={29}
      interval="month"
      button={(
        <div className="mt-4">
          <a className={buttonVariants()} href="/sign-up">
            Start Free Trial
          </a>
        </div>
      )}
    >
      <PricingFeature>Up to 5 Team Members</PricingFeature>
      <PricingFeature>Unlimited Projects</PricingFeature>
      <PricingFeature>Priority Support</PricingFeature>
    </PricingCard>
  </div>
);
