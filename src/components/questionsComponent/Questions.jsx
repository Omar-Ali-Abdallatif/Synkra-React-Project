/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/
import './Questions.css';
import QuestionCard from './questionCard';
export default function Questions() {
  return (
    <div className="questions">
      <div className="questions-head">
        <h2>
          Questions Teams Ask Before <br />
          <span>Trusting Synkra.</span>
        </h2>
        <p>Your technical architecture questions, answered.</p>
      </div>
      <div className="cards-container">
        <QuestionCard
          question=" How is Synkra different from Zapier or Make ?"
          answer="Unlike traditional automation tools, Synkra combines AI-driven decision-making with visual playbooks. Instead of rigid IF/THEN logic, Synkra understands context,
           handles complex conditional workflows naturally, and reduces long-term maintenance."
        />
        <QuestionCard
          question=" Do I need to write code to use Synkra?"
          answer="No. Most teams design Synkra playbooks visually you describe conditions and actions in plain language and connect them to your tools. For advanced use cases,
           Synkra offers optional code steps. They're never required."
        />
        <QuestionCard
          question=" How long does setup actually take?"
          answer="Most teams get their first workflow running in under 15 minutes. You can start instantly using
           pre-built templates or build custom playbooks visually without any complex initial configuration."
        />
        <QuestionCard
          question=" What happens if a workflow fails halfway?"
          answer="Synkra includes automatic retry mechanisms and detailed error logging. If a step fails, you'll get instant notifications, and Synkra allows
           you to resume the workflow right from the point of failure without duplicating completed steps."
        />
        <QuestionCard
          question=" Is my data secure?"
          answer="Yes. Synkra uses end-to-end encryption for all data in transit and at rest. We adhere to industry-standard compliance protocols
           (SOC2, GDPR) to ensure your enterprise credentials and data remain safe and private."
        />
        <QuestionCard
          question=" Can we cancel or change plans anytime?"
          answer="Absolutely. You can upgrade, downgrade, or cancel your subscription 
          at any time directly from your account settings with no hidden fees or long-term commitments."
        />
      </div>
    </div>
  );
}
