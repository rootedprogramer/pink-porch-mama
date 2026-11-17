import type { Pillar, Stage } from './stages'

export type JournalCat = Pillar | 'her'

export interface Prompt {
  cat: JournalCat
  text: string
  stages?: Stage[]
  faith?: boolean
}

export const journalCats: { id: JournalCat; label: string; color: string; soft: string }[] = [
  { id: 'her', label: 'Still Her', color: '#D4577A', soft: '#FDE8EE' },
  { id: 'mind', label: 'Mind', color: '#7C8FC9', soft: '#ECEFFA' },
  { id: 'heart', label: 'Heart', color: '#C97B9A', soft: '#F7E8EF' },
  { id: 'body', label: 'Body', color: '#E8956B', soft: '#FCEFE7' },
  { id: 'spirit', label: 'Spirit', color: '#B8943A', soft: '#FBF6E9' },
]

export const prompts: Prompt[] = [
  { cat: 'her', text: "Before I was a mom, I was someone who..." },
  { cat: 'her', text: "What is one thing you loved doing that you want to bring back, even in a small way?" },
  { cat: 'her', text: "If no one needed anything from you for one afternoon, what would you do?" },
  { cat: 'her', text: "What are you curious about lately?" },
  { cat: 'her', text: "Who are you becoming in this next chapter?", stages: ['growing', 'grown'] },
  { cat: 'mind', text: "What is taking up the most space in your head right now? Write it all out. Messy is fine." },
  { cat: 'mind', text: "What is one thing you could stop, simplify, or ask for help with this week?" },
  { cat: 'mind', text: "What do you wish someone had told you about this season?" },
  { cat: 'mind', text: "What are you most curious about when it comes to birth and the first weeks?", stages: ['pregnant'] },
  { cat: 'mind', text: "What is one boundary that would give you more breathing room?", stages: ['growing', 'grown'] },
  { cat: 'heart', text: "How are you really doing today? Write the honest version." },
  { cat: 'heart', text: "Who makes you feel seen, and what would it look like to reach out to them?" },
  { cat: 'heart', text: "What are you proud of that nobody has noticed?" },
  { cat: 'heart', text: "What do you wish people understood about waiting?", stages: ['ttc'] },
  { cat: 'heart', text: "What do you want to remember about this exact week?", stages: ['postpartum', 'littles'] },
  { cat: 'heart', text: "What do you feel as your kids build lives of their own?", stages: ['grown'] },
  { cat: 'body', text: "How is your body feeling today? Where are you holding tension?" },
  { cat: 'body', text: "What does your body need that you've been postponing?" },
  { cat: 'body', text: "Write a thank-you to your body for something it has done." },
  { cat: 'body', text: "What changes in your body surprise you, and how do you feel about them?", stages: ['pregnant'] },
  { cat: 'body', text: "What does healing look like for you this week?", stages: ['postpartum'] },
  { cat: 'spirit', text: "What are you grateful for today, even in the middle of something hard?" },
  { cat: 'spirit', text: "Where have you felt peace lately, even for a moment?" },
  { cat: 'spirit', text: "What do you need to hand over today?" },
  { cat: 'spirit', text: "Write a letter to God about what's on your heart.", faith: true },
  { cat: 'spirit', text: "Where have you seen God's faithfulness in your story?", faith: true },
]
