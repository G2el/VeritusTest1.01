import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Settings,
  Share2,
  Palette,
  Plus,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
  Shield,
  Dices,
  Upload,
  Download,
  Check,
  X,
  AlertTriangle,
  Search,
  UserPlus,
  Users,
  Eraser,
  RotateCcw,
  Sparkles,
  BookOpen,
  Crosshair,
  Backpack,
  FileText,
  Zap,
  Eye
} from 'lucide-react';

// ============================================================================
// CONSTANTS & OFFICIAL ORDEM PARANORMAL SYSTEM DATA (PT-BR)
// ============================================================================

const DEFAULT_SKILLS = [
  { id: 'acrobacia', name: 'Acrobacia', attr: 'AGI', trainedOnly: false, armorPenalty: true, training: 0, other: 0, isHomebrew: false },
  { id: 'adestramento', name: 'Adestramento', attr: 'PRE', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'artes', name: 'Artes', attr: 'PRE', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'atletismo', name: 'Atletismo', attr: 'FOR', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'atualidades', name: 'Atualidades', attr: 'INT', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'ciencias', name: 'Ciências', attr: 'INT', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'crime', name: 'Crime', attr: 'AGI', trainedOnly: true, armorPenalty: true, training: 0, other: 0, isHomebrew: false },
  { id: 'diplomacia', name: 'Diplomacia', attr: 'PRE', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'enganacao', name: 'Enganação', attr: 'PRE', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'fortitude', name: 'Fortitude', attr: 'VIG', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'furtividade', name: 'Furtividade', attr: 'AGI', trainedOnly: false, armorPenalty: true, training: 0, other: 0, isHomebrew: false },
  { id: 'iniciativa', name: 'Iniciativa', attr: 'AGI', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'intimidacao', name: 'Intimidação', attr: 'PRE', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'intuicao', name: 'Intuição', attr: 'PRE', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'investigacao', name: 'Investigação', attr: 'INT', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'luta', name: 'Luta', attr: 'FOR', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'medicina', name: 'Medicina', attr: 'INT', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'ocultismo', name: 'Ocultismo', attr: 'INT', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'percepcao', name: 'Percepção', attr: 'PRE', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'pilotagem', name: 'Pilotagem', attr: 'AGI', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'pontaria', name: 'Pontaria', attr: 'AGI', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'profissao', name: 'Profissão', attr: 'INT', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'reflexos', name: 'Reflexos', attr: 'AGI', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'religiao', name: 'Religião', attr: 'PRE', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'sobrevivencia', name: 'Sobrevivência', attr: 'INT', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'tatica', name: 'Tática', attr: 'INT', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'tecnologia', name: 'Tecnologia', attr: 'INT', trainedOnly: true, armorPenalty: false, training: 0, other: 0, isHomebrew: false },
  { id: 'vontade', name: 'Vontade', attr: 'PRE', trainedOnly: false, armorPenalty: false, training: 0, other: 0, isHomebrew: false }
];

const OFFICIAL_ORIGINS = [
  'Acadêmico', 'Agente de Saúde', 'Amnésico', 'Artista', 'Atleta', 'Chef',
  'Cientista Forense', 'Criminoso', 'Cultista Arrependido', 'Desgarrado',
  'Engenheiro', 'Executivo', 'Escritor', 'Investigador', 'Jornalista',
  'Lutador', 'Magnata', 'Mercenário', 'Militar', 'Operário', 'Policial',
  'Professor', 'Religioso', 'Revoltado', 'Servidor Público', 'Teórico da Conspiração',
  'T.I.', 'Trabalhador Rural', 'Trambiqueiro', 'Universitário', 'Vítima'
];

const PATENTES_CONFIG = {
  'Mundano': { limits: [1, 0, 0, 0], credit: 'Baixo' },
  'Recruta': { limits: [2, 0, 0, 0], credit: 'Baixo' },
  'Operador': { limits: [3, 1, 0, 0], credit: 'Médio' },
  'Agente Especial': { limits: [3, 2, 1, 0], credit: 'Médio' },
  'Oficial de Operações': { limits: [3, 3, 2, 1], credit: 'Alto' },
  'Agente de Elite': { limits: [3, 3, 3, 2], credit: 'Ilimitado' }
};

const WEAPON_DAMAGE_TYPES = [
  'Balístico',
  'Conhecimento',
  'Corte',
  'Eletricidade',
  'Energia',
  'Fogo',
  'Frio',
  'Impacto',
  'Mental',
  'Medo',
  'Morte',
  'Perfuração',
  'Sangue',
  'Químico'
];

const NEX_STEPS = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45,
  50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99
];

const RITUAL_CIRCLE_COSTS = {
  '1': 1,
  '2': 3,
  '3': 6,
  '4': 10,
  '1º Círculo': 1,
  '2º Círculo': 3,
  '3º Círculo': 6,
  '4º Círculo': 10
};

const getRitualBaseCost = (circle) => {
  const c = String(circle || '1').replace(/[^0-9]/g, '') || '1';
  return RITUAL_CIRCLE_COSTS[c] ?? 1;
};

const getSkillTrainingColor = (training) => {
  const t = Number(training) || 0;
  if (t === 5) return '#22c55e'; // Treinado = Verde
  if (t === 10) return '#a855f7'; // Veterano = Roxo
  if (t >= 15) return '#f97316'; // Experto = Laranja
  return '#e4e4e7'; // Destreinado = Padrão
};

const TRILHA_TIERS = [
  'NEX 10% / Nível 2',
  'NEX 40% / Nível 8',
  'NEX 65% / Nível 13',
  'NEX 99% / Nível 20'
];

const ELEMENT_STYLES = {
  'Sangue': {
    border: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.08)',
    glow: '0 0 14px rgba(220, 38, 38, 0.22)',
    text: '#f87171',
    label: 'Sangue'
  },
  'Morte': {
    border: '#52525b',
    bg: 'rgba(39, 39, 42, 0.45)',
    glow: '0 0 14px rgba(82, 82, 91, 0.35)',
    text: '#a1a1aa',
    label: 'Morte'
  },
  'Conhecimento': {
    border: '#eab308',
    bg: 'rgba(234, 179, 8, 0.08)',
    glow: '0 0 14px rgba(234, 179, 8, 0.22)',
    text: '#facc15',
    label: 'Conhecimento'
  },
  'Energia': {
    border: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.08)',
    glow: '0 0 14px rgba(236, 72, 153, 0.25)',
    text: '#e879f9',
    label: 'Energia'
  },
  'Medo': {
    border: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.08)',
    glow: '0 0 14px rgba(56, 189, 248, 0.25)',
    text: '#7dd3fc',
    label: 'Medo'
  }
};

const CONDITIONS_DATA = [
  { id: 'abalado', name: 'Abalado', desc: 'O personagem sofre -1d20 em testes. Se ficar abalado novamente, em vez disso fica apavorado. Condição de medo.', effects: { allDiceMod: -1 } },
  { id: 'agarrado', name: 'Agarrado', desc: 'O personagem fica desprevenido e imóvel, sofre -1d20 em testes de ataque e só pode atacar com armas leves. Ataques à distância contra um alvo envolvido na manobra agarrar têm 50% de chance de acertar o alvo errado. Condição de paralisia.', effects: { defMod: -5, refDiceMod: -1, attackDiceMod: -1, zeroMove: true } },
  { id: 'alquebrado', name: 'Alquebrado', desc: 'O custo em pontos de esforço das habilidades e dos rituais do personagem aumenta em +1. Condição mental.', effects: { peCostMod: 1 } },
  { id: 'apavorado', name: 'Apavorado', desc: 'O personagem sofre -2d20 em testes de perícia e deve fugir da fonte do medo da maneira mais eficiente possível. Condição de medo.', effects: { allDiceMod: -2 } },
  { id: 'asfixiado', name: 'Asfixiado', desc: 'O personagem não pode respirar. Pode prender a respiração por um número de rodadas igual ao seu Vigor; depois disso, deve fazer um teste de Fortitude por rodada (DT 5 + 5 por teste anterior). Se falhar, cai inconsciente e perde 1d6 PV por rodada.', effects: {} },
  { id: 'atordoado', name: 'Atordoado', desc: 'O personagem fica desprevenido e não pode fazer ações. Condição mental.', effects: { defMod: -5, refDiceMod: -1 } },
  { id: 'caido', name: 'Caído', desc: 'Deitado no chão. O personagem sofre -2d20 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m. Sofre -5 na Defesa contra ataques corpo a corpo, mas recebe +5 na Defesa contra ataques à distância.', effects: { defMod: -5 } },
  { id: 'cego', name: 'Cego', desc: 'O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre -2d20 em testes de perícias baseadas em Agilidade ou Força. Todos os alvos de seus ataques recebem camuflagem total. Condição de sentidos.', effects: { defMod: -5, refDiceMod: -1, agiForDiceMod: -2, halfMove: true } },
  { id: 'confuso', name: 'Confuso', desc: 'O personagem comporta-se de modo aleatório. Role 1d6 no início de seus turnos para determinar o comportamento. Condição mental.', effects: {} },
  { id: 'debilitado', name: 'Debilitado', desc: 'O personagem sofre -2d20 em testes de Agilidade, Força e Vigor. Se ficar debilitado novamente, em vez disso fica inconsciente.', effects: { agiForVigDiceMod: -2 } },
  { id: 'desprevenido', name: 'Desprevenido', desc: 'Despreparado para reagir. O personagem sofre -5 na Defesa e -1d20 em Reflexos. Você fica desprevenido contra inimigos que não possa perceber.', effects: { defMod: -5, refDiceMod: -1 } },
  { id: 'doente', name: 'Doente', desc: 'Sob efeito de uma doença.', effects: {} },
  { id: 'em_chamas', name: 'Em Chamas', desc: 'O personagem está pegando fogo. No início de seus turnos, sofre 1d6 pontos de dano de fogo. Pode gastar uma ação padrão para apagar o fogo com as mãos.', effects: {} },
  { id: 'enjoado', name: 'Enjoado', desc: 'O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada.', effects: {} },
  { id: 'enlouquecendo', name: 'Enlouquecendo', desc: 'Se iniciar três turnos enlouquecendo na mesma cena (não necessariamente consecutivos), você fica insano. Pode ser encerrada com Diplomacia (DT 20 +5 por vez) ou curando ao menos 1 de Sanidade.', effects: {} },
  { id: 'enredado', name: 'Enredado', desc: 'O personagem fica lento, vulnerável e sofre -1d20 em testes de ataque. Condição de paralisia.', effects: { defMod: -2, attackDiceMod: -1, halfMove: true } },
  { id: 'envenenado', name: 'Envenenado', desc: 'Varia de acordo com o veneno. Pode ser outra condição ou dano recorrente por rodada. Dano recorrente de condições envenenado sempre se acumula.', effects: {} },
  { id: 'esmorecido', name: 'Esmorecido', desc: 'O personagem sofre -2d20 em testes de Intelecto e Presença. Condição mental.', effects: { intPreDiceMod: -2 } },
  { id: 'exausto', name: 'Exausto', desc: 'O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente. Condição de fadiga.', effects: { defMod: -2, agiForVigDiceMod: -2, halfMove: true } },
  { id: 'fascinado', name: 'Fascinado', desc: 'Com a atenção presa em alguma coisa. O personagem sofre -2d20 em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou. Condição mental.', effects: {} },
  { id: 'fatigado', name: 'Fatigado', desc: 'O personagem fica fraco e vulnerável. Se ficar fatigado novamente, em vez disso fica exausto. Condição de fadiga.', effects: { defMod: -2, agiForVigDiceMod: -1 } },
  { id: 'fraco', name: 'Fraco', desc: 'O personagem sofre -1d20 em testes de Agilidade, Força e Vigor. Se ficar fraco novamente, em vez disso fica debilitado.', effects: { agiForVigDiceMod: -1 } },
  { id: 'frustrado', name: 'Frustrado', desc: 'O personagem sofre -1d20 em testes de Intelecto e Presença. Se ficar frustrado novamente, em vez disso fica esmorecido. Condição mental.', effects: { intPreDiceMod: -1 } },
  { id: 'imovel', name: 'Imóvel', desc: 'Todas as formas de deslocamento do personagem são reduzidas a 0m. Condição de paralisia.', effects: { zeroMove: true } },
  { id: 'inconsciente', name: 'Inconsciente', desc: 'O personagem fica indefeso e não pode fazer ações, incluindo reações. Balançar um ser para acordá-lo gasta uma ação padrão.', effects: { defMod: -10, zeroMove: true } },
  { id: 'indefeso', name: 'Indefeso', desc: 'O personagem é considerado desprevenido, mas sofre -10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia.', effects: { defMod: -10 } },
  { id: 'lento', name: 'Lento', desc: 'Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5m) e ele não pode correr ou fazer investidas. Condição de paralisia.', effects: { halfMove: true } },
  { id: 'machucado', name: 'Machucado', desc: 'O personagem tem metade ou menos de seus pontos de vida totais.', effects: {} },
  { id: 'morrendo', name: 'Morrendo', desc: 'Com 0 pontos de vida. Se iniciar três turnos morrendo na mesma cena, você morre. Pode ser encerrada com Medicina (DT 20 +5 por vez) ou efeitos específicos.', effects: { defMod: -10, zeroMove: true } },
  { id: 'ofuscado', name: 'Ofuscado', desc: 'O personagem sofre -1d20 em testes de ataque e de Percepção. Condição de sentidos.', effects: { attackDiceMod: -1 } },
  { id: 'paralisado', name: 'Paralisado', desc: 'O personagem fica imóvel e indefeso e só pode realizar ações puramente mentais. Condição de paralisia.', effects: { defMod: -10, zeroMove: true } },
  { id: 'pasmo', name: 'Pasmo', desc: 'O personagem não pode fazer ações. Condição mental.', effects: {} },
  { id: 'perturbado', name: 'Perturbado', desc: 'Na primeira vez que isso acontece em uma cena, você recebe um efeito de insanidade.', effects: {} },
  { id: 'petrificado', name: 'Petrificado', desc: 'O personagem fica inconsciente e recebe resistência a dano 10.', effects: { defMod: -10, zeroMove: true } },
  { id: 'sangrando', name: 'Sangrando', desc: 'Com um ferimento aberto. No início de seus turnos, deve fazer um teste de Vigor (DT 20). Se passar, estabiliza. Se falhar, perde 1d6 pontos de vida e continua sangrando.', effects: {} },
  { id: 'surdo', name: 'Surdo', desc: 'O personagem não pode fazer testes de Percepção para ouvir e sofre -2d20 em testes de Iniciativa. Além disso, é considerado em condição ruim para lançar rituais. Condição de sentidos.', effects: {} },
  { id: 'surpreendido', name: 'Surpreendido', desc: 'Não ciente de seus inimigos. O personagem fica desprevenido e não pode fazer ações.', effects: { defMod: -5, refDiceMod: -1 } },
  { id: 'vulneravel', name: 'Vulnerável', desc: 'O personagem sofre -2 na Defesa.', effects: { defMod: -2 } }
];

// ============================================================================
// HELPER FUNCTIONS & INITIAL CHARACTER FACTORY (ZERO PRELOADED DATA)
// ============================================================================

const clampInt = (val, min = -999, max = 99999) => {
  const parsed = parseInt(val, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(min, Math.min(max, parsed));
};

// Web Audio API Synthesizer for Dice Rolls, Criticals & Fumbles (Zero external assets)
const playDiceSound = (type = 'roll') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'crit') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.055);
        gain.gain.setValueAtTime(0.11, now + i * 0.055);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.055 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.055);
        osc.stop(now + i * 0.055 + 0.29);
      });
    } else if (type === 'fumble') {
      [220, 196, 164.81].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.09, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.25);
      });
    } else {
      [260, 340, 420].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + Math.random() * 60, now + i * 0.035);
        gain.gain.setValueAtTime(0.08, now + i * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.035 + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.035);
        osc.stop(now + i * 0.035 + 0.08);
      });
    }
  } catch (e) {
    // Ignore audio context restrictions
  }
};

