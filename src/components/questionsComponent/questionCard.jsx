/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/
import { useState } from 'react';
import downDir from './QuestionsAssets/down-dir.svg';
import dropDown from './QuestionsAssets/Dropdown.svg';

export default function QuestionCard(info) {
  let [showAns, setShowAns] = useState(false);
  function toggleBtn() {
    setShowAns(!showAns);
  }
  return (
    <div>
      <div className="question-card">
        <p
          className="card-question"
          style={{ background: showAns ? '#E4E3DF' : ' #FCFCFD' }}
        >
          {info.question}
          <button
            onClick={toggleBtn}
            style={{ background: showAns ? '#E4E3DF' : '#FCFCFD' }}
          >
            <img src={showAns ? dropDown : downDir} alt="down Direction" />
          </button>
        </p>
        <p
          className="card-answer"
          style={{ display: showAns ? ' block' : 'none' }}
        >
          {info.answer.split(' ').map((element, index) => (
            <span
              key={index}
              style={{
                fontStyle: element === 'Synkra' ? 'italic' : 'normal',
                fontWeight: element === 'Synkra' ? '700' : '400',
                fontSize: element === 'Synkra' ? '25px' : '22px',
              }}
            >
              {element}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
