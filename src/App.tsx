import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type ExperienceState = "opening" | "story"

const dates = "23.09.25  /  23.09.26"

const memories = [
  {
    number: "01",
    label: "the first little thing",
    title: "It started on Snapchat.",
    body: "I added you. We talked about family. Then somehow, the streaks became a reason to keep coming back.",
    note: "A conversation that didn't know where it was going yet.",
    image: "/media/dummy-cat.svg",
  },
  {
    number: "02",
    label: "then came the DM",
    title: "You came looking for reels.",
    body: "You replied to my story with that little complaint: “So you share reels with people and you don't share with me?”",
    note: "And just like that, Instagram became part of the story.",
    image: "/media/dummy-cat.svg",
  },
  {
    number: "03",
    label: "somewhere in between",
    title: "You kept the conversation going.",
    body: "After that post about ladies who couldn't keep a conversation, you replied: “Nah, not you. You know how to keep conversation.”",
    note: "Then the checking up became daily.",
    image: "/media/dummy-cat.svg",
  },
  {
    number: "04",
    label: "the little crisis",
    title: "Then WhatsApp decided to stress us.",
    body: "You got logged out and couldn't recover the line. We had to figure it out together, and eventually you got another line.",
    note: "Even the annoying things became things we solved together.",
    image: "/media/dummy-chat.svg",
  },
  {
    number: "05",
    label: "those long nights",
    title: "Law School gave us late-night calls.",
    body: "You were reading. I was there. We talked, danced, laughed, and sometimes you cried. Some nights were long, but I loved being the person you could call.",
    note: "Some of my favourite memories were simply being there with you.",
    image: "/media/dummy-night.svg",
  },
  {
    number: "06",
    label: "when you came back",
    title: "Then we started talking about our first date.",
    body: "You told your mom. You cried. Somehow, through all the nerves and conversations, we finally got to the day we had been talking about.",
    note: "We didn't know yet that this would become our date.",
    image: "/media/dummy-date.svg",
  },
  {
    number: "07",
    label: "23 september 2025",
    title: "Then you came back to the table.",
    body: "I saw you. You went to the bedroom to adjust. I told the waiter to do something, and when you came back, we talked, ate, and waited.",
    note: "Then that little cake arrived with one very important question.",
    image: "/media/dummy-date.svg",
  },
  {
    number: "08",
    label: "the first yes",
    title: "And you said yes.",
    body: "The waiter asked you to be my girlfriend. You said yes. And just like that, September 23 stopped being an ordinary date.",
    note: "The first yes. The yes that brought us here.",
    image: "/media/dummy-yes.svg",
  },
]

function App() {
  const [state, setState] = useState<ExperienceState>("opening")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [storyIndex, setStoryIndex] = useState(0)
  const [musicOpen, setMusicOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("/media/yellow.mp3")
    audio.loop = true
    audio.volume = 0.28
    audioRef.current = audio

    const sync = () => setIsPlaying(!audio.paused)
    audio.addEventListener("play", sync)
    audio.addEventListener("pause", sync)

    return () => {
      audio.pause()
      audio.removeEventListener("play", sync)
      audio.removeEventListener("pause", sync)
    }
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
        setMusicOpen(true)
      } catch {
        setMusicOpen(true)
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  const enterStory = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    void audioRef.current?.play().catch(() => {
      setMusicOpen(true)
    })

    window.setTimeout(() => {
      setState("story")
      setStoryIndex(0)
      setIsTransitioning(false)
    }, 1050)
  }

  const changeMemory = (direction: 1 | -1) => {
    setStoryIndex((current) => Math.min(Math.max(current + direction, 0), memories.length - 1))
  }

  const memory = memories[storyIndex]

  return (
    <main className="experience">
      <div className="grain" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {state === "opening" ? (
          <motion.section
            key="opening"
            className="opening scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-labelledby="opening-title"
          >
            <header className="topbar">
              <span className="wordmark">sucree</span>
              <span className="date-mark">{dates}</span>
            </header>

            <div className="opening-content">
              <motion.div
                className="memory-window"
                initial={{ y: 28, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: -1 }}
                transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                <img src="/media/dummy-cat.svg" alt="" />
                <div className="memory-window-overlay">
                  <span>one year</span>
                  <strong>and still us.</strong>
                </div>
              </motion.div>

              <div className="question-wrap">
                <p className="eyebrow">A little question before we begin</p>
                <h1 id="opening-title">
                  Will you be
                  <em> my girlfriend again?</em>
                </h1>

                <div className="yes-actions" aria-label="Choose yes">
                  <YesButton label="YES" onClick={enterStory} />
                  <YesButton label="YES, OF COURSE" onClick={enterStory} />
                </div>

                <p className="quiet-note">There was never really another answer.</p>
              </div>
            </div>

            <footer className="opening-footer">
              <span>For the girl who said yes the first time.</span>
              <span>23 / 09 / 2026</span>
            </footer>

            <TransitionCover active={isTransitioning} />
          </motion.section>
        ) : (
          <motion.section
            key="story"
            className="story scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="topbar">
              <span className="wordmark">sucree</span>
              <span className="chapter-label">how it started · {memory.number} / {memories.length}</span>
            </header>

            <div className="story-progress" aria-hidden="true">
              {memories.map((item, index) => (
                <span key={item.number} className={index === storyIndex ? "active" : ""} />
              ))}
            </div>

            <div className="story-content">
              <div className="story-copy">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={memory.number}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="eyebrow">{memory.label}</p>
                    <h2>{memory.title}</h2>
                    <p className="body-copy">{memory.body}</p>
                    <p className="story-note">{memory.note}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="story-visual">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={memory.number}
                    className="story-photo"
                    initial={{ opacity: 0, scale: 0.92, rotate: storyIndex % 2 ? 2 : -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: storyIndex % 2 ? -1 : 1 }}
                    exit={{ opacity: 0, scale: 1.04, rotate: 3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img src={memory.image} alt="" />
                    <div className="story-photo-label">
                      <span>temporary photo</span>
                      <strong>{memory.number}</strong>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="story-controls">
                  <button type="button" onClick={() => changeMemory(-1)} disabled={storyIndex === 0}>
                    ←
                  </button>
                  <span>swipe / tap</span>
                  <button
                    type="button"
                    onClick={() => changeMemory(1)}
                    disabled={storyIndex === memories.length - 1}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div
              className="story-swipe-zone"
              onTouchStart={(event) => {
                const start = event.changedTouches[0]?.clientX ?? 0
                event.currentTarget.dataset.startX = String(start)
              }}
              onTouchEnd={(event) => {
                const start = Number(event.currentTarget.dataset.startX ?? 0)
                const end = event.changedTouches[0]?.clientX ?? start
                if (Math.abs(end - start) < 45) return
                changeMemory(end < start ? 1 : -1)
              }}
              aria-label="Swipe between memories"
            />

            <button className="story-back" type="button" onClick={() => setState("opening")}>
              restart
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        className={`music-control ${musicOpen ? "is-open" : ""}`}
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
      >
        <span className="music-dot" aria-hidden="true">{isPlaying ? "Ⅱ" : "♪"}</span>
        <span className="music-copy">
          <strong>Yellow</strong>
          <small>{isPlaying ? "playing for you" : "music is off"}</small>
        </span>
      </button>
    </main>
  )
}

function YesButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      className="yes-button"
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <span>{label}</span>
      <span className="button-arrow" aria-hidden="true">↗</span>
    </motion.button>
  )
}

function TransitionCover({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="transition-cover"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            still choosing you.
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default App
