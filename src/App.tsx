import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type ExperienceState = "opening" | "memory"

const dates = "23.09.25  /  23.09.26"

function App() {
  const [state, setState] = useState<ExperienceState>("opening")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const enterStory = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    window.setTimeout(() => {
      setState("memory")
      setIsTransitioning(false)
    }, 1050)
  }

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
                <div className="memory-window-inner">
                  <span>one year</span>
                  <strong>and still us.</strong>
                  <i />
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

                <p className="quiet-note">
                  There was never really another answer.
                </p>
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
            key="memory"
            className="memory scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="topbar topbar-memory">
              <span className="wordmark">sucree</span>
              <span className="chapter-label">the story starts here</span>
            </header>

            <div className="memory-content">
              <div className="chapter-copy">
                <p className="eyebrow">Before the date. Before the cake. Before the yes.</p>
                <h2>
                  It started with
                  <em> a conversation.</em>
                </h2>
                <p className="body-copy">
                  Somewhere between Snapchat streaks, an Instagram DM and those
                  everyday check-ins, you quietly became my person.
                </p>
                <button
                  className="continue-button"
                  type="button"
                  onClick={() => setState("opening")}
                >
                  Back to the question
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              <div className="memory-card" aria-label="First chapter placeholder">
                <div className="memory-card-top">
                  <span>chapter one</span>
                  <span>01</span>
                </div>
                <div className="memory-card-photo">
                  <span>your first memory photo</span>
                </div>
                <div className="memory-card-caption">
                  <strong>Somewhere along the way.</strong>
                  <span>We started checking up on each other every day.</span>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
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