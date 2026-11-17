import type { Pillar, Stage } from './stages'

export interface Article {
  id: string
  stage: Stage
  pillar: Pillar
  title: string
  minutes: number
  body: string[]
  verse?: { text: string; ref: string }
  prayer?: string
}

export const articles: Article[] = [
  // Hoping & trying
  {
    id: 't1', stage: 'ttc', pillar: 'heart', title: 'You are not a project to fix', minutes: 2,
    body: [
      "Trying for a baby can quietly turn your body into a monthly report card. Every cycle becomes a verdict, and that is a lot to carry.",
      "You can want this deeply and still refuse to measure your worth by it. Waiting is not a failure, and it says nothing about who you are.",
      "Try this: each week, pick one thing that has nothing to do with conceiving, and let it be purely yours.",
    ],
  },
  {
    id: 't2', stage: 'ttc', pillar: 'body', title: 'Simple habits that support you', minutes: 3,
    body: [
      "Common guidance from providers: take a daily prenatal vitamin with folic acid, keep moving, protect your sleep, and limit alcohol. If you smoke, ask your provider for help quitting.",
      "A preconception visit is a great idea. You can review medications, vaccines, and any health conditions before pregnancy.",
      "If you're under 35 and haven't conceived after a year of trying, or 35 and older after six months, talk with your provider. If something feels off sooner, you deserve answers sooner.",
    ],
  },
  {
    id: 't3', stage: 'ttc', pillar: 'spirit', title: 'Making peace with the waiting', minutes: 2,
    body: [
      "Waiting stretches us. It asks us to hold hope and honesty at the same time. You're allowed to feel hopeful on Monday and worn out on Tuesday.",
      "Try a daily two-minute pause: breathe, name what you're carrying, and set it down for a moment.",
    ],
    verse: { text: "Wait on the Lord: be of good courage, and he shall strengthen thine heart: wait, I say, on the Lord.", ref: "Psalm 27:14" },
    prayer: "Lord, I'm waiting, and it's hard. Hold my hope when I can't. Amen.",
  },
  // Expecting
  {
    id: 'p1', stage: 'pregnant', pillar: 'body', title: "What's normal, and when to call", minutes: 3,
    body: [
      "Pregnancy comes with a lot of strange sensations. Most are normal. Some are worth a quick call.",
      "Contact your provider promptly, or seek emergency care, for vaginal bleeding, a severe headache that won't ease, vision changes, sudden swelling in your face or hands, fluid leaking, regular painful contractions before 37 weeks, or a clear drop in your baby's movements.",
      "Your provider would rather hear from you ten times for nothing than miss the one time it mattered. Trust your instincts.",
    ],
  },
  {
    id: 'p2', stage: 'pregnant', pillar: 'mind', title: 'Getting your mind ready for birth', minutes: 3,
    body: [
      "You can't control how birth goes, but you can prepare for it. Take a childbirth class, write down your preferences, and ask your provider what happens if plans change.",
      "Practice a calm-breathing routine now, when it's easy, so it's there when it's hard.",
      "However your birth goes, you are not being graded on it.",
    ],
  },
  {
    id: 'p3', stage: 'pregnant', pillar: 'heart', title: 'The identity shift begins', minutes: 2,
    body: [
      "Excitement and grief can live side by side. It's normal to miss your old life, worry about the new one, and feel both in the same hour.",
      "Start a short list of the things that make you you. You'll be glad to have it later.",
    ],
    verse: { text: "I will praise thee; for I am fearfully and wonderfully made.", ref: "Psalm 139:14" },
  },
  {
    id: 'p4', stage: 'pregnant', pillar: 'spirit', title: 'A pause before everything changes', minutes: 2,
    body: [
      "These weeks are a threshold. Make small room for quiet: a slow walk, a few deep breaths, or a note to your baby or to yourself.",
    ],
    verse: { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
    prayer: "Father, quiet my mind before this big change. Remind me that I'm held. Amen.",
  },
  // New mama
  {
    id: 'pp1', stage: 'postpartum', pillar: 'body', title: 'The fourth trimester', minutes: 3,
    body: [
      "The first twelve weeks after birth are a season of their own. Your body is healing, your hormones are shifting, and your baby is adjusting to the outside world.",
      "Lower your bar. Rest, eat, drink water, and accept help. Healing is the job right now.",
      "Call your provider about bleeding that soaks a pad in an hour, fever, severe pain, a swollen painful leg, or chest pain or trouble breathing. Those are not just part of postpartum.",
    ],
  },
  {
    id: 'pp2', stage: 'postpartum', pillar: 'heart', title: 'Baby blues, or something more?', minutes: 3,
    body: [
      "Many new mothers feel weepy, anxious, or overwhelmed in the first couple of weeks. That's often called the baby blues, and it usually eases on its own.",
      "If those feelings last past two weeks, get heavier, or make it hard to care for yourself or your baby, it may be postpartum depression or anxiety. Both are common and treatable. Please tell your provider.",
      "If you ever have thoughts of harming yourself or your baby, call or text 988, or call the National Maternal Mental Health Hotline at 1-833-852-6262, right away.",
    ],
  },
  {
    id: 'pp3', stage: 'postpartum', pillar: 'spirit', title: 'Rest is not laziness', minutes: 2,
    body: [
      "Your nights belong to someone else right now, and your days are full. Rest isn't a reward you earn. It's part of how you heal.",
      "Practice permission: ten quiet minutes with no productivity attached.",
    ],
    verse: { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
    prayer: "Lord, I'm tired in my body and my heart. Give me rest, and help me receive it. Amen.",
  },
  {
    id: 'pp4', stage: 'postpartum', pillar: 'body', title: 'Weight after baby: go slowly', minutes: 3,
    body: [
      "Your body spent nine months changing. Give it time to change back, or to become something new.",
      "For now, focus on healing, eating well (nursing takes extra energy), sleeping when you can, and gentle movement once you're cleared.",
      "Intentional weight loss can wait until you're recovered and your provider says it's okay. If thoughts about food or your body start to feel consuming, tell your provider.",
    ],
  },
  // Little ones
  {
    id: 'l1', stage: 'littles', pillar: 'mind', title: 'Name the mental load', minutes: 2,
    body: [
      "The mental load is the invisible work of remembering, planning, and noticing. It's real work, even if nobody sees it.",
      "For one week, write all of it down. Then pick three things to hand off, drop, or simplify.",
    ],
  },
  {
    id: 'l2', stage: 'littles', pillar: 'heart', title: 'Mom guilt is not a compass', minutes: 2,
    body: [
      "Guilt shows up when we care. It doesn't always mean we've done something wrong.",
      "Next time it appears, ask: is this guilt telling me something true, or is it just comparison? Keep what's true, and let the rest go.",
    ],
  },
  {
    id: 'l3', stage: 'littles', pillar: 'body', title: 'Fifteen minutes that are yours', minutes: 2,
    body: [
      "You don't need an hour. Fifteen minutes of walking, stretching, or lifting something heavy counts.",
      "Put it where it can survive a chaotic day: first thing in the morning, or during nap time.",
    ],
  },
  {
    id: 'l4', stage: 'littles', pillar: 'spirit', title: 'Stillness in the chaos', minutes: 2,
    body: [
      "You won't get an hour of silence. Try the small version: one slow breath before you answer the next Mom!, one line of gratitude at the sink, one quiet minute in the car before you walk inside.",
    ],
    verse: { text: "He shall feed his flock like a shepherd: he shall gather the lambs with his arm, and carry them in his bosom, and shall gently lead those that are with young.", ref: "Isaiah 40:11" },
    prayer: "Lord, lead me gently today. I can't do this alone. Amen.",
  },
  {
    id: 'l5', stage: 'littles', pillar: 'body', title: 'Weight loss without the crash', minutes: 3,
    body: [
      "If one of your goals is to feel and look different, start with what works and keeps your energy up: strength training two or three times a week, daily walking, protein at each meal, and sleep whenever you can get it.",
      "Skip crash diets and anything that promises fast results. They backfire, and your energy matters.",
      "Be patient with a body that has done hard things. If thinking about food or your body starts to feel heavy or consuming, talk to your provider.",
    ],
  },
  // School-age & teens
  {
    id: 'g1', stage: 'growing', pillar: 'heart', title: 'Staying close to a teen', minutes: 3,
    body: [
      "Teens often talk when it isn't a big talk: in the car, late at night, over snacks. Be available more than you're advisory.",
      "Listen for the feeling underneath the story before you try to fix anything.",
      "Apologize when you get it wrong. It teaches more than being right.",
    ],
  },
  {
    id: 'g2', stage: 'growing', pillar: 'mind', title: 'Taking your calendar back', minutes: 2,
    body: [
      "When kids get busy, so do you. Look at this week's calendar and ask: what is here because I want it, and what is here because I never said no?",
      "Protect one block a week that is only yours.",
    ],
  },
  {
    id: 'g3', stage: 'growing', pillar: 'body', title: 'Strength is the long game', minutes: 3,
    body: [
      "Strength training supports your bones, metabolism, mood, and independence for decades. Two short sessions a week is a real start.",
      "If you're in your 40s, changes in sleep, cycles, or mood can be signs of perimenopause. It's worth a conversation with your provider.",
    ],
  },
  {
    id: 'g4', stage: 'growing', pillar: 'spirit', title: 'Releasing the outcome', minutes: 2,
    body: [
      "You can love your kids fiercely and still release the results. Your part is to show up, pray, and trust that their story isn't finished.",
    ],
    verse: { text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.", ref: "Philippians 1:6" },
    prayer: "God, I place my children in Your hands again today. Amen.",
  },
  // Grown kids
  {
    id: 'gr1', stage: 'grown', pillar: 'heart', title: 'Who are you now?', minutes: 3,
    body: [
      "When the house gets quieter, so can your sense of purpose. It's normal to feel proud and a little lost at the same time.",
      "Try finishing this sentence a few different ways: I've always wanted to... I used to love... I'm curious about...",
    ],
  },
  {
    id: 'gr2', stage: 'grown', pillar: 'mind', title: 'Mothering adult children', minutes: 3,
    body: [
      "Your role shifts from manager to consultant: help when you're invited, trust when you're not.",
      "A good question to keep handy: would you like advice, or just an ear?",
    ],
  },
  {
    id: 'gr3', stage: 'grown', pillar: 'body', title: 'Bones, balance, and the long game', minutes: 3,
    body: [
      "Lift something heavy a couple of times a week and practice balance. Standing on one leg, like a flamingo, is a simple test and a simple training tool. Hold a counter at first.",
      "Ask your provider about bone density screening and what's right for you.",
    ],
  },
  {
    id: 'gr4', stage: 'grown', pillar: 'spirit', title: 'A season of fruit', minutes: 2,
    body: [
      "Every season has its work. This one may hold more space for friendship, curiosity, and rest. Ask yourself what you want to grow next.",
    ],
    verse: { text: "To every thing there is a season, and a time to every purpose under the heaven.", ref: "Ecclesiastes 3:1" },
    prayer: "Lord, show me what You have for this new season. Amen.",
  },
]
