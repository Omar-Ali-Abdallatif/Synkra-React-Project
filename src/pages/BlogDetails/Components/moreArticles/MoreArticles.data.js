import strategy from '../../../../assets/image/strategy.png';
import product from '../../../../assets/image/product.png';
import scalablity from '../../../../assets/image/scalablity.png';




const articles = [
  {
    id: 1,
    image: strategy,
    imageAlt: 'strategy-article',
    category: 'OPS STRATEGY',
    title: 'The 5 workflows every SaaS team should automate first.',
    description: "The real gains aren't in the flashy overhauls, but in targeting those repetitive tasks that drain your team's time. We're talking about reclaiming those lost hours. Here's a proven automation sequence to get started.",
    authorInitials: 'EM',
    authorName: 'Elena Marsh',
    avatarColorKey: 'blue',
    meta: '12 min read • March 28, 2026',
  },
  {
    id: 2,
    image: product,
    imageAlt: 'product-article',
    category: 'PRODUCT UPDATES',
    title: 'Synkra AI v2: Event-based triggers & 3x faster runs.',
    description: "Synkra AI v2 is here, and it's a game-changer. We've completely overhauled our trigger engine based on your feedback. Discover how these changes make Synkra faster and more responsive.",
    authorInitials: 'DT',
    authorName: 'Dev Team',
   avatarColorKey:'gray',
    meta: '12 min read • March 28, 2026',
  },
  {
    id: 3,
    image: scalablity,
    imageAlt: 'scalablity-article',
    category: 'SCALABILITY',
    title: 'Zapier vs Make vs Synkra: The honest breakdown.',
    description: 'We surveyed 40 teams who migrated from other platforms to understand their reasons for switching to Synkra. Here\'s an unedited look at their responses, highlighting the key benefits and improvements they experienced.',
    authorInitials: 'SO',
    authorName: 'Sam Okafor',
    avatarColorKey:'teal',
    meta: '10 min read • April 5, 2026',
  },
];

export default articles;