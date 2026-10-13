import React from 'react';

export default function EduFooterCTA() {
  return (
    <div className="edu-foot__lead">
      {/* 1. Trust Indicators */}
      <div className="edu-foot__trust">
        <div className="edu-foot__avatars" aria-hidden="true">
          <img
            src="https://cdn.21st.dev/assets/localized/868ee7e6983767d120387ecbd017fd6870f85aa0c5aeba6db06d54e0504c2934.jpg"
            alt="Executive"
            className="edu-foot__avatar"
            loading="lazy"
          />
          <img
            src="https://cdn.21st.dev/assets/localized/95767b6c354c4ac206cadaac8937b5a7b74ea1e227fa2f578703674d3725bcdd.jpg"
            alt="Founder"
            className="edu-foot__avatar"
            loading="lazy"
          />
          <img
            src="https://cdn.21st.dev/assets/localized/4526a25eb7c0b86d945cf5e43ed53e85be9821edb8dc26017ed372b1450ae6f6.jpg"
            alt="Leader"
            className="edu-foot__avatar"
            loading="lazy"
          />
        </div>

        <div className="edu-foot__trust-meta">
          <div className="edu-foot__stars" aria-label="Đánh giá 5 sao">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="edu-foot__star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="edu-foot__trust-label">Đồng hành 1:1 cùng 50+ CEO &amp; Nhà sáng lập</span>
        </div>
      </div>

      {/* 2. Headline chuẩn typography các block khác */}
      <h2 className="edu-foot__headline" id="edu-contact-title">
        SẴN SÀNG LÀM CHỦ<br />
        <span className="edu-foot__headline-highlight">TRỢ LÝ SỐ ĐIỀU HÀNH?</span>
      </h2>

      {/* 3. Subheadline */}
      <p className="edu-foot__subheadline">
        Chọn một bài toán đang lấy nhiều thời gian nhất mỗi tuần. Buổi đầu tiên dùng để rà soát quy trình và kiểm chứng xem kiến trúc Hermes Agent có phù hợp với doanh nghiệp của bạn.
      </p>

      {/* 4. Dual CTAs đồng bộ với style shiny-cta của Hero Banner */}
      <div className="edu-foot__cta-group">
        <a
          href="mailto:hello@oxmode.ai?subject=Tư%20vấn%20khoá%20Hermes%201:1"
          className="shiny-cta edu-foot__shiny-primary"
        >
          <span>Đăng ký tư vấn 1:1</span>
        </a>

        <a
          href="mailto:hello@oxmode.ai"
          className="shiny-cta edu-foot__shiny-secondary"
        >
          <span>Liên hệ trực tiếp →</span>
        </a>
      </div>

      {/* 5. Powered by OXMODE micro-line */}
      <div className="edu-foot__powered">
        <div className="edu-foot__powered-badge">
          <span className="edu-foot__powered-dot" aria-hidden="true" />
          <span className="edu-foot__powered-label">POWERED BY</span>
          <span className="edu-foot__powered-brand">OXMODE</span>
        </div>
      </div>
    </div>
  );
}
