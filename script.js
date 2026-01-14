window.addEventListener("load", () => {
  // Try to play audio on page load
  const introAudio = document.getElementById("introAudio")
  if (introAudio) {
    introAudio.play().catch((error) => {
      console.log("Autoplay blocked by browser. User interaction required.")
    })
  }

  const verses = document.querySelectorAll(".verse, .section-title")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("fade-in")
          }, index * 50)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  verses.forEach((verse) => {
    observer.observe(verse)
  })
})

document.querySelectorAll(".verse").forEach((verse) => {
  verse.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)"
    this.style.transition = "transform 0.3s ease"
  })

  verse.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

const settingsToggle = document.getElementById("settingsToggle")
const settingsPanel = document.getElementById("settingsPanel")
const panelSettingsIcon = document.getElementById("panelSettingsIcon")
const zoomInBtn = document.getElementById("zoomIn")
const zoomOutBtn = document.getElementById("zoomOut")
const lightModeBtn = document.getElementById("lightMode")
const darkModeBtn = document.getElementById("darkMode")
const playBtn = document.getElementById("playBtn")
const pauseBtn = document.getElementById("pauseBtn")
let isPanelOpen = false
let currentFontSize = 1.1
let isPlaying = false

settingsToggle.addEventListener("click", (e) => {
  e.stopPropagation()
  isPanelOpen = !isPanelOpen
  if (isPanelOpen) {
    settingsPanel.classList.remove("closing")
    settingsPanel.classList.add("active")
  } else {
    closePanel()
  }
})

panelSettingsIcon.addEventListener("click", (e) => {
  e.stopPropagation()
  closePanel()
})

document.addEventListener("click", (e) => {
  if (isPanelOpen && !settingsPanel.contains(e.target) && e.target !== settingsToggle) {
    closePanel()
  }
})

function closePanel() {
  settingsPanel.classList.add("closing")
  setTimeout(() => {
    settingsPanel.classList.remove("active", "closing")
    isPanelOpen = false
  }, 500)
}

zoomInBtn.addEventListener("click", () => {
  currentFontSize += 0.1
  if (currentFontSize > 2) currentFontSize = 2
  document.querySelectorAll(".verse").forEach((verse) => {
    verse.style.fontSize = currentFontSize + "rem"
  })
})

zoomOutBtn.addEventListener("click", () => {
  currentFontSize -= 0.1
  if (currentFontSize < 0.8) currentFontSize = 0.8
  document.querySelectorAll(".verse").forEach((verse) => {
    verse.style.fontSize = currentFontSize + "rem"
  })
})

playBtn.addEventListener("click", () => {
  isPlaying = true
  playBtn.classList.add("hidden")
  pauseBtn.classList.remove("hidden")
})

pauseBtn.addEventListener("click", () => {
  isPlaying = false
  pauseBtn.classList.add("hidden")
  playBtn.classList.remove("hidden")
})

let isDarkMode = false
darkModeBtn.classList.add("hidden")

lightModeBtn.addEventListener("click", () => {
  isDarkMode = true
  document.body.classList.add("dark-mode")
  lightModeBtn.classList.add("hidden")
  darkModeBtn.classList.remove("hidden")
})

darkModeBtn.addEventListener("click", () => {
  isDarkMode = false
  document.body.classList.remove("dark-mode")
  darkModeBtn.classList.add("hidden")
  lightModeBtn.classList.remove("hidden")
})
