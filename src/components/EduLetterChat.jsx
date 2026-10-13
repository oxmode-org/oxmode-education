import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Send } from 'lucide-react';

const MASU = '/images/team/masu.png';

const MESSAGES = [
  'Anh/Chị thân mến,',
  'Em là Masu Phan – người đồng hành cùng Anh/Chị trong chương trình Trợ lý số Hermes.',
  'Chương trình giúp đóng gói quy trình thực tế thành Trợ lý Agentic AI chạy 24/7, may đo riêng cho Anh/Chị.',
  'Từ tích hợp tin nhắn, email đến báo cáo tự động mỗi ngày, tất cả được bàn giao toàn quyền để Anh/Chị làm chủ.',
  'Cảm ơn Anh/Chị đã quan tâm! Mong rằng "cộng sự số" này sẽ giúp Anh/Chị giữ trọn tâm trí cho con người và chiến lược.',
];

function sleep(ms, signal) {
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      window.clearTimeout(timer);
      resolve();
    }, { once: true });
  });
}

export default function EduLetterChat({ onStep }) {
  const rootRef = useRef(null);
  const logRef = useRef(null);
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) {
      setVisible(MESSAGES.length);
      setStarted(true);
      return undefined;
    }
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setStarted(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!started || reduced) return undefined;
    const signal = new AbortController();
    setVisible(0);
    setTyping(false);
    (async () => {
      for (let index = 0; index < MESSAGES.length; index += 1) {
        if (signal.signal.aborted) return;
        setTyping(true);
        await sleep(780, signal.signal);
        if (signal.signal.aborted) return;
        setTyping(false);
        setVisible(index + 1);
        await sleep(520, signal.signal);
      }
    })();
    return () => signal.abort();
  }, [started, reduced, run]);

  useEffect(() => {
    onStep?.(visible);
  }, [visible, onStep]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [visible, typing, reduced]);

  const done = visible >= MESSAGES.length && !typing;

  return (
    <div className="edu-chat" ref={rootRef} data-typed={done ? 'done' : 'run'}>
      <div className="edu-sr">
        {MESSAGES.map((text) => <p key={text}>{text}</p>)}
      </div>
      <div className="edu-chat__panel">
        <header className="edu-chat__head">
          <span className="edu-chat__avatar-wrap">
            <img className="edu-chat__avatar" src={MASU} alt="Masu Phan" />
            <i className="edu-chat__live" aria-hidden="true" />
          </span>
          <div>
            <strong>Masu Phan</strong>
            <span className="edu-chat__role">Người hướng dẫn và đồng hành</span>
          </div>
          <button type="button" className="edu-chat__replay" onClick={() => setRun((value) => value + 1)}>
            <RotateCcw size={14} />
            Xem lại
          </button>
        </header>
        <div className="edu-chat__log" ref={logRef} aria-hidden="true">
          {MESSAGES.slice(0, visible).map((text) => (
            <div className="edu-chat__row" key={text}>
              <img className="edu-chat__avatar" src={MASU} alt="" />
              <p className="edu-chat__bubble">{text}</p>
            </div>
          ))}
          {typing ? (
            <div className="edu-chat__row">
              <img className="edu-chat__avatar" src={MASU} alt="" />
              <div className="edu-chat__typing" aria-hidden="true">
                <span /><span /><span />
              </div>
            </div>
          ) : null}
        </div>
        <div className="edu-chat__input">
          <input type="text" disabled placeholder="Anh/Chị đang đọc thư của Masu" aria-label="Ô nhắn, chỉ để xem" />
          <span className="edu-chat__send" aria-hidden="true"><Send size={16} /></span>
        </div>
      </div>
    </div>
  );
}
