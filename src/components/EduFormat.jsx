import React, { useCallback, useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    title: 'Hiểu cơ chế & Khởi tạo Hermes',
    text: 'Nắm nguyên lý hoạt động của Hermes, xác định bài toán và huấn luyện bộ nhớ ban đầu.',
  },
  {
    title: 'Đào tạo kỹ năng & Kết nối',
    text: 'Học cách xây dựng bộ kỹ năng (skills) cho Agent, kết nối chat, email và đóng gói quy trình.',
  },
  {
    title: 'Thực hành điều phối & Bảo mật',
    text: 'Trực tiếp giao việc, kiểm thử kết quả và học cách kiểm soát quyền truy cập, phê duyệt.',
  },
  {
    title: 'Làm chủ quản trị & Mở rộng',
    text: 'Nhận chuyển giao kiến thức quản trị để tự vận hành và dạy thêm kỹ năng mới cho Hermes.',
  },
];

function Pin() {
  return (
    <svg className="edu-pin__tack" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 3a1 1 0 0 1 .117 1.993L16 5v4.764l1.894 3.789a1 1 0 0 1 .1.331L18 14v2a1 1 0 0 1-.883.993L17 17h-4v4a1 1 0 0 1-1.993.117L11 21v-4H7a1 1 0 0 1-.993-.883L6 16v-2a1 1 0 0 1 .06-.34l.046-.107L8 9.762V5a1 1 0 0 1-.117-1.993L8 3h8z" />
    </svg>
  );
}

export default function EduFormat() {
  const boardRef = useRef(null);
  const pinRefs = useRef([]);
  const [link, setLink] = useState(null);

  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board || board.clientWidth < 480) {
      setLink(null);
      return;
    }
    const base = board.getBoundingClientRect();
    const points = pinRefs.current.map((el, index) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const y = rect.top - base.top + rect.height * 0.42;
      return {
        x: index % 2 === 0 ? rect.right - base.left - 6 : rect.left - base.left + 6,
        y,
      };
    });
    if (points.some((point) => !point)) return;
    const d = points.slice(1).reduce((path, point, index) => {
      const from = points[index];
      const bend = (point.x - from.x) * 0.42;
      return `${path} C ${from.x + bend},${from.y} ${point.x - bend},${point.y} ${point.x},${point.y}`;
    }, `M ${points[0].x},${points[0].y}`);
    setLink({ w: board.clientWidth, h: board.clientHeight, d });
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (boardRef.current) observer.observe(boardRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  return (
    <>
      <div className="edu-head edu-format-head">
        <p className="edu-kicker">04 BUỔI LÀM VIỆC RIÊNG · 90 PHÚT · 2–4 TUẦN</p>
        <h2 id="edu-format-title">ĐỒNG HÀNH THỰC CHIẾN 1:1</h2>
        <p className="edu-sub">Hình thức linh hoạt: Online hoặc Trực tiếp (Offline)</p>
      </div>
      <div className="edu-pair">
        <div className="edu-pins" ref={boardRef}>
          {link ? (
            <svg className="edu-pins__path" width={link.w} height={link.h} viewBox={`0 0 ${link.w} ${link.h}`} aria-hidden="true">
              <path d={link.d} />
            </svg>
          ) : null}
          {STEPS.map((step, index) => (
            <article className={`edu-pin edu-pin--${index + 1}`} key={step.title} ref={(el) => { pinRefs.current[index] = el; }}>
              <Pin />
              <div>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>

        <aside className="edu-masu" id="dong-hanh" aria-labelledby="edu-mentor-title">
        <div className="edu-masu__stage">
          <span className="edu-masu__ring" aria-hidden="true" />
          <img src="images/team/masu.png" alt="Masu Phan" />
        </div>
        <div className="edu-masu__copy">
          <h2 id="edu-mentor-title">Masu Phan</h2>
          <p className="edu-kicker">Người đồng hành &amp; chuyên gia</p>
          <p className="edu-masu__quote">Mọi thứ đều đáng để thử, miễn là biết biến nó thành giá trị.</p>
          <ul className="edu-masu__roles">
            <li>
              <b>Tech-Business Bridge</b>
              <span>Hơn 6 năm dẫn solution chuyển đổi số, tìm giải pháp công nghệ cho bài toán của doanh nghiệp.</span>
            </li>
            <li>
              <b>Co-founder kiêm Head of Business Consultant</b>
              <span>OXMODE</span>
            </li>
          </ul>
          <p className="edu-masu__note">Trong khoá này, Masu đồng hành 1:1 từ việc chọn công việc cần giao, thiết lập Hermes, đến kiểm thử và chuyển giao.</p>
        </div>
      </aside>
      </div>
    </>
  );
}
