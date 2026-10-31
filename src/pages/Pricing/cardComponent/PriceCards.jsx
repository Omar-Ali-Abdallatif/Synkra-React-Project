/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/
import './PriceCard.css';
import listIcon from '../pricingAssets/list_icon.svg';
import buttonIcon_1 from '../pricingAssets/buttonIcon_1.svg';
import buttonIcon_2 from '../pricingAssets/buttonIcon_2.svg';
export default function PriceCard({
  label = 'unknown label',
  highlight = 'unknown highlight',
  id = 'unknown id',
  price = 'unknown price',
  priceSuffix = 'unknown price suffix',
  description = 'unknown description',
  features = 'unknown featuers',
  cta = 'unknown cta',
  planName,
  onSelectPlan,
}) {
  return (
    <div className={!highlight ? 'price-card' : 'price-active'}>
      <h3 className="plan-label">{label}</h3>
      <p className="plan-price">
        {id === 'custom' ? (
          <span className="card-price">{label} </span>
        ) : (
          <>
            <span className="card-price">$ {price} </span>
            <span className="price-suffix">/ {priceSuffix}</span>
          </>
        )}
      </p>
      <p className="plan-description">{description}</p>
      <ul className="plan-feature">
        {features.map((el) => (
          <li key={el}>
            <img src={listIcon} alt="icon" />
            {el}
          </li>
        ))}
      </ul>
      <div style={{ padding: '0 10px' }}>
        <button
          className="plan-cta"
          type="button"
          onClick={() => onSelectPlan?.(planName)}
        >
          {cta}{' '}
          <img src={highlight ? buttonIcon_2 : buttonIcon_1} alt="" />{' '}
        </button>
      </div>
      {highlight && <span className="plan-badge">POPULAR</span>}
    </div>
  );
}
