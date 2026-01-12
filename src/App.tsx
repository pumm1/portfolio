import { useState } from "react"
import cyberpunkImg  from './assets/cyberpunk.png'
import mediaImg  from './assets/media.png'
import githubImg from './assets/github-mark.svg'

import './App.css'

interface PageContentProps  {
  content: React.JSX.Element
  imageSrc?: string
  roundedImg?: boolean
}

const Page = ({ content, imageSrc, roundedImg }: PageContentProps) => 
  <>
    <section className="page">
      <article>
        {content}
      </article>
    </section>
    <section>
      {imageSrc && 
        <img className='image' src={imageSrc} style={roundedImg ? {borderRadius: '50%'} : {}}/>
      }
    </section>
  </>

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
    "React/TypeScript frontend",
    "Fully dockerized development and deployment setup"
  ]

  const features = [
    'Manual and randomized character creation',
    'Tools to check if attack hits based on rolled result and distance',
    'Keeping track of campaign gigs and events',
    'Campaign mind map'
  ]

  return(
    <section className="fade">
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

      <h3>Project structure</h3>
      <ListedItems items={structParts} />
    </section>
  )
}

const MediaProject = ({}) => {
  const structParts = [
    "Flask-based REST API (Python)",
    "MongoDB for storing scanned media metadata and user-defined tags",
    "Redis-Cache for public data fetched from IMDB",
    "React/TypeScript frontend packaged as an Electron application to allow local file system access"
  ]

  const features = [
    'Scan configured folders for new media files',
    'Search media by name',
    'Configure custom tags for scanned items to filter by',
    'See recommendations based on similar tags when opening media title for more details',
    'See some data from IMDB'
  ]

  return (
    <section className="fade">
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

      <h3>Project structure</h3>
      <ListedItems items={structParts} />
    </section>
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
    <section className="fade">
      <p>
        Software engineer with 7+ years of professional experience, interested in system design, tooling, and pragmatic engineering.
      </p>
      <HighlightedItems label="Languages" items={['Scala', 'Python', 'React/TypeScript']}/>
      <HighlightedItems label="Backend" items={['PostgreSQL', 'Flask', 'MongoDB']}/>
      <HighlightedItems label="Infrastructure" items={['Docker']}/>
      <a href='https://github.com/pumm1' className="linkAndImageContainer">
        <img src={githubImg} width={40} height={40} />
        <h3>Github</h3>
      </a>
    </section>
  )
}

type Section = {
  title?: string
  content: React.JSX.Element
  imageSrc?: string
  roundedImg?: boolean
}

const Content = () => {
  const projects: Section[] = [
    {
      title: 'About me',
      content: <AboutMe />,
      imageSrc: 'https://avatars.githubusercontent.com/u/22749461?v=4',
      roundedImg: true
    },
    {
      title: 'Cyberpunk 2020 Referee tool',
      content: <CyberpunkProject />,
      imageSrc: cyberpunkImg
    },
    {
      title: 'Media library manager',
      content: <MediaProject />,
      imageSrc: mediaImg
    }
  ]
  const [projectIdx, setProjectIdx] = useState<number>(0)
  const sect = projects[projectIdx]

  return (
    <section>
      <div className="navigation">
        {projects.map((project, idx) => <button onClick={() => setProjectIdx(idx)}>{project.title ?? ''}</button>)}
      </div>
      <Page content={sect.content} imageSrc={sect.imageSrc} roundedImg={sect.roundedImg}/>
    </section>
  )
}

function App() {
  return (
    <div className="gridContainer">
      <Content />
    </div>
  )
}

export default App
