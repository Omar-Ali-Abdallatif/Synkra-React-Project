/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/
import './PricingHeader.css';
export default function PricingHeader() {
  return (
    <header>
      <h1>
        <span className="header-span">Simple</span> pricing.
      </h1>
      <h1>Serious automation</h1>
      <p>
        Every plan starts with a 14-day Pro trial free, no card. Start running
        playbooks today and upgrade when <span>Synkra</span> becomes essential
        to how you ship.
      </p>
    </header>
  );
}
/* I create PricingHeader component that including  H1 => Header of the page 
P => contain the descriptions of the page    */
