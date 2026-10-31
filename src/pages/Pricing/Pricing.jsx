/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/
import { useState } from 'react';
import { useNavigate } from 'react-router';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import './Pricing.css';
import PricingHeader from './headerComponent/PricingHeader';
import PriceDetails from './pricingConatiner/PriceContainer';
import Questions from '../../components/questionsComponent/Questions';
function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const navigate = useNavigate();

  return (
    <div className="pricing-page">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PricingHeader />
        <PriceDetails onSelectPlan={setSelectedPlan} />
        <Questions />
      </div>
      {selectedPlan && (
        <PaymentForm
          planName={selectedPlan}
          onCancel={() => setSelectedPlan('')}
          onSuccess={() => {
            setSelectedPlan('');
            navigate('/profile');
          }}
        />
      )}
    </div>
  );
}
export default Pricing;