const createEmptyCharacter = (id = null) => ({
  id: id || `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  name: '',
  player: '',
  avatar: '',
  origin: '',
  className: 'Combatente',
  trilha: '',
  affinity: 'Nenhuma',
  attributes: {
    AGI: 1,
    FOR: 1,
    INT: 1,
    PRE: 1,
    VIG: 1
  },
  sobrevivendoRules: {
    decoupledProgression: false,
    determinacaoRule: false
  },
  level: 1,
  nex: 5,
  pePerTurnOverride: null,
  displacement: '9 m / 6 q',
  vitals: {
    pvCurrent: 20,
    pvMax: 20,
    pvTemp: 0,
    sanCurrent: 12,
    sanMax: 12,
    sanTemp: 0,
    peCurrent: 2,
    peMax: 2,
    peTemp: 0,
    pdCurrent: 6,
    pdMax: 6,
    pdTemp: 0
  },
  defenseEquip: 0,
  defenseOther: 0,
  bloqueio: 0,
  esquivaOverride: null,
  proficiencies: '',
  activeConditions: [],
  skills: DEFAULT_SKILLS.map(s => ({ ...s })),
  combatMeta: {
    immunities: '',
    resistances: '',
    vulnerabilities: ''
  },
  attacks: [],
  abilities: [],
  ritualDtOther: 0,
  rituals: [],
  inventoryMeta: {
    prestigePoints: 0,
    patente: 'Recruta',
    itemLimits: [2, 0, 0, 0],
    creditLimit: 'Baixo',
    maxWeightOverride: null
  },
  items: [],
  info: {
    appearance: '',
    personality: '',
    history: '',
    objective: '',
    additional: '',
    freeNotes: '',
    referencePoints: [],
    sketchDataUrl: ''
  }
});

// Deeply sanitize any imported or stored character object so missing nested keys never crash React
const sanitizeCharacterData = (raw, forcedId = null) => {
  const base = createEmptyCharacter(forcedId || raw?.id);
  if (!raw || typeof raw !== 'object') return base;

  const rawLimits = Array.isArray(raw.inventoryMeta?.itemLimits) ? raw.inventoryMeta.itemLimits : base.inventoryMeta.itemLimits;

  return {
    ...base,
    ...raw,
    id: forcedId || raw.id || base.id,
    attributes: {
      ...base.attributes,
      ...(raw.attributes && typeof raw.attributes === 'object' ? raw.attributes : {})
    },
    sobrevivendoRules: {
      ...base.sobrevivendoRules,
      ...(raw.sobrevivendoRules && typeof raw.sobrevivendoRules === 'object' ? raw.sobrevivendoRules : {})
    },
    vitals: {
      ...base.vitals,
      ...(raw.vitals && typeof raw.vitals === 'object' ? raw.vitals : {})
    },
    combatMeta: {
      ...base.combatMeta,
      ...(raw.combatMeta && typeof raw.combatMeta === 'object' ? raw.combatMeta : {})
    },
    inventoryMeta: {
      ...base.inventoryMeta,
      ...(raw.inventoryMeta && typeof raw.inventoryMeta === 'object' ? raw.inventoryMeta : {}),
      itemLimits: [
        clampInt(rawLimits[0] ?? 2, 0, 99),
        clampInt(rawLimits[1] ?? 0, 0, 99),
        clampInt(rawLimits[2] ?? 0, 0, 99),
        clampInt(rawLimits[3] ?? 0, 0, 99)
      ]
    },
    info: {
      ...base.info,
      ...(raw.info && typeof raw.info === 'object' ? raw.info : {}),
      referencePoints: Array.isArray(raw.info?.referencePoints) ? raw.info.referencePoints : []
    },
    activeConditions: Array.isArray(raw.activeConditions) ? raw.activeConditions : [],
    skills:
      Array.isArray(raw.skills) && raw.skills.length > 0
        ? raw.skills.map(s => ({
            id: s.id || `sk_${Math.random().toString(36).slice(2, 7)}`,
            name: s.name || 'Perícia',
            attr: s.attr || 'INT',
            trainedOnly: !!s.trainedOnly,
            armorPenalty: !!s.armorPenalty,
            training: clampInt(s.training, 0, 15),
            other: clampInt(s.other, -50, 99),
            isHomebrew: !!s.isHomebrew
          }))
        : base.skills,
    attacks: Array.isArray(raw.attacks) ? raw.attacks : [],
    abilities: Array.isArray(raw.abilities) ? raw.abilities : [],
    rituals: Array.isArray(raw.rituals) ? raw.rituals : [],
    items: Array.isArray(raw.items) ? raw.items : []
  };
};

// Parse displacement string ("9 m / 6 q") into numeric meters & squares (1.5m = 1q)
const parseDisplacementValues = (dispStr) => {
  const str = String(dispStr || '9 m / 6 q');
  const match = str.match(/([\d.,]+)\s*m\s*\/\s*([\d.,]+)\s*q/i);
  if (match) {
    const m = parseFloat(match[1].replace(',', '.'));
    const q = parseFloat(match[2].replace(',', '.'));
    if (!Number.isNaN(m) && !Number.isNaN(q)) return { meters: m, squares: q };
  }
  const singleNum = parseFloat(str.replace(',', '.'));
  if (!Number.isNaN(singleNum)) {
    const q = Math.round((singleNum / 1.5) * 10) / 10;
    return { meters: singleNum, squares: q };
  }
  return { meters: 9, squares: 6 };
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // --------------------------------------------------------------------------
  // STATE INITIALIZATION & PERSISTENCE
  // --------------------------------------------------------------------------
  const [characters, setCharacters] = useState(() => {
    try {
      const saved = localStorage.getItem('veritus_characters_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(c => sanitizeCharacterData(c));
        }
      }
    } catch (e) {
      console.error('Erro ao carregar fichas do localStorage:', e);
    }
    return [createEmptyCharacter('default_agent')];
  });

  const [activeCharId, setActiveCharId] = useState(() => {
    try {
      const savedId = localStorage.getItem('veritus_active_char_id_v1');
      if (savedId) return savedId;
    } catch (e) {
      // ignore
    }
    return null;
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('veritus_preferences_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          accentColor: '#8b5cf6',
          highContrast: false,
          autoCalculateVitals: true,
          ...parsed
        };
      }
    } catch (e) {
      // ignore
    }
    return {
      accentColor: '#8b5cf6',
      highContrast: false,
      autoCalculateVitals: true
    };
  });

  const [homebrew, setHomebrew] = useState(() => {
    try {
      const saved = localStorage.getItem('veritus_homebrew_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      origins: [],
      trilhas: []
    };
  });

  // UI Navigation & Modal States
  const [activeRightTab, setActiveRightTab] = useState('COMBATE');
  const [activeInfoSubTab, setActiveInfoSubTab] = useState('DESCRICAO');
  const [isEditingAttributes, setIsEditingAttributes] = useState(false);
  const [isSobrevivendoOpen, setIsSobrevivendoOpen] = useState(false);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [conditionSearch, setConditionSearch] = useState('');
  const [showColorPopover, setShowColorPopover] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsTab, setSettingsTab] = useState('PREFS');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [originFilter, setOriginFilter] = useState('');
  const [saveStatus, setSaveStatus] = useState('Salvo');

  // Homebrew Skill Bar State
  const [showNewSkillBar, setShowNewSkillBar] = useState(false);
  const [newSkillForm, setNewSkillForm] = useState({
    id: null,
    name: '',
    attr: 'INT',
    trainedOnly: false,
    armorPenalty: false
  });

  // Custom Dice Input State
  const [customDiceFormula, setCustomDiceFormula] = useState('');

  // Accordion Expanded IDs (Universal Accordion Rule)
  const [expandedCards, setExpandedCards] = useState({});

  // Creation / Edit Modals for Right Column Tabs
  const [attackModal, setAttackModal] = useState({ open: false, data: null });
  const [abilityModal, setAbilityModal] = useState({ open: false, data: null });
  const [ritualModal, setRitualModal] = useState({ open: false, data: null });
  const [itemModal, setItemModal] = useState({ open: false, type: 'Geral', data: null });

  // Dice Roll Toast History (Defaults to showing only the latest roll until history is expanded)
  const [diceToast, setDiceToast] = useState({
    visible: false,
    minimized: false,
    showHistory: false,
    rolls: []
  });

  // Ensure activeCharId always points to a valid character
  const activeChar = useMemo(() => {
    const found = characters.find(c => c.id === activeCharId);
    return found || characters[0];
  }, [characters, activeCharId]);

  // Save to localStorage with indicator
  useEffect(() => {
    setSaveStatus('Salvando...');
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('veritus_characters_v1', JSON.stringify(characters));
        localStorage.setItem('veritus_active_char_id_v1', activeChar.id);
        localStorage.setItem('veritus_preferences_v1', JSON.stringify(preferences));
        localStorage.setItem('veritus_homebrew_v1', JSON.stringify(homebrew));
        setSaveStatus('Salvo');
      } catch (e) {
        console.error('Erro ao salvar estado:', e);
        setSaveStatus('Erro ao salvar');
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [characters, activeChar.id, preferences, homebrew]);

  // Helper to update active character cleanly
  const updateChar = useCallback((updater) => {
    setCharacters(prev =>
      prev.map(ch => {
        if (ch.id !== activeChar.id) return ch;
        return typeof updater === 'function' ? updater(ch) : { ...ch, ...updater };
      })
    );
  }, [activeChar.id]);

  const toggleCardExpand = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // --------------------------------------------------------------------------
  // DERIVED MECHANICAL CALCULATIONS (ORDEM PARANORMAL + SOBREVIVENDO AO HORROR)
  // --------------------------------------------------------------------------

  // Aggregate Condition Modifiers
  const conditionMods = useMemo(() => {
    let defMod = 0;
    let allDiceMod = 0;
    let agiForVigDiceMod = 0;
    let agiForDiceMod = 0;
    let intPreDiceMod = 0;
    let refDiceMod = 0;
    let attackDiceMod = 0;
    let peCostMod = 0;
    let zeroMove = false;
    let halfMove = false;

    activeChar.activeConditions.forEach(condId => {
      const cond = CONDITIONS_DATA.find(c => c.id === condId);
      if (!cond || !cond.effects) return;
      if (cond.effects.defMod) defMod += cond.effects.defMod;
      if (cond.effects.allDiceMod) allDiceMod += cond.effects.allDiceMod;
      if (cond.effects.agiForVigDiceMod) agiForVigDiceMod += cond.effects.agiForVigDiceMod;
      if (cond.effects.agiForDiceMod) agiForDiceMod += cond.effects.agiForDiceMod;
      if (cond.effects.intPreDiceMod) intPreDiceMod += cond.effects.intPreDiceMod;
      if (cond.effects.refDiceMod) refDiceMod += cond.effects.refDiceMod;
      if (cond.effects.attackDiceMod) attackDiceMod += cond.effects.attackDiceMod;
      if (cond.effects.peCostMod) peCostMod += cond.effects.peCostMod;
      if (cond.effects.zeroMove) zeroMove = true;
      if (cond.effects.halfMove) halfMove = true;
    });

    return {
      defMod,
      allDiceMod,
      agiForVigDiceMod,
      agiForDiceMod,
      intPreDiceMod,
      refDiceMod,
      attackDiceMod,
      peCostMod,
      zeroMove,
      halfMove
    };
  }, [activeChar.activeConditions]);

  // PE / PD Limit per Turn
  const pePerTurn = useMemo(() => {
    if (activeChar.pePerTurnOverride !== null && activeChar.pePerTurnOverride !== '') {
      return Math.max(1, clampInt(activeChar.pePerTurnOverride, 1, 99));
    }
    if (activeChar.sobrevivendoRules.decoupledProgression) {
      return Math.max(1, clampInt(activeChar.level, 1, 20));
    }
    const nexVal = clampInt(activeChar.nex, 0, 99);
    if (nexVal < 5) return 1;
    if (nexVal === 99) return 20;
    return Math.max(1, Math.floor(nexVal / 5));
  }, [activeChar.pePerTurnOverride, activeChar.sobrevivendoRules.decoupledProgression, activeChar.level, activeChar.nex]);

  // Total Defense = 10 + AGI + Equip + Outros + Condition Penalty
  const totalDefense = useMemo(() => {
    const base = 10 +
      clampInt(activeChar.attributes.AGI, -10, 20) +
      clampInt(activeChar.defenseEquip, -50, 99) +
      clampInt(activeChar.defenseOther, -50, 99) +
      conditionMods.defMod;
    return Math.max(0, base);
  }, [activeChar.attributes.AGI, activeChar.defenseEquip, activeChar.defenseOther, conditionMods.defMod]);

  // Reflexos Skill Bonus for Esquiva
  const reflexosSkillBonus = useMemo(() => {
    const refSkill = activeChar.skills.find(s => s.id === 'reflexos');
    if (!refSkill) return 0;
    return clampInt(refSkill.training, 0, 50) + clampInt(refSkill.other, -50, 99);
  }, [activeChar.skills]);

  const totalEsquiva = useMemo(() => {
    if (activeChar.esquivaOverride !== null && activeChar.esquivaOverride !== '') {
      return clampInt(activeChar.esquivaOverride, 0, 999);
    }
    return totalDefense + reflexosSkillBonus;
  }, [activeChar.esquivaOverride, totalDefense, reflexosSkillBonus]);

  // Inventory Load & Category Counts
  const inventoryStats = useMemo(() => {
    const counts = { I: 0, II: 0, III: 0, IV: 0 };
    let currentWeight = 0;

    activeChar.items.forEach(item => {
      const w = parseFloat(item.weight) || 0;
      const qty = Math.max(1, clampInt(item.quantity || 1, 1, 999));
      currentWeight += w * qty;
      if (item.category === 'I') counts.I += 1;
      if (item.category === 'II') counts.II += 1;
      if (item.category === 'III') counts.III += 1;
      if (item.category === 'IV') counts.IV += 1;
    });

    const forVal = clampInt(activeChar.attributes.FOR, -5, 20);
    const calculatedMaxWeight = forVal <= 0 ? 2 : forVal * 5;
    const maxWeight =
      activeChar.inventoryMeta.maxWeightOverride !== null &&
      activeChar.inventoryMeta.maxWeightOverride !== ''
        ? clampInt(activeChar.inventoryMeta.maxWeightOverride, 1, 999)
        : calculatedMaxWeight;

    const isOverloaded = currentWeight > maxWeight;

    return {
      counts: [counts.I, counts.II, counts.III, counts.IV],
      currentWeight: Math.round(currentWeight * 10) / 10,
      maxWeight,
      isOverloaded
    };
  }, [activeChar.items, activeChar.attributes.FOR, activeChar.inventoryMeta.maxWeightOverride]);

  // Ritual DT = 10 + PE/Turno + PRE + Outros
  const ritualDT = useMemo(() => {
    return (
      10 +
      pePerTurn +
      clampInt(activeChar.attributes.PRE, -5, 20) +
      clampInt(activeChar.ritualDtOther, -50, 99)
    );
  }, [pePerTurn, activeChar.attributes.PRE, activeChar.ritualDtOther]);

  // Automatic Class Vitals Calculator (triggered on demand or if autoCalculateVitals is enabled)
  const calculateClassVitals = useCallback((charState) => {
    const vig = clampInt(charState.attributes.VIG, -5, 20);
    const pre = clampInt(charState.attributes.PRE, -5, 20);
    const effectiveLevel = charState.sobrevivendoRules.decoupledProgression
      ? clampInt(charState.level, 1, 20)
      : Math.max(1, Math.min(20, charState.nex === 99 ? 20 : Math.floor(clampInt(charState.nex, 5, 99) / 5)));

    let pvMax = 20;
    let peMax = 2;
    let sanMax = 12;
    let pdMax = 6;

    const steps = Math.max(0, effectiveLevel - 1);

    if (charState.className === 'Combatente') {
      pvMax = 20 + vig + steps * (4 + vig);
      peMax = 2 + pre + steps * (2 + pre);
      sanMax = 12 + steps * 3;
      pdMax = 6 + pre + steps * (3 + pre);
    } else if (charState.className === 'Especialista') {
      pvMax = 16 + vig + steps * (3 + vig);
      peMax = 3 + pre + steps * (3 + pre);
      sanMax = 16 + steps * 4;
      pdMax = 8 + pre + steps * (4 + pre);
    } else if (charState.className === 'Ocultista') {
      pvMax = 12 + vig + steps * (2 + vig);
      peMax = 4 + pre + steps * (4 + pre);
      sanMax = 20 + steps * 5;
      pdMax = 10 + pre + steps * (5 + pre);
    } else if (charState.className === 'Sobrevivente') {
      const stage = Math.min(5, effectiveLevel);
      pvMax = 8 + vig + (stage - 1) * 2;
      peMax = 2 + pre + Math.floor((stage - 1) / 2);
      sanMax = 8 + (stage - 1) * 2;
      pdMax = 4 + pre + (stage - 1) * 2;
    }

    return {
      pvMax: Math.max(1, pvMax),
      peMax: Math.max(1, peMax),
      sanMax: Math.max(1, sanMax),
      pdMax: Math.max(1, pdMax)
    };
  }, []);

  // Displacement parsed values (1.5m = 1q)
  const displacementObj = useMemo(
    () => parseDisplacementValues(activeChar.displacement),
    [activeChar.displacement]
  );

  // --------------------------------------------------------------------------
  // DICE ROLLER ENGINE (SUPPORTS Xd20 POOL, KEEP HIGHEST/LOWEST & FORMULAS)
  // --------------------------------------------------------------------------

  const pushDiceRoll = useCallback((rollEntry, playSound = true) => {
    if (playSound) {
      if (rollEntry.isPoolCrit) playDiceSound('crit');
      else if (rollEntry.isPoolFumble) playDiceSound('fumble');
      else playDiceSound('roll');
    }

    setDiceToast(prev => ({
      visible: true,
      minimized: false,
      showHistory: prev.showHistory,
      rolls: [
        {
          id: `roll_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ...rollEntry
        },
        ...prev.rolls.slice(0, 19)
      ]
    }));
  }, []);

  // Roll an Attribute or Skill Pool in Ordem Paranormal rules (Returns result for pre-checks)
  const rollOrdemPool = useCallback((label, attrKey, flatBonus = 0, extraDicePenalty = 0, customSubtitle = null) => {
    const baseAttr = clampInt(activeChar.attributes[attrKey] ?? 1, -5, 20);

    // Calculate condition dice penalties for this attribute
    let condDiceMod = conditionMods.allDiceMod + extraDicePenalty;
    if (['AGI', 'FOR', 'VIG'].includes(attrKey)) {
      condDiceMod += conditionMods.agiForVigDiceMod;
    }
    if (['AGI', 'FOR'].includes(attrKey)) {
      condDiceMod += conditionMods.agiForDiceMod;
    }
    if (['INT', 'PRE'].includes(attrKey)) {
      condDiceMod += conditionMods.intPreDiceMod;
    }

    const netDice = baseAttr + condDiceMod;
    let numDice = 1;
    let takeLowest = false;

    if (netDice > 0) {
      numDice = netDice;
      takeLowest = false;
    } else {
      // 0 produces 2d20kl1, -1 produces 3d20kl1, etc.
      numDice = 2 + Math.abs(netDice);
      takeLowest = true;
    }

    const rawRolls = Array.from({ length: numDice }, () => Math.floor(Math.random() * 20) + 1);
    const chosenDie = takeLowest ? Math.min(...rawRolls) : Math.max(...rawRolls);
    const chosenIndex = rawRolls.indexOf(chosenDie);

    const diceDetails = rawRolls.map((val, idx) => ({
      value: val,
      sides: 20,
      kept: idx === chosenIndex,
      isCrit: val === 20,
      isFumble: val === 1
    }));

    const total = chosenDie + flatBonus;
    const formulaText = `${numDice}d20${takeLowest ? ' (pior)' : ' (melhor)'}${
      flatBonus !== 0 ? (flatBonus > 0 ? ` + ${flatBonus}` : ` - ${Math.abs(flatBonus)}`) : ''
    }`;

    pushDiceRoll({
      title: label,
      subtitle:
        customSubtitle ||
        `Atributo ${attrKey} (${baseAttr})${condDiceMod !== 0 ? ` | Condições (${condDiceMod}d20)` : ''}`,
      formula: formulaText,
      dice: diceDetails,
      modifier: flatBonus,
      total,
      isPoolCrit: chosenDie === 20,
      isPoolFumble: chosenDie === 1
    });

    return { total, chosenDie, diceDetails };
  }, [activeChar.attributes, conditionMods, pushDiceRoll]);

  // Parse and Roll arbitrary dice strings like "3d20k1+10", "2d6+4", "1d12+5"
  const rollFormulaString = useCallback((rawFormula, customTitle = 'Rolagem de Dados', critThreshold = 20) => {
    const cleaned = (rawFormula || '').trim().toLowerCase().replace(/\s+/g, '');
    if (!cleaned) return;

    // Regex matching patterns like 3d20k1+10, 2d20kl1+5, 2d6+1d4+4, d20+5
    const tokenRegex = /([+-]?\d*d\d+(?:k[hl]?\d+)?|[+-]?\d+)/g;
    const tokens = cleaned.match(tokenRegex);

    if (!tokens || tokens.length === 0) {
      pushDiceRoll({
        title: customTitle,
        subtitle: 'Fórmula inválida',
        formula: rawFormula,
        dice: [],
        modifier: 0,
        total: 0
      });
      return;
    }

    let grandTotal = 0;
    let totalFlatMod = 0;
    const allDice = [];

    tokens.forEach(token => {
      if (token.includes('d')) {
        const sign = token.startsWith('-') ? -1 : 1;
        const unsigned = token.replace(/^[+-]/, '');
        const [dicePart, keepPart] = unsigned.split('k');
        const [countStr, sidesStr] = dicePart.split('d');
        const count = Math.min(50, Math.max(1, parseInt(countStr || '1', 10)));
        const sides = Math.min(1000, Math.max(2, parseInt(sidesStr || '20', 10)));

        const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);

        if (keepPart) {
          const keepLowest = keepPart.startsWith('l');
          const keepCount = Math.min(
            count,
            Math.max(1, parseInt(keepPart.replace(/^[hl]/, '') || '1', 10))
          );
          const indexed = rolls.map((val, idx) => ({ val, idx }));
          indexed.sort((a, b) => (keepLowest ? a.val - b.val : b.val - a.val));
          const keptIndices = new Set(indexed.slice(0, keepCount).map(i => i.idx));

          rolls.forEach((val, idx) => {
            const kept = keptIndices.has(idx);
            if (kept) grandTotal += sign * val;
            allDice.push({
              value: val,
              sides,
              kept,
              isCrit: sides === 20 && val >= critThreshold,
              isFumble: sides === 20 && val === 1
            });
          });
        } else {
          rolls.forEach(val => {
            grandTotal += sign * val;
            allDice.push({
              value: val,
              sides,
              kept: true,
              isCrit: sides === 20 && val >= critThreshold,
              isFumble: sides === 20 && val === 1
            });
          });
        }
      } else {
        const modVal = parseInt(token, 10);
        if (!Number.isNaN(modVal)) {
          grandTotal += modVal;
          totalFlatMod += modVal;
        }
      }
    });

    const anyKeptCrit = allDice.some(d => d.kept && d.isCrit);
    const anyKeptFumble = allDice.some(d => d.kept && d.isFumble);

    pushDiceRoll({
      title: customTitle,
      subtitle: 'Fórmula personalizada',
      formula: rawFormula,
      dice: allDice,
      modifier: totalFlatMod,
      total: grandTotal,
      isPoolCrit: anyKeptCrit,
      isPoolFumble: anyKeptFumble
    });
  }, [pushDiceRoll]);

  // Compose final damage formula for an Attack (Base Damage + Extra Damage + Attribute Damage)
  const buildAttackDamageFormula = useCallback(
    (atk) => {
      let f = (atk.damage || '1d4').trim();
      if (atk.extraDamage && atk.extraDamage.trim()) {
        const extra = atk.extraDamage.trim();
        f += extra.startsWith('+') || extra.startsWith('-') ? extra : `+${extra}`;
      }
      if (atk.damageAttr && atk.damageAttr !== 'Nenhum') {
        const attrVal = clampInt(activeChar.attributes[atk.damageAttr] ?? 0, -10, 30);
        if (attrVal !== 0) {
          f += attrVal > 0 ? `+${attrVal}` : `${attrVal}`;
        }
      }
      return f;
    },
    [activeChar.attributes]
  );

  // Roll a specific Skill
  const handleRollSkill = (skill) => {
    const armorPenaltyMod = skill.armorPenalty && inventoryStats.isOverloaded ? -5 : 0;
    const refPenalty = skill.id === 'reflexos' ? conditionMods.refDiceMod : 0;
    const totalBonus = clampInt(skill.training, 0, 50) + clampInt(skill.other, -50, 99) + armorPenaltyMod;
    rollOrdemPool(`Perícia: ${skill.name}`, skill.attr, totalBonus, refPenalty);
  };

  // --------------------------------------------------------------------------
  // VITALS ADJUSTMENT HANDLERS
  // --------------------------------------------------------------------------
  const adjustVital = (currentKey, maxKey, delta) => {
    updateChar(ch => {
      const currentVal = clampInt(ch.vitals[currentKey], 0, 9999);
      const maxVal = Math.max(1, clampInt(ch.vitals[maxKey], 1, 9999));
      const nextVal = Math.max(0, Math.min(maxVal + 50, currentVal + delta));
      return {
        ...ch,
        vitals: {
          ...ch.vitals,
          [currentKey]: nextVal
        }
      };
    });
  };

  const spendEffortOrDetermination = (baseCost, sourceName) => {
    const actualCost = Math.max(0, clampInt(baseCost, 0, 99) + (baseCost > 0 ? conditionMods.peCostMod : 0));
    const isPD = activeChar.sobrevivendoRules.determinacaoRule;
    const key = isPD ? 'pdCurrent' : 'peCurrent';
    const label = isPD ? 'PD' : 'PE';

    updateChar(ch => ({
      ...ch,
      vitals: {
        ...ch.vitals,
        [key]: Math.max(0, clampInt(ch.vitals[key], 0, 999) - actualCost)
      }
    }));

    pushDiceRoll(
      {
        title: `${sourceName}`,
        subtitle: `Custo de ${label} deduzido${conditionMods.peCostMod > 0 ? ' (+1 Alquebrado)' : ''}`,
        formula: `-${actualCost} ${label}`,
        dice: [],
        modifier: -actualCost,
        total: Math.max(0, activeChar.vitals[key] - actualCost)
      },
      false
    );
  };

  // --------------------------------------------------------------------------
  // CHARACTER MANAGEMENT (CREATE, SWITCH, DELETE, EXPORT, IMPORT)
  // --------------------------------------------------------------------------
  const handleCreateNewCharacter = () => {
    const newChar = createEmptyCharacter();
    setCharacters(prev => [...prev, newChar]);
    setActiveCharId(newChar.id);
    setExpandedCards({});
  };

  const handleDeleteCurrentCharacter = () => {
    if (characters.length <= 1) {
      const resetChar = createEmptyCharacter(activeChar.id);
      setCharacters([resetChar]);
      setActiveCharId(resetChar.id);
      setExpandedCards({});
    } else {
      const remaining = characters.filter(c => c.id !== activeChar.id);
      setCharacters(remaining);
      setActiveCharId(remaining[0].id);
      setExpandedCards({});
    }
  };

  const handleExportJSON = () => {
    const payload = {
      veritusVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      character: activeChar,
      homebrew
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (activeChar.name || 'agente_veritus').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    link.href = url;
    link.download = `${safeName}_ficha.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const importedChar = parsed.character || parsed;
        if (importedChar && typeof importedChar === 'object') {
          const sanitized = sanitizeCharacterData(
            importedChar,
            `char_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
          );
          setCharacters(prev => [...prev, sanitized]);
          setActiveCharId(sanitized.id);
          setExpandedCards({});
          if (parsed.homebrew && typeof parsed.homebrew === 'object') {
            setHomebrew(prev => ({
              origins: [
                ...(Array.isArray(prev.origins) ? prev.origins : []),
                ...(Array.isArray(parsed.homebrew.origins) ? parsed.homebrew.origins : [])
              ],
              trilhas: [
                ...(Array.isArray(prev.trilhas) ? prev.trilhas : []),
                ...(Array.isArray(parsed.homebrew.trilhas) ? parsed.homebrew.trilhas : [])
              ]
            }));
          }
          setShowShareModal(false);
        }
      } catch (err) {
        console.error('Erro ao importar JSON:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Combined Origins List (Official + Homebrew)
  const allOriginsList = useMemo(() => {
    const hbNames = homebrew.origins.map(o => o.name);
    return Array.from(new Set([...hbNames, ...OFFICIAL_ORIGINS]));
  }, [homebrew.origins]);

  const filteredOrigins = useMemo(() => {
    if (!originFilter.trim()) return allOriginsList;
    const q = originFilter.toLowerCase();
    return allOriginsList.filter(o => o.toLowerCase().includes(q));
  }, [allOriginsList, originFilter]);

  // Select Origin (and apply Homebrew Origin skills/power if applicable)
  const handleSelectOrigin = (originName) => {
    updateChar(ch => {
      const hbOrigin = homebrew.origins.find(o => o.name.toLowerCase() === originName.toLowerCase());
      let updatedSkills = ch.skills;
      let updatedAbilities = ch.abilities;

      if (hbOrigin) {
        const trainedNames = (hbOrigin.trainedSkills || '')
          .split(',')
          .map(s => s.trim().toLowerCase())
          .filter(Boolean);

        updatedSkills = ch.skills.map(sk => {
          if (trainedNames.includes(sk.name.toLowerCase()) && sk.training === 0) {
            return { ...sk, training: 5 };
          }
          return sk;
        });

        const powerAlreadyExists = ch.abilities.some(ab => ab.title === hbOrigin.powerName);
        if (hbOrigin.powerName && !powerAlreadyExists) {
          updatedAbilities = [
            ...ch.abilities,
            {
              id: `ab_${Date.now()}`,
              title: hbOrigin.powerName,
              category: 'Origem',
              peCost: 0,
              description: hbOrigin.powerText || hbOrigin.description || ''
            }
          ];
        }
      }

      return {
        ...ch,
        origin: originName,
        skills: updatedSkills,
        abilities: updatedAbilities
      };
    });
    setShowOriginDropdown(false);
  };

  // --------------------------------------------------------------------------
  // RENDER STYLING TOKENS
  // --------------------------------------------------------------------------
  const accent = preferences.accentColor || '#8b5cf6';

  return (
    <div
      style={{ '--accent-color': accent }}
      className={`min-h-screen bg-[#0b0b0c] text-[#e4e4e7] font-sans selection:bg-[var(--accent-color)] selection:text-white ${
        preferences.highContrast ? 'contrast-125' : ''
      }`}
    >
      {/* Custom Scoped Styles for Tabular Numbers, Custom Scrollbars & Glows */}
      <style>{`
        .num-mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-variant-numeric: tabular-nums;
        }
        .accent-border {
          border-color: var(--accent-color);
        }
        .accent-glow {
          box-shadow: 0 0 16px -3px var(--accent-color);
        }
        .accent-text {
          color: var(--accent-color);
        }
        .accent-bg {
          background-color: var(--accent-color);
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #0b0b0c;
        }
        ::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent-color);
        }
      `}</style>

      {/* ====================================================================
          TOP HEADER BAR
      ==================================================================== */}
      <header className="border-b border-zinc-800/80 bg-[#0b0b0c]/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-[1640px] mx-auto px-4 py-3 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          {/* Left: Brand + Multi-Character Switcher + Avatar + Identity Inputs */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
            {/* Brand & Agent Switcher */}
            <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-start border-b md:border-b-0 md:border-r border-zinc-800/80 pb-2 md:pb-0 md:pr-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-6 rounded-sm"
                  style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}
                />
                <span className="text-lg font-bold tracking-wider text-[#e4e4e7]">VERITUS</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <select
                    aria-label="Selecionar Agente"
                    value={activeChar.id}
                    onChange={(e) => {
                      setActiveCharId(e.target.value);
                      setExpandedCards({});
                    }}
                    className="bg-[#141416] text-xs text-[#e4e4e7] border border-zinc-800 rounded-md pl-2.5 pr-6 py-1.5 focus:outline-none focus:border-[var(--accent-color)] transition-colors max-w-[150px] truncate"
                  >
                    {characters.map((ch, idx) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.name?.trim() ? ch.name : `Agente #${idx + 1}`}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleCreateNewCharacter}
                  title="Criar Novo Agente"
                  className="p-1.5 rounded-md bg-[#141416] border border-zinc-800 text-[#a1a1aa] hover:text-white hover:border-[var(--accent-color)] transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleDeleteCurrentCharacter}
                  title={characters.length > 1 ? 'Excluir Agente Atual' : 'Limpar Ficha Atual'}
                  className="p-1.5 rounded-md bg-[#141416] border border-zinc-800 text-[#a1a1aa] hover:text-red-400 hover:border-red-500/50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Avatar Box + Identity Grid */}
            <div className="flex items-center gap-4 flex-1 w-full">
              {/* Clickable Square Avatar Placeholder */}
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                title="Alterar imagem do personagem"
                className="w-14 h-14 rounded-lg bg-[#141416] border border-zinc-800 hover:border-[var(--accent-color)] flex items-center justify-center overflow-hidden shrink-0 group relative transition-all"
              >
                {activeChar.avatar ? (
                  <img
                    src={activeChar.avatar}
                    alt={activeChar.name || 'Avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-9 h-9 text-zinc-500 group-hover:text-zinc-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </button>

              {/* Character Identity Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-2 flex-1">
                {/* PERSONAGEM */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold tracking-wider text-[#a1a1aa] uppercase">
                    Personagem
                  </label>
                  <input
                    type="text"
                    value={activeChar.name}
                    onChange={(e) => updateChar({ name: e.target.value })}
                    placeholder="Nome do agente"
                    className="bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-sm text-[#e4e4e7] py-0.5 focus:outline-none transition-colors placeholder:text-zinc-600"
                  />
                </div>

                {/* JOGADOR */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold tracking-wider text-[#a1a1aa] uppercase">
                    Jogador
                  </label>
                  <input
                    type="text"
                    value={activeChar.player}
                    onChange={(e) => updateChar({ player: e.target.value })}
                    placeholder="Nome do jogador"
                    className="bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-sm text-[#e4e4e7] py-0.5 focus:outline-none transition-colors placeholder:text-zinc-600"
                  />
                </div>

                {/* ORIGEM (Searchable Dropdown + Custom Free Text) */}
                <div className="flex flex-col relative">
                  <label className="text-[10px] font-semibold tracking-wider text-[#a1a1aa] uppercase">
                    Origem
                  </label>
                  <div className="flex items-center border-b border-zinc-700 focus-within:border-[var(--accent-color)]">
                    <input
                      type="text"
                      value={activeChar.origin}
                      onFocus={() => setShowOriginDropdown(true)}
                      onChange={(e) => {
                        updateChar({ origin: e.target.value });
                        setOriginFilter(e.target.value);
                        setShowOriginDropdown(true);
                      }}
                      placeholder="Selecionar ou digitar"
                      className="bg-transparent text-sm text-[#e4e4e7] py-0.5 w-full focus:outline-none placeholder:text-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOriginDropdown(prev => !prev)}
                      className="text-zinc-400 hover:text-white px-1"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {showOriginDropdown && (
                    <div
                      onMouseLeave={() => setShowOriginDropdown(false)}
                      className="absolute top-full left-0 mt-1 w-56 max-h-52 overflow-y-auto bg-[#141416] border border-zinc-700 rounded-lg shadow-2xl z-50 p-1"
                    >
                      {filteredOrigins.length === 0 ? (
                        <div className="px-2.5 py-2 text-xs text-[#a1a1aa]">
                          Origem personalizada ativa
                        </div>
                      ) : (
                        filteredOrigins.map(orig => {
                          const isHb = homebrew.origins.some(o => o.name === orig);
                          return (
                            <button
                              key={orig}
                              type="button"
                              onClick={() => handleSelectOrigin(orig)}
                              className="w-full text-left px-2.5 py-1.5 text-xs rounded-md hover:bg-zinc-800 text-[#e4e4e7] flex items-center justify-between"
                            >
                              <span>{orig}</span>
                              {isHb && <span className="text-[10px] accent-text">Homebrew</span>}
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* CLASSE */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold tracking-wider text-[#a1a1aa] uppercase">
                    Classe
                  </label>
                  <select
                    value={activeChar.className}
                    onChange={(e) => {
                      const nextClass = e.target.value;
                      updateChar(ch => {
                        const updated = { ...ch, className: nextClass };
                        if (preferences.autoCalculateVitals) {
                          const calc = calculateClassVitals(updated);
                          updated.vitals = { ...updated.vitals, ...calc };
                        }
                        return updated;
                      });
                    }}
                    className="bg-[#0b0b0c] border-b border-zinc-700 focus:border-[var(--accent-color)] text-sm text-[#e4e4e7] py-0.5 focus:outline-none transition-colors"
                  >
                    <option value="Combatente">Combatente</option>
                    <option value="Especialista">Especialista</option>
                    <option value="Ocultista">Ocultista</option>
                    <option value="Sobrevivente">Sobrevivente</option>
                  </select>
                </div>

                {/* TRILHA (Explicit Free-Text Input + Datalist for Homebrew Trilhas) */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold tracking-wider text-[#a1a1aa] uppercase">
                    Trilha
                  </label>
                  <input
                    type="text"
                    list="veritus-trilhas-list"
                    value={activeChar.trilha}
                    onChange={(e) => updateChar({ trilha: e.target.value })}
                    placeholder="Ex: Aniquilador, Lâmina..."
                    className="bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-sm text-[#e4e4e7] py-0.5 focus:outline-none transition-colors placeholder:text-zinc-600"
                  />
                  <datalist id="veritus-trilhas-list">
                    {homebrew.trilhas
                      .filter(t => !t.className || t.className === activeChar.className)
                      .map(t => (
                        <option key={t.id} value={t.name} />
                      ))}
                  </datalist>
                </div>

                {/* AFINIDADE */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold tracking-wider text-[#a1a1aa] uppercase">
                    Afinidade
                  </label>
                  <select
                    value={activeChar.affinity}
                    onChange={(e) => updateChar({ affinity: e.target.value })}
                    className="bg-[#0b0b0c] border-b border-zinc-700 focus:border-[var(--accent-color)] text-sm text-[#e4e4e7] py-0.5 focus:outline-none transition-colors"
                  >
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="Sangue">Sangue</option>
                    <option value="Conhecimento">Conhecimento</option>
                    <option value="Energia">Energia</option>
                    <option value="Morte">Morte</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Save Status + Personalização + Share/Export + Settings Gear */}
          <div className="flex items-center justify-end gap-2.5 shrink-0 relative">
            <span className="text-[11px] text-[#a1a1aa] hidden sm:inline-block mr-1">
              {saveStatus}
            </span>

            {/* Personalização Button & Floating Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowColorPopover(prev => !prev)}
                style={{ borderColor: accent }}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#141416] text-[#e4e4e7] border hover:brightness-110 flex items-center gap-1.5 transition-all"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>Personalização</span>
              </button>

              {showColorPopover && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#141416] border border-zinc-700 shadow-2xl p-3.5 z-50">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-[#e4e4e7]">Cor do Destaque & Dados</span>
                    <button
                      type="button"
                      onClick={() => setShowColorPopover(false)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Color Picker Input */}
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="color"
                      value={accent}
                      onChange={(e) => setPreferences(p => ({ ...p, accentColor: e.target.value }))}
                      className="w-10 h-9 rounded cursor-pointer bg-transparent border border-zinc-700"
                    />
                    <input
                      type="text"
                      value={accent}
                      onChange={(e) => setPreferences(p => ({ ...p, accentColor: e.target.value }))}
                      className="num-mono text-xs bg-[#0b0b0c] border border-zinc-700 rounded-md px-2.5 py-2 text-[#e4e4e7] flex-1 focus:outline-none focus:border-[var(--accent-color)]"
                    />
                  </div>

                  {/* Preset Paranormal Colors */}
                  <div className="grid grid-cols-6 gap-1.5">
                    {[
                      { hex: '#8b5cf6', name: 'Padrão Veritus' },
                      { hex: '#dc2626', name: 'Sangue' },
                      { hex: '#eab308', name: 'Conhecimento' },
                      { hex: '#ec4899', name: 'Energia' },
                      { hex: '#71717a', name: 'Morte' },
                      { hex: '#38bdf8', name: 'Medo' }
                    ].map(preset => (
                      <button
                        key={preset.hex}
                        type="button"
                        title={preset.name}
                        onClick={() => setPreferences(p => ({ ...p, accentColor: preset.hex }))}
                        style={{ backgroundColor: preset.hex }}
                        className={`h-6 rounded-md border transition-transform hover:scale-105 ${
                          accent.toLowerCase() === preset.hex ? 'border-white ring-1 ring-white' : 'border-black/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Share / Export JSON Button */}
            <button
              type="button"
              onClick={() => setShowShareModal(true)}
              title="Exportar ou Importar Ficha JSON"
              className="p-2 rounded-md bg-[#141416] border border-zinc-800 text-[#a1a1aa] hover:text-white hover:border-[var(--accent-color)] transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Settings Gear Button */}
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              title="Configurações & Criador de Homebrew"
              className="p-2 rounded-md bg-[#141416] border border-zinc-800 text-[#a1a1aa] hover:text-white hover:border-[var(--accent-color)] transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          MAIN 3-COLUMN DESKTOP WORKSPACE
      ==================================================================== */}
      <main className="max-w-[1640px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ==================================================================
            LEFT COLUMN (3 cols): ATTRIBUTES, SOBREVIVENDO AO HORROR, VITALS, DEFENSE, CONDITIONS
        ================================================================== */}
        <section className="lg:col-span-3 flex flex-col gap-5">
          {/* 1. PENTAGRAM ATTRIBUTE WHEEL */}
          <div className="bg-[#141416] border border-zinc-800/90 rounded-xl p-4 relative">
            {/* Edit Attributes Toggle Button (✎) */}
            <button
              type="button"
              onClick={() => setIsEditingAttributes(prev => !prev)}
              title={isEditingAttributes ? 'Concluir Edição de Atributos' : 'Editar Atributos'}
              className={`absolute top-3 right-3 p-1.5 rounded-lg border transition-colors z-10 ${
                isEditingAttributes
                  ? 'bg-[var(--accent-color)] text-white border-transparent'
                  : 'bg-[#0b0b0c] text-[#a1a1aa] border-zinc-800 hover:text-white'
              }`}
            >
              {isEditingAttributes ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            </button>

            {/* Intricate Paranormal Pentagram Wheel Diagram */}
            <div className="relative w-full max-w-[290px] aspect-square mx-auto select-none">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full text-zinc-600/70"
              >
                {/* Outer Occult Ring */}
                <circle cx="150" cy="150" r="118" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="150" cy="150" r="110" fill="none" stroke="#e4e4e7" strokeOpacity="0.22" strokeWidth="2" />
                <circle cx="150" cy="150" r="88" fill="none" stroke="#e4e4e7" strokeOpacity="0.18" strokeWidth="1.5" />

                {/* Pentagram Star & Connecting Spokes */}
                <polygon
                  points="150,42 252,116 213,238 87,238 48,116"
                  fill="none"
                  stroke="#e4e4e7"
                  strokeOpacity="0.2"
                  strokeWidth="1.5"
                />
                <line x1="150" y1="42" x2="150" y2="150" stroke="#e4e4e7" strokeOpacity="0.25" strokeWidth="1.5" />
                <line x1="252" y1="116" x2="150" y2="150" stroke="#e4e4e7" strokeOpacity="0.25" strokeWidth="1.5" />
                <line x1="213" y1="238" x2="150" y2="150" stroke="#e4e4e7" strokeOpacity="0.25" strokeWidth="1.5" />
                <line x1="87" y1="238" x2="150" y2="150" stroke="#e4e4e7" strokeOpacity="0.25" strokeWidth="1.5" />
                <line x1="48" y1="116" x2="150" y2="150" stroke="#e4e4e7" strokeOpacity="0.25" strokeWidth="1.5" />

                {/* Center Hub */}
                <circle cx="150" cy="150" r="38" fill="#0b0b0c" stroke="#e4e4e7" strokeOpacity="0.35" strokeWidth="2" />
              </svg>

              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[11px] font-bold tracking-widest text-[#e4e4e7] uppercase">
                  ATRIBUTOS
                </span>
              </div>

              {/* 5 Circular Attribute Nodes */}
              {[
                { key: 'AGI', full: 'AGILIDADE', left: '50%', top: '14%' },
                { key: 'FOR', full: 'FORÇA', left: '16%', top: '39%' },
                { key: 'INT', full: 'INTELECTO', left: '84%', top: '39%' },
                { key: 'PRE', full: 'PRESENÇA', left: '29%', top: '79%' },
                { key: 'VIG', full: 'VIGOR', left: '71%', top: '79%' }
              ].map(node => {
                const val = activeChar.attributes[node.key];
                return (
                  <div
                    key={node.key}
                    style={{ left: node.left, top: node.top }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-[74px] h-[74px] rounded-full bg-[#0b0b0c] border-2 border-zinc-300/80 hover:border-[var(--accent-color)] flex flex-col items-center justify-center transition-all shadow-lg group"
                  >
                    {isEditingAttributes ? (
                      <input
                        type="number"
                        aria-label={node.full}
                        value={val}
                        onChange={(e) => {
                          const nextVal = clampInt(e.target.value, -5, 20);
                          updateChar(ch => {
                            const updated = {
                              ...ch,
                              attributes: {
                                ...ch.attributes,
                                [node.key]: nextVal
                              }
                            };
                            if (preferences.autoCalculateVitals && (node.key === 'VIG' || node.key === 'PRE')) {
                              updated.vitals = { ...updated.vitals, ...calculateClassVitals(updated) };
                            }
                            return updated;
                          });
                        }}
                        className="num-mono w-12 text-center bg-zinc-900 border border-[var(--accent-color)] rounded text-lg font-bold text-white focus:outline-none"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => rollOrdemPool(`Teste de ${node.full}`, node.key, 0)}
                        title={`Rolar ${node.full} (${val > 0 ? `${val}d20` : '2d20 pior'})`}
                        className="w-full h-full rounded-full flex flex-col items-center justify-center focus:outline-none"
                      >
                        <span className="num-mono text-xl font-bold text-white leading-none group-hover:text-[var(--accent-color)] transition-colors">
                          {val}
                        </span>
                        <span className="text-[7px] tracking-wider text-[#a1a1aa] uppercase mt-1 leading-none">
                          {node.full}
                        </span>
                        <span className="text-[11px] font-extrabold text-[#e4e4e7] tracking-wide leading-tight">
                          {node.key}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 2. "SOBREVIVENDO AO HORROR" EXPANDABLE RULE BOX */}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setIsSobrevivendoOpen(prev => !prev)}
                className="w-full py-2 px-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 hover:border-[var(--accent-color)] text-xs font-semibold tracking-wider uppercase text-[#e4e4e7] flex items-center justify-between transition-all"
              >
                <span>Sobrevivendo ao Horror</span>
                {isSobrevivendoOpen ? (
                  <ChevronUp className="w-4 h-4 accent-text" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />
                )}
              </button>

              {isSobrevivendoOpen && (
                <div className="mt-2 p-2.5 rounded-lg bg-[#0b0b0c] border border-zinc-800/90 flex flex-col gap-2.5 animate-fadeIn">
                  {/* Rule Card 1: NEX & Experiência */}
                  <div className="p-2.5 rounded-md bg-[#141416] border border-zinc-800/80 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#e4e4e7]">
                        NEX & Experiência
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={activeChar.sobrevivendoRules.decoupledProgression}
                        onClick={() =>
                          updateChar(ch => ({
                            ...ch,
                            sobrevivendoRules: {
                              ...ch.sobrevivendoRules,
                              decoupledProgression: !ch.sobrevivendoRules.decoupledProgression
                            }
                          }))
                        }
                        className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                          activeChar.sobrevivendoRules.decoupledProgression
                            ? 'bg-[var(--accent-color)] justify-end'
                            : 'bg-zinc-700 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                      Desacopla a evolução de Nível (1 a 20, para PV, PE e habilidades) da Exposição Paranormal (NEX 0% a 99%).
                    </p>
                  </div>

                  {/* Rule Card 2: Jogando sem Sanidade (Determinação) */}
                  <div className="p-2.5 rounded-md bg-[#141416] border border-zinc-800/80 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#e4e4e7]">
                        Jogando sem Sanidade
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={activeChar.sobrevivendoRules.determinacaoRule}
                        onClick={() =>
                          updateChar(ch => ({
                            ...ch,
                            sobrevivendoRules: {
                              ...ch.sobrevivendoRules,
                              determinacaoRule: !ch.sobrevivendoRules.determinacaoRule
                            }
                          }))
                        }
                        className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                          activeChar.sobrevivendoRules.determinacaoRule
                            ? 'bg-[var(--accent-color)] justify-end'
                            : 'bg-zinc-700 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                      Unifica Sanidade e Pontos de Esforço em uma única barra de Pontos de Determinação (PD).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 3. PROGRESSION ROW: NEX (WHEN STANDARD) OR NÍVEL + NEX (WHEN DECOUPLED), PE/TURNO, DESLOCAMENTO */}
            <div
              className={`mt-4 grid ${
                activeChar.sobrevivendoRules.decoupledProgression ? 'grid-cols-4' : 'grid-cols-3'
              } gap-2 items-start`}
            >
              {/* NÍVEL (Only visible when "NEX & Experiência" is ON) */}
              {activeChar.sobrevivendoRules.decoupledProgression && (
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    aria-label="Nível"
                    min={1}
                    max={20}
                    value={activeChar.level}
                    onChange={(e) => {
                      const lvl = clampInt(e.target.value, 1, 20);
                      updateChar(ch => {
                        const updated = { ...ch, level: lvl };
                        if (preferences.autoCalculateVitals) {
                          updated.vitals = { ...updated.vitals, ...calculateClassVitals(updated) };
                        }
                        return updated;
                      });
                    }}
                    className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 focus:border-[var(--accent-color)] rounded-md py-1.5 text-center text-sm font-bold text-[#e4e4e7] focus:outline-none"
                  />
                  <span className="text-[9px] font-semibold tracking-wider text-[#a1a1aa] uppercase mt-1">
                    NÍVEL
                  </span>
                </div>
              )}

              {/* NEX (%) */}
              <div className="flex flex-col items-center">
                {activeChar.sobrevivendoRules.decoupledProgression ? (
                  /* Free 0% to 99% input when NEX & Experiência is ON */
                  <div className="relative w-full">
                    <input
                      type="number"
                      aria-label="NEX Livre"
                      min={0}
                      max={99}
                      value={activeChar.nex}
                      onChange={(e) => {
                        const nx = clampInt(e.target.value, 0, 99);
                        updateChar({ nex: nx });
                      }}
                      className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 focus:border-[var(--accent-color)] rounded-md py-1.5 pr-4 text-center text-sm font-bold text-[#e4e4e7] focus:outline-none"
                    />
                    <span className="num-mono absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-[#a1a1aa] pointer-events-none">
                      %
                    </span>
                  </div>
                ) : (
                  /* 5% in 5% progression selector (0% to 99%) when NEX & Experiência is OFF */
                  <select
                    aria-label="Progressão de NEX"
                    value={NEX_STEPS.includes(activeChar.nex) ? activeChar.nex : Math.min(99, Math.round(activeChar.nex / 5) * 5)}
                    onChange={(e) => {
                      const nx = clampInt(e.target.value, 0, 99);
                      updateChar(ch => {
                        const syncedLvl = Math.max(1, nx === 99 ? 20 : Math.floor(nx / 5));
                        const updated = { ...ch, nex: nx, level: syncedLvl };
                        if (preferences.autoCalculateVitals) {
                          updated.vitals = { ...updated.vitals, ...calculateClassVitals(updated) };
                        }
                        return updated;
                      });
                    }}
                    className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 focus:border-[var(--accent-color)] rounded-md py-1.5 text-center text-sm font-bold text-[#e4e4e7] focus:outline-none"
                  >
                    {NEX_STEPS.map(step => (
                      <option key={step} value={step} className="bg-[#141416]">
                        {step}%
                      </option>
                    ))}
                  </select>
                )}
                <span className="text-[9px] font-semibold tracking-wider text-[#a1a1aa] uppercase mt-1">
                  NEX
                </span>
              </div>

              {/* PE / TURNO or PD / TURNO */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  aria-label="Limite por Turno"
                  value={pePerTurn}
                  onChange={(e) =>
                    updateChar({
                      pePerTurnOverride: e.target.value === '' ? null : clampInt(e.target.value, 1, 99)
                    })
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 focus:border-[var(--accent-color)] rounded-md py-1.5 text-center text-sm font-bold text-[#e4e4e7] focus:outline-none"
                />
                <span className="text-[9px] font-semibold tracking-wider text-[#a1a1aa] uppercase mt-1 text-center">
                  {activeChar.sobrevivendoRules.determinacaoRule ? 'PD / TURNO' : 'PE / TURNO'}
                </span>
              </div>

              {/* DESLOCAMENTO (Auto-translates 1,5m = 1q and vice versa) */}
              <div className="flex flex-col items-center">
                {conditionMods.zeroMove ? (
                  <div className="num-mono w-full bg-[#0b0b0c] border border-amber-500/70 rounded-md py-1.5 px-1 text-center text-xs font-bold text-amber-300">
                    0m / 0q
                  </div>
                ) : (
                  <div
                    className={`w-full bg-[#0b0b0c] border rounded-md py-1.5 px-1 flex items-center justify-center gap-0.5 ${
                      conditionMods.halfMove
                        ? 'border-amber-500/70 text-amber-300'
                        : 'border-zinc-700 focus-within:border-[var(--accent-color)] text-[#e4e4e7]'
                    }`}
                  >
                    <input
                      type="number"
                      step="1.5"
                      min="0"
                      aria-label="Deslocamento em Metros"
                      title="Deslocamento em Metros (1,5m = 1q)"
                      value={conditionMods.halfMove ? Math.floor(displacementObj.meters / 3) * 1.5 : displacementObj.meters}
                      onChange={(e) => {
                        const rawM = Math.max(0, parseFloat(e.target.value) || 0);
                        const q = Math.round((rawM / 1.5) * 10) / 10;
                        updateChar({ displacement: `${rawM} m / ${q} q` });
                      }}
                      className="num-mono w-8 bg-transparent text-right text-xs font-bold focus:outline-none"
                    />
                    <span className="num-mono text-[10px] text-[#a1a1aa]">m/</span>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      aria-label="Deslocamento em Quadrados"
                      title="Deslocamento em Quadrados (1q = 1,5m)"
                      value={conditionMods.halfMove ? Math.floor(displacementObj.squares / 2) : displacementObj.squares}
                      onChange={(e) => {
                        const rawQ = Math.max(0, parseFloat(e.target.value) || 0);
                        const m = Math.round(rawQ * 1.5 * 10) / 10;
                        updateChar({ displacement: `${m} m / ${rawQ} q` });
                      }}
                      className="num-mono w-6 bg-transparent text-right text-xs font-bold focus:outline-none"
                    />
                    <span className="num-mono text-[10px] text-[#a1a1aa]">q</span>
                  </div>
                )}
                <span className="text-[9px] font-semibold tracking-wider text-[#a1a1aa] uppercase mt-1">
                  DESLOC.
                </span>
              </div>
            </div>

            {/* 4. VITALS STATUS BARS (VIDA, SANIDADE, ESFORÇO OR DETERMINAÇÃO) WITH TEMPORARY POINTS */}
            <div className="mt-4 flex flex-col gap-3">
              {/* VIDA BAR */}
              <VitalBar
                label="VIDA"
                color="#b91c1c"
                current={activeChar.vitals.pvCurrent}
                max={activeChar.vitals.pvMax}
                temp={activeChar.vitals.pvTemp || 0}
                onAdjust={(d) => adjustVital('pvCurrent', 'pvMax', d)}
                onChangeCurrent={(v) =>
                  updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, pvCurrent: clampInt(v, 0, 9999) } }))
                }
                onChangeMax={(v) =>
                  updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, pvMax: Math.max(1, clampInt(v, 1, 9999)) } }))
                }
                onChangeTemp={(v) =>
                  updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, pvTemp: Math.max(0, clampInt(v, 0, 9999)) } }))
                }
              />

              {activeChar.sobrevivendoRules.determinacaoRule ? (
                /* UNIFIED DETERMINAÇÃO (PD) BAR */
                <VitalBar
                  label="DETERMINAÇÃO (PD)"
                  color="#4f46e5"
                  current={activeChar.vitals.pdCurrent}
                  max={activeChar.vitals.pdMax}
                  temp={activeChar.vitals.pdTemp || 0}
                  onAdjust={(d) => adjustVital('pdCurrent', 'pdMax', d)}
                  onChangeCurrent={(v) =>
                    updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, pdCurrent: clampInt(v, 0, 9999) } }))
                  }
                  onChangeMax={(v) =>
                    updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, pdMax: Math.max(1, clampInt(v, 1, 9999)) } }))
                  }
                  onChangeTemp={(v) =>
                    updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, pdTemp: Math.max(0, clampInt(v, 0, 9999)) } }))
                  }
                />
              ) : (
                <>
                  {/* SANIDADE BAR */}
                  <VitalBar
                    label="SANIDADE"
                    color="#7c3aed"
                    current={activeChar.vitals.sanCurrent}
                    max={activeChar.vitals.sanMax}
                    temp={activeChar.vitals.sanTemp || 0}
                    onAdjust={(d) => adjustVital('sanCurrent', 'sanMax', d)}
                    onChangeCurrent={(v) =>
                      updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, sanCurrent: clampInt(v, 0, 9999) } }))
                    }
                    onChangeMax={(v) =>
                      updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, sanMax: Math.max(1, clampInt(v, 1, 9999)) } }))
                    }
                    onChangeTemp={(v) =>
                      updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, sanTemp: Math.max(0, clampInt(v, 0, 9999)) } }))
                    }
                  />

                  {/* ESFORÇO BAR */}
                  <VitalBar
                    label="ESFORÇO"
                    color="#ea580c"
                    current={activeChar.vitals.peCurrent}
                    max={activeChar.vitals.peMax}
                    temp={activeChar.vitals.peTemp || 0}
                    onAdjust={(d) => adjustVital('peCurrent', 'peMax', d)}
                    onChangeCurrent={(v) =>
                      updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, peCurrent: clampInt(v, 0, 9999) } }))
                    }
                    onChangeMax={(v) =>
                      updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, peMax: Math.max(1, clampInt(v, 1, 9999)) } }))
                    }
                    onChangeTemp={(v) =>
                      updateChar(ch => ({ ...ch, vitals: { ...ch.vitals, peTemp: Math.max(0, clampInt(v, 0, 9999)) } }))
                    }
                  />
                </>
              )}
            </div>

            {/* 5. DEFENSE & PROFICIÊNCIAS */}
            <div className="mt-5 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center justify-between gap-2">
                {/* Shield Icon + Total Defense */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-12 h-14 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 48 56" className="w-full h-full">
                      <path
                        d="M24 3L6 10v16c0 13.5 7.7 25.3 18 28 10.3-2.7 18-14.5 18-28V10L24 3z"
                        fill="#0b0b0c"
                        stroke="#e4e4e7"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <span className="num-mono absolute text-base font-extrabold text-white">
                      {totalDefense}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-bold tracking-wider text-[#e4e4e7] uppercase">
                      DEFESA
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa] mt-0.5">
                      <span>= 10 + AGI +</span>
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          value={activeChar.defenseEquip}
                          onChange={(e) => updateChar({ defenseEquip: clampInt(e.target.value, -50, 99) })}
                          className="num-mono w-9 bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-center text-xs text-white focus:outline-none"
                        />
                        <span className="text-[9px] text-[#a1a1aa]">Equip.</span>
                      </div>
                      <span>+</span>
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          value={activeChar.defenseOther}
                          onChange={(e) => updateChar({ defenseOther: clampInt(e.target.value, -50, 99) })}
                          className="num-mono w-9 bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-center text-xs text-white focus:outline-none"
                        />
                        <span className="text-[9px] text-[#a1a1aa]">Outros</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BLOQUEIO & ESQUIVA */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold tracking-wider text-[#a1a1aa] uppercase">
                      BLOQUEIO
                    </span>
                    <input
                      type="number"
                      value={activeChar.bloqueio}
                      onChange={(e) => updateChar({ bloqueio: clampInt(e.target.value, 0, 999) })}
                      className="num-mono w-12 bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-center text-sm font-bold text-[#e4e4e7] py-0.5 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold tracking-wider text-[#a1a1aa] uppercase">
                      ESQUIVA
                    </span>
                    <input
                      type="number"
                      value={totalEsquiva}
                      onChange={(e) =>
                        updateChar({
                          esquivaOverride: e.target.value === '' ? null : clampInt(e.target.value, 0, 999)
                        })
                      }
                      className="num-mono w-12 bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-center text-sm font-bold text-[#e4e4e7] py-0.5 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Multi-line PROFICIÊNCIAS (No Proteção or Resistências text lines here) */}
              <div className="mt-4">
                <label className="block text-[10px] font-bold tracking-wider text-[#a1a1aa] uppercase mb-1.5">
                  PROFICIÊNCIAS
                </label>
                <textarea
                  rows={3}
                  value={activeChar.proficiencies}
                  onChange={(e) => updateChar({ proficiencies: e.target.value })}
                  placeholder="Armas simples, armas táticas, proteções leves..."
                  className="w-full bg-[#0b0b0c] border border-zinc-800 focus:border-[var(--accent-color)] rounded-lg p-2.5 text-xs text-[#e4e4e7] placeholder:text-zinc-600 focus:outline-none resize-y leading-relaxed"
                />
              </div>

              {/* 6. CONDITIONS TRACKER & OFFICIAL REFERENCE ACCORDION */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setIsConditionsOpen(prev => !prev)}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 hover:border-[var(--accent-color)] flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 ${
                        activeChar.activeConditions.length > 0 ? 'text-red-500' : 'text-[#a1a1aa]'
                      }`}
                    />
                    <span className="text-xs font-bold tracking-wider uppercase text-[#e4e4e7]">
                      CONDIÇÕES
                    </span>
                    {activeChar.activeConditions.length > 0 && (
                      <span className="num-mono text-xs font-bold text-red-400">
                        ({activeChar.activeConditions.length})
                      </span>
                    )}
                  </div>
                  {isConditionsOpen ? (
                    <ChevronUp className="w-4 h-4 accent-text" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />
                  )}
                </button>

                {/* Active Condition Quick Chips when collapsed */}
                {!isConditionsOpen && activeChar.activeConditions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {activeChar.activeConditions.map(cid => {
                      const cObj = CONDITIONS_DATA.find(c => c.id === cid);
                      if (!cObj) return null;
                      return (
                        <button
                          key={cid}
                          type="button"
                          onClick={() =>
                            updateChar(ch => ({
                              ...ch,
                              activeConditions: ch.activeConditions.filter(id => id !== cid)
                            }))
                          }
                          title={cObj.desc}
                          className="px-2 py-0.5 rounded bg-red-950/60 border border-red-600/50 text-[11px] text-red-200 hover:bg-red-900/60 flex items-center gap-1"
                        >
                          <span>{cObj.name}</span>
                          <X className="w-3 h-3" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {isConditionsOpen && (
                  <div className="mt-2 p-2.5 rounded-lg bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-2">
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={conditionSearch}
                        onChange={(e) => setConditionSearch(e.target.value)}
                        placeholder="Filtrar 38 condições..."
                        className="w-full bg-[#141416] border border-zinc-800 focus:border-[var(--accent-color)] rounded-md pl-8 pr-2.5 py-1.5 text-xs text-[#e4e4e7] focus:outline-none"
                      />
                    </div>

                    {/* Scrollable List of all 38 Official Conditions */}
                    <div className="max-h-72 overflow-y-auto flex flex-col gap-1.5 pr-1">
                      {CONDITIONS_DATA.filter(c =>
                        c.name.toLowerCase().includes(conditionSearch.toLowerCase()) ||
                        c.desc.toLowerCase().includes(conditionSearch.toLowerCase())
                      ).map(cond => {
                        const isActive = activeChar.activeConditions.includes(cond.id);
                        return (
                          <div
                            key={cond.id}
                            className={`p-2 rounded-md border transition-colors ${
                              isActive
                                ? 'bg-red-950/30 border-red-600/60'
                                : 'bg-[#141416] border-zinc-800/80 hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-xs font-bold uppercase tracking-wide ${
                                  isActive ? 'text-red-400' : 'text-[#e4e4e7]'
                                }`}
                              >
                                {cond.name}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateChar(ch => ({
                                    ...ch,
                                    activeConditions: isActive
                                      ? ch.activeConditions.filter(id => id !== cond.id)
                                      : [...ch.activeConditions, cond.id]
                                  }))
                                }
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                                  isActive
                                    ? 'bg-red-600 text-white'
                                    : 'bg-zinc-800 text-[#a1a1aa] hover:text-white'
                                }`}
                              >
                                {isActive ? 'Ativa' : 'Ativar'}
                              </button>
                            </div>
                            <p className="text-[11px] text-[#a1a1aa] mt-1 leading-relaxed">
                              {cond.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            CENTER COLUMN (4 cols): SKILLS (PERÍCIAS) & HOMEBREW SKILL CREATOR
        ================================================================== */}
        <section className="lg:col-span-4 bg-[#141416] border border-zinc-800/90 rounded-xl p-4 flex flex-col">
          {/* Header & Homebrew Skill Creator Toggle */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold tracking-wider uppercase text-[#e4e4e7]">
              PERÍCIAS
            </h2>
            <button
              type="button"
              onClick={() => {
                setNewSkillForm({ id: null, name: '', attr: 'INT', trainedOnly: false, armorPenalty: false });
                setShowNewSkillBar(prev => !prev);
              }}
              className="px-2.5 py-1 rounded-md bg-[#0b0b0c] border border-zinc-800 hover:border-[var(--accent-color)] text-xs text-[#e4e4e7] flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 accent-text" />
              <span>Nova Perícia Homebrew</span>
            </button>
          </div>

          {/* Compact Homebrew Skill Creator Bar */}
          {showNewSkillBar && (
            <div className="mb-3 p-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-2.5">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newSkillForm.name}
                  onChange={(e) => setNewSkillForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nome da perícia"
                  className="col-span-2 bg-[#141416] border border-zinc-700 focus:border-[var(--accent-color)] rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                />
                <select
                  value={newSkillForm.attr}
                  onChange={(e) => setNewSkillForm(f => ({ ...f, attr: e.target.value }))}
                  className="bg-[#141416] border border-zinc-700 focus:border-[var(--accent-color)] rounded px-2 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="AGI">AGI</option>
                  <option value="FOR">FOR</option>
                  <option value="INT">INT</option>
                  <option value="PRE">PRE</option>
                  <option value="VIG">VIG</option>
                </select>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 text-xs text-[#a1a1aa]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newSkillForm.trainedOnly}
                      onChange={(e) => setNewSkillForm(f => ({ ...f, trainedOnly: e.target.checked }))}
                      className="rounded accent-[var(--accent-color)]"
                    />
                    <span>Somente Treinada (*)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newSkillForm.armorPenalty}
                      onChange={(e) => setNewSkillForm(f => ({ ...f, armorPenalty: e.target.checked }))}
                      className="rounded accent-[var(--accent-color)]"
                    />
                    <span>Penalidade Carga (+)</span>
                  </label>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowNewSkillBar(false)}
                    className="px-2 py-1 text-xs text-[#a1a1aa] hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newSkillForm.name.trim()) return;
                      updateChar(ch => {
                        let nextSkills;
                        if (newSkillForm.id) {
                          nextSkills = ch.skills.map(s =>
                            s.id === newSkillForm.id
                              ? {
                                  ...s,
                                  name: newSkillForm.name.trim(),
                                  attr: newSkillForm.attr,
                                  trainedOnly: newSkillForm.trainedOnly,
                                  armorPenalty: newSkillForm.armorPenalty
                                }
                              : s
                          );
                        } else {
                          nextSkills = [
                            ...ch.skills,
                            {
                              id: `hb_skill_${Date.now()}`,
                              name: newSkillForm.name.trim(),
                              attr: newSkillForm.attr,
                              trainedOnly: newSkillForm.trainedOnly,
                              armorPenalty: newSkillForm.armorPenalty,
                              training: 0,
                              other: 0,
                              isHomebrew: true
                            }
                          ];
                        }
                        nextSkills.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
                        return { ...ch, skills: nextSkills };
                      });
                      setShowNewSkillBar(false);
                    }}
                    style={{ backgroundColor: accent }}
                    className="px-3 py-1 rounded text-xs font-semibold text-white hover:brightness-110"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Skills Table Header */}
          <div className="grid grid-cols-12 gap-1 pb-2 border-b border-zinc-800 text-[10px] font-bold tracking-wider uppercase text-[#a1a1aa] items-center">
            <div className="col-span-5">PERÍCIA</div>
            <div className="col-span-2 text-center">DADOS</div>
            <div className="col-span-1 text-center">BÔNUS</div>
            <div className="col-span-2 text-center">Treino</div>
            <div className="col-span-2 text-center">Outros</div>
          </div>

          {/* Skills Rows */}
          <div className="divide-y divide-zinc-800/50 flex-1">
            {activeChar.skills.map(skill => {
              const armorMod = skill.armorPenalty && inventoryStats.isOverloaded ? -5 : 0;
              const totalBonus = clampInt(skill.training, 0, 50) + clampInt(skill.other, -50, 99) + armorMod;
              const isTrained = skill.training > 0;
              const trainingColor = getSkillTrainingColor(skill.training);

              return (
                <div
                  key={skill.id}
                  className="grid grid-cols-12 gap-1 py-1.5 items-center text-xs hover:bg-zinc-900/50 transition-colors"
                >
                  {/* Skill Name + d20 Roll Trigger + Homebrew Controls */}
                  <div className="col-span-5 flex items-center gap-1.5 min-w-0 pr-1">
                    <button
                      type="button"
                      onClick={() => handleRollSkill(skill)}
                      title={`Rolar ${skill.name} (${skill.attr})`}
                      className="text-zinc-400 hover:text-[var(--accent-color)] transition-colors shrink-0"
                    >
                      <Dices className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRollSkill(skill)}
                      style={{ color: trainingColor }}
                      className={`truncate text-left transition-colors ${
                        isTrained ? 'font-bold' : 'font-medium hover:text-white'
                      }`}
                    >
                      {skill.name}
                      {skill.trainedOnly ? '*' : ''}
                      {skill.armorPenalty ? '+' : ''}
                    </button>

                    {skill.isHomebrew && (
                      <div className="flex items-center gap-1 ml-auto shrink-0">
                        <button
                          type="button"
                          title="Editar Perícia Homebrew"
                          onClick={() => {
                            setNewSkillForm({
                              id: skill.id,
                              name: skill.name,
                              attr: skill.attr,
                              trainedOnly: skill.trainedOnly,
                              armorPenalty: skill.armorPenalty
                            });
                            setShowNewSkillBar(true);
                          }}
                          className="text-zinc-500 hover:text-emerald-400"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          title="Excluir Perícia Homebrew"
                          onClick={() =>
                            updateChar(ch => ({
                              ...ch,
                              skills: ch.skills.filter(s => s.id !== skill.id)
                            }))
                          }
                          className="text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Linked Attribute Selector (DADOS) - Editable for any skill */}
                  <div className="col-span-2 text-center">
                    <select
                      aria-label={`Atributo de ${skill.name}`}
                      value={skill.attr}
                      onChange={(e) => {
                        const nextAttr = e.target.value;
                        updateChar(ch => ({
                          ...ch,
                          skills: ch.skills.map(s => (s.id === skill.id ? { ...s, attr: nextAttr } : s))
                        }));
                      }}
                      className="bg-transparent text-[#a1a1aa] hover:text-white text-[11px] font-medium text-center focus:outline-none cursor-pointer"
                    >
                      <option value="AGI" className="bg-[#141416] text-white">( AGI )</option>
                      <option value="FOR" className="bg-[#141416] text-white">( FOR )</option>
                      <option value="INT" className="bg-[#141416] text-white">( INT )</option>
                      <option value="PRE" className="bg-[#141416] text-white">( PRE )</option>
                      <option value="VIG" className="bg-[#141416] text-white">( VIG )</option>
                    </select>
                  </div>

                  {/* Auto-Calculated Total Bonus */}
                  <div
                    style={{ color: isTrained ? trainingColor : '#e4e4e7' }}
                    className="col-span-1 text-center num-mono font-semibold"
                  >
                    ({totalBonus})
                  </div>

                  {/* Training Selector (0 / 5 / 10 / 15) with Color Coding */}
                  <div className="col-span-2 px-1">
                    <select
                      aria-label={`Treino em ${skill.name}`}
                      value={skill.training}
                      style={{ color: trainingColor }}
                      onChange={(e) => {
                        const tVal = clampInt(e.target.value, 0, 15);
                        updateChar(ch => ({
                          ...ch,
                          skills: ch.skills.map(s => (s.id === skill.id ? { ...s, training: tVal } : s))
                        }));
                      }}
                      className="num-mono w-full bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-center text-xs font-bold py-0.5 focus:outline-none cursor-pointer"
                    >
                      <option value={0} className="bg-[#141416] text-[#e4e4e7]">0</option>
                      <option value={5} className="bg-[#141416] text-[#22c55e]">5</option>
                      <option value={10} className="bg-[#141416] text-[#a855f7]">10</option>
                      <option value={15} className="bg-[#141416] text-[#f97316]">15</option>
                    </select>
                  </div>

                  {/* Outros Manual Modifier */}
                  <div className="col-span-2 px-1">
                    <input
                      type="number"
                      aria-label={`Outros bônus em ${skill.name}`}
                      value={skill.other}
                      onChange={(e) => {
                        const oVal = clampInt(e.target.value, -50, 99);
                        updateChar(ch => ({
                          ...ch,
                          skills: ch.skills.map(s => (s.id === skill.id ? { ...s, other: oVal } : s))
                        }));
                      }}
                      className="num-mono w-full bg-transparent border-b border-zinc-700 focus:border-[var(--accent-color)] text-center text-xs text-[#e4e4e7] py-0.5 focus:outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] text-[#a1a1aa] flex items-center justify-between">
            <span>+ Penalidade de carga. * Somente treinada.</span>
            {inventoryStats.isOverloaded && (
              <span className="text-amber-400 font-semibold">Sobrecarga ativa (-5 em +)</span>
            )}
          </div>
        </section>

        {/* ==================================================================
            RIGHT COLUMN (5 cols): INTERACTIVE 5-TAB WORKSPACE
        ================================================================== */}
        <section className="lg:col-span-5 bg-[#141416] border border-zinc-800/90 rounded-xl p-4 flex flex-col min-h-[700px]">
          {/* 5-Tab Navigation Bar */}
          <nav className="flex items-center gap-2 sm:gap-4 border-b border-zinc-800 pb-2.5 mb-4 overflow-x-auto">
            {[
              { id: 'COMBATE', label: 'COMBATE' },
              { id: 'HABILIDADES', label: 'HABILIDADES' },
              { id: 'RITUAIS', label: 'RITUAIS' },
              { id: 'INVENTARIO', label: 'INVENTÁRIO' },
              { id: 'INFORMACAO', label: 'INFORMAÇÃO' }
            ].map(tab => {
              const active = activeRightTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveRightTab(tab.id)}
                  style={active ? { borderColor: accent } : undefined}
                  className={`text-xs font-bold tracking-wider uppercase pb-1.5 border-b-2 transition-colors whitespace-nowrap ${
                    active
                      ? 'text-white'
                      : 'border-transparent text-[#a1a1aa] hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* ================================================================
              TAB 1: COMBATE
          ================================================================ */}
          {activeRightTab === 'COMBATE' && (
            <div className="flex flex-col gap-5 flex-1">
              {/* Damage Modifiers Row: IMUNIDADES, RESISTÊNCIAS, VULNERABILIDADES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold tracking-wider text-[#a1a1aa] uppercase mb-1">
                    IMUNIDADES
                  </label>
                  <input
                    type="text"
                    value={activeChar.combatMeta.immunities}
                    onChange={(e) =>
                      updateChar(ch => ({
                        ...ch,
                        combatMeta: { ...ch.combatMeta, immunities: e.target.value }
                      }))
                    }
                    placeholder="Nenhuma"
                    className="bg-[#0b0b0c] border border-zinc-800 focus:border-[var(--accent-color)] rounded-lg px-2.5 py-1.5 text-xs text-[#e4e4e7] placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold tracking-wider text-[#a1a1aa] uppercase mb-1">
                    RESISTÊNCIAS
                  </label>
                  <input
                    type="text"
                    value={activeChar.combatMeta.resistances}
                    onChange={(e) =>
                      updateChar(ch => ({
                        ...ch,
                        combatMeta: { ...ch.combatMeta, resistances: e.target.value }
                      }))
                    }
                    placeholder="Ex: Balístico 5, Sangue 10"
                    className="bg-[#0b0b0c] border border-zinc-800 focus:border-[var(--accent-color)] rounded-lg px-2.5 py-1.5 text-xs text-[#e4e4e7] placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold tracking-wider text-[#a1a1aa] uppercase mb-1">
                    VULNERABILIDADES
                  </label>
                  <input
                    type="text"
                    value={activeChar.combatMeta.vulnerabilities}
                    onChange={(e) =>
                      updateChar(ch => ({
                        ...ch,
                        combatMeta: { ...ch.combatMeta, vulnerabilities: e.target.value }
                      }))
                    }
                    placeholder="Nenhuma"
                    className="bg-[#0b0b0c] border border-zinc-800 focus:border-[var(--accent-color)] rounded-lg px-2.5 py-1.5 text-xs text-[#e4e4e7] placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Custom Dice Roller Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  rollFormulaString(customDiceFormula, 'Rolagem Livre');
                }}
                className="flex items-center gap-2 border-b border-zinc-700 focus-within:border-[var(--accent-color)] pb-1.5"
              >
                <input
                  type="text"
                  value={customDiceFormula}
                  onChange={(e) => setCustomDiceFormula(e.target.value)}
                  placeholder="Rolar dados (ex: 3d20k1+10, 2d6+4)"
                  className="num-mono bg-transparent text-xs text-[#e4e4e7] w-full focus:outline-none placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  title="Rolar Fórmula"
                  className="p-1 text-zinc-300 hover:text-[var(--accent-color)] transition-colors"
                >
                  <Dices className="w-5 h-5" />
                </button>
              </form>

              {/* Attacks Header & Novo Ataque Button */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setAttackModal({
                      open: true,
                      data: {
                        id: null,
                        name: '',
                        skillId: 'luta',
                        attackBonus: 0,
                        damage: '1d8',
                        extraDamage: '',
                        damageAttr: 'FOR',
                        critRange: 20,
                        critMult: 'x2',
                        damageType: 'Corte',
                        range: 'Curto',
                        notes: ''
                      }
                    })
                  }
                  style={{ borderColor: accent }}
                  className="px-3.5 py-1.5 rounded-md bg-[#0b0b0c] border text-xs font-medium text-[#e4e4e7] hover:brightness-125 transition-all"
                >
                  Novo Ataque
                </button>
              </div>

              {/* Attacks Accordion List */}
              {activeChar.attacks.length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-16">
                  <p className="text-sm font-semibold text-[#e4e4e7]">
                    Você ainda não possui ataques
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {activeChar.attacks.map(atk => {
                    const isOpen = !!expandedCards[atk.id];
                    const linkedSkill = activeChar.skills.find(s => s.id === atk.skillId) || activeChar.skills[0];
                    const fullDamageFormula = buildAttackDamageFormula(atk);

                    return (
                      <div
                        key={atk.id}
                        className="rounded-xl bg-[#18181b] border border-zinc-800/90 p-3.5 transition-all"
                      >
                        {/* Summary Header */}
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCardExpand(atk.id)}
                            className="flex items-center gap-2.5 text-left flex-1"
                          >
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 accent-text shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 accent-text shrink-0" />
                            )}
                            <div>
                              <span className="text-sm font-bold text-white block">
                                {atk.name}
                              </span>
                              <span className="num-mono text-[11px] text-[#a1a1aa]">
                                {linkedSkill?.name} • Dano {fullDamageFormula} ({atk.critRange}/{atk.critMult})
                              </span>
                            </div>
                          </button>

                          {/* Quick Roll Attack & Damage Buttons */}
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const skBonus =
                                  clampInt(linkedSkill?.training, 0, 50) +
                                  clampInt(linkedSkill?.other, -50, 99) +
                                  clampInt(atk.attackBonus, -50, 99);
                                rollOrdemPool(
                                  `Ataque: ${atk.name}`,
                                  linkedSkill?.attr || 'FOR',
                                  skBonus,
                                  conditionMods.attackDiceMod
                                );
                              }}
                              style={{ borderColor: accent }}
                              className="px-2.5 py-1 rounded bg-[#0b0b0c] border text-[11px] font-semibold text-[#e4e4e7] hover:brightness-125 flex items-center gap-1"
                            >
                              <Crosshair className="w-3 h-3 accent-text" />
                              <span>Teste</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                rollFormulaString(
                                  fullDamageFormula,
                                  `Dano: ${atk.name} (${atk.damageType})`,
                                  clampInt(atk.critRange, 15, 20)
                                )
                              }
                              className="px-2.5 py-1 rounded bg-red-950/60 border border-red-700/60 text-[11px] font-semibold text-red-200 hover:bg-red-900/60"
                            >
                              Dano
                            </button>
                          </div>
                        </div>

                        {/* Expanded Body */}
                        {isOpen && (
                          <div className="mt-3 pt-3 border-t border-[var(--accent-color)]/60 text-xs text-[#e4e4e7] flex flex-col gap-2">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-[#0b0b0c] p-2.5 rounded-lg border border-zinc-800/80">
                              <div>
                                <span className="text-[#a1a1aa] block">Perícia</span>
                                <span className="font-semibold">{linkedSkill?.name}</span>
                              </div>
                              <div>
                                <span className="text-[#a1a1aa] block">Dano Total / Tipo</span>
                                <span className="num-mono font-semibold">{fullDamageFormula} ({atk.damageType})</span>
                              </div>
                              <div>
                                <span className="text-[#a1a1aa] block">Crítico</span>
                                <span className="num-mono font-semibold">{atk.critRange} / {atk.critMult}</span>
                              </div>
                              <div>
                                <span className="text-[#a1a1aa] block">Alcance</span>
                                <span className="font-semibold">{atk.range || 'Corpo a corpo'}</span>
                              </div>
                            </div>

                            {atk.notes && (
                              <p className="text-xs text-[#e4e4e7] leading-relaxed whitespace-pre-wrap mt-1">
                                {atk.notes}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-2 mt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  updateChar(ch => ({
                                    ...ch,
                                    attacks: ch.attacks.filter(a => a.id !== atk.id)
                                  }))
                                }
                                className="text-xs font-medium text-[#ef4444] hover:underline"
                              >
                                Remover
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setAttackModal({
                                    open: true,
                                    data: {
                                      extraDamage: '',
                                      damageAttr: 'Nenhum',
                                      ...atk
                                    }
                                  })
                                }
                                className="text-xs font-medium text-[#22c55e] hover:underline"
                              >
                                Editar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================================
              TAB 2: HABILIDADES
          ================================================================ */}
          {activeRightTab === 'HABILIDADES' && (
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a1a1aa]">
                  Poderes de Classe, Origem, Trilha e Poderes Paranormais
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setAbilityModal({
                      open: true,
                      data: {
                        id: null,
                        title: '',
                        category: 'Poder de Classe',
                        element: 'Sangue',
                        trilhaTier: 'NEX 10% / Nível 2',
                        peCost: 0,
                        description: ''
                      }
                    })
                  }
                  style={{ borderColor: accent }}
                  className="px-3.5 py-1.5 rounded-md bg-[#0b0b0c] border text-xs font-medium text-[#e4e4e7] hover:brightness-125 transition-all"
                >
                  Nova Habilidade
                </button>
              </div>

              {activeChar.abilities.length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-16">
                  <p className="text-sm font-semibold text-[#e4e4e7]">
                    Você ainda não possui habilidades registradas
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {activeChar.abilities.map(ab => {
                    const isOpen = !!expandedCards[ab.id];
                    const costNum = clampInt(ab.peCost, 0, 99);
                    const costLabel = activeChar.sobrevivendoRules.determinacaoRule ? 'PD' : 'PE';
                    const isParanormal = ab.category === 'Poder Paranormal';
                    const isTrilha = ab.category === 'Habilidade de Trilha' || ab.category === 'Trilha';
                    const elStyle = isParanormal && ab.element ? ELEMENT_STYLES[ab.element] : null;

                    return (
                      <div
                        key={ab.id}
                        style={
                          elStyle
                            ? {
                                borderColor: elStyle.border,
                                backgroundColor: elStyle.bg,
                                boxShadow: elStyle.glow
                              }
                            : undefined
                        }
                        className={`rounded-xl border p-3.5 transition-all ${
                          !elStyle ? 'bg-[#18181b] border-zinc-800/90' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCardExpand(ab.id)}
                            className="flex items-center gap-2.5 text-left flex-1"
                          >
                            {isOpen ? (
                              <ChevronUp
                                className="w-4 h-4 shrink-0"
                                style={{ color: elStyle ? elStyle.text : accent }}
                              />
                            ) : (
                              <ChevronDown
                                className="w-4 h-4 shrink-0"
                                style={{ color: elStyle ? elStyle.text : accent }}
                              />
                            )}
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {isTrilha && ab.trilhaTier && (
                                  <span
                                    style={{ borderColor: accent, color: accent }}
                                    className="num-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0b0b0c] border"
                                  >
                                    {ab.trilhaTier}
                                  </span>
                                )}
                                <span className="text-sm font-bold text-white">
                                  {ab.title}
                                </span>
                              </div>
                              <span
                                className="text-[11px]"
                                style={{ color: elStyle ? elStyle.text : '#a1a1aa' }}
                              >
                                {ab.category}
                                {isParanormal && ab.element ? ` • ${ab.element}` : ''}
                              </span>
                            </div>
                          </button>

                          {costNum > 0 && (
                            <button
                              type="button"
                              onClick={() => spendEffortOrDetermination(costNum, ab.title)}
                              className="num-mono px-2.5 py-1 rounded bg-[#0b0b0c] border border-amber-600/60 text-[11px] font-semibold text-amber-300 hover:bg-amber-950/50 transition-colors"
                            >
                              Usar ({costNum} {costLabel})
                            </button>
                          )}
                        </div>

                        {isOpen && (
                          <div
                            style={{ borderColor: elStyle ? elStyle.border : `${accent}99` }}
                            className="mt-3 pt-3 border-t"
                          >
                            <p className="text-xs text-[#e4e4e7] leading-relaxed whitespace-pre-wrap">
                              {ab.description}
                            </p>

                            <div className="flex items-center justify-between pt-3 mt-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateChar(ch => ({
                                    ...ch,
                                    abilities: ch.abilities.filter(x => x.id !== ab.id)
                                  }))
                                }
                                className="text-xs font-medium text-[#ef4444] hover:underline"
                              >
                                Remover
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setAbilityModal({
                                    open: true,
                                    data: {
                                      element: 'Sangue',
                                      trilhaTier: 'NEX 10% / Nível 2',
                                      ...ab,
                                      category: ab.category === 'Trilha' ? 'Habilidade de Trilha' : ab.category
                                    }
                                  })
                                }
                                className="text-xs font-medium text-[#22c55e] hover:underline"
                              >
                                Editar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================================
              TAB 3: RITUAIS (WITH ELEMENTAL BORDER STYLING & AUTOMATION)
          ================================================================ */}
          {activeRightTab === 'RITUAIS' && (
            <div className="flex flex-col gap-4 flex-1">
              {/* Ritual DT Header Box */}
              <div className="p-3 rounded-xl bg-[#0b0b0c] border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    style={{ borderColor: accent }}
                    className="num-mono w-11 h-11 rounded-lg bg-[#141416] border-2 flex items-center justify-center text-base font-extrabold text-white"
                  >
                    {ritualDT}
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider uppercase text-[#e4e4e7]">
                      DT DE RITUAIS
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa] mt-0.5">
                      <span>10 + Limite/Turno ({pePerTurn}) + PRE ({activeChar.attributes.PRE}) + Outros:</span>
                      <input
                        type="number"
                        value={activeChar.ritualDtOther}
                        onChange={(e) => updateChar({ ritualDtOther: clampInt(e.target.value, -50, 99) })}
                        className="num-mono w-10 bg-[#141416] border border-zinc-700 focus:border-[var(--accent-color)] rounded px-1 py-0.5 text-center text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setRitualModal({
                      open: true,
                      data: {
                        id: null,
                        name: '',
                        element: 'Conhecimento',
                        circle: '1',
                        execution: 'Padrão',
                        range: 'Pessoal',
                        area: '',
                        target: '',
                        duration: '',
                        effect: '',
                        resistance: '',
                        diceNormal: '',
                        diceDiscente: '',
                        diceVerdadeiro: '',
                        discenteExtraCost: 2,
                        verdadeiroExtraCost: 5,
                        description: '',
                        discente: '',
                        verdadeiro: ''
                      }
                    })
                  }
                  style={{ borderColor: accent }}
                  className="px-3.5 py-1.5 rounded-md bg-[#141416] border text-xs font-medium text-[#e4e4e7] hover:brightness-125 transition-all"
                >
                  Novo Ritual
                </button>
              </div>

              {/* Rituals Accordion List (With Dedicated Scroll Container) */}
              {activeChar.rituals.length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-16">
                  <p className="text-sm font-semibold text-[#e4e4e7]">
                    Você ainda não possui rituais conhecidos
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1.5">
                  {activeChar.rituals.map(rit => {
                    const isOpen = !!expandedCards[rit.id];
                    const elStyle = ELEMENT_STYLES[rit.element] || ELEMENT_STYLES['Medo'];
                    const costLabel = activeChar.sobrevivendoRules.determinacaoRule ? 'PD' : 'PE';
                    const circleNum = String(rit.circle || '1').replace(/[^0-9]/g, '') || '1';
                    const baseCost = getRitualBaseCost(circleNum);
                    const discAdd = clampInt(rit.discenteExtraCost ?? 2, 0, 99);
                    const verdAdd = clampInt(rit.verdadeiroExtraCost ?? 5, 0, 99);
                    const discTotalCost = baseCost + discAdd;
                    const verdTotalCost = baseCost + verdAdd;

                    // Pre-check Ocultismo against Ritual Cost DT (20 + PE spent) or Sheet DT de Rituais
                    // Per user instruction: automatically rolls Ocultismo against the player's DT de Rituais; if passed, rolls damage; if failed, cancels damage roll.
                    const castAndRollRitual = (versionLabel, costToSpend, diceFormula) => {
                      spendEffortOrDetermination(costToSpend, `${rit.name} (${versionLabel})`);

                      const ocultismoSkill = activeChar.skills.find(s => s.id === 'ocultismo') || {
                        name: 'Ocultismo',
                        attr: 'INT',
                        training: 0,
                        other: 0
                      };
                      const ocuBonus =
                        clampInt(ocultismoSkill.training, 0, 50) +
                        clampInt(ocultismoSkill.other, -50, 99);

                      const checkResult = rollOrdemPool(
                        `Teste de Ocultismo — ${rit.name} (${versionLabel})`,
                        ocultismoSkill.attr || 'INT',
                        ocuBonus,
                        0,
                        `DT de Rituais: ${ritualDT} | Custo: ${costToSpend} ${costLabel}`
                      );

                      if (checkResult.total >= ritualDT) {
                        if (diceFormula && diceFormula.trim()) {
                          rollFormulaString(
                            diceFormula,
                            `Sucesso (DT ${ritualDT})! Dano: ${rit.name} — ${versionLabel} (${rit.element})`
                          );
                        }
                      } else {
                        pushDiceRoll(
                          {
                            title: `Falha na Conjuração: ${rit.name}`,
                            subtitle: `Ocultismo (${checkResult.total}) não superou a DT de Rituais (${ritualDT}). Rolagem de dano cancelada.`,
                            formula: `${checkResult.total} < DT ${ritualDT}`,
                            dice: [],
                            modifier: 0,
                            total: checkResult.total,
                            isPoolFumble: true
                          },
                          true
                        );
                      }
                    };

                    return (
                      <div
                        key={rit.id}
                        style={{
                          borderColor: elStyle.border,
                          backgroundColor: elStyle.bg,
                          boxShadow: elStyle.glow
                        }}
                        className="rounded-xl border p-3.5 transition-all shrink-0"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCardExpand(rit.id)}
                            className="flex items-center gap-2.5 text-left flex-1"
                          >
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 shrink-0" style={{ color: elStyle.text }} />
                            ) : (
                              <ChevronDown className="w-4 h-4 shrink-0" style={{ color: elStyle.text }} />
                            )}
                            <div>
                              <span className="text-sm font-bold text-white block">
                                {rit.name}
                              </span>
                              <span className="text-[11px]" style={{ color: elStyle.text }}>
                                {rit.element} • {circleNum}º Círculo ({baseCost} {costLabel})
                              </span>
                            </div>
                          </button>
                        </div>

                        {isOpen && (
                          <div
                            style={{ borderColor: elStyle.border }}
                            className="mt-3 pt-3 border-t text-xs text-[#e4e4e7] flex flex-col gap-2.5"
                          >
                            {/* Cast & Roll Buttons (Only visible when expanded to save space) */}
                            <div className="flex flex-wrap items-center gap-1.5 pb-1">
                              <button
                                type="button"
                                onClick={() => castAndRollRitual('Normal', baseCost, rit.diceNormal)}
                                style={{ borderColor: elStyle.border, color: elStyle.text }}
                                className="num-mono px-2.5 py-1 rounded bg-[#0b0b0c]/90 border text-[11px] font-semibold hover:brightness-125 flex items-center gap-1"
                                title={`Testar Ocultismo (DT ${ritualDT}) e Conjurar Normal`}
                              >
                                <Dices className="w-3.5 h-3.5" />
                                <span>
                                  Conjurar Normal ({baseCost} {costLabel}){rit.diceNormal ? ` • ${rit.diceNormal}` : ''}
                                </span>
                              </button>

                              {(rit.discente || rit.diceDiscente) && (
                                <button
                                  type="button"
                                  onClick={() => castAndRollRitual('Discente', discTotalCost, rit.diceDiscente)}
                                  style={{ borderColor: elStyle.border, color: elStyle.text }}
                                  className="num-mono px-2.5 py-1 rounded bg-[#0b0b0c]/90 border text-[11px] font-semibold hover:brightness-125 flex items-center gap-1"
                                  title={`Testar Ocultismo (DT ${ritualDT}) e Conjurar Discente`}
                                >
                                  <Dices className="w-3.5 h-3.5" />
                                  <span>
                                    Discente ({discTotalCost} {costLabel}){rit.diceDiscente ? ` • ${rit.diceDiscente}` : ''}
                                  </span>
                                </button>
                              )}

                              {(rit.verdadeiro || rit.diceVerdadeiro) && (
                                <button
                                  type="button"
                                  onClick={() => castAndRollRitual('Verdadeiro', verdTotalCost, rit.diceVerdadeiro)}
                                  style={{ borderColor: elStyle.border, color: elStyle.text }}
                                  className="num-mono px-2.5 py-1 rounded bg-[#0b0b0c]/90 border text-[11px] font-semibold hover:brightness-125 flex items-center gap-1"
                                  title={`Testar Ocultismo (DT ${ritualDT}) e Conjurar Verdadeiro`}
                                >
                                  <Dices className="w-3.5 h-3.5" />
                                  <span>
                                    Verdadeiro ({verdTotalCost} {costLabel}){rit.diceVerdadeiro ? ` • ${rit.diceVerdadeiro}` : ''}
                                  </span>
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] bg-[#0b0b0c]/90 p-2.5 rounded-lg border border-zinc-800">
                              <div>
                                <span className="text-[#a1a1aa] block">Execução</span>
                                <span className="font-semibold">{rit.execution || '-'}</span>
                              </div>
                              <div>
                                <span className="text-[#a1a1aa] block">Alcance</span>
                                <span className="font-semibold">{rit.range || '-'}</span>
                              </div>
                              <div>
                                <span className="text-[#a1a1aa] block">Duração</span>
                                <span className="font-semibold">{rit.duration || '-'}</span>
                              </div>
                              {rit.area && (
                                <div>
                                  <span className="text-[#a1a1aa] block">Área</span>
                                  <span className="font-semibold">{rit.area}</span>
                                </div>
                              )}
                              {rit.target && (
                                <div>
                                  <span className="text-[#a1a1aa] block">Alvo</span>
                                  <span className="font-semibold">{rit.target}</span>
                                </div>
                              )}
                              {rit.effect && (
                                <div>
                                  <span className="text-[#a1a1aa] block">Efeito</span>
                                  <span className="font-semibold">{rit.effect}</span>
                                </div>
                              )}
                              <div className="col-span-2 sm:col-span-3">
                                <span className="text-[#a1a1aa] block">Resistência</span>
                                <span className="font-semibold">{rit.resistance || 'Nenhuma'} (DT {ritualDT})</span>
                              </div>
                            </div>

                            {/* Quick Dice Rollers Row */}
                            {(rit.diceNormal || rit.diceDiscente || rit.diceVerdadeiro) && (
                              <div className="flex flex-wrap items-center gap-2 bg-[#0b0b0c]/80 p-2 rounded-lg border border-zinc-800">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa]">
                                  Rolar Dados:
                                </span>
                                {rit.diceNormal && (
                                  <button
                                    type="button"
                                    onClick={() => rollFormulaString(rit.diceNormal, `${rit.name} (Dados)`)}
                                    className="num-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-white text-[11px] text-white flex items-center gap-1"
                                  >
                                    <Dices className="w-3 h-3" style={{ color: elStyle.text }} />
                                    <span>Normal: {rit.diceNormal}</span>
                                  </button>
                                )}
                                {rit.diceDiscente && (
                                  <button
                                    type="button"
                                    onClick={() => rollFormulaString(rit.diceDiscente, `${rit.name} (Dados Discente)`)}
                                    className="num-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-white text-[11px] text-white flex items-center gap-1"
                                  >
                                    <Dices className="w-3 h-3" style={{ color: elStyle.text }} />
                                    <span>Discente: {rit.diceDiscente}</span>
                                  </button>
                                )}
                                {rit.diceVerdadeiro && (
                                  <button
                                    type="button"
                                    onClick={() => rollFormulaString(rit.diceVerdadeiro, `${rit.name} (Dados Verdadeiro)`)}
                                    className="num-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-white text-[11px] text-white flex items-center gap-1"
                                  >
                                    <Dices className="w-3 h-3" style={{ color: elStyle.text }} />
                                    <span>Verdadeiro: {rit.diceVerdadeiro}</span>
                                  </button>
                                )}
                              </div>
                            )}

                            {rit.description && (
                              <p className="text-xs text-[#e4e4e7] leading-relaxed whitespace-pre-wrap">
                                {rit.description}
                              </p>
                            )}

                            {rit.discente && (
                              <div className="p-2 rounded bg-[#0b0b0c]/70 border border-zinc-800">
                                <span className="font-bold text-[11px] block mb-0.5" style={{ color: elStyle.text }}>
                                  Discente (+{discAdd} {costLabel} • Total {discTotalCost} {costLabel}):
                                </span>
                                <p className="text-xs text-[#e4e4e7] whitespace-pre-wrap">{rit.discente}</p>
                              </div>
                            )}

                            {rit.verdadeiro && (
                              <div className="p-2 rounded bg-[#0b0b0c]/70 border border-zinc-800">
                                <span className="font-bold text-[11px] block mb-0.5" style={{ color: elStyle.text }}>
                                  Verdadeiro (+{verdAdd} {costLabel} • Total {verdTotalCost} {costLabel}):
                                </span>
                                <p className="text-xs text-[#e4e4e7] whitespace-pre-wrap">{rit.verdadeiro}</p>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateChar(ch => ({
                                    ...ch,
                                    rituals: ch.rituals.filter(r => r.id !== rit.id)
                                  }))
                                }
                                className="text-xs font-medium text-[#ef4444] hover:underline"
                              >
                                Remover
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setRitualModal({
                                    open: true,
                                    data: {
                                      area: '',
                                      effect: '',
                                      diceNormal: '',
                                      diceDiscente: '',
                                      diceVerdadeiro: '',
                                      discenteExtraCost: 2,
                                      verdadeiroExtraCost: 5,
                                      ...rit,
                                      circle: circleNum
                                    }
                                  })
                                }
                                className="text-xs font-medium text-[#22c55e] hover:underline"
                              >
                                Editar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================================
              TAB 4: INVENTÁRIO (EXACT REFERENCE LOGISTICS GRID)
          ================================================================ */}
          {activeRightTab === 'INVENTARIO' && (
            <div className="flex flex-col gap-4 flex-1">
              {/* Top Logistics Panel matching Screenshot 2 */}
              <div className="p-3.5 rounded-xl bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-3">
                {/* Row 1: PONTOS DE PRESTÍGIO & PATENTE */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase">
                      PONTOS DE PRESTÍGIO
                    </span>
                    <input
                      type="number"
                      value={activeChar.inventoryMeta.prestigePoints}
                      onChange={(e) =>
                        updateChar(ch => ({
                          ...ch,
                          inventoryMeta: {
                            ...ch.inventoryMeta,
                            prestigePoints: clampInt(e.target.value, -99, 9999)
                          }
                        }))
                      }
                      className="num-mono w-16 h-9 bg-[#0b0b0c] border border-zinc-600 focus:border-[var(--accent-color)] text-center text-sm font-bold text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <span className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase">
                      PATENTE
                    </span>
                    <select
                      value={activeChar.inventoryMeta.patente}
                      onChange={(e) => {
                        const newPatente = e.target.value;
                        const preset = PATENTES_CONFIG[newPatente];
                        updateChar(ch => ({
                          ...ch,
                          inventoryMeta: {
                            ...ch.inventoryMeta,
                            patente: newPatente,
                            itemLimits: preset ? [...preset.limits] : ch.inventoryMeta.itemLimits,
                            creditLimit: preset ? preset.credit : ch.inventoryMeta.creditLimit
                          }
                        }));
                      }}
                      className="h-9 flex-1 bg-[#0b0b0c] border border-zinc-600 focus:border-[var(--accent-color)] px-3 text-center text-sm font-bold text-white focus:outline-none"
                    >
                      {Object.keys(PATENTES_CONFIG).map(pat => (
                        <option key={pat} value={pat}>{pat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: LIMITE DE ITENS (Categories I, II, III, IV) */}
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase w-32 shrink-0">
                    LIMITE DE ITENS
                  </span>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3].map(idx => (
                      <input
                        key={idx}
                        type="number"
                        title={`Limite Categoria ${['I', 'II', 'III', 'IV'][idx]}`}
                        value={activeChar.inventoryMeta.itemLimits[idx]}
                        onChange={(e) => {
                          const v = clampInt(e.target.value, 0, 99);
                          updateChar(ch => {
                            const nextLimits = [...ch.inventoryMeta.itemLimits];
                            nextLimits[idx] = v;
                            return {
                              ...ch,
                              inventoryMeta: { ...ch.inventoryMeta, itemLimits: nextLimits }
                            };
                          });
                        }}
                        className="num-mono w-14 h-9 bg-[#0b0b0c] border border-zinc-600 focus:border-[var(--accent-color)] text-center text-sm font-bold text-white focus:outline-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Row 3: NO INVENTÁRIO (Auto-counted Categories I, II, III, IV) */}
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase w-32 shrink-0">
                    NO INVENTÁRIO
                  </span>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3].map(idx => {
                      const count = inventoryStats.counts[idx];
                      const limit = activeChar.inventoryMeta.itemLimits[idx];
                      const exceeded = count > limit;
                      return (
                        <div
                          key={idx}
                          title={`Itens Categoria ${['I', 'II', 'III', 'IV'][idx]} no inventário`}
                          className={`num-mono w-14 h-9 bg-[#0b0b0c] border flex items-center justify-center text-sm font-bold ${
                            exceeded
                              ? 'border-red-500 text-red-400'
                              : 'border-zinc-600 text-white'
                          }`}
                        >
                          {count}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Row 4: LIMITE DE CRÉDITO & CARGA MÁX. */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase">
                      LIMITE DE CRÉDITO
                    </span>
                    <select
                      value={activeChar.inventoryMeta.creditLimit}
                      onChange={(e) =>
                        updateChar(ch => ({
                          ...ch,
                          inventoryMeta: { ...ch.inventoryMeta, creditLimit: e.target.value }
                        }))
                      }
                      className="h-9 px-3 bg-[#0b0b0c] border border-zinc-600 focus:border-[var(--accent-color)] text-center text-sm font-bold text-white focus:outline-none"
                    >
                      <option value="Baixo">Baixo</option>
                      <option value="Médio">Médio</option>
                      <option value="Alto">Alto</option>
                      <option value="Ilimitado">Ilimitado</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase">
                      CARGA MÁX.
                    </span>
                    <div
                      title="Espaços Ocupados Atualmente"
                      className={`num-mono w-14 h-9 bg-[#0b0b0c] border flex items-center justify-center text-sm font-bold ${
                        inventoryStats.isOverloaded
                          ? 'border-amber-500 text-amber-400'
                          : 'border-zinc-600 text-white'
                      }`}
                    >
                      {inventoryStats.currentWeight}
                    </div>
                    <input
                      type="number"
                      title="Carga Máxima (Padrão: 5 x FOR)"
                      value={inventoryStats.maxWeight}
                      onChange={(e) =>
                        updateChar(ch => ({
                          ...ch,
                          inventoryMeta: {
                            ...ch.inventoryMeta,
                            maxWeightOverride:
                              e.target.value === '' ? null : clampInt(e.target.value, 1, 999)
                          }
                        }))
                      }
                      className="num-mono w-14 h-9 bg-[#0b0b0c] border border-zinc-600 focus:border-[var(--accent-color)] text-center text-sm font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 5: NOVO [Arma] [Munição] [Proteção] [Geral] [Item Amald.] */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase mr-1">
                    NOVO
                  </span>
                  {['Arma', 'Munição', 'Proteção', 'Geral', 'Item Amald.'].map(itemType => (
                    <button
                      key={itemType}
                      type="button"
                      onClick={() =>
                        setItemModal({
                          open: true,
                          type: itemType,
                          data: {
                            id: null,
                            name: '',
                            type: itemType,
                            category: itemType === 'Item Amald.' ? 'II' : '0',
                            weight: 1,
                            quantity: 1,
                            description: '',
                            // Weapon specific fields
                            proficiency: 'Armas Simples',
                            weaponType: 'Corpo a Corpo',
                            grip: 'Leve',
                            damage: '1d4',
                            secondaryDamage: '',
                            critRange: 20,
                            critMult: 2,
                            damageType: 'Balístico',
                            range: '-',
                            improvements: [],
                            createAttack: itemType === 'Arma',
                            skillId: 'luta',
                            // Protection specific fields
                            defenseBonus: 1,
                            applyDefenseToEquip: true,
                            // General / Ammo specific fields
                            tag: itemType === 'Munição' ? 'Munição' : 'Acessórios',
                            // Cursed item specific fields
                            element: 'Conhecimento'
                          }
                        })
                      }
                      style={{ borderColor: accent }}
                      className="px-3 py-1.5 bg-[#0b0b0c] border text-xs font-semibold text-[#e4e4e7] hover:brightness-125 transition-all"
                    >
                      {itemType}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inventory Items Accordion List */}
              {activeChar.items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-12">
                  <p className="text-sm font-semibold text-[#e4e4e7]">
                    O inventário está vazio
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {activeChar.items.map(item => {
                    const isOpen = !!expandedCards[item.id];
                    const isCursed = item.type === 'Item Amald.';
                    const cursedStyle = isCursed && item.element ? ELEMENT_STYLES[item.element] : null;

                    return (
                      <div
                        key={item.id}
                        style={
                          cursedStyle
                            ? {
                                borderColor: cursedStyle.border,
                                backgroundColor: cursedStyle.bg,
                                boxShadow: cursedStyle.glow
                              }
                            : undefined
                        }
                        className={`rounded-xl border p-3.5 transition-all ${
                          !cursedStyle ? 'bg-[#18181b] border-zinc-800/90' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCardExpand(item.id)}
                            className="flex items-center gap-2.5 text-left flex-1"
                          >
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 accent-text shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 accent-text shrink-0" />
                            )}
                            <div>
                              <span className="text-sm font-bold text-white block">
                                {item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                              </span>
                              <span className="text-[11px] text-[#a1a1aa]">
                                {item.type}
                                {item.type === 'Arma' && item.damage ? ` • Dano ${item.damage} (${item.damageType || 'Balístico'})` : ''}
                                {item.type === 'Proteção' && item.defenseBonus !== undefined ? ` • Defesa +${item.defenseBonus}` : ''}
                                {(item.type === 'Geral' || item.type === 'Munição') && item.tag ? ` • ${item.tag}` : ''}
                                {item.type === 'Item Amald.' && item.element ? ` • ${item.element}` : ''}
                              </span>
                            </div>
                          </button>

                          <div className="flex items-center gap-2 text-xs num-mono">
                            <span className="px-2 py-0.5 rounded bg-[#0b0b0c] border border-zinc-800 text-[#a1a1aa]">
                              Cat. {item.category}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#0b0b0c] border border-zinc-800 text-[#e4e4e7]">
                              {item.weight} esp.
                            </span>
                          </div>
                        </div>

                        {isOpen && (
                          <div className="mt-3 pt-3 border-t border-[var(--accent-color)]/60 flex flex-col gap-2 text-xs">
                            {item.type === 'Arma' && (
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-[#0b0b0c] p-2.5 rounded-lg border border-zinc-800">
                                <div>
                                  <span className="text-[#a1a1aa] block">Proficiência / Tipo</span>
                                  <span className="font-semibold">{item.proficiency} • {item.weaponType}</span>
                                </div>
                                <div>
                                  <span className="text-[#a1a1aa] block">Empunhadura / Alcance</span>
                                  <span className="font-semibold">{item.grip} • {item.range || '-'}</span>
                                </div>
                                <div>
                                  <span className="text-[#a1a1aa] block">Dano / Secundário</span>
                                  <span className="num-mono font-semibold">
                                    {item.damage}{item.secondaryDamage ? ` / ${item.secondaryDamage}` : ''} ({item.damageType})
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[#a1a1aa] block">Crítico</span>
                                  <span className="num-mono font-semibold">{item.critRange} / x{String(item.critMult).replace(/^x/i, '')}</span>
                                </div>
                              </div>
                            )}

                            {Array.isArray(item.improvements) && item.improvements.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-bold uppercase text-[#a1a1aa]">Melhorias:</span>
                                {item.improvements.map((imp, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded bg-[#0b0b0c] border border-zinc-700 text-[11px] text-[#e4e4e7]"
                                  >
                                    {imp}
                                  </span>
                                ))}
                              </div>
                            )}

                            <p className="text-xs text-[#e4e4e7] leading-relaxed whitespace-pre-wrap">
                              {item.description || 'Sem descrição adicional.'}
                            </p>

                            <div className="flex items-center justify-between pt-2 mt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  updateChar(ch => ({
                                    ...ch,
                                    items: ch.items.filter(i => i.id !== item.id)
                                  }))
                                }
                                className="text-xs font-medium text-[#ef4444] hover:underline"
                              >
                                Remover
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setItemModal({
                                    open: true,
                                    type: item.type,
                                    data: {
                                      proficiency: 'Armas Simples',
                                      weaponType: 'Corpo a Corpo',
                                      grip: 'Leve',
                                      damage: '1d4',
                                      secondaryDamage: '',
                                      critRange: 20,
                                      critMult: 2,
                                      damageType: 'Balístico',
                                      range: '-',
                                      improvements: [],
                                      defenseBonus: 1,
                                      applyDefenseToEquip: false,
                                      tag: 'Acessórios',
                                      element: 'Conhecimento',
                                      ...item,
                                      createAttack: false
                                    }
                                  })
                                }
                                className="text-xs font-medium text-[#22c55e] hover:underline"
                              >
                                Editar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================================
              TAB 5: INFORMAÇÃO (PART 1: DESCRIÇÃO | PART 2: INVESTIGAÇÃO + CANVAS)
          ================================================================ */}
          {activeRightTab === 'INFORMACAO' && (
            <div className="flex flex-col gap-4 flex-1">
              {/* Sub-Section Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#0b0b0c] border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setActiveInfoSubTab('DESCRICAO')}
                  style={activeInfoSubTab === 'DESCRICAO' ? { backgroundColor: accent } : undefined}
                  className={`py-1.5 rounded-md text-xs font-bold transition-colors ${
                    activeInfoSubTab === 'DESCRICAO'
                      ? 'text-white'
                      : 'text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  Descrição do Personagem
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInfoSubTab('INVESTIGACAO')}
                  style={activeInfoSubTab === 'INVESTIGACAO' ? { backgroundColor: accent } : undefined}
                  className={`py-1.5 rounded-md text-xs font-bold transition-colors ${
                    activeInfoSubTab === 'INVESTIGACAO'
                      ? 'text-white'
                      : 'text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  Anotações de Investigação
                </button>
              </div>

              {activeInfoSubTab === 'DESCRICAO' ? (
                /* PART 1: DESCRIÇÃO DO PERSONAGEM */
                <div className="flex flex-col gap-3">
                  {[
                    { key: 'appearance', label: 'Aparência', placeholder: 'Traços físicos, vestimentas, cicatrizes...' },
                    { key: 'personality', label: 'Personalidade', placeholder: 'Maneirismos, medos, convicções...' },
                    { key: 'history', label: 'Histórico', placeholder: 'Passado antes da Ordem e primeiro contato com o Paranormal...' },
                    { key: 'objective', label: 'Objetivo', placeholder: 'O que move o agente a enfrentar o Outro Lado...' },
                    { key: 'additional', label: 'Informações Adicionais', placeholder: 'Detalhes extras, aliados, segredos...' }
                  ].map(field => (
                    <div key={field.key} className="flex flex-col">
                      <label className="text-[11px] font-bold tracking-wider uppercase text-[#a1a1aa] mb-1">
                        {field.label}
                      </label>
                      <textarea
                        rows={3}
                        value={activeChar.info[field.key]}
                        onChange={(e) =>
                          updateChar(ch => ({
                            ...ch,
                            info: { ...ch.info, [field.key]: e.target.value }
                          }))
                        }
                        placeholder={field.placeholder}
                        className="w-full bg-[#0b0b0c] border border-zinc-800 focus:border-[var(--accent-color)] rounded-lg p-2.5 text-xs text-[#e4e4e7] placeholder:text-zinc-600 focus:outline-none resize-y leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* PART 2: ANOTAÇÕES DE INVESTIGAÇÃO & QUADRO DE DESENHO LIVRE */
                <div className="flex flex-col gap-4">
                  {/* Anotações Livres */}
                  <div className="flex flex-col">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[#a1a1aa] mb-1">
                      Anotações Livres da Sessão
                    </label>
                    <textarea
                      rows={4}
                      value={activeChar.info.freeNotes}
                      onChange={(e) =>
                        updateChar(ch => ({
                          ...ch,
                          info: { ...ch.info, freeNotes: e.target.value }
                        }))
                      }
                      placeholder="Pistas encontradas, enigmas, relatos de testemunhas..."
                      className="w-full bg-[#0b0b0c] border border-zinc-800 focus:border-[var(--accent-color)] rounded-lg p-2.5 text-xs text-[#e4e4e7] placeholder:text-zinc-600 focus:outline-none resize-y leading-relaxed"
                    />
                  </div>

                  {/* Pontos de Referência (Structured Tracker) */}
                  <ReferencePointsBox
                    points={activeChar.info.referencePoints || []}
                    accent={accent}
                    onAdd={(pt) =>
                      updateChar(ch => ({
                        ...ch,
                        info: {
                          ...ch.info,
                          referencePoints: [...(ch.info.referencePoints || []), pt]
                        }
                      }))
                    }
                    onRemove={(id) =>
                      updateChar(ch => ({
                        ...ch,
                        info: {
                          ...ch.info,
                          referencePoints: (ch.info.referencePoints || []).filter(p => p.id !== id)
                        }
                      }))
                    }
                  />

                  {/* Quadro de Desenho Livre (Interactive HTML5 Canvas Sketchpad) */}
                  <ParanormalSketchpad
                    initialDataUrl={activeChar.info.sketchDataUrl}
                    onSaveDataUrl={(dataUrl) =>
                      updateChar(ch => ({
                        ...ch,
                        info: { ...ch.info, sketchDataUrl: dataUrl }
                      }))
                    }
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* ====================================================================
          FLOATING DICE ROLLER TOAST / DRAWER (BOTTOM-RIGHT)
          Shows ONLY the latest roll by default; player can click to expand history
      ==================================================================== */}
      {diceToast.visible && diceToast.rolls.length > 0 && (
        <div
          style={{ borderColor: accent, boxShadow: `0 0 25px -5px ${accent}55` }}
          className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 rounded-xl bg-[#141416]/95 backdrop-blur-md border-2 overflow-hidden transition-all"
        >
          {/* Toast Header */}
          <div
            style={{ backgroundColor: `${accent}22` }}
            className="px-3.5 py-2 border-b border-zinc-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Dices className="w-4 h-4" style={{ color: accent }} />
              <span className="text-xs font-bold tracking-wider uppercase text-white">
                Resultado da Rolagem
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                title="Limpar Histórico"
                onClick={() => setDiceToast({ visible: false, minimized: false, showHistory: false, rolls: [] })}
                className="text-[11px] text-[#a1a1aa] hover:text-white px-1"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => setDiceToast(p => ({ ...p, minimized: !p.minimized }))}
                className="text-zinc-400 hover:text-white"
              >
                {diceToast.minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setDiceToast(p => ({ ...p, visible: false }))}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!diceToast.minimized && (
            <div className="p-3 max-h-80 overflow-y-auto flex flex-col gap-2.5">
              {(diceToast.showHistory ? diceToast.rolls : diceToast.rolls.slice(0, 1)).map((roll, idx) => (
                <div
                  key={roll.id}
                  className={`p-3 rounded-lg border ${
                    idx === 0
                      ? 'bg-[#0b0b0c] border-zinc-700'
                      : 'bg-[#0b0b0c]/60 border-zinc-800/70 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {roll.title}
                      </span>
                      <span className="text-[10px] text-[#a1a1aa] block">
                        {roll.subtitle}
                      </span>
                    </div>
                    <span className="num-mono text-[10px] text-zinc-500">
                      {roll.timestamp}
                    </span>
                  </div>

                  {/* Individual Dice Chips */}
                  {roll.dice && roll.dice.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 my-2">
                      {roll.dice.map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className={`num-mono px-2 py-0.5 rounded text-xs font-bold border ${
                            !d.kept
                              ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600 line-through'
                              : d.isCrit
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                              : d.isFumble
                              ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                              : 'bg-zinc-900 border-zinc-700 text-white'
                          }`}
                        >
                          {d.value}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Formula & Final Total */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800/80">
                    <span className="num-mono text-[11px] text-[#a1a1aa]">
                      {roll.formula}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-[#a1a1aa]">
                        Total:
                      </span>
                      <span
                        style={
                          !roll.isPoolCrit && !roll.isPoolFumble ? { color: accent } : undefined
                        }
                        className={`num-mono text-lg font-extrabold ${
                          roll.isPoolCrit
                            ? 'text-emerald-400'
                            : roll.isPoolFumble
                            ? 'text-red-400'
                            : ''
                        }`}
                      >
                        {roll.total}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Expand / Collapse Previous Rolls Button */}
              {diceToast.rolls.length > 1 && (
                <button
                  type="button"
                  onClick={() => setDiceToast(p => ({ ...p, showHistory: !p.showHistory }))}
                  className="w-full py-1.5 rounded-lg bg-[#0b0b0c] border border-zinc-800 hover:border-[var(--accent-color)] text-[11px] font-semibold text-[#a1a1aa] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  {diceToast.showHistory ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span>Ocultar rolagens anteriores</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      <span>Ver histórico ({diceToast.rolls.length - 1} anteriores)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          MODALS (ATTACK, ABILITY, RITUAL, ITEM, AVATAR, SHARE, SETTINGS/HOMEBREW)
      ==================================================================== */}

      {/* 1. ATTACK MODAL (WITH EXTRA DAMAGE & ATTRIBUTE-DAMAGE SELECTOR) */}
      {attackModal.open && (
        <ModalWrapper
          title={attackModal.data?.id ? 'Editar Ataque' : 'Novo Ataque'}
          onClose={() => setAttackModal({ open: false, data: null })}
        >
          <div className="flex flex-col gap-3 text-xs">
            <div>
              <label className="block text-[#a1a1aa] mb-1">Nome do Ataque / Arma</label>
              <input
                type="text"
                value={attackModal.data.name}
                onChange={(e) =>
                  setAttackModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))
                }
                placeholder="Ex: Katana, Pistola, Rajada Mental..."
                className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#a1a1aa] mb-1">Perícia Utilizada</label>
                <select
                  value={attackModal.data.skillId}
                  onChange={(e) =>
                    setAttackModal(m => ({ ...m, data: { ...m.data, skillId: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  {activeChar.skills.map(sk => (
                    <option key={sk.id} value={sk.id}>{sk.name} ({sk.attr})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#a1a1aa] mb-1">Bônus Extra no Ataque</label>
                <input
                  type="number"
                  value={attackModal.data.attackBonus}
                  onChange={(e) =>
                    setAttackModal(m => ({
                      ...m,
                      data: { ...m.data, attackBonus: clampInt(e.target.value, -50, 99) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[#a1a1aa] mb-1">Fórmula de Dano Base</label>
                <input
                  type="text"
                  value={attackModal.data.damage}
                  onChange={(e) =>
                    setAttackModal(m => ({ ...m, data: { ...m.data, damage: e.target.value } }))
                  }
                  placeholder="1d10"
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#a1a1aa] mb-1">Dano Extra</label>
                <input
                  type="text"
                  value={attackModal.data.extraDamage || ''}
                  onChange={(e) =>
                    setAttackModal(m => ({ ...m, data: { ...m.data, extraDamage: e.target.value } }))
                  }
                  placeholder="Ex: 1d6+2"
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#a1a1aa] mb-1">Atributo-Dano</label>
                <select
                  value={attackModal.data.damageAttr || 'Nenhum'}
                  onChange={(e) =>
                    setAttackModal(m => ({ ...m, data: { ...m.data, damageAttr: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Nenhum">Nenhum</option>
                  <option value="FOR">FOR ({activeChar.attributes.FOR})</option>
                  <option value="AGI">AGI ({activeChar.attributes.AGI})</option>
                  <option value="INT">INT ({activeChar.attributes.INT})</option>
                  <option value="PRE">PRE ({activeChar.attributes.PRE})</option>
                  <option value="VIG">VIG ({activeChar.attributes.VIG})</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#a1a1aa] mb-1">Margem Ameaça</label>
                <input
                  type="number"
                  value={attackModal.data.critRange}
                  onChange={(e) =>
                    setAttackModal(m => ({
                      ...m,
                      data: { ...m.data, critRange: clampInt(e.target.value, 1, 20) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#a1a1aa] mb-1">Multiplicador</label>
                <input
                  type="text"
                  value={attackModal.data.critMult}
                  onChange={(e) =>
                    setAttackModal(m => ({ ...m, data: { ...m.data, critMult: e.target.value } }))
                  }
                  placeholder="x2"
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#a1a1aa] mb-1">Tipo de Dano</label>
                <select
                  value={attackModal.data.damageType}
                  onChange={(e) =>
                    setAttackModal(m => ({ ...m, data: { ...m.data, damageType: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  {WEAPON_DAMAGE_TYPES.map(dt => (
                    <option key={dt} value={dt}>{dt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#a1a1aa] mb-1">Alcance</label>
                <input
                  type="text"
                  value={attackModal.data.range}
                  onChange={(e) =>
                    setAttackModal(m => ({ ...m, data: { ...m.data, range: e.target.value } }))
                  }
                  placeholder="Corpo a corpo, Curto, Médio..."
                  className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1">Notas Especiais / Modificações</label>
              <textarea
                rows={3}
                value={attackModal.data.notes}
                onChange={(e) =>
                  setAttackModal(m => ({ ...m, data: { ...m.data, notes: e.target.value } }))
                }
                placeholder="Propriedades da arma, maldições, efeitos em crítico..."
                className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAttackModal({ open: false, data: null })}
                className="px-3 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const d = attackModal.data;
                  if (!d.name.trim()) return;
                  updateChar(ch => {
                    if (d.id) {
                      return {
                        ...ch,
                        attacks: ch.attacks.map(a => (a.id === d.id ? d : a))
                      };
                    }
                    const newId = `atk_${Date.now()}`;
                    setExpandedCards(prev => ({ ...prev, [newId]: true }));
                    return {
                      ...ch,
                      attacks: [...ch.attacks, { ...d, id: newId }]
                    };
                  });
                  setAttackModal({ open: false, data: null });
                }}
                style={{ backgroundColor: accent }}
                className="px-4 py-1.5 rounded-lg font-semibold text-white hover:brightness-110"
              >
                Salvar Ataque
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 2. ABILITY MODAL (WITH PODER PARANORMAL ELEMENT & HABILIDADE DE TRILHA TIER) */}
      {abilityModal.open && (
        <ModalWrapper
          title={abilityModal.data?.id ? 'Editar Habilidade' : 'Nova Habilidade'}
          onClose={() => setAbilityModal({ open: false, data: null })}
        >
          <div className="flex flex-col gap-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#a1a1aa] mb-1">Categoria</label>
                <select
                  value={abilityModal.data.category}
                  onChange={(e) =>
                    setAbilityModal(m => ({ ...m, data: { ...m.data, category: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Poder de Classe">Poder de Classe</option>
                  <option value="Origem">Poder de Origem</option>
                  <option value="Habilidade de Trilha">Habilidade de Trilha</option>
                  <option value="Poder Paranormal">Poder Paranormal</option>
                </select>
              </div>
              <div>
                <label className="block text-[#a1a1aa] mb-1">
                  Custo ({activeChar.sobrevivendoRules.determinacaoRule ? 'PD' : 'PE'})
                </label>
                <input
                  type="number"
                  value={abilityModal.data.peCost}
                  onChange={(e) =>
                    setAbilityModal(m => ({
                      ...m,
                      data: { ...m.data, peCost: clampInt(e.target.value, 0, 99) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            </div>

            {/* Conditional Element Selector when "Poder Paranormal" is chosen */}
            {abilityModal.data.category === 'Poder Paranormal' && (
              <div>
                <label className="block text-[#a1a1aa] mb-1">Elemento do Poder Paranormal</label>
                <select
                  value={abilityModal.data.element || 'Sangue'}
                  onChange={(e) =>
                    setAbilityModal(m => ({ ...m, data: { ...m.data, element: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Sangue">Sangue</option>
                  <option value="Morte">Morte</option>
                  <option value="Conhecimento">Conhecimento</option>
                  <option value="Energia">Energia</option>
                  <option value="Medo">Medo</option>
                </select>
              </div>
            )}

            {/* Name Row (with Trilha Tier Selector right before the name when "Habilidade de Trilha" is chosen) */}
            {abilityModal.data.category === 'Habilidade de Trilha' || abilityModal.data.category === 'Trilha' ? (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                <div className="sm:col-span-2">
                  <label className="block text-[#a1a1aa] mb-1">Grau da Trilha</label>
                  <select
                    value={abilityModal.data.trilhaTier || 'NEX 10% / Nível 2'}
                    onChange={(e) =>
                      setAbilityModal(m => ({
                        ...m,
                        data: { ...m.data, trilhaTier: e.target.value }
                      }))
                    }
                    className="num-mono w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  >
                    {TRILHA_TIERS.map(tier => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[#a1a1aa] mb-1">Nome do Poder da Trilha</label>
                  <input
                    type="text"
                    value={abilityModal.data.title}
                    onChange={(e) =>
                      setAbilityModal(m => ({ ...m, data: { ...m.data, title: e.target.value } }))
                    }
                    placeholder="Ex: A Favorita, Técnica Secreta..."
                    className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[#a1a1aa] mb-1">Nome da Habilidade / Poder</label>
                <input
                  type="text"
                  value={abilityModal.data.title}
                  onChange={(e) =>
                    setAbilityModal(m => ({ ...m, data: { ...m.data, title: e.target.value } }))
                  }
                  placeholder="Ex: Ataque Especial, Escolhido pelo Outro Lado..."
                  className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            )}

            <div>
              <label className="block text-[#a1a1aa] mb-1">Descrição Completa da Regra</label>
              <textarea
                rows={5}
                value={abilityModal.data.description}
                onChange={(e) =>
                  setAbilityModal(m => ({ ...m, data: { ...m.data, description: e.target.value } }))
                }
                placeholder="Descreva o efeito mecânico da habilidade..."
                className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAbilityModal({ open: false, data: null })}
                className="px-3 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const d = abilityModal.data;
                  if (!d.title.trim()) return;
                  updateChar(ch => {
                    if (d.id) {
                      return {
                        ...ch,
                        abilities: ch.abilities.map(a => (a.id === d.id ? d : a))
                      };
                    }
                    const newId = `ab_${Date.now()}`;
                    setExpandedCards(prev => ({ ...prev, [newId]: true }));
                    return {
                      ...ch,
                      abilities: [...ch.abilities, { ...d, id: newId }]
                    };
                  });
                  setAbilityModal({ open: false, data: null });
                }}
                style={{ backgroundColor: accent }}
                className="px-4 py-1.5 rounded-lg font-semibold text-white hover:brightness-110"
              >
                Salvar Habilidade
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 3. RITUAL MODAL (MATCHING REFERENCE SCREENSHOT + AUTOMATED CIRCLE COST & DICE) */}
      {ritualModal.open && (
        <ModalWrapper
          title={ritualModal.data?.id ? 'Editar Ritual' : 'Novo Ritual'}
          onClose={() => setRitualModal({ open: false, data: null })}
          wide
        >
          <div className="flex flex-col gap-3 text-xs max-h-[78vh] overflow-y-auto pr-1">
            {/* Nome* */}
            <div>
              <label className="block text-[#e4e4e7] font-semibold mb-1">Nome*</label>
              <input
                type="text"
                value={ritualModal.data.name}
                onChange={(e) =>
                  setRitualModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))
                }
                placeholder="Novo Ritual"
                className="w-full sm:w-2/3 bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            {/* Row 2: Elemento | Círculo | Execução | Alcance */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Elemento</label>
                <select
                  value={ritualModal.data.element}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, element: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Conhecimento">Conhecimento</option>
                  <option value="Sangue">Sangue</option>
                  <option value="Morte">Morte</option>
                  <option value="Energia">Energia</option>
                  <option value="Medo">Medo</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">
                  Círculo <span className="num-mono text-[10px] text-[#a1a1aa]">({getRitualBaseCost(ritualModal.data.circle)} PE base)</span>
                </label>
                <select
                  value={String(ritualModal.data.circle || '1').replace(/[^0-9]/g, '') || '1'}
                  onChange={(e) => {
                    const c = e.target.value;
                    setRitualModal(m => ({
                      ...m,
                      data: {
                        ...m.data,
                        circle: c,
                        peCost: getRitualBaseCost(c)
                      }
                    }));
                  }}
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="1">1 (1 PE)</option>
                  <option value="2">2 (3 PE)</option>
                  <option value="3">3 (6 PE)</option>
                  <option value="4">4 (10 PE)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Execução</label>
                <select
                  value={ritualModal.data.execution}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, execution: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Padrão">Padrão</option>
                  <option value="Movimento">Movimento</option>
                  <option value="Completa">Completa</option>
                  <option value="Livre">Livre</option>
                  <option value="Reação">Reação</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Alcance</label>
                <select
                  value={ritualModal.data.range}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, range: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Pessoal">Pessoal</option>
                  <option value="Toque">Toque</option>
                  <option value="Curto">Curto</option>
                  <option value="Médio">Médio</option>
                  <option value="Longo">Longo</option>
                  <option value="Extremo">Extremo</option>
                  <option value="Ilimitado">Ilimitado</option>
                </select>
              </div>
            </div>

            {/* Row 3: Área | Alvo | Duração */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Área</label>
                <input
                  type="text"
                  value={ritualModal.data.area || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, area: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Alvo</label>
                <input
                  type="text"
                  value={ritualModal.data.target || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, target: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Duração</label>
                <input
                  type="text"
                  value={ritualModal.data.duration || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, duration: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            </div>

            {/* Row 4: Efeito | Resistência */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Efeito</label>
                <input
                  type="text"
                  value={ritualModal.data.effect || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, effect: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Resistência</label>
                <input
                  type="text"
                  value={ritualModal.data.resistance || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, resistance: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#a1a1aa] font-semibold mb-1">+PE Discente</label>
                  <input
                    type="number"
                    min={0}
                    value={ritualModal.data.discenteExtraCost ?? 2}
                    onChange={(e) =>
                      setRitualModal(m => ({
                        ...m,
                        data: { ...m.data, discenteExtraCost: clampInt(e.target.value, 0, 99) }
                      }))
                    }
                    className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  />
                </div>
                <div>
                  <label className="block text-[#a1a1aa] font-semibold mb-1">+PE Verdadeiro</label>
                  <input
                    type="number"
                    min={0}
                    value={ritualModal.data.verdadeiroExtraCost ?? 5}
                    onChange={(e) =>
                      setRitualModal(m => ({
                        ...m,
                        data: { ...m.data, verdadeiroExtraCost: clampInt(e.target.value, 0, 99) }
                      }))
                    }
                    className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  />
                </div>
              </div>
            </div>

            {/* Row 5: Dados | Dados Discente | Dados Verdadeiro */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Dados</label>
                <input
                  type="text"
                  value={ritualModal.data.diceNormal || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, diceNormal: e.target.value } }))
                  }
                  placeholder="Ex: 2d8+2"
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Dados Discente</label>
                <input
                  type="text"
                  value={ritualModal.data.diceDiscente || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, diceDiscente: e.target.value } }))
                  }
                  placeholder="Ex: 4d8+4"
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Dados Verdadeiro</label>
                <input
                  type="text"
                  value={ritualModal.data.diceVerdadeiro || ''}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, diceVerdadeiro: e.target.value } }))
                  }
                  placeholder="Ex: 8d8+8"
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            </div>

            {/* Free Text Boxes for Ritual Effects */}
            <div className="pt-1 border-t border-zinc-800">
              <label className="block text-[#a1a1aa] mb-1">Descrição Livre dos Efeitos do Ritual (Normal)</label>
              <textarea
                rows={3}
                value={ritualModal.data.description}
                onChange={(e) =>
                  setRitualModal(m => ({ ...m, data: { ...m.data, description: e.target.value } }))
                }
                placeholder="Descreva os efeitos detalhados do ritual..."
                className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#a1a1aa] mb-1">
                  Texto Discente (+{ritualModal.data.discenteExtraCost ?? 2} PE)
                </label>
                <textarea
                  rows={2}
                  value={ritualModal.data.discente}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, discente: e.target.value } }))
                  }
                  placeholder="Efeito da versão Discente..."
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-lg p-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="block text-[#a1a1aa] mb-1">
                  Texto Verdadeiro (+{ritualModal.data.verdadeiroExtraCost ?? 5} PE)
                </label>
                <textarea
                  rows={2}
                  value={ritualModal.data.verdadeiro}
                  onChange={(e) =>
                    setRitualModal(m => ({ ...m, data: { ...m.data, verdadeiro: e.target.value } }))
                  }
                  placeholder="Efeito da versão Verdadeira..."
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-lg p-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRitualModal({ open: false, data: null })}
                className="px-3 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const d = ritualModal.data;
                  if (!d.name.trim()) return;
                  const circleNum = String(d.circle || '1').replace(/[^0-9]/g, '') || '1';
                  const autoPeCost = getRitualBaseCost(circleNum);
                  const savedRitual = { ...d, circle: circleNum, peCost: autoPeCost };

                  updateChar(ch => {
                    if (d.id) {
                      return {
                        ...ch,
                        rituals: ch.rituals.map(r => (r.id === d.id ? savedRitual : r))
                      };
                    }
                    const newId = `rit_${Date.now()}`;
                    setExpandedCards(prev => ({ ...prev, [newId]: true }));
                    return {
                      ...ch,
                      rituals: [...ch.rituals, { ...savedRitual, id: newId }]
                    };
                  });
                  setRitualModal({ open: false, data: null });
                }}
                style={{ backgroundColor: accent }}
                className="px-4 py-1.5 rounded-lg font-semibold text-white hover:brightness-110"
              >
                Salvar Ritual
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 4. INVENTORY ITEM MODAL (SPECIALIZED FORMS FOR ARMA, PROTEÇÃO, GERAL/MUNIÇÃO, ITEM AMALDIÇOADO) */}
      {itemModal.open && (
        <InventoryItemCreatorModal
          itemModal={itemModal}
          setItemModal={setItemModal}
          accent={accent}
          updateChar={updateChar}
          setExpandedCards={setExpandedCards}
        />
      )}

      {/* 5. AVATAR UPLOAD / URL MODAL */}
      {showAvatarModal && (
        <ModalWrapper
          title="Retrato do Agente"
          onClose={() => setShowAvatarModal(false)}
        >
          <div className="flex flex-col gap-3 text-xs">
            <div>
              <label className="block text-[#a1a1aa] mb-1">URL da Imagem</label>
              <input
                type="url"
                value={activeChar.avatar}
                onChange={(e) => updateChar({ avatar: e.target.value })}
                placeholder="https://exemplo.com/avatar.png"
                className="w-full bg-[#0b0b0c] border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1">Ou enviar arquivo do dispositivo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    updateChar({ avatar: ev.target.result });
                    setShowAvatarModal(false);
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  updateChar({ avatar: '' });
                  setShowAvatarModal(false);
                }}
                className="text-red-400 hover:underline"
              >
                Remover Imagem
              </button>
              <button
                type="button"
                onClick={() => setShowAvatarModal(false)}
                style={{ backgroundColor: accent }}
                className="px-4 py-1.5 rounded-lg font-semibold text-white"
              >
                Concluir
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 6. SHARE / EXPORT / IMPORT JSON MODAL */}
      {showShareModal && (
        <ModalWrapper
          title="Exportar / Importar Ficha (JSON)"
          onClose={() => setShowShareModal(false)}
        >
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Exportar Agente Atual</div>
                <div className="text-[#a1a1aa] mt-0.5">
                  Baixa um arquivo .json com todos os dados da ficha e homebrews.
                </div>
              </div>
              <button
                type="button"
                onClick={handleExportJSON}
                style={{ backgroundColor: accent }}
                className="px-3 py-2 rounded-lg font-semibold text-white flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Baixar JSON</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-2">
              <div className="font-bold text-white">Importar Ficha de Arquivo JSON</div>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleImportJSON}
                className="w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
              />
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 7. SETTINGS GEAR MODAL (SITE PREFERENCES + HOMEBREW CREATOR) */}
      {showSettingsModal && (
        <SettingsAndHomebrewModal
          accent={accent}
          preferences={preferences}
          setPreferences={setPreferences}
          homebrew={homebrew}
          setHomebrew={setHomebrew}
          activeChar={activeChar}
          updateChar={updateChar}
          calculateClassVitals={calculateClassVitals}
          settingsTab={settingsTab}
          setSettingsTab={setSettingsTab}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Specialized Inventory Item Creator Modal matching all 4 Reference Screenshots
 * (Nova Arma, Nova Proteção, Novo Item, Novo Item Amaldiçoado)
 */
function InventoryItemCreatorModal({ itemModal, setItemModal, accent, updateChar, setExpandedCards }) {
  const [improvementInput, setImprovementInput] = useState('');
  const d = itemModal.data;
  const itemType = itemModal.type;

  const modalTitle = d.id
    ? `Editar ${itemType}`
    : itemType === 'Arma'
    ? 'Nova Arma'
    : itemType === 'Proteção'
    ? 'Nova Proteção'
    : itemType === 'Item Amald.'
    ? 'Novo Item Amaldiçoado'
    : 'Novo Item';

  const handleAddImprovement = () => {
    if (!improvementInput.trim()) return;
    setItemModal(m => ({
      ...m,
      data: {
        ...m.data,
        improvements: [...(m.data.improvements || []), improvementInput.trim()]
      }
    }));
    setImprovementInput('');
  };

  const handleSaveItem = () => {
    if (!d.name.trim()) return;
    updateChar(ch => {
      if (d.id) {
        return {
          ...ch,
          items: ch.items.map(i => (i.id === d.id ? d : i))
        };
      }
      const newItemId = `item_${Date.now()}`;
      setExpandedCards(prev => ({ ...prev, [newItemId]: true }));

      let nextAttacks = ch.attacks;
      if (itemType === 'Arma' && d.createAttack) {
        const multFormatted = String(d.critMult || '2').startsWith('x')
          ? String(d.critMult)
          : `x${d.critMult || 2}`;
        nextAttacks = [
          ...ch.attacks,
          {
            id: `atk_${Date.now() + 1}`,
            name: d.name.trim(),
            skillId: d.weaponType === 'Corpo a Corpo' ? 'luta' : 'pontaria',
            attackBonus: 0,
            damage: d.damage || '1d4',
            critRange: clampInt(d.critRange, 1, 20) || 20,
            critMult: multFormatted,
            damageType: d.damageType || 'Balístico',
            range: d.range && d.range !== '-' ? d.range : 'Corpo a Corpo',
            notes: [
              `${d.proficiency || 'Armas Simples'} • ${d.weaponType || 'Corpo a Corpo'} • ${d.grip || 'Leve'}`,
              d.secondaryDamage ? `Dano Secundário: ${d.secondaryDamage}` : '',
              Array.isArray(d.improvements) && d.improvements.length > 0
                ? `Melhorias: ${d.improvements.join(', ')}`
                : '',
              d.description || ''
            ]
              .filter(Boolean)
              .join('\n')
          }
        ];
      }

      const nextDefenseEquip =
        itemType === 'Proteção' && d.applyDefenseToEquip
          ? clampInt(ch.defenseEquip, -50, 99) + clampInt(d.defenseBonus, 0, 50)
          : ch.defenseEquip;

      return {
        ...ch,
        defenseEquip: nextDefenseEquip,
        items: [...ch.items, { ...d, id: newItemId }],
        attacks: nextAttacks
      };
    });
    setItemModal({ open: false, type: 'Geral', data: null });
  };

  return (
    <ModalWrapper
      title={modalTitle}
      onClose={() => setItemModal({ open: false, type: 'Geral', data: null })}
      wide={itemType === 'Arma'}
    >
      <div className="flex flex-col gap-3.5 text-xs">
        {/* ============================================================
            LAYOUT 1: NOVA ARMA
        ============================================================ */}
        {itemType === 'Arma' && (
          <>
            <div>
              <label className="block text-[#e4e4e7] font-semibold mb-1">Nome*</label>
              <input
                type="text"
                value={d.name}
                onChange={(e) => setItemModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))}
                placeholder="Nova Arma"
                className="w-full sm:w-1/2 bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            {/* Proficiência | Tipo | Empunhadura */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Proficiência</label>
                <select
                  value={d.proficiency}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, proficiency: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Armas Simples">Armas Simples</option>
                  <option value="Armas Táticas">Armas Táticas</option>
                  <option value="Armas Pesadas">Armas Pesadas</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Tipo</label>
                <select
                  value={d.weaponType}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, weaponType: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Corpo a Corpo">Corpo a Corpo</option>
                  <option value="Ataque à Distância">Ataque à Distância</option>
                  <option value="Arremesso">Arremesso</option>
                  <option value="Disparo">Disparo</option>
                  <option value="Fogo">Fogo</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Empunhadura</label>
                <select
                  value={d.grip}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, grip: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Leve">Leve</option>
                  <option value="Uma Mão">Uma Mão</option>
                  <option value="Duas Mãos">Duas Mãos</option>
                </select>
              </div>
            </div>

            {/* Dano* | Dano secundário | Crítico* | Multiplicador* | Tipo de Dano */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Dano*</label>
                <input
                  type="text"
                  value={d.damage}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, damage: e.target.value } }))
                  }
                  placeholder="1d4"
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Dano secundário</label>
                <input
                  type="text"
                  value={d.secondaryDamage || ''}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, secondaryDamage: e.target.value } }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Crítico*</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={d.critRange}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, critRange: clampInt(e.target.value, 1, 20) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Multiplicador*</label>
                <input
                  type="number"
                  min={2}
                  max={10}
                  value={String(d.critMult).replace(/[^0-9]/g, '') || 2}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, critMult: clampInt(e.target.value, 2, 10) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[#e4e4e7] font-semibold mb-1">Tipo de Dano</label>
                <select
                  value={d.damageType}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, damageType: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  {WEAPON_DAMAGE_TYPES.map(dt => (
                    <option key={dt} value={dt}>{dt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Alcance | Categoria | Espaços* */}
            <div className="grid grid-cols-3 gap-3 max-w-md">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Alcance</label>
                <select
                  value={d.range}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, range: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none"
                >
                  <option value="-">-</option>
                  <option value="Curto">Curto</option>
                  <option value="Médio">Médio</option>
                  <option value="Longo">Longo</option>
                  <option value="Extremo">Extremo</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Categoria</label>
                <select
                  value={d.category}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, category: e.target.value } }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                >
                  <option value="0">0</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Espaços*</label>
                <input
                  type="number"
                  step="0.5"
                  value={d.weight}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, weight: Math.max(0, parseFloat(e.target.value) || 0) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Melhorias Row + Adicionar Button */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-bold text-[#e4e4e7]">Melhorias</label>
                <button
                  type="button"
                  onClick={handleAddImprovement}
                  style={{ backgroundColor: accent }}
                  className="px-3 py-1 rounded text-xs font-bold text-white hover:brightness-110"
                >
                  Adicionar
                </button>
              </div>
              <input
                type="text"
                value={improvementInput}
                onChange={(e) => setImprovementInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImprovement();
                  }
                }}
                placeholder="Ex: Certeira, Cruel, Mira Laser (pressione Adicionar)..."
                className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
              {Array.isArray(d.improvements) && d.improvements.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {d.improvements.map((imp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#0b0b0c] border border-zinc-700 text-xs text-white flex items-center gap-1.5"
                    >
                      <span>{imp}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setItemModal(m => ({
                            ...m,
                            data: {
                              ...m.data,
                              improvements: m.data.improvements.filter((_, i) => i !== idx)
                            }
                          }))
                        }
                        className="text-zinc-400 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {!d.id && (
              <label className="flex items-center gap-2 cursor-pointer text-[#e4e4e7] font-medium pt-1">
                <input
                  type="checkbox"
                  checked={d.createAttack}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, createAttack: e.target.checked } }))
                  }
                  className="rounded accent-[var(--accent-color)]"
                />
                <span>Criar ataque correspondente na aba COMBATE automaticamente</span>
              </label>
            )}
          </>
        )}

        {/* ============================================================
            LAYOUT 2: NOVA PROTEÇÃO
        ============================================================ */}
        {itemType === 'Proteção' && (
          <>
            <div>
              <label className="block text-[#e4e4e7] font-semibold mb-1">Nome*</label>
              <input
                type="text"
                value={d.name}
                onChange={(e) => setItemModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))}
                placeholder="Nova Proteção"
                className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xs">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Defesa*</label>
                <input
                  type="number"
                  value={d.defenseBonus}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, defenseBonus: clampInt(e.target.value, 0, 50) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Categoria*</label>
                <select
                  value={d.category}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, category: e.target.value } }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                >
                  <option value="0">0</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Espaços*</label>
                <input
                  type="number"
                  step="0.5"
                  value={d.weight}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, weight: Math.max(0, parseFloat(e.target.value) || 0) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                />
              </div>
            </div>

            {!d.id && (
              <label className="flex items-center gap-2 cursor-pointer text-[#e4e4e7] font-medium">
                <input
                  type="checkbox"
                  checked={d.applyDefenseToEquip}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, applyDefenseToEquip: e.target.checked }
                    }))
                  }
                  className="rounded accent-[var(--accent-color)]"
                />
                <span>Somar +{d.defenseBonus} automaticamente em Defesa (Equip.)</span>
              </label>
            )}
          </>
        )}

        {/* ============================================================
            LAYOUT 3: NOVO ITEM (GERAL / MUNIÇÃO)
        ============================================================ */}
        {(itemType === 'Geral' || itemType === 'Munição') && (
          <>
            <div>
              <label className="block text-[#e4e4e7] font-semibold mb-1">Nome*</label>
              <input
                type="text"
                value={d.name}
                onChange={(e) => setItemModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))}
                placeholder="Novo Item"
                className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Categoria*</label>
                <select
                  value={d.category}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, category: e.target.value } }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                >
                  <option value="0">0</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Espaços*</label>
                <input
                  type="number"
                  step="0.5"
                  value={d.weight}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, weight: Math.max(0, parseFloat(e.target.value) || 0) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Tag</label>
                <select
                  value={d.tag || 'Acessórios'}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, tag: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none"
                >
                  <option value="Acessórios">Acessórios</option>
                  <option value="Explosivos">Explosivos</option>
                  <option value="Itens Operacionais">Itens Operacionais</option>
                  <option value="Itens Paranormais">Itens Paranormais</option>
                  <option value="Munição">Munição</option>
                  <option value="Geral">Geral</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* ============================================================
            LAYOUT 4: NOVO ITEM AMALDIÇOADO
        ============================================================ */}
        {itemType === 'Item Amald.' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[#e4e4e7] font-semibold mb-1">Nome*</label>
                <input
                  type="text"
                  value={d.name}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))
                  }
                  placeholder="Novo Item Amaldiçoado"
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Elemento</label>
                <select
                  value={d.element || 'Conhecimento'}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, element: e.target.value } }))
                  }
                  className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                >
                  <option value="Conhecimento">Conhecimento</option>
                  <option value="Sangue">Sangue</option>
                  <option value="Morte">Morte</option>
                  <option value="Energia">Energia</option>
                  <option value="Medo">Medo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-[220px]">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Categoria*</label>
                <select
                  value={d.category}
                  onChange={(e) =>
                    setItemModal(m => ({ ...m, data: { ...m.data, category: e.target.value } }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                >
                  <option value="0">0</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">Espaços*</label>
                <input
                  type="number"
                  step="0.5"
                  value={d.weight}
                  onChange={(e) =>
                    setItemModal(m => ({
                      ...m,
                      data: { ...m.data, weight: Math.max(0, parseFloat(e.target.value) || 0) }
                    }))
                  }
                  className="num-mono w-full bg-[#0b0b0c] border border-zinc-800 rounded-md px-2.5 py-2 text-center text-white focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {/* Shared Free Description Field */}
        <div>
          <label className="block text-[#a1a1aa] mb-1">Descrição / Efeitos / Detalhes</label>
          <textarea
            rows={3}
            value={d.description}
            onChange={(e) =>
              setItemModal(m => ({ ...m, data: { ...m.data, description: e.target.value } }))
            }
            placeholder="Descrição livre do item..."
            className="w-full bg-[#0b0b0c] border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-[var(--accent-color)]"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setItemModal({ open: false, type: 'Geral', data: null })}
            className="px-3 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSaveItem}
            style={{ backgroundColor: accent }}
            className="px-4 py-1.5 rounded-lg font-semibold text-white hover:brightness-110"
          >
            Salvar
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

/**
 * Interactive Vitals Bar (VIDA, SANIDADE, ESFORÇO, DETERMINAÇÃO)
 * Includes a Temporary Points box above the bar that fills a Cyan bar (#06b6d4) from the opposite (right) side
 */
function VitalBar({ label, color, current, max, temp = 0, onAdjust, onChangeCurrent, onChangeMax, onChangeTemp }) {
  const pct = Math.max(0, Math.min(100, max > 0 ? (current / max) * 100 : 0));
  const tempPct = Math.max(0, Math.min(100, max > 0 ? (temp / max) * 100 : 0));

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1 px-0.5">
        <span className="text-[10px] font-bold tracking-wider uppercase text-[#e4e4e7]">
          {label}
        </span>

        {/* Temporary Points Input Box above the status bar */}
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-semibold tracking-wider uppercase text-cyan-400">
            Temp:
          </span>
          <input
            type="number"
            min="0"
            aria-label={`${label} Temporário`}
            title={`Pontos Temporários de ${label}`}
            value={temp}
            onChange={(e) => onChangeTemp && onChangeTemp(e.target.value)}
            className="num-mono w-11 h-5 bg-[#0b0b0c] border border-cyan-500/60 focus:border-cyan-400 rounded text-center text-[11px] font-bold text-cyan-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="relative h-8 rounded-md overflow-hidden bg-[#0b0b0c] border border-zinc-700/90 flex items-center justify-between px-2 select-none">
        {/* Main Status Fill (Left to Right) */}
        <div
          style={{ width: `${pct}%`, backgroundColor: color }}
          className="absolute inset-y-0 left-0 transition-all duration-300 opacity-90"
        />

        {/* Temporary Points Cyan Fill (Opposite Side: Right to Left) */}
        {temp > 0 && (
          <div
            style={{
              width: `${tempPct}%`,
              backgroundColor: '#06b6d4',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.6)'
            }}
            className="absolute inset-y-0 right-0 transition-all duration-300 opacity-85 border-l border-cyan-200/60"
          />
        )}

        <div className="relative z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onAdjust(-5)}
            title="-5"
            className="px-1 text-xs font-bold text-white/90 hover:text-white hover:scale-110 transition-transform"
          >
            &laquo;
          </button>
          <button
            type="button"
            onClick={() => onAdjust(-1)}
            title="-1"
            className="px-1 text-xs font-bold text-white/90 hover:text-white hover:scale-110 transition-transform"
          >
            &lsaquo;
          </button>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-1 num-mono text-xs font-extrabold text-white">
          <input
            type="number"
            aria-label={`${label} Atual`}
            value={current}
            onChange={(e) => onChangeCurrent(e.target.value)}
            className="num-mono w-12 bg-transparent text-right text-white font-extrabold focus:outline-none focus:bg-black/40 rounded px-0.5"
          />
          <span>/</span>
          <input
            type="number"
            aria-label={`${label} Máximo`}
            value={max}
            onChange={(e) => onChangeMax(e.target.value)}
            className="num-mono w-12 bg-transparent text-left text-white font-extrabold focus:outline-none focus:bg-black/40 rounded px-0.5"
          />
          {temp > 0 && (
            <span className="num-mono text-[11px] font-extrabold text-cyan-200 drop-shadow">
              (+{temp})
            </span>
          )}
        </div>

        <div className="relative z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onAdjust(1)}
            title="+1"
            className="px-1 text-xs font-bold text-white/90 hover:text-white hover:scale-110 transition-transform"
          >
            &rsaquo;
          </button>
          <button
            type="button"
            onClick={() => onAdjust(5)}
            title="+5"
            className="px-1 text-xs font-bold text-white/90 hover:text-white hover:scale-110 transition-transform"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Structured Reference Points Tracker (NPCs, Locais, Datas, Evidências)
 */
function ReferencePointsBox({ points, accent, onAdd, onRemove }) {
  const [tag, setTag] = useState('NPC');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <div className="p-3 rounded-xl bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-2.5">
      <span className="text-[11px] font-bold tracking-wider uppercase text-[#a1a1aa]">
        Pontos de Referência (NPCs, Locais, Datas & Evidências)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="bg-[#141416] border border-zinc-700 rounded-md px-2 py-1.5 text-xs text-white focus:outline-none"
        >
          <option value="NPC">NPC</option>
          <option value="Local">Local</option>
          <option value="Data">Data</option>
          <option value="Evidência">Evidência</option>
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome / Referência"
          className="bg-[#141416] border border-zinc-700 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none"
        />
        <input
          type="text"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Observação curta..."
          className="bg-[#141416] border border-zinc-700 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            if (!title.trim()) return;
            onAdd({
              id: `ref_${Date.now()}`,
              tag,
              title: title.trim(),
              detail: detail.trim()
            });
            setTitle('');
            setDetail('');
          }}
          style={{ backgroundColor: accent }}
          className="px-3 py-1.5 rounded-md text-xs font-semibold text-white hover:brightness-110"
        >
          Adicionar
        </button>
      </div>

      {points.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-1">
          {points.map(pt => (
            <div
              key={pt.id}
              className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-[#141416] border border-zinc-800 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-bold text-[#a1a1aa] uppercase">
                  {pt.tag}
                </span>
                <span className="font-semibold text-white truncate">{pt.title}</span>
                {pt.detail && <span className="text-[#a1a1aa] truncate">— {pt.detail}</span>}
              </div>
              <button
                type="button"
                onClick={() => onRemove(pt.id)}
                className="text-zinc-500 hover:text-red-400 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Interactive HTML5 Canvas Sketchpad (Quadro de Desenho Livre)
 */
function ParanormalSketchpad({ initialDataUrl, onSaveDataUrl }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#e4e4e7');
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0b0b0c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (initialDataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialDataUrl;
    }
  }, [initialDataUrl]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#0b0b0c' : brushColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onSaveDataUrl(canvas.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0b0b0c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onSaveDataUrl('');
  };

  return (
    <div className="p-3 rounded-xl bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#a1a1aa]">
          Quadro de Desenho Livre (Símbolos, Mapas & Diagramas)
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            {[
              { hex: '#e4e4e7', label: 'Giz Branco' },
              { hex: '#dc2626', label: 'Sangue' },
              { hex: '#eab308', label: 'Conhecimento' },
              { hex: '#a855f7', label: 'Energia' },
              { hex: '#38bdf8', label: 'Medo' },
              { hex: '#71717a', label: 'Morte' }
            ].map(c => (
              <button
                key={c.hex}
                type="button"
                title={c.label}
                onClick={() => {
                  setBrushColor(c.hex);
                  setIsEraser(false);
                }}
                style={{ backgroundColor: c.hex }}
                className={`w-4 h-4 rounded-full border ${
                  !isEraser && brushColor === c.hex ? 'border-white scale-125' : 'border-black/40'
                }`}
              />
            ))}
          </div>

          <input
            type="range"
            min="1"
            max="16"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
            title="Espessura do Traço"
            className="w-16 accent-[var(--accent-color)]"
          />

          <button
            type="button"
            onClick={() => setIsEraser(prev => !prev)}
            title="Borracha"
            className={`p-1.5 rounded border text-xs ${
              isEraser
                ? 'bg-zinc-700 border-white text-white'
                : 'bg-[#141416] border-zinc-800 text-[#a1a1aa]'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={clearCanvas}
            title="Limpar Quadro"
            className="p-1.5 rounded bg-[#141416] border border-zinc-800 text-[#a1a1aa] hover:text-red-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#0b0b0c]">
        <canvas
          ref={canvasRef}
          width={640}
          height={280}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[240px] cursor-crosshair touch-none block"
        />
      </div>
    </div>
  );
}

/**
 * Settings & Homebrew Creator Modal
 */
function SettingsAndHomebrewModal({
  accent,
  preferences,
  setPreferences,
  homebrew,
  setHomebrew,
  activeChar,
  updateChar,
  calculateClassVitals,
  settingsTab,
  setSettingsTab,
  onClose
}) {
  const [originForm, setOriginForm] = useState({
    id: null,
    name: '',
    description: '',
    trainedSkills: '',
    powerName: '',
    powerText: ''
  });

  const [trilhaForm, setTrilhaForm] = useState({
    id: null,
    name: '',
    className: 'Combatente',
    nex10: '',
    nex40: '',
    nex65: '',
    nex99: ''
  });

  const handleSaveHomebrewOrigin = () => {
    if (!originForm.name.trim()) return;
    setHomebrew(prev => {
      if (originForm.id) {
        return {
          ...prev,
          origins: prev.origins.map(o => (o.id === originForm.id ? originForm : o))
        };
      }
      return {
        ...prev,
        origins: [...prev.origins, { ...originForm, id: `hb_orig_${Date.now()}` }]
      };
    });
    setOriginForm({ id: null, name: '', description: '', trainedSkills: '', powerName: '', powerText: '' });
  };

  const handleSaveHomebrewTrilha = () => {
    if (!trilhaForm.name.trim()) return;
    setHomebrew(prev => {
      if (trilhaForm.id) {
        return {
          ...prev,
          trilhas: prev.trilhas.map(t => (t.id === trilhaForm.id ? trilhaForm : t))
        };
      }
      return {
        ...prev,
        trilhas: [...prev.trilhas, { ...trilhaForm, id: `hb_trilha_${Date.now()}` }]
      };
    });
    setTrilhaForm({ id: null, name: '', className: 'Combatente', nex10: '', nex40: '', nex65: '', nex99: '' });
  };

  const applyTrilhaAbilitiesToSheet = (trilha) => {
    updateChar(ch => {
      const entries = [
        { tier: 'NEX 10% / Nível 2', text: trilha.nex10, label: `${trilha.name}` },
        { tier: 'NEX 40% / Nível 8', text: trilha.nex40, label: `${trilha.name}` },
        { tier: 'NEX 65% / Nível 13', text: trilha.nex65, label: `${trilha.name}` },
        { tier: 'NEX 99% / Nível 20', text: trilha.nex99, label: `${trilha.name}` }
      ].filter(e => e.text && e.text.trim());

      const newAbilities = entries.map((e, i) => ({
        id: `ab_trilha_${Date.now()}_${i}`,
        title: e.label,
        category: 'Habilidade de Trilha',
        trilhaTier: e.tier,
        peCost: 0,
        description: e.text
      }));

      return {
        ...ch,
        className: trilha.className || ch.className,
        trilha: trilha.name,
        abilities: [...ch.abilities, ...newAbilities]
      };
    });
  };

  return (
    <ModalWrapper
      title="Configurações & Criador de Homebrew"
      onClose={onClose}
      wide
    >
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-2.5 mb-4">
        <button
          type="button"
          onClick={() => setSettingsTab('PREFS')}
          style={settingsTab === 'PREFS' ? { borderColor: accent } : undefined}
          className={`text-xs font-bold uppercase pb-1 border-b-2 ${
            settingsTab === 'PREFS' ? 'text-white' : 'border-transparent text-[#a1a1aa]'
          }`}
        >
          1. Preferências do Site
        </button>
        <button
          type="button"
          onClick={() => setSettingsTab('HOMEBREW')}
          style={settingsTab === 'HOMEBREW' ? { borderColor: accent } : undefined}
          className={`text-xs font-bold uppercase pb-1 border-b-2 ${
            settingsTab === 'HOMEBREW' ? 'text-white' : 'border-transparent text-[#a1a1aa]'
          }`}
        >
          2. Criador de Homebrew (Origens & Trilhas)
        </button>
      </div>

      {settingsTab === 'PREFS' ? (
        <div className="flex flex-col gap-4 text-xs">
          <div className="p-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white">Cálculo Automático de PV / PE / SAN / PD Máximos</div>
              <div className="text-[#a1a1aa] mt-0.5">
                Recalcula automaticamente os valores máximos da classe ao alterar Nível, NEX ou Classe.
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                setPreferences(p => ({ ...p, autoCalculateVitals: !p.autoCalculateVitals }))
              }
              className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors shrink-0 ${
                preferences.autoCalculateVitals
                  ? 'bg-[var(--accent-color)] justify-end'
                  : 'bg-zinc-700 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white" />
            </button>
          </div>

          <div className="p-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white">Recalcular Status da Classe Agora</div>
              <div className="text-[#a1a1aa] mt-0.5">
                Aplica a fórmula oficial de {activeChar.className} com base no Nível/NEX e Vigor/Presença atuais.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                updateChar(ch => {
                  const calc = calculateClassVitals(ch);
                  return {
                    ...ch,
                    vitals: {
                      pvCurrent: calc.pvMax,
                      pvMax: calc.pvMax,
                      peCurrent: calc.peMax,
                      peMax: calc.peMax,
                      sanCurrent: calc.sanMax,
                      sanMax: calc.sanMax,
                      pdCurrent: calc.pdMax,
                      pdMax: calc.pdMax
                    }
                  };
                });
              }}
              style={{ borderColor: accent }}
              className="px-3 py-1.5 rounded-lg bg-[#141416] border font-semibold text-white hover:brightness-125 shrink-0"
            >
              Aplicar Cálculo Oficial
            </button>
          </div>

          <div className="p-3 rounded-lg bg-[#0b0b0c] border border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white">Modo de Alto Contraste</div>
              <div className="text-[#a1a1aa] mt-0.5">
                Aumenta a nitidez de bordas e textos para ambientes muito iluminados.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPreferences(p => ({ ...p, highContrast: !p.highContrast }))}
              className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors shrink-0 ${
                preferences.highContrast
                  ? 'bg-[var(--accent-color)] justify-end'
                  : 'bg-zinc-700 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs max-h-[68vh] overflow-y-auto pr-1">
          <div className="p-3 rounded-xl bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-2.5">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Criar Origem Homebrew
            </h4>
            <input
              type="text"
              value={originForm.name}
              onChange={(e) => setOriginForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Nome da Origem"
              className="bg-[#141416] border border-zinc-700 rounded-md px-2.5 py-1.5 text-white focus:outline-none"
            />
            <input
              type="text"
              value={originForm.trainedSkills}
              onChange={(e) => setOriginForm(f => ({ ...f, trainedSkills: e.target.value }))}
              placeholder="Perícias treinadas (ex: Ocultismo, Vontade)"
              className="bg-[#141416] border border-zinc-700 rounded-md px-2.5 py-1.5 text-white focus:outline-none"
            />
            <input
              type="text"
              value={originForm.powerName}
              onChange={(e) => setOriginForm(f => ({ ...f, powerName: e.target.value }))}
              placeholder="Nome do Poder da Origem"
              className="bg-[#141416] border border-zinc-700 rounded-md px-2.5 py-1.5 text-white focus:outline-none"
            />
            <textarea
              rows={3}
              value={originForm.powerText}
              onChange={(e) => setOriginForm(f => ({ ...f, powerText: e.target.value }))}
              placeholder="Texto mecânico do poder da origem..."
              className="bg-[#141416] border border-zinc-700 rounded-md p-2 text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSaveHomebrewOrigin}
              style={{ backgroundColor: accent }}
              className="py-1.5 rounded-md font-semibold text-white hover:brightness-110"
            >
              {originForm.id ? 'Atualizar Origem' : 'Salvar Origem Homebrew'}
            </button>

            {homebrew.origins.length > 0 && (
              <div className="mt-2 pt-2 border-t border-zinc-800 flex flex-col gap-1.5">
                {homebrew.origins.map(o => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#141416] border border-zinc-800"
                  >
                    <div>
                      <span className="font-bold text-white block">{o.name}</span>
                      <span className="text-[10px] text-[#a1a1aa]">{o.powerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOriginForm(o)}
                        className="text-emerald-400 hover:underline text-[11px]"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setHomebrew(prev => ({
                            ...prev,
                            origins: prev.origins.filter(x => x.id !== o.id)
                          }))
                        }
                        className="text-red-400 hover:underline text-[11px]"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#0b0b0c] border border-zinc-800 flex flex-col gap-2.5">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Criar Trilha Homebrew
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={trilhaForm.name}
                onChange={(e) => setTrilhaForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Nome da Trilha"
                className="bg-[#141416] border border-zinc-700 rounded-md px-2.5 py-1.5 text-white focus:outline-none"
              />
              <select
                value={trilhaForm.className}
                onChange={(e) => setTrilhaForm(f => ({ ...f, className: e.target.value }))}
                className="bg-[#141416] border border-zinc-700 rounded-md px-2 py-1.5 text-white focus:outline-none"
              >
                <option value="Combatente">Combatente</option>
                <option value="Especialista">Especialista</option>
                <option value="Ocultista">Ocultista</option>
                <option value="Sobrevivente">Sobrevivente</option>
              </select>
            </div>
            <textarea
              rows={2}
              value={trilhaForm.nex10}
              onChange={(e) => setTrilhaForm(f => ({ ...f, nex10: e.target.value }))}
              placeholder="Habilidade de NEX 10% / Nível 2..."
              className="bg-[#141416] border border-zinc-700 rounded-md p-2 text-white focus:outline-none"
            />
            <textarea
              rows={2}
              value={trilhaForm.nex40}
              onChange={(e) => setTrilhaForm(f => ({ ...f, nex40: e.target.value }))}
              placeholder="Habilidade de NEX 40% / Nível 8..."
              className="bg-[#141416] border border-zinc-700 rounded-md p-2 text-white focus:outline-none"
            />
            <textarea
              rows={2}
              value={trilhaForm.nex65}
              onChange={(e) => setTrilhaForm(f => ({ ...f, nex65: e.target.value }))}
              placeholder="Habilidade de NEX 65% / Nível 13..."
              className="bg-[#141416] border border-zinc-700 rounded-md p-2 text-white focus:outline-none"
            />
            <textarea
              rows={2}
              value={trilhaForm.nex99}
              onChange={(e) => setTrilhaForm(f => ({ ...f, nex99: e.target.value }))}
              placeholder="Habilidade de NEX 99% / Nível 20..."
              className="bg-[#141416] border border-zinc-700 rounded-md p-2 text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSaveHomebrewTrilha}
              style={{ backgroundColor: accent }}
              className="py-1.5 rounded-md font-semibold text-white hover:brightness-110"
            >
              {trilhaForm.id ? 'Atualizar Trilha' : 'Salvar Trilha Homebrew'}
            </button>

            {homebrew.trilhas.length > 0 && (
              <div className="mt-2 pt-2 border-t border-zinc-800 flex flex-col gap-1.5">
                {homebrew.trilhas.map(t => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#141416] border border-zinc-800"
                  >
                    <div>
                      <span className="font-bold text-white block">{t.name}</span>
                      <span className="text-[10px] text-[#a1a1aa]">{t.className}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => applyTrilhaAbilitiesToSheet(t)}
                        className="accent-text hover:underline text-[11px] font-semibold"
                      >
                        Aplicar na Ficha
                      </button>
                      <button
                        type="button"
                        onClick={() => setTrilhaForm(t)}
                        className="text-emerald-400 hover:underline text-[11px]"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setHomebrew(prev => ({
                            ...prev,
                            trilhas: prev.trilhas.filter(x => x.id !== t.id)
                          }))
                        }
                        className="text-red-400 hover:underline text-[11px]"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </ModalWrapper>
  );
}

/**
 * Reusable Accessible Dark-Mode Modal Wrapper
 */
function ModalWrapper({ title, children, onClose, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`w-full ${
          wide ? 'max-w-4xl' : 'max-w-lg'
        } rounded-2xl bg-[#141416] border border-zinc-700 shadow-2xl overflow-hidden`}
      >
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wider uppercase text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}