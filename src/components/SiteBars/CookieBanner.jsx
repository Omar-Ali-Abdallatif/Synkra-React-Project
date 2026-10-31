import { useState } from 'react';
import './SiteBars.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="cookie-bar">
      <p>We use cookies to improve your experience and understand how you use Synkra. We do not sell your data. <a href="#cookie-policy">Cookie policy</a></p>
      <div className="cookie-actions">
        <button type="button" className="cookie-manage" onClick={() => setVisible(false)}>Manage preferences</button>
        <button type="button" className="cookie-accept" onClick={() => setVisible(false)}>Accept All</button>
      </div>
    </div>
  );
}
