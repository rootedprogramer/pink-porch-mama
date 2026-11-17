export type Stage = 'ttc' | 'pregnant' | 'postpartum' | 'littles' | 'growing' | 'grown'
export type Pillar = 'mind' | 'heart' | 'body' | 'spirit'
export type Group = 'before' | 'early' | 'later'

export interface StageInfo {
  id: Stage
  label: string
  short: string
  emoji: string
  blurb: string
  dateLabel: string | null
}

export const stages: StageInfo[] = [
  { id: 'ttc', label: 'Hoping & trying', short: 'Trying', emoji: '🌱', blurb: 'Preparing, praying, waiting', dateLabel: null },
  { id: 'pregnant', label: 'Expecting', short: 'Expecting', emoji: '🤰', blurb: 'Growing a little one', dateLabel: 'When is your due date?' },
  { id: 'postpartum', label: 'New mama', short: 'First year', emoji: '🍼', blurb: 'The fourth trimester and first year', dateLabel: 'When was your baby born?' },
  { id: 'littles', label: 'Mom of little ones', short: 'Little ones', emoji: '🧸', blurb: 'Toddlers and preschoolers', dateLabel: null },
  { id: 'growing', label: 'Mom of school-age & teens', short: 'Growing kids', emoji: '🎒', blurb: 'Busy calendars, big feelings', dateLabel: null },
  { id: 'grown', label: 'Mom of grown kids', short: 'Grown kids', emoji: '🕊️', blurb: 'A new chapter for you', dateLabel: null },
]

export const stageInfo = (id: Stage | null | undefined): StageInfo =>
  stages.find(s => s.id === id) ?? stages[2]

export interface PillarInfo {
  id: Pillar
  label: string
  color: string
  soft: string
  icon: string
  tagline: string
}

export const pillars: PillarInfo[] = [
  { id: 'mind', label: 'Mind', color: '#7C8FC9', soft: '#ECEFFA', icon: '🧠', tagline: 'Clarity, learning, a lighter load' },
  { id: 'heart', label: 'Heart', color: '#C97B9A', soft: '#F7E8EF', icon: '💗', tagline: 'Feelings, friendship, belonging' },
  { id: 'body', label: 'Body', color: '#E8956B', soft: '#FCEFE7', icon: '🌿', tagline: 'Strength, rest, nourishment' },
  { id: 'spirit', label: 'Spirit', color: '#B8943A', soft: '#FBF6E9', icon: '✨', tagline: 'Stillness, meaning, faith' },
]

export const pillarInfo = (id: Pillar): PillarInfo => pillars.find(p => p.id === id) ?? pillars[0]

export const groupOf = (s: Stage): Group =>
  s === 'ttc' || s === 'pregnant' ? 'before' : s === 'postpartum' || s === 'littles' ? 'early' : 'later'

export function stageWeeks(stage: Stage, date: string | null): number | null {
  if (!date) return null
  const ms = new Date(date + 'T00:00:00').getTime()
  const week = 7 * 24 * 60 * 60 * 1000
  if (stage === 'postpartum') return Math.max(0, Math.floor((Date.now() - ms) / week))
  if (stage === 'pregnant') {
    const left = Math.ceil((ms - Date.now()) / week)
    return Math.min(42, Math.max(1, 40 - left))
  }
  return null
}

export const trimester = (weeks: number): 1 | 2 | 3 => (weeks <= 13 ? 1 : weeks <= 27 ? 2 : 3)

export function dayOfYear(d: Date = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d.getTime() - start.getTime()) / 86400000)
}

export const focusTips: Record<Group, Record<Pillar, string[]>> = {
  before: {
    mind: [
      "Write down the one question you keep circling back to, then bring it to your next appointment or a trusted friend.",
      "Unfollow one account that makes you feel behind.",
      "Learn one thing about this season for ten minutes, then stop. You don't need to know it all.",
    ],
    heart: [
      "Text one person who makes you feel safe. No agenda.",
      "Name one feeling out loud today, even if it's complicated.",
      "Let yourself want what you want without apologizing for it.",
    ],
    body: [
      "Take a 15-minute walk without your phone.",
      "Drink a full glass of water before your first coffee.",
      "Stretch your hips and low back for five minutes tonight.",
    ],
    spirit: [
      "Sit quietly for two minutes. Let that be the whole prayer.",
      "Write down three things you're thankful for, even the small ones.",
      "Say your hope out loud, as a prayer or just as honest words.",
    ],
  },
  early: {
    mind: [
      "Pick the one thing that must happen today. Let the rest be a bonus.",
      "Get the mental load out of your head and onto paper.",
      "Ask for one specific piece of help, with a name and a time.",
    ],
    heart: [
      "Tell someone one honest thing about how today really is.",
      "Send a voice note to a friend instead of a perfect text.",
      "Tell yourself: I'm doing a good job, even on messy days.",
    ],
    body: [
      "Eat something with protein before you feed everyone else.",
      "Step outside for five minutes of daylight.",
      "Rest when the little ones rest, even for ten minutes. The dishes can wait.",
    ],
    spirit: [
      "Whisper a one-sentence prayer in the hardest part of the day.",
      "Read one line of something that steadies you.",
      "Notice one small beautiful thing right now.",
    ],
  },
  later: {
    mind: [
      "Choose one thing that's just for you and put it on the calendar.",
      "Learn something for the joy of it. No kids involved.",
      "Write down one old worry, then close the notebook.",
    ],
    heart: [
      "Reach out to a friend you haven't talked to in a while.",
      "Tell your kid something you're proud of in them.",
      "Ask yourself: what do I miss about being me?",
    ],
    body: [
      "Do a short strength session. Strong bones are a gift to future you.",
      "Walk somewhere you've never walked before.",
      "Stand on one leg while you brush your teeth, like a flamingo.",
    ],
    spirit: [
      "Spend a few minutes in stillness before the day takes over.",
      "Pray for each of your kids by name.",
      "Write down where you've seen faithfulness in your own story.",
    ],
  },
}

export const verses: { text: string; ref: string }[] = [
  { text: "God is in the midst of her; she shall not be moved: God shall help her, and that right early.", ref: "Psalm 46:5" },
  { text: "Strength and honour are her clothing; and she shall rejoice in time to come.", ref: "Proverbs 31:25" },
  { text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.", ref: "Isaiah 41:10" },
  { text: "It is of the Lord's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.", ref: "Lamentations 3:22-23" },
  { text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.", ref: "Psalm 23:2-3" },
  { text: "He shall feed his flock like a shepherd: he shall gather the lambs with his arm, and carry them in his bosom, and shall gently lead those that are with young.", ref: "Isaiah 40:11" },
  { text: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.", ref: "Isaiah 40:31" },
]
