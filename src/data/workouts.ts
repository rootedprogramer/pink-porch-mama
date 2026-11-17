import type { Stage } from './stages'

export type Track = 'prenatal' | 'postpartum' | 'strength' | 'balance'

export interface Workout {
  id: string
  track: Track
  title: string
  minutes: number
  level: 'Gentle' | 'Moderate' | 'Strong'
  equipment: string
  moves: { name: string; detail: string }[]
}

export const trackLabel: Record<Track, string> = {
  prenatal: 'Prenatal',
  postpartum: 'Postpartum recovery',
  strength: 'Strength & energy',
  balance: 'Balance & bones',
}

export const trackNote: Record<Track, string> = {
  prenatal: "Check with your provider before starting or changing exercise. Stop and call if you have bleeding, dizziness, chest pain, leaking fluid, or regular contractions. Avoid overheating, and skip lying flat on your back for long stretches after the first trimester.",
  postpartum: "Wait for your provider's okay before returning to exercise, often around six weeks and longer after a C-section or complications. If you notice doming down the middle of your belly, leaking, pelvic heaviness, or pain, ease off and ask about pelvic floor physical therapy.",
  strength: "Check with your provider before starting a new program if you have a health condition, an injury, or are recently postpartum. Choose a weight that feels challenging by the last two reps, but never painful.",
  balance: "Do balance work next to a counter or wall. Move slowly and stop if you feel dizzy or any joint pain.",
}

