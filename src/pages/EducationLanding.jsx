import React, { useEffect, useRef, useState } from 'react';
import EduFormat from '../components/EduFormat';
import EduFeedback from '../components/EduFeedback';
import EduLetterChat from '../components/EduLetterChat';
import EduOrbit from '../components/EduOrbit';
import EduFooterCTA from '../components/EduFooterCTA';
import ConstellationField from '../components/ui/ConstellationField';
import Footer from '../components/Footer';
import '../styles/education-landing.css';

const NAV = [
  { href: '#top', label: 'Trang chủ' },
  { href: '#gioi-thieu', label: 'Giới thiệu khoá học' },
  { href: '#noi-dung', label: 'Nội dung khoá học' },
  { href: '#hinh-thuc', label: 'Hình thức đào tạo' },
  { href: '#phan-hoi', label: 'Phản hồi' },
  { href: '#lien-he', label: 'Liên hệ', contact: true },
];

export default function EducationLanding() {
  const [open, setOpen] = useState(false);
  const [letterStep, setLetterStep] = useState(0);
  const splitRef = useRef(null);

  // Khóa scroll khi mở menu mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  const live = (step) => (letterStep === step ? 'on' : 'off');

  useEffect(() => {
    const split = splitRef.current;
    if (!split) return undefined;
    const draw = () => {
      const seal = split.querySelector('.edu-letter__seal');
      const panel = split.querySelector('.edu-chat__panel');
      const shade = split.querySelector('.edu-string__shade');
      const cord = split.querySelector('.edu-string__cord');
      const pin = split.querySelector('.edu-string__pin');
      if (!seal || !panel || !shade || !cord || !pin) return;
      const root = split.getBoundingClientRect();
      const svg = split.querySelector('.edu-string');
      const width = Math.round(root.width);
      const height = Math.round(root.height);
      svg.setAttribute('width', String(width));
      svg.setAttribute('height', String(height));
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      const sealBox = seal.getBoundingClientRect();
      const panelBox = panel.getBoundingClientRect();
      const sealX = sealBox.left + sealBox.width / 2 - root.left;
      const sealY = sealBox.top + sealBox.height / 2 - root.top;
      const x1 = panelBox.right - root.left - 2;
      const y1 = Math.min(Math.max(sealY, panelBox.top - root.top + 20), panelBox.bottom - root.top - 20);
      const vx = x1 - sealX;
      const vy = y1 - sealY;
      const span = Math.hypot(vx, vy) || 1;
      const rim = sealBox.width / 2 + 1;
      const x2 = sealX + (vx / span) * rim;
      const y2 = sealY + (vy / span) * rim;
      const sag = Math.max(26, Math.min(40, span * 0.46));
      const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + span * 0.28).toFixed(1)} ${(y1 + sag * 0.35).toFixed(1)}, ${(x2 - span * 0.22).toFixed(1)} ${(y2 + sag).toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      shade.setAttribute('d', d);
      cord.setAttribute('d', d);
      pin.setAttribute('cx', x1.toFixed(1));
      pin.setAttribute('cy', y1.toFixed(1));
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(split);
    window.addEventListener('resize', draw);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', draw);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('edu-body');
    document.title = 'OXMODE Education — Trợ lý số Hermes Agentic AI';
    return () => {
      document.body.classList.remove('edu-body');
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="edu" id="top">
      <ConstellationField
        color="#30fafa"
        goldColor="#E6C879"
        density={0.9}
        speed={0.8}
        className="edu-constellation-bg"
      />
      <a className="edu-skip" href="#hero">Bỏ qua điều hướng</a>
      <div className="edu-stage">
      <div className="edu-bg" aria-hidden="true">
        <video
          className="edu-bg__video"
          src="education/hero-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <header className="edu-nav">
        <div className="edu-container edu-nav__inner">
          <a className="edu-logo" href="#top" onClick={close}>
            <img src="assets/logo-2.svg" alt="OXMODE" />
          </a>
        <button
          className="edu-burger"
          type="button"
          aria-expanded={open}
          aria-controls="edu-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="edu-sr">Mở menu</span>
          <span />
          <span />
          <span />
        </button>
        <nav id="edu-menu" className={open ? 'is-open' : ''} aria-label="Chính">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.contact ? 'shiny-cta edu-foot__shiny-primary edu-nav__contact-btn' : undefined}
              aria-current={item.href === '#top' ? 'page' : undefined}
              onClick={close}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        {open && (
          <div
            className="edu-nav-backdrop"
            onClick={close}
            aria-hidden="true"
          />
        )}
        </div>
      </header>

      <section className="edu-hero" id="hero" aria-labelledby="edu-hero-title">
        <div className="edu-container">
          <div className="edu-hero__grid">
            <div className="edu-hero__copy">
              <p className="edu-kicker">Khóa học 1:1 dành cho CEO và lãnh đạo cấp cao</p>
              <h1 id="edu-hero-title">
                <span>Xây dựng và chuyển giao</span>
                <span>trợ lý số Hermes Agentic AI</span>
              </h1>
              <a className="shiny-cta" href="#noi-dung"><span>Khám phá khoá học</span></a>
            </div>
            <img
              className="edu-hero__art"
              src="education/hero-mascot.png"
              alt=""
            />
          </div>
        </div>
      </section>
      </div>

      <section className="edu-block edu-letter-sec" id="gioi-thieu" aria-labelledby="edu-letter-title">
        <div className="edu-container">
          <h2 id="edu-letter-title" className="edu-sr">Thư ngỏ và giới thiệu khoá học</h2>
          <div className="edu-letter-split" data-step={letterStep} ref={splitRef}>
            <EduLetterChat onStep={setLetterStep} />
            <svg className="edu-string" aria-hidden="true">
              <path className="edu-string__shade" />
              <path className="edu-string__cord" />
              <circle className="edu-string__pin" r="4.5" />
            </svg>
            <article className="edu-letter">
              <span className="edu-letter__seal" aria-hidden="true" />
              <div className="edu-letter__scroll">
              <p className="edu-letter__greet" data-live={live(1)}>Anh/Chị thân mến,</p>
              <p>
                Rào cản lớn nhất khiến nhiều nhà lãnh đạo chưa thể giao việc cho AI{' '}
                <strong>không phải vì thiếu công cụ</strong>, mà vì các{' '}
                <strong>công cụ rời rạc không hiểu bối cảnh doanh nghiệp</strong>, khiến Anh/Chị tốn thêm
                thời gian giải thích lại từ đầu.
              </p>
              <p data-live={live(3)}>
                Chương trình này được thiết kế để giải quyết triệt để bài toán đó. Thay vì dừng ở những câu
                lệnh ngắn hạn, em sẽ cùng Anh/Chị xây dựng{' '}
                <strong>Hermes Agentic AI như một nhân sự thực thụ</strong>: có{' '}
                <strong>bộ nhớ dài hạn</strong> để nắm bắt <strong>văn phong điều hành</strong>, hiểu rõ các
                mối ưu tiên và tự động phối hợp công việc theo đúng nguyên tắc Anh/Chị đề ra.
              </p>
              <p className="edu-letter__own" data-live={live(4)}>6 hạng mục thực tế Anh/Chị trực tiếp sở hữu sau khóa học:</p>
              <ul className="edu-checks" data-live={live(4)}>
                <li><strong>01 Trợ lý số Hermes Agentic AI</strong> được thiết lập và tinh chỉnh trên chính bài toán điều hành thực tế của Anh/Chị.</li>
                <li>Luồng kết nối trực tiếp giữa <strong>01 kênh nhắn tin và 01 tài khoản email</strong> trong đúng phạm vi được cấp quyền.</li>
                <li><strong>01 Quy trình báo cáo tự động hằng ngày</strong>, tổng hợp đúng trọng tâm thông tin vào khung giờ cố định đã thống nhất.</li>
                <li><strong>Bộ nhớ nền tảng &amp; Bộ kỹ năng ban đầu</strong> (Memory &amp; Skills) được nạp sẵn từ dữ liệu và quy trình làm việc thật của Anh/Chị.</li>
                <li><strong>Hàng rào bảo mật &amp; Cơ chế phê duyệt</strong> rõ ràng, đảm bảo Agent chỉ thực thi trong giới hạn cho phép.</li>
                <li>Chuyển giao trọn vẹn kiến thức và <strong>quyền quản trị</strong>, giúp Anh/Chị tự chủ huấn luyện thêm kỹ năng mới cho Agent khi quy mô công việc mở rộng.</li>
              </ul>
              <p data-live={live(5)}>
                <strong>Không đòi hỏi nền tảng lập trình</strong> phức tạp, mục tiêu duy nhất của chương trình
                là giúp Anh/Chị bước ra khỏi lớp học với một <strong>hệ thống đang chạy thật</strong> — an toàn,
                chuẩn xác và bền bỉ mỗi ngày.
              </p>
              <p className="edu-sign" data-live={live(2)}>
                <strong>Masu Phan</strong>
                <span>Người hướng dẫn và đồng hành</span>
              </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="edu-block" id="noi-dung" aria-labelledby="edu-modules-title">
        <div className="edu-container">
          <div className="edu-head edu-modules-head">
            <p className="edu-kicker">Đào tạo · thực hành · triển khai · chuyển giao</p>
            <h2 id="edu-modules-title">Nội dung học &amp; thực hành</h2>
          </div>
          <EduOrbit />
        </div>
      </section>

      <section className="edu-block" id="hinh-thuc" aria-labelledby="edu-format-title">
        <div className="edu-container">
          <EduFormat />
        </div>
      </section>

      <EduFeedback />

      <Footer
        id="lien-he"
        compact
        linkBase="https://oxmode.ai/"
        lead={<EduFooterCTA />}
      />
    </div>
  );
}
