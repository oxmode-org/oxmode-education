import React, { useEffect, useRef } from 'react';

const VOICES = [
  {
    platform: 'x',
    url: 'https://x.com/DeseretSaint/status/2107563925298643322',
    text: "Genuinely the best agent I've ever used. Never using anything else.",
  },
  {
    platform: 'hn',
    url: 'https://news.ycombinator.com/item?id=48058273',
    text: "I switched to Hermes Agent and it's been night and day how much more stable and usable it is over OpenClaw.",
  },
  {
    platform: 'x',
    url: 'https://x.com/vikeshchevli/status/2107895120020312445',
    text: 'Hermes Agent is by far my favourite tool in this era of AI',
  },
  {
    platform: 'x',
    url: 'https://x.com/breadedgar/status/2107933643544887428',
    text: 'IMO it’s hands down the best agent harness for businesses and I love it. We’ve been using Hermes agents as coworkers in Slack for months now.',
  },
  {
    platform: 'hn',
    url: 'https://news.ycombinator.com/item?id=48417329',
    text: 'Hermes basically rules my personal life at this point - it is a very useful personal assistant.',
  },
  {
    platform: 'x',
    url: 'https://x.com/marc_bara/status/2099052224496140593',
    text: 'What started as a chat interface has gradually become an operating layer across my work, research, personal organisation and family life.',
  },
  {
    platform: 'x',
    url: 'https://x.com/mjtechguy/status/2040465142769447295',
    text: 'Hermes agent by @NousResearch is elite. Setup was a breeze, integrations were super easy and it just seems to work. Way easier than openclaw was.',
  },
  {
    platform: 'hn',
    url: 'https://news.ycombinator.com/item?id=47785939',
    text: "I recently just switched to Hermes Agent (like last week) and it's the first one where it didn't feel like I was constantly needing to fix it, so at the moment I'm happy with it.",
  },
  {
    platform: 'x',
    url: 'https://x.com/xierra/status/2107837277007184196',
    text: 'nous research and hermes agent changed the way i live my entire life',
  },
];

const LABEL = { x: 'X', hn: 'Hacker News' };

function Logo({ platform }) {
  if (platform === 'hn') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#FF6600" />
        <path fill="#fff" d="M6.2 6.2h2.3l3.5 6.1 3.5-6.1h2.3l-4.6 7.6v4h-2.4v-4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#111" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Cards({ items, hidden }) {
  return items.map((item) => (
    <a
      className="edu-voice__card"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      key={`${item.url}-${hidden}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <p>{item.text}</p>
      <span className="edu-voice__who">
        <span className={`edu-voice__logo edu-voice__logo--${item.platform}`}>
          <Logo platform={item.platform} />
        </span>
        <span>
          <strong>{LABEL[item.platform]}</strong>
          <span>Bài công khai</span>
        </span>
      </span>
    </a>
  ));
}

function Column({ items, duration }) {
  return (
    <div className="edu-voice__col" style={{ animationDuration: `${duration}s` }}>
      <div className="edu-voice__stack">
        <Cards items={items} hidden={false} />
      </div>
      <div className="edu-voice__stack">
        <Cards items={items} hidden />
      </div>
    </div>
  );
}

export default function EduFeedback() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === '#phan-hoi') {
      document.getElementById('phan-hoi')?.scrollIntoView({ block: 'start' });
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const viewport = root.querySelector('.edu-voice__viewport');
    let last = null;
    let timer = 0;

    const pick = () => {
      const cards = [...root.querySelectorAll('.edu-voice__card')];
      cards.forEach((card) => card.classList.remove('is-focus'));
      if (viewport.matches(':hover')) return;
      const view = viewport.getBoundingClientRect();
      const visible = cards.filter((card) => {
        const box = card.getBoundingClientRect();
        const mid = (box.top + box.bottom) / 2;
        return mid > view.top + 28 && mid < view.bottom - 28;
      });
      if (!visible.length) return;
      const pool = visible.filter((card) => card !== last);
      const next = (pool.length ? pool : visible)[Math.floor(Math.random() * (pool.length || visible.length))];
      next.classList.add('is-focus');
      last = next;
    };

    const arm = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        pick();
        arm();
      }, 1600 + Math.random() * 1200);
    };

    pick();
    arm();
    return () => window.clearTimeout(timer);
  }, []);

  const columns = [VOICES.slice(0, 3), VOICES.slice(3, 6), VOICES.slice(6, 9)];
  return (
    <section className="edu-block edu-voice" id="phan-hoi" aria-labelledby="edu-voice-title" ref={rootRef}>
      <div className="edu-container">
        <div className="edu-head">
          <p className="edu-kicker">Cộng đồng Hermes</p>
          <h2 id="edu-voice-title">Sức mạnh của Hermes qua trải nghiệm thực tế</h2>
          <p className="edu-voice__sub">
            Tổng hợp nguyên văn từ các bài viết công khai của người dùng nền tảng Hermes
          </p>
        </div>
        <div className="edu-voice__viewport">
          <Column items={columns[0]} duration={16} />
          <Column items={columns[1]} duration={20} />
          <Column items={columns[2]} duration={18} />
        </div>
      </div>
    </section>
  );
}
