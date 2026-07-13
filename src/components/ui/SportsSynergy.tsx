import React, { useEffect, useRef, useState, useMemo } from 'react';
import './SportsSynergy.css';

interface SportNode {
  id: string;
  label: string;
  group: 'winter' | 'board' | 'extreme' | 'strength';
  x: number;
  y: number;
}

/** Icon props shared by all inline SVG sport icons below. */
interface IconProps {
  color: string;
  size: number;
  strokeWidth?: number;
}

/**
 * Mutable per-node animation state, updated directly on DOM elements inside
 * the requestAnimationFrame loop (bypassing React re-renders for 60 fps).
 */
interface NodeState extends SportNode {
  ox: number;
  oy: number;
  randomPhaseX: number;
  randomPhaseY: number;
  randomSpeedX: number;
  randomSpeedY: number;
  randomAmpX: number;
  randomAmpY: number;
  isPulsing: boolean;
  groupEl?: SVGGElement;
  circleEl?: SVGCircleElement;
  haloEl?: SVGCircleElement;
  iconEl?: SVGGElement;
}

const SnowIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M8 12l4-5 4 5" /><path d="M12 7v5" />
    <path d="M3 18l18-8" /><path d="M3 21l18-8" />
  </svg>
);

const SkateIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M15 3h-4v6c0 2-2 4-4 5v3h10a2 2 0 0 0 2-2v-3l-4-9z" />
    <path d="M5 21h16" /><path d="M7 17v4" /><path d="M15 17v4" />
  </svg>
);

const BoardIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M2 14c4-7 8-7 12 0 2 3 4 3 6 0" />
    <path d="M3 10c0-2 8-2 14-2 3 0 5 1 5 2s-2 2-5 2C11 12 3 12 3 10z" />
  </svg>
);

const CarabinerIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M2 17h20" />
    <path d="M13 17V8a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3h3" />
    <path d="M13 8v6" strokeDasharray="3 3" />
  </svg>
);

const MountainIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M3 20h18" /><path d="M6 20l6-12 6 12" />
    <path d="M12 8l-3 4h6z" fill={p.color} opacity="0.3" />
    <path d="M14 10l4 4" /><path d="M16 10l2-2" />
  </svg>
);

const FreediveIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M4 6h16" />
    <path d="M12 6v6" />
    <path d="M12 12l-4 8 4-3 4 3z" />
  </svg>
);

const LiftIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M3 12h18" />
    <rect x="4" y="9" width="3" height="6" rx="1" />
    <rect x="17" y="9" width="3" height="6" rx="1" />
    <path d="M8 10v4" /><path d="M16 10v4" />
  </svg>
);

const RingsIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={p.size} height={p.size}>
    <path d="M4 6h16" />
    <path d="M9 6v8" /><path d="M15 6v8" />
    <circle cx="9" cy="16" r="2" /><circle cx="15" cy="16" r="2" />
  </svg>
);

const ICON_MAP: Record<string, React.ElementType> = {
  skiing: SnowIcon,
  snowboarding: SnowIcon,
  iceskating: SkateIcon,
  inlineskating: SkateIcon,
  pumpfoiling: BoardIcon,
  surfskating: BoardIcon,
  freediving: FreediveIcon,
  highlining: CarabinerIcon,
  mountaineering: MountainIcon,
  weightlifting: LiftIcon,
  calisthenics: RingsIcon,
};

const SPORTS: SportNode[] = [
  // Winter
  { id: 'skiing', label: 'Skiing', group: 'winter', x: 180, y: 140 },
  { id: 'snowboarding', label: 'Snowboarding', group: 'winter', x: 310, y: 80 },
  { id: 'iceskating', label: 'Ice Skating', group: 'winter', x: 100, y: 240 },
  { id: 'inlineskating', label: 'Inline Skating', group: 'winter', x: 200, y: 270 },
  // Board
  { id: 'pumpfoiling', label: 'Pumpfoiling', group: 'board', x: 450, y: 100 },
  { id: 'surfskating', label: 'Surfskating /\nSkateboard', group: 'board', x: 560, y: 60 },
  // Outdoor/Extreme
  { id: 'freediving', label: 'Freediving', group: 'extreme', x: 760, y: 160 },
  { id: 'highlining', label: 'Highlining', group: 'extreme', x: 620, y: 300 },
  { id: 'mountaineering', label: 'Mountaineering', group: 'extreme', x: 820, y: 300 },
  // Strength
  { id: 'weightlifting', label: 'Weightlifting', group: 'strength', x: 480, y: 460 },
  { id: 'calisthenics', label: 'Calisthenics', group: 'strength', x: 340, y: 420 },
];

