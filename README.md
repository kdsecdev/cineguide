# 🎬 CineGuide

<div align="center">

**Your Ultimate Movie Information Hub**

Discover movies • Find where to watch • Explore cinema release dates

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://github.com/kdsecdev/cineguide)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

---

## ✨ About CineGuide

**CineGuide** is a modern, Netflix-inspired movie information platform that helps you discover films, find where to watch them, and explore detailed movie data. With a sleek dark interface and intuitive design, CineGuide makes movie discovery effortless and enjoyable.

![CineGuide Homepage](https://github.com/kdsecdev/cineguide/blob/main/screenshots/homepage.png)

---

## 🎯 Key Features

### 🎭 **Comprehensive Movie Details**
Click any movie to view:
- **IMDb Ratings** with star reviews
- **Release Dates** with theater/streaming status
- **Plot Synopsis** and full descriptions
- **Cast & Crew** information
- **Box Office** earnings (when available)
- **DVD/Blu-ray** release dates

### 📺 **Streaming Platform Guide**
- See which platforms have the movie (Netflix, Prime Video, Disney+, etc.)
- **Visual availability** badges (Available/Not Available)
- Direct link to **JustWatch** for accurate streaming info
- Platform-specific recommendations

### 🎬 **Release Status Tracking**
Smart badges show:
- 🔥 **In Theaters** - Currently playing in cinemas
- ⭐ **Coming Soon** - Upcoming releases
- 🌟 **Recently Released** - New to streaming
- ✅ **Released** - Available everywhere

### 🔍 **Powerful Search**
- Real-time search with instant results
- Browse popular movies on homepage
- Smooth animations and loading states

### 🎨 **Premium Design**
- Netflix/Prime-inspired dark theme
- Glassmorphism effects
- Smooth hover animations
- Fully responsive (mobile, tablet, desktop)
- Modern Poppins typography

---

## 📸 Screenshots

### Movie Details Modal
![Movie Details](https://github.com/kdsecdev/cineguide/blob/main/screenshots/movie-details.png)
*Detailed movie information with streaming availability*

### Search Results
![Search Results](https://github.com/kdsecdev/cineguide/blob/main/screenshots/search-results.png)
*Fast, responsive search functionality*

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/kdsecdev/cineguide.git

# Navigate to project directory
cd cineguide

# Install dependencies
npm install

# Start development  server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **OMDb API** | Movie data & information |
| **Vanilla CSS** | Styling & animations |
| **JustWatch** | Streaming availability |
| **IMDb Integration** | Direct movie links |

---

## 🎨 Design Philosophy

CineGuide follows modern web design principles:

- **Dark-first design** for comfortable viewing
- **Cinematic aesthetics** inspired by Netflix & Amazon Prime
- **Micro-animations** for enhanced UX
- **Glassmorphism** for modern UI elements
- **Responsive grid layouts** for all devices

**Color Palette:**
- Primary Red: `#e50914` (Netflix-inspired accent)
- Background: Deep blacks for cinematic feel
- Text: White (#ffffff) with gray (#b3b3b3) accents

---

## 📖 API Information

CineGuide uses the **OMDb API** for movie data. To use your own API key:

1. Get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Replace the key in `src/App.js`:

```javascript
const API_URL = "http://www.omdbapi.com?apikey=YOUR_API_KEY";
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cineguide)

**Or via CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Other Platforms:**
- **Netlify:** Drag and drop the `build` folder
- **GitHub Pages:** Use `gh-pages` package
- **AWS S3:** Upload build folder to S3 bucket

---

## 🎯 Features Roadmap

- [ ] User authentication & accounts
- [ ] Watchlist and favorites
- [ ] Genre/category filtering
- [ ] Trending movies section
- [ ] Similar movie recommendations
- [ ] Movie reviews & ratings
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/kdsecdev)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for movie data
- [JustWatch](https://www.justwatch.com/) for streaming availability
- [React](https://reactjs.org/) for the amazing framework
- Netflix & Amazon Prime for design inspiration

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and React

[Report Bug](https://github.com/kdsecdev/cineguide/issues) • [Request Feature](https://github.com/kdsecdev/cineguide/issues)

</div>
