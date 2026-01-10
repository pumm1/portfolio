import { useEffect, useState } from "react"
import  cyberpunkImg  from './assets/cyberpunk.png'
import  mediaImg  from './assets/media.png'
import githubImg from './assets/github-mark.svg'

import './App.css'

interface PageContentProps  {
  content: React.JSX.Element
  imageSrc?: string
  reverse?: boolean
  roundedImg?: boolean
}

const Page = ({ content, imageSrc, reverse, roundedImg }: PageContentProps) => 
  <div className={`pageContainer ${reverse ? "reverse" : ""}`}>
    <div className="page">
      {content}
    </div>
    {imageSrc && 
      <div className='imageContainer'>
        <img className='image' src={imageSrc} style={roundedImg ? {borderRadius: '50%'} : {}}/>
      </div>
    }
  </div>

interface ListedItemsProps {
  items: string[]
}

const ListedItems = ({items}: ListedItemsProps) =>
  <ul>
    {items.map(i => <li>{i}</li>)}
  </ul>

const CyberpunkProject = ({}) => {
  const structParts = [
    "Flask-based REST API (Python)",
    "PostgreSQL database for persistent game data",
    "React + TypeScript frontend",
    "Fully dockerized development and deployment setup"
  ]

  const features = [
    'Manual and randomized character creation',
    'Tools to check if attack hits based on rolled result and distance',
    'Keeping track of campaign gigs and events',
    'Campaign mind map'
  ]

  return(
    <>
      <a href='https://github.com/pumm1/cyber' className="linkAndImageContainer">
        <img src={githubImg} width={40} height={40} />
        <h2>Cyberpunk 2020 referee tool</h2>
      </a>
      <p>
        Cyberpunk 2020 is a TTRPG that offers deep mechanics,
        rich world-building, and fast-paced combat. Running the game, however,
        requires referees to constantly track characters, rules, tables, and
        dice roll outcomes — often interrupting the flow of play.
      </p>

      <p>
        To address this, I built a referee-focused tool designed to streamline
        common tasks during a session.
      </p>

      <h3>Features</h3>
      <ListedItems items={features}/>

      <p>
        A core design goal was fidelity to the original rulebook. Both the
        underlying logic and the UI closely follow the official rules, while
        visually echoing the black-and-white, retro aesthetic of the original
        character sheets and source material.
      </p>

      <h3>Structure</h3>
      <ListedItems items={structParts} />
    </>
  )
}

const MediaProject = ({}) => {
  const structParts = [
    "Flask-based REST API (Python)",
    "MongoDB for storing scanned media metadata and user-defined tags",
    "Redis-Cache for public data fetched from IMDB",
    "React + TypeScript frontend packaged as an Electron application to allow local file system access"
  ]

  const features = [
    'Scan configured folders for new media files',
    'Search media by name',
    'Configure custom tags for scanned items to filter by',
    'See recommendations based on similar tags when opening media title for more details',
    'See some data from IMDB'
  ]

  return (
    <>
      <a href='https://github.com/pumm1/media' className="linkAndImageContainer">
        <img src={githubImg} width={40} height={40} />
        <h2>Media library manager</h2>
      </a>
      <p>
        This project is a lightweight desktop application for managing a personal
        media library. It scans user-configured folders for media files, keeps the
        database in sync as files change, and allows users to organize their
        collection using custom tags.
      </p>

      <h3>Features</h3>
      <ListedItems items={features}/>
      
      <p>
        The application provides a clean UI for browsing and filtering media stored
        in the database, while running locally to safely access files on the user's
        system.
      </p>

      <h3>Structure</h3>
      <ListedItems items={structParts} />
    </>
  )
}

interface HighlightedItemsProps {
  label: string
  items: string[]
}
const HighlightedItems = ({ label, items }: HighlightedItemsProps) => 
  <span className="highlightedItems">
    <b>{label}</b>:
    {' '}
    {items.join(', ')}
  </span>

const AboutMe = ({}) => {
  return(
    <>
      <h2>About me</h2>
      <p>
        Software engineer with 7+ years of professional experience, interested in system design, tooling, and pragmatic engineering.
      </p>
      <HighlightedItems label="Languages" items={['Scala', 'Python', 'React/TypeScript']}/>
      <HighlightedItems label="Backend" items={['PostgreSQL', 'Flask', 'MongoDB']}/>
      <HighlightedItems label="Infrastructure" items={['Docker']}/>
      <a href='https://github.com/pumm1' className="linkAndImageContainer">
        <img src={githubImg} width={40} height={40} />
        <h2>Github</h2>
      </a>
      <p>
        Scroll down for a quick look at my own projects ↓
      </p>
    </>
  )
}
  
  

type Section = {
  content: React.JSX.Element
  imageSrc?: string
  roundedImg?: boolean
}

const sections: Section[] = [
  {
    content: <AboutMe />,
    imageSrc: 'https://avatars.githubusercontent.com/u/22749461?v=4',
    roundedImg: true
  },
  {
    content: <CyberpunkProject />,
    imageSrc: cyberpunkImg
  },
  {
    content: <MediaProject />,
    imageSrc: mediaImg
  }
]

function App() {
  const [index, setIndex] = useState(0)
  const [locked, setLocked] = useState(false)

  const validIdxValue = (i: number) => {
    if (i < 0) {
      return 0
    } else if (i > sections.length - 1) {
      return sections.length - 1
    } else {
      return i
    }
  }

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (locked) return

      if (e.deltaY > 0 && index < sections.length - 1) {
        setIndex(i => validIdxValue(i + 1))
      }

      if (e.deltaY < 0 && index > 0) {
        setIndex(i => validIdxValue(i - 1))
      }

      setLocked(true)
      setTimeout(() => setLocked(false), 800)
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    return () => window.removeEventListener("wheel", onWheel)
  }, [index, locked])

  const section = sections[index]

  return (
    <div className="main">
      <span className="flexBox">
        <span className="progressBar" style={{ height: `${((index + 1)/ (sections.length + 1)) * 100}%` }} />
        <div className="viewport">
          <div
            key={index}
            className="section fade"
          >
            <Page
              content={section.content}
              imageSrc={section.imageSrc}
              roundedImg={section.roundedImg}
            />
          </div>
        </div>
      </span>
    </div>
  )
}

export default App
