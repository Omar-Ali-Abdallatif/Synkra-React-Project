import { useState } from 'react';
import './SiteBars.css';
import arrowIcon from './arrow.svg'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement-bar">
      <p>Synkra AI v6 is live — event-based triggers, 3× faster execution, full run logs.</p>
      <a href="#whats-changed">See what changed <span aria-hidden="true">
          <img src={arrowIcon} alt="" />
        </span></a>
      <button type="button" onClick={() => setVisible(false)} aria-label="Close announcement">×</button>
    </div>
  );
}
