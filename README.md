# Raish Mansuri — Professional Portfolio Website

A complete, modern, premium, fully responsive personal portfolio website built for **Raish Mansuri**, tailored specifically for UK job-market opportunities in **IT Support**, **Network Engineering**, and **Cybersecurity**.

All qualifications, work history, skills, certifications, and contact details are strictly extracted from Raish Mansuri's official uploaded Curriculum Vitae (CV).

---

## 🛠️ Technology Stack

- **Framework:** React.js 19 with Vite 8
- **3D Graphics & Canvas:** Three.js (Interactive 3D Network Topology Background & 3D Cyber Security Sphere)
- **Styling:** CSS3, Bootstrap 5.3 (customized with CSS Variables)
- **3D Interactive Cards:** Custom Perspective 3D Tilt Cards with specular glare tracking
- **Design System:** Deep Navy Blue (`#050b14`), Crisp White (`#ffffff`), Subtle Cyan Accent (`#00b4d8`)
- **Typography:** Plus Jakarta Sans & JetBrains Mono (via Google Fonts)
- **Icons:** React Icons (`react-icons/bs` Bootstrap Icons)
- **Animations:** Three.js 3D WebGL + Framer Motion for scroll reveals and micro-interactions
- **Theme:** Working Dark Mode and Light Mode with system preference detection and localStorage persistence

---

## 📂 Project Structure

```
raish/
├── public/
│   ├── Raish-Mansuri-CV.pdf   # Official downloadable CV
│   └── raish-image.png        # Authentic professional portrait
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Sticky header with "RM" monogram, NavLink & theme toggle
│   │   ├── Hero.jsx               # Hero banner, CTAs, and 3D visual hub
│   │   ├── CyberGlobe3D.jsx       # Interactive 3D Cyber Security & Network Sphere
│   │   ├── NetworkBackground3D.jsx# Fullscreen Three.js 3D network topology canvas
│   │   ├── TiltCard3D.jsx         # 3D card perspective tilt with glare overlay
│   │   ├── ScrollToTop.jsx        # Route change scroll reset controller
│   │   ├── About.jsx              # Reusable CV summary & credentials cards
│   │   ├── Skills.jsx             # Reusable skill categories & badges
│   │   ├── Experience.jsx         # Reusable career timeline (NIF-India & NK Cyber)
│   │   ├── Education.jsx          # Reusable B.E. & HSC timeline
│   │   ├── Certifications.jsx     # Reusable certification cards
│   │   ├── Languages.jsx          # Reusable language cards
│   │   ├── Contact.jsx            # Reusable validated contact form
│   │   └── Footer.jsx             # Dynamic footer with Router links
│   ├── pages/
│   │   ├── HomePage.jsx           # `/` Full portfolio overview & route hub
│   │   ├── AboutPage.jsx          # `/about` In-depth CV profile & verified milestones
│   │   ├── ExperiencePage.jsx     # `/experience` Career history with interactive filter
│   │   ├── EducationPage.jsx      # `/education` Academic qualifications timeline
│   │   ├── SkillsPage.jsx         # `/skills` Live searchable skills with category filter
│   │   ├── CertificationsPage.jsx # `/certifications` Verified credentials with domain filter
│   │   ├── LanguagesPage.jsx      # `/languages` Multilingual communication in IT
│   │   ├── ContactPage.jsx        # `/contact` Validated contact form, tel/email & setup guide
│   │   ├── CvPage.jsx             # `/cv` Live embedded PDF viewer & download
│   │   └── NotFoundPage.jsx       # `*` 404 route fallback
│   ├── data/
│   │   └── portfolioData.js       # Single source of truth derived strictly from CV
│   ├── App.jsx                    # BrowserRouter & Route configuration
│   ├── index.css                  # Custom design tokens, glassmorphism, responsive styles
│   └── main.jsx                   # React DOM entry point
├── index.html                     # SEO title, meta descriptions, and favicon
├── package.json
└── vite.config.js
```

---

## 🚀 Installation & Running the Project

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 2. Install Dependencies
```bash
npm install
```
*(On Windows PowerShell, use `npm.cmd install` if script execution policies apply)*

### 3. Start Development Server
```bash
npm run dev
```
*(Or `npm.cmd run dev`)*

The server will launch locally (e.g. `http://localhost:5173/` or `http://localhost:5176/`).

### 4. Build for Production
```bash
npm run build
```

### 5. Lint the Codebase
```bash
npm run lint
```

---

## 📄 CV Fidelity & Source of Truth

| Category | Details Extracted from CV |
|---|---|
| **Full Name** | Raish Mansuri |
| **Headline** | IT Support \| Network Engineering \| Cybersecurity |
| **Location** | Birmingham, United Kingdom |
| **Contact** | Phone: `+44 7344829205` \| Email: `raishmansuri0777@gmail.com` |
| **Education** | **B.E. in Computer Engineering**, Arrdekta Institute of Technology (2019 – 2023)<br>**Higher Secondary Certificate**, Municipal Highschool, Kheralu (2017 – 2019) |
| **Experience** | **Network Engineer**, National Innovation Foundation-India, GoI (June 2024 – July 2026)<br>**IT Service**, Linics Enterprise Private Limited (1 August 2023 – 30 May 2024)<br>**Intern**, NK Cyber Security Pvt. Ltd. (January 2023 – May 2023) |
| **Skills** | **IT Support:** Tech Support & Troubleshooting, Incident/Ticket Management, System Maintenance & Configuration, Communication & User Support<br>**Operating Systems:** Windows, Linux<br>**Hardware & Networking:** Hardware/Software Installation, LAN, TCP/IP, Wi-Fi, Basic Networking Assistance<br>**Additional Skills:** Website Updates & Maintenance, Social Media Content Creation & Scheduling, Social Media Platform Management |
| **Certifications** | Vulnerability Assessment and Penetration Testing, Ethical Hacking, Cyber Forensics, Stay Safe in Cyber Space, Introduction to Social Media |
| **Languages** | English, Hindi, Gujarati |

---

## 📬 Connecting a Form Submission Backend

The contact form includes client-side validation (Name, Email, Subject, Message). When submitted in static mode, it immediately opens the sender's default email client with a pre-formatted message addressed to `raishmansuri0777@gmail.com`.

To enable automated serverless form delivery (without triggering the local email client):

### Option A: Formspree (Recommended for Static/Vite Sites)
1. Sign up at [formspree.io](https://formspree.io) and create a form targeting `raishmansuri0777@gmail.com`.
2. In `src/components/Contact.jsx`, inside `handleSubmit`, send a `fetch` POST request:
   ```javascript
   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(formData)
   });
   ```

### Option B: EmailJS
1. Install `@emailjs/browser` via `npm install @emailjs/browser`.
2. Initialize EmailJS in `Contact.jsx` and call `emailjs.send("SERVICE_ID", "TEMPLATE_ID", formData, "PUBLIC_KEY")`.
