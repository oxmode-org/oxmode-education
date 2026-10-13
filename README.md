# OXMODE Education

Landing page khoá đào tạo **Hermes Agent 1:1** — tách standalone từ `oxmode-website`.

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # xuất ra dist/, base path /oxmode-education/ cho GitHub Pages
```

## Deploy

Tự động qua GitHub Actions → GitHub Pages mỗi khi push vào `main`.
URL: https://oxmode-org.github.io/oxmode-education/

## Cấu trúc

- `src/pages/EducationLanding.jsx` — trang chính
- `src/components/Edu*.jsx` — các block (Orbit, Feedback, Format, LetterChat, FooterCTA)
- `src/components/ui/ConstellationField.jsx` — animation nền chòm sao
- `src/components/Footer.jsx` — footer (compact mode cho Education)
- `public/education/` — video hero, ảnh mascot, letter, mentor
