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
  {
    number: "09",
    label: "then came the distance",
    title: "You went back to Law School.",
    body: "After that first yes, you went back to Law School. We had to keep choosing each other across the distance, between reading, calls, visits, and all the little moments that kept us close.",
    note: "The first yes was not the end of the story. It was where the real choosing began.",
    image: "/media/dummy-distance.svg",
  },
  {
    number: "10",
    label: "the picnic plan",
    title: "Then we decided we were doing a picnic.",
    body: "When you came back, we started planning it. The planning got stressful. You wanted to stop. I told you, “Baby, we are doing this.”",
    note: "And somehow, we kept going until the day was finally ours.",
    image: "/media/dummy-picnic.svg",
  },
  {
    number: "11",
    label: "the day we made it",
    title: "And the picnic turned out beautiful.",
    body: "The small chops and cake almost gave us a different story, but we made it through. We took pictures, made videos, laughed, and had a beautiful day together.",
    note: "One of those days I wish I could press rewind on.",
    image: "/media/dummy-picnic.svg",
  },
  {
    number: "12",
    label: "your first gift",
    title: "Then you gave me my first gift.",
    body: "You gave me a slide and told me to go play and take it over the park. It was such a small thing, but I remember how it felt to receive something from you.",
    note: "I still remember the little things you did before you knew how much they would mean to me.",
    image: "/media/dummy-gift.svg",
  },
  {
    number: "13",
    label: "the next season",
    title: "Then came the exams again.",
    body: "Law School kept asking for your attention. There were more reading days, more preparation, more visits, and more moments where I just wanted to be there with you.",
    note: "Loving you also meant learning how to support you through the seasons that demanded so much from you.",
    image: "/media/dummy-night.svg",
  },
  {
    number: "14",
    label: "the little visits",
    title: "We kept finding our little moments.",
    body: "Between everything going on, we still found time for each other. Sometimes it was a visit. Sometimes it was just sitting together and talking. The ordinary moments kept becoming memories.",
    note: "Not every beautiful memory needed a big plan.",
    image: "/media/dummy-date.svg",
  },
  {
    number: "15",
    label: "not always perfect",
    title: "We fought too.",
    body: "We had misunderstandings. We got upset. Sometimes we didn't understand each other the way we wanted to. But we kept coming back, talking, listening, and finding our way back to each other.",
    note: "We were never promised a perfect year. We were building a real one.",
    image: "/media/dummy-chat.svg",
  },
  {
    number: "16",
    label: "your birthday",
    title: "Then came your birthday.",
    body: "You came to my house. We went out, realised the first restaurant wasn't quite it, found another one, and still ended up having a beautiful day together.",
    note: "Even when the plan changed, being with you was still the best part.",
    image: "/media/dummy-date.svg",
  },
  {
    number: "17",
    label: "just us being silly",
    title: "There were amusement parks and ice cream too.",
    body: "We went out, ate ice cream, played, laughed, and made the kind of memories that don't need a special occasion to matter.",
    note: "A whole year of little versions of us.",
    image: "/media/dummy-picnic.svg",
  },
  {
    number: "18",
    label: "meeting your people",
    title: "Then I invited you to meet my mom.",
    body: "You came over and sat with my mom. You talked with her, even though you already knew each other. Watching that moment meant more to me than I probably said.",
    note: "I loved seeing two important parts of my life in the same room.",
    image: "/media/dummy-family.svg",
  },
  {
    number: "19",
    label: "then I met yours",
    title: "You invited me to your home too.",
    body: "I came to your house, and you made shawarma for me. We talked, ate, and shared another one of those moments that made everything feel a little more like home.",
    note: "Somewhere along the way, our families became part of our story too.",
    image: "/media/dummy-family.svg",
  },
  {
    number: "20",
    label: "the call to bar",
    title: "Then came your Call to Bar.",
    body: "There was planning with your mom, sorting gifts, getting everything ready, and then the day finally came. I was there with my friends, watching you step into another chapter of your life.",
    note: "I was proud of you, and even happier that I got to witness it.",
    image: "/media/dummy-celebration.svg",
  },
  {
    number: "21",
    label: "another new chapter",
    title: "Then NYSC took you somewhere else.",
    body: "We got your NYSC things ready. You travelled, and I missed you. Then you came back, travelled again, and we kept figuring out how to do life together through every new chapter.",
    note: "Distance kept showing up. So did we.",
    image: "/media/dummy-distance.svg",
  },
  {
    number: "22",
    label: "we went together",
    title: "Then I came the next day.",
    body: "You told me everything about what was happening there, and I joined you the next day. We set everything up, painted the house, ate, and did everything together.",
    note: "It felt less like helping and more like building a little life together.",
    image: "/media/dummy-home.svg",
  },
  {
    number: "23",
    label: "one more day out",
    title: "And somehow, we still found time to play.",
    body: "We went out, watched a movie, and you played the arcade games. You screamed, laughed, and gave me another memory I never want to forget.",
    note: "I love the version of you that comes out when we're just having fun.",
    image: "/media/dummy-arcade.svg",
  },
  {
    number: "24",
    label: "one year later",
    title: "And somehow, here we are.",
    body: "A year ago, it was just you and me sitting across from each other, not knowing everything that was coming. Now I look back and see a whole year of conversations, visits, laughter, fights, apologies, distance, family, growth, and love.",
    note: "We didn't just make memories. We made a story.",
    image: "/media/dummy-reflection.svg",
  },
  {
    number: "25",
    label: "what this year taught me",
    title: "I learned that loving you is in the little things.",
    body: "It is checking up on you. Staying on the phone when the night gets long. Showing up when things are hard. Laughing over things that make no sense. Choosing to talk when we misunderstand each other. And choosing you again, every single time.",
    note: "I would still choose you. And I would choose you again.",
    image: "/media/dummy-love.svg",
  },
  {
    number: "26",
    label: "my anniversary letter",
    title: "Baby, thank you for choosing life with me.",
    body: "I never want you to think I take what we have for granted. I see you. I appreciate you. I appreciate every conversation, every visit, every laugh, every difficult moment we worked through, and every time you let me into your world.",
    note: "Keep pushing, baby. I am here. And I am not going anywhere.",
    image: "/media/dummy-letter.svg",
  },
  {
    number: "27",
    label: "the future",
    title: "I can't wait to ask you to marry me.",
    body: "I don't know every detail of what the future will look like, but I know what I want. I want more ordinary mornings, more dates, more laughter, more hard seasons we survive together, one home, a family, and a life that keeps choosing us.",
    note: "One day, I want to look at you and know we made it all the way.",
    image: "/media/dummy-future.svg",
  },
  {
    number: "28",
    label: "forever",
    title: "We started this thing. We are going to see it to the end.",
    body: "You are mine, and you are mine forever. I want to keep loving you, keep growing with you, and keep building this thing with you. And the end is not a goodbye. The end is till death do us part.",
    note: "Happy one-year anniversary, baby. Here is to us.",
    image: "/media/dummy-forever.svg",
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
