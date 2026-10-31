/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/

import { useState } from 'react';
import PriceCard from '../cardComponent/PriceCards';
import './pricingContainer.css';
/* I create to function that have the details of each card */
function monthlyCard(onSelectPlan) {
  return (
    <>
      <PriceCard
        id="starter"
        label="STARTER"
        price={0}
        priceSuffix="forever"
        description="For founders and small teams validating their first playbooks."
        features={[
          '3 active playbooks',
          '1,000 runs/month',
          '2 integrations',
          '7-day run history',
        ]}
        cta="Try it free"
        highlight={false}
        planName="free"
        onSelectPlan={onSelectPlan}
      />
      <PriceCard
        id="pro"
        label="PRO"
        price={49}
        priceSuffix="month"
        description="For teams shipping reliably and scaling their automation stack."
        features={[
          'Unlimited playbooks',
          '150,000 runs/month',
          'All 50+ integrations',
          '90-day run history',
          'Visual canvas builder',
        ]}
        cta="Try it free"
        highlight={true}
        planName="pro"
        onSelectPlan={onSelectPlan}
      />
      <PriceCard
        id="custom"
        label="Custom"
        description="For teams that need audit-grade reliability, SSO, and dedicated support."
        features={[
          'Unlimited playbook & runs',
          'Custom integrations',
          'SOC 2 Type II reporting',
          'Dedicated account manager',
        ]}
        cta="Talk to us"
        highlight={false}
        planName="custom"
        onSelectPlan={onSelectPlan}
      />
    </>
  );
}
function annuallyCard(onSelectPlan) {
  return (
    <>
      <PriceCard
        id="starter"
        label="STARTER"
        price={0}
        priceSuffix="forever"
        description="For founders and small teams validating their first playbooks."
        features={[
          '3 active playbooks',
          '12,000 runs/annually',
          '2 integrations',
          '7-day run history',
        ]}
        cta="Try it free"
        highlight={false}
        planName="free"
        onSelectPlan={onSelectPlan}
      />
      <PriceCard
        id="pro"
        label="PRO"
        price={410}
        priceSuffix="annually"
        description="For teams shipping reliably and scaling their automation stack."
        features={[
          'Unlimited playbooks',
          '1,800,000 runs/annually',
          'All 50+ integrations',
          '150-day run history',
          'Visual canvas builder',
        ]}
        cta="Try it free"
        highlight={true}
        planName="pro"
        onSelectPlan={onSelectPlan}
      />
      <PriceCard
        id="custom"
        label="Custom"
        description="For teams that need audit-grade reliability, SSO, and dedicated support."
        features={[
          'Unlimited playbook & runs',
          'Custom integrations',
          'SOC 2 Type II reporting',
          'Dedicated account manager',
        ]}
        cta="Talk to us"
        highlight={false}
        planName="custom"
        onSelectPlan={onSelectPlan}
      />
    </>
  );
}
/**------------------------------------------------------------------------
 **             PriceDetails component  
 *------------------------------------------------------------------------**/
export default function PriceDetails({ onSelectPlan }) {
  let [isYear, setIsYear] = useState(false);
  return (
    <div>
      <div className="price-select">
        <span className={!isYear ? 'active-text' : ''}> Monthly</span>

        <div
          className="btn-container"
          onClick={() => {
            setIsYear(!isYear);
          }}
        >
          <div className={`btn-circle ${isYear ? 'yearly' : 'monthly'}`}></div>
        </div>

        <span className={isYear ? 'active-text' : ''}> Annually</span>
        <span className="save"> SAVE 30 %</span>
      </div>
      {/* to display anually cards or monthy cards */}
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {!isYear ? monthlyCard(onSelectPlan) : annuallyCard(onSelectPlan)}
      </div>
    </div>
  );
}

/* this file (price container) it includes pricing detailes monthy or anually and switching
 it by button (btn-container) */
/*in this component I make two function { monthlyCard(), annuallyCard() }which including 
component(PriceCard) and give the details of card by props     */
/* the button consist of div inside it circle it move from right to left
  and left to right while clicking on div and it will change which cards display monthly or anually  */
/* useing use-state hook to display user choose if yearly or monthly
  it change whule the user clicking on the container
  first : change the active text by change the class-name to active-text
  second : change the circle by class name  yearly or   monthly   */