const EDGES = [
  ['skiing', 'snowboarding'],
  ['skiing', 'inlineskating'],
  ['inlineskating', 'iceskating'],
  ['snowboarding', 'pumpfoiling'],
  ['snowboarding', 'surfskating'],
  ['freediving', 'highlining'],
  ['highlining', 'mountaineering'],
];

const UNIVERSAL = ['highlining', 'weightlifting', 'calisthenics'];

const COLORS = {
  winter: '#c8f04a',
  board: '#4af0c8',
  extreme: '#4a90f0',
  strength: '#f0a84a',
};

const R = 28;

export default function SportsSynergy() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Refs for direct DOM manipulation
  const nodeMap = useRef<Record<string, NodeState>>({});
  const edgeEls = useRef<Record<string, SVGLineElement>>({});
  const rafId = useRef<number | null>(null);
  const tRef = useRef<number>(0);
  const hoveredNodeRef = useRef<string | null>(null);

  type EdgeType = { a: string, b: string, type: 'normal' | 'universal' };

  const allEdges = useMemo(() => {
    const seen = new Set<string>();
    const edges: EdgeType[] = [];

    EDGES.forEach(([a, b]) => {
      const key = [a, b].sort().join('--');
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ a, b, type: 'normal' as const });
      }
    });

    UNIVERSAL.forEach(uid => {
      SPORTS.forEach(s => {
        if (s.id !== uid) {
          const key = [uid, s.id].sort().join('--');
          if (!seen.has(key)) {
            seen.add(key);
            edges.push({ a: uid, b: s.id, type: 'universal' as const });
          }
        }
      });
    });

    return edges;
  }, []);

  // Initialize node state only once
  if (Object.keys(nodeMap.current).length === 0) {
    SPORTS.forEach(s => {
      nodeMap.current[s.id] = {
        ...s,
        ox: s.x,
        oy: s.y,
        x: s.x,
        y: s.y,
        // Completely random movement parameters for each node (much slower)
        randomPhaseX: Math.random() * Math.PI * 2,
        randomPhaseY: Math.random() * Math.PI * 2,
        randomSpeedX: 0.10 + Math.random() * 0.05,
        randomSpeedY: 0.10 + Math.random() * 0.05,
        randomAmpX: 16 + Math.random() * 14,
        randomAmpY: 16 + Math.random() * 14,
        isPulsing: false,
      };
    });
  }

  const applyVisibilityStyles = () => {
    const connectedNodes = new Set<string>();
    if (selectedNode) {
      connectedNodes.add(selectedNode);
      allEdges.forEach(e => {
        if (e.a === selectedNode) connectedNodes.add(e.b);
        if (e.b === selectedNode) connectedNodes.add(e.a);
      });
    }

    SPORTS.forEach(s => {
      const n = nodeMap.current[s.id];
      if (!n || !n.groupEl) return;

      const isCatMatch = selectedCategory === 'all' || s.group === selectedCategory;
      const isVisible = selectedNode ? connectedNodes.has(s.id) : isCatMatch;

      n.groupEl.style.opacity = isVisible ? '1' : '0.2';
      n.groupEl.style.transition = 'opacity 0.3s ease';
    });

    allEdges.forEach(e => {
      const key = `${e.a}--${e.b}`;
      const line = edgeEls.current[key];
      if (!line) return;

      let isVisible = true;
      if (selectedNode) {
        isVisible = e.a === selectedNode || e.b === selectedNode;
      } else if (selectedCategory !== 'all') {
        const aNode = SPORTS.find(s => s.id === e.a);
        const bNode = SPORTS.find(s => s.id === e.b);
        isVisible = aNode?.group === selectedCategory || bNode?.group === selectedCategory;
      }

      line.style.opacity = isVisible ? '1' : '0.1';
    });
  };

  useEffect(() => {
    applyVisibilityStyles();
  }, [selectedCategory, selectedNode]);

  const applyPositions = () => {
    SPORTS.forEach(s => {
      const n = nodeMap.current[s.id];
      if (!n) return;
      const { x, y } = n;

      if (n.circleEl) {
        n.circleEl.setAttribute('cx', x.toString());
        n.circleEl.setAttribute('cy', y.toString());
      }
      if (n.haloEl) {
        n.haloEl.setAttribute('cx', x.toString());
        n.haloEl.setAttribute('cy', y.toString());
      }
      if (n.iconEl) {
        n.iconEl.setAttribute('transform', `translate(${x - 12}, ${y - 12})`);
      }

      if (n.groupEl) {
        const texts = n.groupEl.querySelectorAll('text');
        texts.forEach((txt: SVGTextElement, i: number) => {
          txt.setAttribute('x', x.toString());
          txt.setAttribute('y', (y + R + 14 + i * 13).toString());
        });
      }
    });

    allEdges.forEach(e => {
      const key = `${e.a}--${e.b}`;
      const line = edgeEls.current[key];
      if (line) {
        if (e.type === 'universal') {
          // Snap entirely to integer to anchor the SVG dash-array so it doesn't flicker/crawl
          line.setAttribute('x1', Math.round(nodeMap.current[e.a].x).toString());
          line.setAttribute('y1', Math.round(nodeMap.current[e.a].y).toString());
          line.setAttribute('x2', Math.round(nodeMap.current[e.b].x).toString());
          line.setAttribute('y2', Math.round(nodeMap.current[e.b].y).toString());
        } else {
          line.setAttribute('x1', nodeMap.current[e.a].x.toString());
          line.setAttribute('y1', nodeMap.current[e.a].y.toString());
          line.setAttribute('x2', nodeMap.current[e.b].x.toString());
          line.setAttribute('y2', nodeMap.current[e.b].y.toString());
        }
      }
    });
  };

  useEffect(() => {
    const tick = () => {
      tRef.current += 0.016;

      SPORTS.forEach((s) => {
        const n = nodeMap.current[s.id];
        if (!n) return;

        // Continuous Random Float
        n.x = n.ox + Math.sin(tRef.current * n.randomSpeedX + n.randomPhaseX) * n.randomAmpX;
        n.y = n.oy + Math.cos(tRef.current * n.randomSpeedY + n.randomPhaseY) * n.randomAmpY;

        // Hover Pulse
        if (hoveredNodeRef.current === s.id) {
          n.isPulsing = true;
          const scale = 1 + 0.12 * Math.sin(tRef.current * 8); // faster pulse
          if (n.circleEl) n.circleEl.setAttribute('r', (R * scale).toString());
          if (n.haloEl) n.haloEl.setAttribute('r', ((R + 8) * scale).toString());
        } else if (n.isPulsing) {
          n.isPulsing = false;
          // return to normal size seamlessly
          if (n.circleEl) n.circleEl.setAttribute('r', R.toString());
          if (n.haloEl) n.haloEl.setAttribute('r', (R + 8).toString());
        }
      });
      applyPositions();

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const highlightNode = (id: string, on: boolean) => {
    const n = nodeMap.current[id];
    if (!n) return;

    if (on) hoveredNodeRef.current = id;
    else if (hoveredNodeRef.current === id) hoveredNodeRef.current = null;

    if (n.circleEl) {
      n.circleEl.setAttribute('stroke-width', on ? '3.5' : (UNIVERSAL.includes(id) ? '2.5' : '1.8'));
    }
    if (n.haloEl) {
      n.haloEl.setAttribute('opacity', on ? '0.22' : '0.08');
    }

    allEdges.forEach(e => {
      if (e.a === id || e.b === id) {
        const key = `${e.a}--${e.b}`;
        const line = edgeEls.current[key];
        if (line) {
          line.setAttribute('stroke', on ? (e.type === 'universal' ? '#3a7a58' : '#4a5580') : (e.type === 'universal' ? '#1e3a28' : '#2a3048'));
          line.setAttribute('stroke-width', on ? '2.5' : (e.type === 'universal' ? '1.2' : '1.5'));
        }
      }
    });
  };

  const handleNodeClick = (id: string) => {
    setSelectedNode(prev => prev === id ? null : id);
  };

  return (
    <section className="synergy-section">
      <header className="synergy-header">
        <div>
          <h2>Sports<br /><span>Synergy</span><br />Map</h2>
        </div>
        <div>
          <p>
            True mastery in one discipline often unlocks hidden potential in another. By identifying the interconnected balance mechanics, muscle memory responses, and mental frameworks shared across the physical world, we can accelerate our learning curves and push athletic boundaries.
          </p>
          <p style={{ marginTop: '1rem', color: '#8892b0' }}>
            Interact with the map below to discover exactly how each movement culture and extreme sport connects.
          </p>
        </div>
      </header>

      <div className="synergy-legend">
        <div className="synergy-legend-item"><div className="synergy-legend-dot" style={{ background: '#c8f04a' }}></div> Winter Sports</div>
        <div className="synergy-legend-item"><div className="synergy-legend-dot" style={{ background: '#4af0c8' }}></div> Board / Wheel Sports</div>
        <div className="synergy-legend-item"><div className="synergy-legend-dot" style={{ background: '#4a90f0' }}></div> Extreme / Outdoor</div>
        <div className="synergy-legend-item"><div className="synergy-legend-dot" style={{ background: '#f0a84a' }}></div> Strength & Body</div>
        <div className="synergy-legend-item">
          <svg width="28" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke="#2a3048" strokeWidth="2" strokeLinecap="round" /></svg>
          Sport Synergy
        </div>
        <div className="synergy-legend-item">
          <svg width="28" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke="#1e3a28" strokeWidth="1.8" strokeDasharray="8 6" /></svg>
          Universal Link
        </div>
      </div>

      <div className="synergy-graph-wrapper">
        <svg className="synergy-graph-svg" viewBox="0 0 960 580" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-winter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-board" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-extreme" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-strength" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g id="edges">
            {allEdges.map((e, idx) => {
              const aNode = SPORTS.find(s => s.id === e.a)!;
              const bNode = SPORTS.find(s => s.id === e.b)!;
              const isUniversal = e.type === 'universal';
              return (
                <line
                  key={`edge-${idx}`}
                  ref={(el) => {
                    if (el) edgeEls.current[`${e.a}--${e.b}`] = el;
                  }}
                  className={`synergy-link ${isUniversal ? 'synergy-link-universal' : 'synergy-link-normal'}`}
                  x1={aNode.x} y1={aNode.y}
                  x2={bNode.x} y2={bNode.y}
                  data-a={e.a} data-b={e.b}
                />
              );
            })}
          </g>

          <g id="nodes">
            {SPORTS.map((s) => (
              <g
                key={s.id}
                className="synergy-node-group"
                data-id={s.id}
                ref={(el) => { if (el && nodeMap.current[s.id]) nodeMap.current[s.id].groupEl = el; }}
                onMouseEnter={() => highlightNode(s.id, true)}
                onMouseLeave={() => highlightNode(s.id, false)}
                onClick={() => handleNodeClick(s.id)}
              >
                <circle
                  ref={(el) => { if (el && nodeMap.current[s.id]) nodeMap.current[s.id].haloEl = el; }}
                  cx={s.x} cy={s.y} r={R + 8}
                  fill={COLORS[s.group]} opacity="0.08"
                />

                <circle
                  ref={(el) => { if (el && nodeMap.current[s.id]) nodeMap.current[s.id].circleEl = el; }}
                  cx={s.x} cy={s.y} r={R}
                  fill="#111318"
                  stroke={COLORS[s.group]}
                  strokeWidth={UNIVERSAL.includes(s.id) ? 2.5 : 1.8}
                  className="synergy-node-circle"
                  filter={`url(#glow-${s.group})`}
                />

                <g
                  ref={(el) => { if (el && nodeMap.current[s.id]) nodeMap.current[s.id].iconEl = el; }}
                  transform={`translate(${s.x - 12}, ${s.y - 12})`}
                >
                  {(() => {
                    const Icon = ICON_MAP[s.id] || SnowIcon;
                    return <Icon size={24} strokeWidth={1.8} color={COLORS[s.group]} />;
                  })()}
                </g>

                {s.label.split('\n').map((line, i, arr) => {
                  const labelY = arr.length > 1 ? s.y + R + 14 : s.y + R + 16;
                  return (
                    <text
                      key={`lbl-${s.id}-${i}`}
                      x={s.x} y={labelY + i * 13}
                      className="synergy-node-label"
                    >
                      {line}
                    </text>
                  );
                })}
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="synergy-controls">
        <button className={`synergy-btn ${selectedCategory === 'all' ? 'synergy-active' : ''}`} onClick={() => { setSelectedCategory('all'); setSelectedNode(null); }}>All Disciplines</button>
        <button className={`synergy-btn ${selectedCategory === 'winter' ? 'synergy-active' : ''}`} onClick={() => { setSelectedCategory('winter'); setSelectedNode(null); }}>Winter</button>
        <button className={`synergy-btn ${selectedCategory === 'board' ? 'synergy-active' : ''}`} onClick={() => { setSelectedCategory('board'); setSelectedNode(null); }}>Board</button>
        <button className={`synergy-btn ${selectedCategory === 'extreme' ? 'synergy-active' : ''}`} onClick={() => { setSelectedCategory('extreme'); setSelectedNode(null); }}>Extreme</button>
        <button className={`synergy-btn ${selectedCategory === 'strength' ? 'synergy-active' : ''}`} onClick={() => { setSelectedCategory('strength'); setSelectedNode(null); }}>Strength</button>
      </div>
    </section>
  );
}
