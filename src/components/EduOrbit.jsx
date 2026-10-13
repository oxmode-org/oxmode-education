import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Database,
  Eye,
  FileText,
  Handshake,
  KeyRound,
  Layers,
  Lock,
  Mail,
  MessageCircle,
  RefreshCw,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react';

/* ------------------------------------------------------------- BRACKETS */
function Brackets() {
  return (
    <>
      <span className="ib-c ib-c-tl" aria-hidden="true" />
      <span className="ib-c ib-c-tr" aria-hidden="true" />
      <span className="ib-c ib-c-bl" aria-hidden="true" />
      <span className="ib-c ib-c-br" aria-hidden="true" />
    </>
  );
}

/* ----------------------------------------------------------- DIAGRAM 1: FLOW */
function DiagramFlow({ uid, reduced }) {
  const team = [
    { x: 40, y: 38, label: 'Sếp điều hành', role: 'Leader' },
    { x: 36, y: 92, label: 'Lọc tin & Báo cáo', role: 'Input' },
    { x: 40, y: 146, label: 'Điểm nghẽn 60p', role: 'Task' },
  ];

  const L1 = 'M94,38 C140,38 152,72 195,72';
  const L2 = 'M90,92 C140,92 152,92 195,92';
  const L3 = 'M94,146 C140,146 152,112 195,112';
  const R1 = 'M335,75 C375,75 390,66 430,66';
  const R2 = 'M335,108 C375,108 390,116 430,116';

  const glowId = uid + '_flow_glow';

  return (
    <div className="ib-diagram-wrap">
      <svg viewBox="0 0 580 185" role="img" aria-label="Mô hình dòng chảy điều hành và phân vai nhiệm vụ">
        <defs>
          <radialGradient id={glowId} cx="265" cy="92" r="220" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(48, 250, 250, 0.22)" />
            <stop offset="1" stopColor="rgba(48, 250, 250, 0)" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="580" height="185" fill={`url(#${glowId})`} />

        {/* Input cluster (Leader / Bottlenecks) */}
        <g>
          {team.map((m, i) => (
            <g key={i} className="ib-av" transform={`translate(${m.x}, ${m.y})`}>
              <rect
                x="-50"
                y="-16"
                width="100"
                height="32"
                rx="8"
                fill="#160642"
                stroke={i === 0 ? '#30fafa' : 'rgba(48, 250, 250, 0.45)'}
                strokeWidth="1.2"
              />
              <circle cx="-38" cy="0" r="3.5" fill={i === 0 ? '#22c55e' : '#30fafa'} />
              <text
                x="7"
                y="3.5"
                textAnchor="middle"
                fontSize="9"
                fill="#ffffff"
                fontFamily="var(--font-heading, sans-serif)"
                fontWeight="600"
              >
                {m.label}
              </text>
            </g>
          ))}
        </g>

        {/* Spline flow paths: 3 inputs → hub */}
        {[L1, L2, L3].map((d, i) => (
          <path
            key={'l' + i}
            d={d}
            className={`ib-flow ib-flow-on${i === 1 ? '' : ' ib-dash'}`}
          />
        ))}

        {[R1, R2].map((d, i) => (
          <path
            key={'r' + i}
            d={d}
            className={`ib-flow ib-flow-on${i ? ' ib-dash' : ''}`}
          />
        ))}

        {/* Continuous Flowing Packets */}
        {!reduced &&
          [L1, L2, L3, R1, R2].map((d, i) => (
            <circle key={'pkt' + i} r="3" className="ib-pkt">
              <animateMotion
                dur={`${2.2 + (i % 2) * 0.4}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
                calcMode="linear"
                path={d}
              />
            </circle>
          ))}

        {/* Center Hub: Hermes Core */}
        <g transform="translate(195, 54)">
          <rect
            x="-4"
            y="-4"
            width="148"
            height="76"
            rx="12"
            fill="none"
            stroke="rgba(48, 250, 250, 0.45)"
            className={reduced ? undefined : 'ib-glow'}
          />
          <rect
            width="140"
            height="68"
            rx="10"
            className="ib-node"
            fill="#150543"
            stroke="rgba(48, 250, 250, 0.75)"
            strokeWidth="1.4"
          />
          <circle cx="24" cy="34" r="10" fill="rgba(48, 250, 250, 0.18)" stroke="#30fafa" strokeWidth="1.4" />
          <path d="M19 34h10M24 29v10" stroke="#30fafa" strokeWidth="1.8" strokeLinecap="round" />
          <text
            x="42"
            y="30"
            fontSize="11.5"
            letterSpacing="0.8"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            HERMES CORE
          </text>
          <text
            x="42"
            y="46"
            fontSize="9.5"
            letterSpacing="0.5"
            fill="var(--edu-cyan, #30fafa)"
            fontFamily="monospace"
            fontWeight="600"
          >
            AUTONOMY ENGINE
          </text>
        </g>

        {/* Right Stack: Output Task Deck */}
        <g transform="translate(430, 28)">
          {[2, 1, 0].map((k) => (
            <g
              key={k}
              transform={`translate(${k * 8}, ${22 - k * 8})`}
              opacity={1 - k * 0.25}
            >
              <g className="ib-sheet">
                <rect
                  width="132"
                  height="96"
                  rx="6"
                  fill="#1b0852"
                  stroke={k === 0 ? 'rgba(48, 250, 250, 0.75)' : 'rgba(48, 250, 250, 0.25)'}
                  strokeWidth="1.3"
                />
                {k === 0 && (
                  <>
                    <text
                      x="10"
                      y="18"
                      fontSize="9"
                      fill="var(--edu-cyan, #30fafa)"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      TASK DECK #128
                    </text>
                    <rect x="10" y="27" width="76" height="5" rx="2" fill="#ffffff" opacity="0.85" />
                    <rect x="10" y="37" width="108" height="3" rx="1.5" fill="rgba(48, 250, 250, 0.45)" />
                    <rect x="10" y="44" width="90" height="3" rx="1.5" fill="rgba(48, 250, 250, 0.45)" />

                    <g transform="translate(10, 56)">
                      {[14, 22, 16, 28, 20, 32].map((h, j) => (
                        <rect
                          key={j}
                          x={j * 16}
                          y={32 - h}
                          width="10"
                          height={h}
                          fill="#30fafa"
                          opacity={0.35 + j * 0.11}
                          rx="2"
                        />
                      ))}
                    </g>
                  </>
                )}
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------ DIAGRAM 2: MEMORY & SKILLS */
function DiagramMemorySkills({ uid, reduced }) {
  const inputs = [
    { y: 38, label: 'Văn phong Sếp', sub: 'Persona & Giọng điệu' },
    { y: 92, label: 'Dữ liệu dự án', sub: 'Quy trình & Nhân sự' },
    { y: 146, label: 'Nguyên tắc ưu tiên', sub: 'Ranh giới & Tiêu chuẩn' },
  ];

  const L0 = 'M145,38 C180,38 195,78 220,78';
  const L1 = 'M145,92 C180,92 195,92 220,92';
  const L2 = 'M145,146 C180,146 195,108 220,108';

  const R0 = 'M365,78 C395,78 405,52 430,52';
  const R1 = 'M365,108 C395,108 405,134 430,134';

  return (
    <div className="ib-diagram-wrap">
      <svg viewBox="0 0 580 185" role="img" aria-label="Kiến trúc bộ nhớ và đóng gói kỹ năng">
        {/* Left Inputs */}
        {inputs.map((inp, i) => (
          <g key={i} transform={`translate(12, ${inp.y - 18})`}>
            <rect
              width="132"
              height="36"
              rx="9"
              fill="rgba(48, 250, 250, 0.08)"
              stroke="rgba(48, 250, 250, 0.4)"
              strokeWidth="1.2"
            />
            <circle cx="16" cy="18" r="4.5" fill="#30fafa" />
            <text
              x="28"
              y="15"
              fontSize="10"
              fill="#ffffff"
              fontFamily="var(--font-heading, sans-serif)"
              fontWeight="700"
            >
              {inp.label}
            </text>
            <text
              x="28"
              y="27"
              fontSize="8.5"
              fill="rgba(226, 232, 240, 0.75)"
              fontFamily="monospace"
            >
              {inp.sub}
            </text>
          </g>
        ))}

        {/* Splines */}
        {[L0, L1, L2].map((d, i) => (
          <path key={'l' + i} d={d} className="ib-flow ib-flow-on" />
        ))}
        {[R0, R1].map((d, i) => (
          <path key={'r' + i} d={d} className="ib-flow ib-flow-on" />
        ))}

        {!reduced &&
          [L0, L1, L2, R0, R1].map((d, i) => (
            <circle key={'pkt' + i} r="3" className="ib-pkt">
              <animateMotion
                dur={`${2.0 + (i % 2) * 0.4}s`}
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
                calcMode="linear"
                path={d}
              />
            </circle>
          ))}

        {/* Hub: Knowledge Pipeline */}
        <g transform="translate(220, 54)">
          <rect
            width="145"
            height="72"
            rx="10"
            fill="#150543"
            stroke="rgba(48, 250, 250, 0.75)"
            strokeWidth="1.4"
            className={reduced ? undefined : 'ib-glow'}
          />
          <text
            x="72"
            y="32"
            textAnchor="middle"
            fontSize="11.5"
            letterSpacing="0.8"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            KNOWLEDGE HUB
          </text>
          <text
            x="72"
            y="48"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="0.5"
            fill="var(--edu-cyan, #30fafa)"
            fontFamily="monospace"
            fontWeight="600"
          >
            PARSER &amp; EMBEDDING
          </text>
        </g>

        {/* Right Output: 2 Containers (Memory & Skills) */}
        {/* Container 1: Memory */}
        <g transform="translate(430, 22)">
          <rect
            width="138"
            height="60"
            rx="8"
            fill="#1b0852"
            stroke="rgba(48, 250, 250, 0.55)"
            strokeWidth="1.3"
          />
          <rect x="12" y="11" width="8" height="8" rx="2" fill="#30fafa" />
          <text
            x="26"
            y="18"
            fontSize="10.5"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            Memory (.md)
          </text>
          <text
            x="26"
            y="33"
            fontSize="8.5"
            fill="rgba(226, 232, 240, 0.8)"
            fontFamily="monospace"
          >
            context: 100% active
          </text>
          <rect x="26" y="42" width="96" height="5" rx="2.5" fill="rgba(48, 250, 250, 0.2)" />
          <rect x="26" y="42" width="76" height="5" rx="2.5" fill="#30fafa" />
        </g>

        {/* Container 2: Skills */}
        <g transform="translate(430, 102)">
          <rect
            width="138"
            height="62"
            rx="8"
            fill="#1b0852"
            stroke="rgba(48, 250, 250, 0.55)"
            strokeWidth="1.3"
          />
          <circle cx="16" cy="16" r="4.5" fill="#22c55e" />
          <text
            x="26"
            y="19"
            fontSize="10.5"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            Skills Engine
          </text>
          <text
            x="26"
            y="33"
            fontSize="8.5"
            fill="rgba(226, 232, 240, 0.8)"
            fontFamily="monospace"
          >
            3 quy trình nạp sẵn
          </text>
          <g transform="translate(26, 40)">
            <rect x="0" y="0" width="48" height="13" rx="3" fill="rgba(48, 250, 250, 0.16)" />
            <text x="24" y="9.5" textAnchor="middle" fontSize="7.5" fill="#30fafa" fontFamily="monospace">brief.skill</text>
            <rect x="52" y="0" width="48" height="13" rx="3" fill="rgba(48, 250, 250, 0.16)" />
            <text x="76" y="9.5" textAnchor="middle" fontSize="7.5" fill="#30fafa" fontFamily="monospace">lead.skill</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------ DIAGRAM 3: INTEGRATIONS */
function DiagramIntegrations({ uid, reduced }) {
  const [hover, setHover] = useState(-1);

  const tools = [
    { title: 'Telegram', sub: 'Voice & Text Bot', x: 80, y: 46 },
    { title: 'Zalo', sub: 'Trao đổi Nội bộ', x: 80, y: 138 },
    { title: 'Work Email', sub: 'Soạn nháp & Triage', x: 500, y: 46 },
    { title: 'Daily Digest', sub: 'Báo cáo 08:00 AM', x: 500, y: 138 },
  ];

  const path = (i) => {
    const t = tools[i];
    const dir = t.x < 290 ? -1 : 1;
    return `M${290 + dir * 45},92 H${290 + dir * 85} V${t.y} H${t.x - dir * 45}`;
  };

  return (
    <div className="ib-diagram-wrap">
      <svg viewBox="0 0 580 185" role="group" aria-label="Cổng kết nối Telegram, Zalo, Email và Báo cáo">
        {tools.map((_, i) => (
          <path
            key={i}
            d={path(i)}
            className={`ib-flow${hover === i || hover === -1 ? ' ib-flow-on' : ''}`}
          />
        ))}

        {!reduced &&
          tools.map((_, i) => (
            <circle key={'pkt' + i} r="3" className="ib-pkt">
              <animateMotion
                dur="1.8s"
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
                calcMode="linear"
                path={path(i)}
              />
            </circle>
          ))}

        {/* Center Hub: Dispatcher */}
        <g transform="translate(230, 56)">
          <rect
            width="120"
            height="72"
            rx="10"
            fill="#150543"
            stroke="rgba(48, 250, 250, 0.75)"
            strokeWidth="1.4"
            className={reduced ? undefined : 'ib-glow'}
          />
          <text
            x="60"
            y="34"
            textAnchor="middle"
            fontSize="12"
            letterSpacing="0.8"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            HERMES
          </text>
          <text
            x="60"
            y="50"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="0.6"
            fill="var(--edu-cyan, #30fafa)"
            fontFamily="monospace"
            fontWeight="600"
          >
            DISPATCH HUB
          </text>
        </g>

        {/* 4 Tool Cards */}
        {tools.map((t, i) => (
          <g
            key={i}
            className={`ib-tool${hover === i ? ' ib-tool-on' : ''}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
            transform={`translate(${t.x - 62}, ${t.y - 25})`}
          >
            <rect
              width="124"
              height="50"
              rx="9"
              className="ib-node"
              fill={hover === i ? '#280c75' : '#190852'}
              stroke={hover === i ? '#30fafa' : 'rgba(48, 250, 250, 0.4)'}
              strokeWidth="1.3"
            />
            <circle cx="20" cy="25" r="5" fill={hover === i ? '#30fafa' : 'rgba(48, 250, 250, 0.3)'} />
            <text
              x="34"
              y="22"
              fontSize="11"
              fontWeight="700"
              fill="#ffffff"
              fontFamily="var(--font-heading, sans-serif)"
            >
              {t.title}
            </text>
            <text
              x="34"
              y="37"
              fontSize="8.5"
              fill="rgba(226, 232, 240, 0.8)"
              fontFamily="monospace"
            >
              {t.sub}
            </text>
          </g>
        ))}

        <text
          x="290"
          y="156"
          textAnchor="middle"
          fontSize="9.5"
          fill="rgba(48, 250, 250, 0.95)"
          fontFamily="monospace"
          fontWeight="600"
        >
          {hover >= 0 ? `ACTIVE · ${tools[hover].title.toUpperCase()} SYNCING` : '4/4 CHANNELS SYNCED · REALTIME DISPATCH'}
        </text>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------- DIAGRAM 4: SECURITY */
function DiagramSecurity({ uid, reduced }) {
  const S1 = 'M168,92 H212';
  const S2 = 'M368,92 H412';

  return (
    <div className="ib-diagram-wrap">
      <svg viewBox="0 0 580 185" role="img" aria-label="Hàng rào bảo mật và cơ chế phê duyệt Human-in-the-Loop">
        {/* Paths */}
        {[S1, S2].map((d, i) => (
          <path key={i} d={d} className="ib-flow ib-flow-on" />
        ))}

        {!reduced &&
          [S1, S2].map((d, i) => (
            <circle key={'pkt' + i} r="3" className="ib-pkt">
              <animateMotion
                dur="1.5s"
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
                calcMode="linear"
                path={d}
              />
            </circle>
          ))}

        {/* Step 1: Agent Draft */}
        <g className="ib-sec-step" transform="translate(24, 52)">
          <rect
            width="144"
            height="80"
            rx="10"
            fill="#190852"
            stroke="rgba(48, 250, 250, 0.45)"
            strokeWidth="1.3"
          />
          <text
            x="18"
            y="28"
            fontSize="11"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            1. Agent Soạn thảo
          </text>
          <text
            x="18"
            y="44"
            fontSize="9"
            fill="var(--edu-cyan, #30fafa)"
            fontFamily="monospace"
            fontWeight="700"
          >
            [DRAFT ISOLATED]
          </text>
          <text
            x="18"
            y="60"
            fontSize="8.5"
            fill="rgba(226, 232, 240, 0.75)"
          >
            Chuẩn bị sẵn · Chưa gửi
          </text>
        </g>

        {/* Step 2: Safety Guardrail */}
        <g className="ib-sec-step" transform="translate(212, 46)">
          <rect
            width="156"
            height="92"
            rx="12"
            fill="#150543"
            stroke="#30fafa"
            strokeWidth="1.5"
            className={reduced ? undefined : 'ib-glow'}
          />
          <circle cx="78" cy="28" r="12" fill="rgba(48, 250, 250, 0.2)" stroke="#30fafa" strokeWidth="1.4" />
          <path d="M73 28l3.5 3.5 7-7" fill="none" stroke="#30fafa" strokeWidth="1.6" strokeLinecap="round" />
          <text
            x="78"
            y="54"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            SAFETY FIREWALL
          </text>
          <text
            x="78"
            y="70"
            textAnchor="middle"
            fontSize="9"
            fill="rgba(226, 232, 240, 0.85)"
            fontFamily="monospace"
          >
            Khoanh vùng &amp; Soi nguồn
          </text>
        </g>

        {/* Step 3: Human-in-the-Loop Approval Gate */}
        <g className="ib-sec-step" transform="translate(412, 52)">
          <rect
            width="144"
            height="80"
            rx="10"
            fill="#230a66"
            stroke="#22c55e"
            strokeWidth="1.5"
          />
          <circle cx="20" cy="28" r="6" fill="#22c55e" />
          <text
            x="34"
            y="31"
            fontSize="11.5"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="var(--font-heading, sans-serif)"
          >
            3. Sếp duyệt ✅
          </text>
          <rect
            x="18"
            y="44"
            width="108"
            height="20"
            rx="4"
            fill="rgba(34, 197, 94, 0.22)"
            stroke="#22c55e"
            strokeWidth="1"
          />
          <text
            x="72"
            y="57.5"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="800"
            fill="#22c55e"
            fontFamily="monospace"
          >
            HUMAN-IN-THE-LOOP
          </text>
        </g>
      </svg>
    </div>
  );
}

/* --------------------------------------------------- DIAGRAM 5: EVOLUTION */
function DiagramEvolution({ uid, reduced }) {
  const [hover, setHover] = useState(-1);
  const W = 580;
  const H = 140;
  const pad = 36;

  const vals = [25, 48, 72, 90, 100];
  const milestones = ['W1: Khởi tạo', 'W2: Nạp Skills', 'W3: Vận hành', 'W4: Bàn giao', 'Tự nhân bản'];

  const lo = 20;
  const hi = 100;
  const span = hi - lo;
  const pts = vals.map((v, i) => [
    pad + (i / (vals.length - 1)) * (W - pad * 2),
    H - pad - ((v - lo) / span) * (H - pad * 2),
  ]);

  let line = '';
  pts.forEach(([x, y], i) => {
    if (i === 0) {
      line = `M${x.toFixed(1)},${y.toFixed(1)}`;
      return;
    }
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    line += ` C${cx.toFixed(1)},${py.toFixed(1)} ${cx.toFixed(1)},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - pad} L${pts[0][0].toFixed(1)},${H - pad} Z`;

  const i = hover >= 0 ? hover : pts.length - 1;
  const p = pts[i];
  const fillId = uid + '_chart_fill';

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    let best = 0;
    for (let k = 1; k < pts.length; k++) {
      if (Math.abs(pts[k][0] - x) < Math.abs(pts[best][0] - x)) best = k;
    }
    setHover(best);
  };

  return (
    <div className="ib-diagram-wrap">
      <svg
        viewBox={`0 0 ${W} ${H + 34}`}
        className="ib-chart"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(-1)}
        role="img"
        aria-label="Đường cong chỉ số tự chủ và tiến trình chuyển giao"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#30fafa" stopOpacity="0.32" />
            <stop offset="1" stopColor="#30fafa" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0.3, 0.6, 0.9].map((g, idx) => (
          <line
            key={idx}
            x1={pad}
            x2={W - pad}
            y1={H * g}
            y2={H * g}
            stroke="rgba(48, 250, 250, 0.15)"
          />
        ))}

        {/* Gradient Area Fill */}
        <path d={area} fill={`url(#${fillId})`} />

        {/* Smooth Spline Curve Line */}
        <path
          d={line}
          fill="none"
          stroke="#30fafa"
          strokeWidth="2.8"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(48, 250, 250, 0.75))' }}
        />

        {/* Milestone Dots & Labels */}
        {pts.map(([x, y], idx) => (
          <g key={idx}>
            <circle
              cx={x}
              cy={y}
              r={i === idx ? 5.5 : 4}
              fill={i === idx ? '#ffffff' : '#30fafa'}
              stroke="#1b0852"
              strokeWidth="2"
            />
            <text
              x={x}
              y={H + 18}
              textAnchor="middle"
              fontSize="10"
              fill={i === idx ? '#30fafa' : 'rgba(226, 232, 240, 0.7)'}
              fontWeight={i === idx ? '800' : '500'}
              fontFamily="var(--font-heading, sans-serif)"
            >
              {milestones[idx]}
            </text>
          </g>
        ))}

        {/* Hover cursor and Tooltip */}
        <line
          x1={p[0]}
          x2={p[0]}
          y1="8"
          y2={H - pad}
          stroke="#30fafa"
          strokeDasharray="3 4"
          strokeOpacity="0.85"
        />

        <g transform={`translate(${Math.min(Math.max(p[0], 65), W - 65)}, ${p[1] < 34 ? p[1] + 24 : p[1] - 16})`}>
          <rect
            x="-56"
            y="-12"
            width="112"
            height="22"
            rx="4"
            fill="#30fafa"
            style={{ filter: 'drop-shadow(0 0 8px rgba(48, 250, 250, 0.7))' }}
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="800"
            fill="#0c0326"
            fontFamily="monospace"
          >
            {`TỰ CHỦ: ${vals[i]}%`}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------- DATA NODES */
const NODES = [
  {
    id: 1,
    badge: 'Buổi 01 · Cơ chế & Tư duy Agentic',
    short: 'Vai trò',
    icon: Compass,
    title: 'Cơ chế Hermes & Phân vai điều hành',
    summary: 'Hiểu nguyên lý tự chủ đa bước khác biệt với Chatbot, làm rõ việc giao Hermes làm thay và việc sếp giữ quyền quyết định.',
    diagram: DiagramFlow,
    highlights: [
      {
        keyword: 'Tư duy Agentic',
        text: 'Hermes tự lập kế hoạch đa bước và chủ động gọi công cụ, không chỉ hỏi-đáp rời rạc.',
      },
      {
        keyword: 'JD cho Agent',
        text: 'Bóc tách việc ngốn 30–60p/ngày của lãnh đạo và chuẩn hóa ranh giới phê duyệt.',
      },
    ],
    deliverable: 'Bản phân vai nhiệm vụ chuẩn hóa + Khung vận hành Agentic',
  },
  {
    id: 2,
    badge: 'Buổi 02 · Huấn luyện Bộ nhớ & Kỹ năng',
    short: 'Thiết lập',
    icon: Sparkles,
    title: 'Phương pháp nạp Bộ nhớ & Đóng gói Skills',
    summary: 'Kỹ thuật may đo trí tuệ cho Hermes: từ cấu trúc bộ nhớ dài hạn đến bộ kỹ năng (Skills) chuyên trách.',
    diagram: DiagramMemorySkills,
    highlights: [
      {
        keyword: 'Bộ nhớ dài hạn (Memory)',
        text: 'Nạp dữ liệu dự án, nguyên tắc ưu tiên và văn phong chỉ đạo thật của sếp.',
      },
      {
        keyword: 'Đóng gói Skills',
        text: 'Biến 1–2 quy trình thường ngày thành kỹ năng tự động thực thi độc lập.',
      },
    ],
    deliverable: 'Bộ nhớ dài hạn & Bộ kỹ năng ban đầu nạp sẵn từ dữ liệu thật',
  },
  {
    id: 3,
    badge: 'Buổi 03 · Thực hành Điều phối & Giao việc',
    short: 'Kết nối',
    icon: MessageCircle,
    title: 'Kỹ năng giao việc & Điều phối qua Chat/Email',
    summary: 'Thực hành ra lệnh, điều phối công việc đa bước trên Telegram/Zalo và thiết lập quy trình báo cáo tự động.',
    diagram: DiagramIntegrations,
    highlights: [
      {
        keyword: 'Giao việc đa kênh',
        text: 'Ra lệnh bằng tin nhắn thoại hoặc text qua Telegram/Zalo trong phạm vi an toàn.',
      },
      {
        keyword: 'Báo cáo tự động',
        text: 'Định kỳ tổng hợp tin vắn và việc tồn đọng vào khung giờ cố định mỗi sáng.',
      },
    ],
    deliverable: '01 Hệ thống Chat & Email tự động đang chạy thật',
  },
  {
    id: 4,
    badge: 'Buổi 04 · Quản trị An toàn & Bảo mật',
    short: 'Làm chủ',
    icon: Shield,
    title: 'Hàng rào bảo mật & Cơ chế phê duyệt',
    summary: 'Đào tạo phương pháp quản trị an toàn dữ liệu, thiết lập cơ chế Human-in-the-Loop để lãnh đạo kiểm soát 100%.',
    diagram: DiagramSecurity,
    highlights: [
      {
        keyword: 'Human-in-the-Loop',
        text: 'Agent chỉ soạn thảo phương án; chỉ gửi đi hoặc thi hành khi sếp bấm phê duyệt.',
      },
      {
        keyword: 'Khoanh vùng dữ liệu',
        text: 'Phân quyền truy cập và kiểm thử căn cứ để loại trừ rủi ro rò rỉ thông tin.',
      },
    ],
    deliverable: 'Hệ thống chốt chặn phê duyệt an toàn đa tầng thiết lập sẵn',
  },
  {
    id: 5,
    badge: 'Chuyển giao · Đồng hành 1:1',
    short: 'Đồng hành',
    icon: Users,
    title: 'Chuyển giao năng lực & Tự nhân bản kỹ năng',
    summary: 'Làm chủ toàn diện kiến thức quản trị để tự tin dạy thêm kỹ năng mới cho Hermes mà không cần đội ngũ kỹ thuật.',
    diagram: DiagramEvolution,
    highlights: [
      {
        keyword: 'Toàn quyền quản trị',
        text: 'Sở hữu trọn vẹn tài khoản, dữ liệu và hạ tầng trợ lý số, không phụ thuộc bên ngoài.',
      },
      {
        keyword: 'Tự nhân bản Skills',
        text: 'Nắm quy trình từng bước để tự tạo thêm kỹ năng mới bằng tiếng Việt tự nhiên.',
      },
    ],
    deliverable: 'Toàn quyền sở hữu Agent + Năng lực tự nhân bản kỹ năng theo quy mô',
  },
];

const STEP = 360 / NODES.length;
const RADIUS = 214;
const DWELL = 7500;

function place(index, rotation) {
  const deg = (index / NODES.length) * 360 + rotation;
  const rad = (deg * Math.PI) / 180;
  return {
    x: RADIUS * Math.cos(rad),
    y: RADIUS * Math.sin(rad),
  };
}

function OrbitLink({ path }) {
  if (!path) return null;
  return (
    <svg className="edu-orbit__link" width={path.w} height={path.h} viewBox={`0 0 ${path.w || 1} ${path.h || 1}`} aria-hidden="true">
      <path d={path.d} stroke="rgba(48, 250, 250, 0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path
        d={path.d}
        fill="none"
        stroke="#30fafa"
        strokeWidth="2"
        strokeLinecap="round"
        className="edu-orbit__link-path"
      />
      <circle cx={path.x1} cy={path.y1} r="3.5" fill="#30fafa" className="edu-orbit__link-dot" />
      <circle cx={path.x2} cy={path.y2} r="4.5" fill="#30fafa" className="edu-orbit__link-dot" />
    </svg>
  );
}

export default function EduOrbit() {
  const uid = 'edu_orb_' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const rootRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [activeId, setActiveId] = useState(1);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [wide, setWide] = useState(true);
  const [link, setLink] = useState(null);
  const active = NODES.find((node) => node.id === activeId) || NODES[0];

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const layout = window.matchMedia('(min-width: 1041px)');
    const sync = () => {
      setReduced(motion.matches);
      setWide(layout.matches);
    };
    sync();
    motion.addEventListener('change', sync);
    layout.addEventListener('change', sync);
    return () => {
      motion.removeEventListener('change', sync);
      layout.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const seen = () => {
      const rect = node.getBoundingClientRect();
      setInView(rect.top < window.innerHeight * 0.82 && rect.bottom > 80);
    };
    seen();
    const observer = new IntersectionObserver(seen, { threshold: [0, 0.15, 0.4] });
    observer.observe(node);
    window.addEventListener('scroll', seen, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', seen);
    };
  }, []);

  useEffect(() => {
    if (reduced || !inView || !wide) return undefined;
    const timer = window.setTimeout(() => {
      const next = activeId % NODES.length;
      setRotation(-next * STEP);
      setActiveId(next + 1);
    }, DWELL);
    return () => window.clearTimeout(timer);
  }, [reduced, inView, wide, activeId]);

  const jump = (index) => {
    const next = ((index % NODES.length) + NODES.length) % NODES.length;
    setRotation(-next * STEP);
    setActiveId(next + 1);
  };

  const measureLink = useCallback(() => {
    const root = rootRef.current;
    if (!root || !wide) {
      setLink(null);
      return;
    }
    const pill = root.querySelector('.edu-orbit__node.is-open');
    const card = root.querySelector('.edu-orbit__panel-frame');
    if (!pill || !card) return;
    const base = root.getBoundingClientRect();
    const pr = pill.getBoundingClientRect();
    const cr = card.getBoundingClientRect();
    const x1 = pr.right - base.left + 4;
    const y1 = pr.top - base.top + pr.height / 2;
    const x2 = cr.left - base.left - 2;
    const y2 = Math.min(Math.max(y1, cr.top - base.top + 36), cr.bottom - base.top - 36);
    const bend = Math.max(28, (x2 - x1) * 0.45);
    setLink({
      w: root.clientWidth,
      h: root.clientHeight,
      d: `M ${x1},${y1} C ${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`,
      x1,
      y1,
      x2,
      y2,
    });
  }, [wide]);

  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const tick = () => {
      measureLink();
      if (performance.now() - started < 1300) frame = requestAnimationFrame(tick);
    };
    tick();
    const observer = new ResizeObserver(measureLink);
    if (rootRef.current) observer.observe(rootRef.current);
    window.addEventListener('resize', measureLink);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measureLink);
    };
  }, [measureLink, activeId, rotation]);

  const cards = [active];

  return (
    <div className="edu-orbit" ref={rootRef}>
      <OrbitLink path={wide ? link : null} />

      {/* Mobile session navigation pills */}
      <div className="edu-orbit__mobile-nav" role="tablist" aria-label="Các buổi đào tạo">
        {NODES.map((node, index) => {
          const Icon = node.icon;
          const open = activeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              role="tab"
              aria-selected={open}
              className={`edu-orbit__m-pill${open ? ' is-active' : ''}`}
              onClick={() => jump(index)}
            >
              <span className="edu-orbit__m-pill-idx">B{node.id}</span>
              <Icon size={13} className="edu-orbit__m-pill-icon" />
              <b className="edu-orbit__m-pill-text">{node.short}</b>
            </button>
          );
        })}
      </div>

      <div className="edu-orbit__stage">
        <svg className="edu-orbit__ring" viewBox="0 0 480 480" aria-hidden="true">
          <circle cx="240" cy="240" r="214" className="edu-orbit__guide" />
          <circle cx="240" cy="240" r="214" className="edu-orbit__trace" />
          <circle cx="240" cy="240" r="146" className="edu-orbit__guide edu-orbit__guide--inner" />
        </svg>
        <div className="edu-orbit__core"><span>Hermes</span></div>
        {NODES.map((node, index) => {
          const pos = place(index, rotation);
          const Icon = node.icon;
          const open = activeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`edu-orbit__node${open ? ' is-open' : ''}`}
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
              aria-pressed={open}
              aria-label={node.title}
              onClick={() => jump(index)}
            >
              <span className="edu-orbit__dot">
                <Icon size={14} />
                <b>{node.short}</b>
              </span>
            </button>
          );
        })}
      </div>

      <div className="edu-orbit__deck">
        {cards.map((node) => {
          const DiagramComponent = node.diagram;
          return (
            <div className="ib-frame ib-frame-hover edu-orbit__panel-frame" key={node.id}>
              <Brackets />
              <article className="edu-orbit__panel">
                <div className="edu-slide__head">
                  <span className="edu-slide__badge">{node.badge}</span>
                  <h3 className="edu-slide__title">{node.title}</h3>
                  <p className="edu-slide__summary">{node.summary}</p>
                </div>

                {/* Live Diagram Component (Ink-orbit style) */}
                <DiagramComponent uid={`${uid}_${node.id}`} reduced={reduced} />

                {/* Key Insights / Highlights (Concise Bullets) */}
                <div className="edu-slide__points">
                  {node.highlights.map((pt, pIdx) => (
                    <div className="edu-point-item" key={pIdx}>
                      <span className="edu-point-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      <div className="edu-point-body">
                        <b>{pt.keyword}:</b>
                        <span>{pt.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deliverable Badge */}
                <div className="edu-slide__deliverable">
                  <div className="edu-slide__deliv-badge">
                    <CheckCircle2 size={16} />
                    <span>Sản phẩm bàn giao:</span>
                  </div>
                  <p className="edu-slide__deliv-text">{node.deliverable}</p>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
