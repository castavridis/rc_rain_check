// Key functions, playPaperSound, playTap, and playPickup written by Claude
// https://claude.ai/public/artifacts/6f2c0611-f582-46f1-9008-fb39c5234bca

let audioCtx: AudioContext | null = null;

type SoundSettings = {
  volume: number
  durationScale: number
  snap: number
  crispness: number
}
const pick_up_settings: SoundSettings = {
  volume: 0.0125,
  durationScale: 0.7,
  crispness: 1000,
  snap: 0.10,
}
const tap_up_settings: SoundSettings = {
  volume: 0.0075,
  durationScale: 0.3,
  crispness: 8500,
  snap: 0.05,
}
export default function playPaperSound(variant: 'tap' | 'pickup') {
  const ctx = getCtx();
  const settings =
    (variant == 'tap') 
      ? tap_up_settings
      : pick_up_settings
  const volume   = settings.volume;
  const crispness = settings.crispness;
  const snap     = settings.snap;
  const durScale = settings.durationScale;

  // Small random variation so repeated clicks feel natural
  const pitchJitter = 0.88 + Math.random() * 0.24;
  const volJitter   = 0.88 + Math.random() * 0.24;

  const v = volume * volJitter;
  const f = crispness * pitchJitter;

  if (variant === 'tap')     playTap(ctx, v, f, snap, durScale);
  else if (variant === 'pickup')  playPickup(ctx, v, f, snap, durScale);
}

// Get/instantiate AudioContext
function getCtx() {
  if (!audioCtx) audioCtx = new window.AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function makeNoiseBuffer(ctx: AudioContext, duration: number) {
  const len = Math.ceil(ctx.sampleRate * duration);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}
// ── Tap: sharp transient + short noise tail ──────────────────────────────────
function playTap(
  ctx: AudioContext, 
  vol: number, 
  freq: number, 
  snap: number, 
  durScale: number,
) {
  const now = ctx.currentTime;
  const dur = (0.10 + snap * 0.06) * durScale;

  const src = ctx.createBufferSource();
  src.buffer = makeNoiseBuffer(ctx, dur);

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = freq;
  bp.Q.value = 1.2;

  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 800;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(vol * 1.4, now + 0.003);
  env.gain.exponentialRampToValueAtTime(0.001, now + dur);

  src.connect(hp); hp.connect(bp); bp.connect(env); env.connect(ctx.destination);
  src.start(now);
  src.stop(now + dur + 0.01);

  if (snap > 0.2) {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.045 * durScale);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol * snap * 0.25, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.05 * durScale);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.06 * durScale);
  }
}

// ── Pick up: soft swoosh rising then falling ──────────────────────────────────
function playPickup(
  ctx: AudioContext, 
  vol: number, 
  freq: number, 
  snap: number, 
  durScale: number,
) {
  const now = ctx.currentTime;
  const dur = (0.22 + snap * 0.08) * durScale;

  const src = ctx.createBufferSource();
  src.buffer = makeNoiseBuffer(ctx, dur);

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.setValueAtTime(freq * 0.5, now);
  bp.frequency.exponentialRampToValueAtTime(freq * 1.6, now + 0.06 * durScale);
  bp.frequency.exponentialRampToValueAtTime(freq, now + dur);
  bp.Q.value = 0.9;

  const hs = ctx.createBiquadFilter();
  hs.type = 'highshelf';
  hs.frequency.value = 4000;
  hs.gain.value = 6;

  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 500;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(vol * 0.6, now + 0.012);
  env.gain.linearRampToValueAtTime(vol, now + 0.07 * durScale);
  env.gain.exponentialRampToValueAtTime(0.001, now + dur);

  src.connect(hp); hp.connect(bp); bp.connect(hs); hs.connect(env); env.connect(ctx.destination);
  src.start(now);
  src.stop(now + dur + 0.01);
}