export const workouts: Workout[] = [
  {
    id: 'pre-walk', track: 'prenatal', title: 'Prenatal walk & breathe', minutes: 20, level: 'Gentle', equipment: 'None',
    moves: [
      { name: 'Easy walk', detail: '10 minutes at a pace where you can still hold a conversation' },
      { name: 'Rib-cage breathing', detail: '2 minutes. Hands on your ribs, inhale wide, exhale slowly' },
      { name: 'Cat-cow', detail: '8 slow rounds on hands and knees' },
      { name: 'Standing hip circles', detail: '8 each direction, holding a counter if you like' },
    ],
  },
  {
    id: 'pre-strength', track: 'prenatal', title: 'Prenatal strength', minutes: 20, level: 'Moderate', equipment: 'Chair, optional light dumbbells',
    moves: [
      { name: 'Squat to chair', detail: '10 reps, slow on the way down' },
      { name: 'Wall push-ups', detail: '10 reps' },
      { name: 'Supported row', detail: '10 each side, one hand on a chair, light weight in the other' },
      { name: 'Side-lying leg lifts', detail: '10 each side' },
      { name: 'Calf raises', detail: '15 reps holding a counter' },
    ],
  },
  {
    id: 'pre-hips', track: 'prenatal', title: 'Hips & pelvic floor release', minutes: 12, level: 'Gentle', equipment: 'None',
    moves: [
      { name: 'Supported deep squat hold', detail: '5 slow breaths holding a sturdy surface' },
      { name: 'Pelvic floor lift & release', detail: '8 reps. Gentle lift on the exhale, full release on the inhale' },
      { name: 'Wide-knee child\'s pose', detail: '5 breaths' },
      { name: 'Seated figure-4 stretch', detail: '5 breaths each side' },
    ],
  },
  {
    id: 'pp-breath', track: 'postpartum', title: 'Breathe & reconnect', minutes: 10, level: 'Gentle', equipment: 'None',
    moves: [
      { name: '360 breathing', detail: '2 minutes. Breathe into your ribs, belly, and back' },
      { name: 'Pelvic floor lift & release', detail: '8 reps, fully relaxing between each' },
      { name: 'Pelvic tilts', detail: '10 slow reps lying on your back' },
      { name: 'Heel slides', detail: '8 each leg' },
      { name: 'Gentle walk', detail: '5 to 10 minutes, whatever feels good' },
    ],
  },
  {
    id: 'pp-core', track: 'postpartum', title: 'Core reconnection', minutes: 15, level: 'Gentle', equipment: 'None',
    moves: [
      { name: 'Toe taps', detail: '8 each side, belly gently drawn in' },
      { name: 'Side-lying clamshells', detail: '12 each side' },
      { name: 'Bird-dog', detail: '8 each side, slow and controlled' },
      { name: 'Incline plank', detail: '3 rounds of 20 seconds with hands on a counter' },
      { name: 'Glute bridge', detail: '12 reps' },
    ],
  },
  {
    id: 'pp-walk', track: 'postpartum', title: 'Stroller walk intervals', minutes: 25, level: 'Moderate', equipment: 'Stroller or comfy shoes',
    moves: [
      { name: 'Warm up', detail: '5 minutes easy walking' },
      { name: 'Intervals', detail: '1 minute brisk, 2 minutes easy, repeat 6 times' },
      { name: 'Cool down', detail: '3 minutes slow walking, then stretch your calves' },
    ],
  },
  {
    id: 'st-home', track: 'strength', title: '20-minute home strength', minutes: 20, level: 'Moderate', equipment: 'Dumbbells',
    moves: [
      { name: 'Goblet squat', detail: '12 reps' },
      { name: 'Incline push-up', detail: '10 reps, hands on a counter or couch' },
      { name: 'Bent-over row', detail: '12 reps' },
      { name: 'Reverse lunge', detail: '8 each side' },
      { name: 'Overhead press', detail: '10 reps' },
      { name: 'Plank', detail: '30 seconds. Do 2 rounds of everything' },
    ],
  },
  {
    id: 'st-walk', track: 'strength', title: 'Walk & power intervals', minutes: 30, level: 'Moderate', equipment: 'None',
    moves: [
      { name: 'Warm up', detail: '5 minutes easy' },
      { name: 'Intervals', detail: '30 seconds fast, 90 seconds easy, repeat 8 times' },
      { name: 'Cool down', detail: '5 minutes easy' },
    ],
  },
  {
    id: 'st-strong', track: 'strength', title: 'Strong & steady 30', minutes: 30, level: 'Strong', equipment: 'Dumbbells',
    moves: [
      { name: 'Squat to press', detail: '12 reps' },
      { name: 'Romanian deadlift', detail: '12 reps' },
      { name: 'Split squat', detail: '10 each side' },
      { name: 'Push-up', detail: '10 reps, on knees if needed' },
      { name: 'Row', detail: '12 reps' },
      { name: 'Farmer carry', detail: '40 seconds. Do 3 rounds of everything' },
    ],
  },
  {
    id: 'st-mobility', track: 'strength', title: 'Tired-shoulders mobility', minutes: 10, level: 'Gentle', equipment: 'None',
    moves: [
      { name: 'Neck rolls', detail: '5 slow circles each way' },
      { name: 'Doorway chest stretch', detail: '30 seconds each side' },
      { name: 'Thread the needle', detail: '6 each side' },
      { name: 'Cat-cow', detail: '10 slow rounds' },
      { name: "Child's pose", detail: '5 deep breaths' },
    ],
  },
  {
    id: 'bal-flamingo', track: 'balance', title: 'Flamingo balance', minutes: 10, level: 'Gentle', equipment: 'Counter or wall',
    moves: [
      { name: 'Flamingo stand', detail: 'Hold on one leg for 20 to 30 seconds, each side, fingertips on the counter' },
      { name: 'Heel-to-toe walk', detail: '10 steps forward, 10 back' },
      { name: 'Sit-to-stand', detail: '10 reps, no hands if you can' },
      { name: 'Single-leg reach', detail: '6 each side' },
      { name: 'Calf raises', detail: '15 reps' },
    ],
  },
  {
    id: 'bal-bones', track: 'balance', title: 'Bone-building strength', minutes: 20, level: 'Moderate', equipment: 'Dumbbells, sturdy step',
    moves: [
      { name: 'Sit-to-stand with weights', detail: '10 reps holding a dumbbell at your chest' },
      { name: 'Step-ups', detail: '10 each side on a low, sturdy step' },
      { name: 'Wall push-ups', detail: '12 reps' },
      { name: 'Row', detail: '12 reps' },
      { name: 'Farmer carry', detail: '30 seconds, 3 rounds' },
    ],
  },
]

export function tracksFor(stage: Stage, weeks: number | null): Track[] {
  switch (stage) {
    case 'pregnant': return ['prenatal']
    case 'postpartum': return (weeks ?? 0) >= 12 ? ['postpartum', 'strength'] : ['postpartum']
    case 'grown': return ['strength', 'balance']
    default: return ['strength']
  }
}
