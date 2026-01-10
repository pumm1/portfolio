import { useEffect, useState } from "react"
import  cyberpunkImg  from './assets/cyberpunk.png'
import  mediaImg  from './assets/media.png'
import './App.css'

const LoremIpsum = ({}) => 
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a dignissim ligula. Fusce pulvinar nulla porta feugiat scelerisque. Quisque eu pellentesque augue, lobortis maximus tortor. Integer vel feugiat orci. Phasellus egestas, quam quis fringilla interdum, nisl eros euismod nisl, eget molestie arcu magna nec ex. Vivamus non maximus quam. Vivamus vel enim pellentesque, luctus nunc in, commodo augue. Etiam id ultrices erat.
    </p>
    <p>
      Morbi magna nisi, auctor ac ante non, eleifend luctus diam. In sollicitudin ligula sed purus pretium, ut aliquam ipsum suscipit. Donec sagittis faucibus porttitor. Curabitur eget quam velit. Nunc ac suscipit arcu, sed convallis dolor. Nullam sapien ligula, accumsan a dolor id, volutpat convallis leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
    </p>
    <p>
      Sed quis justo posuere, hendrerit elit nec, congue urna. Integer consequat rutrum nisl sed elementum. Nulla eget volutpat lacus. Morbi euismod nisl in augue vulputate lacinia. Duis id nibh vitae ligula tincidunt cursus at quis metus. Proin in mauris sed lorem ullamcorper laoreet. Aliquam ut ipsum a nibh euismod posuere. Quisque eget feugiat ligula. Nulla eu eros efficitur, ornare magna sed, tempor augue. Vestibulum in viverra tellus, et suscipit tortor. Sed ullamcorper vulputate lectus, at sollicitudin metus pretium ullamcorper. Suspendisse in mauris at mauris consectetur rutrum eget varius augue.
    </p>
    <p>
      Sed scelerisque, augue in porttitor pellentesque, odio sem feugiat lacus, at blandit massa purus in arcu. Nullam rutrum scelerisque mi, in tristique nulla pharetra ac. Donec sit amet pretium mauris, et tincidunt nibh. Phasellus tincidunt metus quam, eu varius arcu pulvinar quis. Nulla vestibulum euismod consectetur. Nullam eu lorem nulla. Aenean lobortis blandit dolor, at placerat neque ornare id. Etiam consequat feugiat varius. Curabitur sodales tellus quis pellentesque porta.
    </p>
    <p>
      Proin luctus quam a ex dignissim, id commodo augue consequat. Suspendisse ultricies eros non erat auctor fringilla. Donec venenatis varius mauris. Vivamus id porta tellus. Sed venenatis in dui non feugiat. Pellentesque sollicitudin, leo eget feugiat congue, sapien lacus luctus sem, et elementum lorem nulla at turpis. Mauris pellentesque, enim a fringilla aliquam, odio neque tincidunt ipsum, vitae ullamcorper augue tortor vitae libero. Mauris placerat turpis et justo posuere, non vestibulum nulla dapibus. Vivamus blandit sapien nec risus vulputate, et lacinia lorem feugiat. 
    </p>
  </>

interface PageContentProps  {
  content: React.JSX.Element
  imageSrc?: string
  reverse?: boolean
}

const Page = ({ content, imageSrc, reverse }: PageContentProps) => 
  <div className={`pageContainer ${reverse ? "reverse" : ""}`}>
    <div className="page">
      {content}
    </div>
    {imageSrc && 
      <div className='imageContainer'>
        <img className='image' src={imageSrc}/>
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
    'Flask for REST API (Python)',
    'Postgres SQL database for storing all the data',
    "React/Typescript UI",
    "Configured also to be dockerized"
  ]

  return(
    <>
      <a href='https://github.com/pumm1/cyber'><h2>Cyberpunk 2020 referee tool</h2></a>
      <p>
        <a href='https://en.wikipedia.org/wiki/Mike_Pondsmith'>Mike Pondsmith</a> created a table top role playing game (TTRPG) that has captivated many players for years now. The action packed game has a lot of things to keep track of,
        lots of rules to keep in mind and a lot of math to do on the fly, which can break the flow of an exciting game. As a solution, I decided to create a tool to help the referee 
        keep track of multiple chracters, create characters on the fly with randomized stats and equipment, see important tables quickly and to make some dice roll results faster to check.
      </p>
      <p>
        The idea of the project is to follow the official rule book as much as possible and make the UI also look like what's found in the rule book, including the characater sheet, thus the retro black-and-white look.
      </p>
      <p>
        Project structure:
      </p>
      <ListedItems items={structParts} />
    </>
  )
}

const MediaProject = ({}) => {
  const structParts = [
    'Flask for REST API (Python)',
    'MongoDB for saving scanned media and tags',
    "React/Typescript UI that's turned into an Electron app (to allow accessing files through the UI)",
  ]

  return (
    <>
      <a href='https://github.com/pumm1/media'><h2>Simple media library manager</h2></a>
      <p>
        This project allows user to keep track of own media library; scan configured folders for media updates, 
        tag them as wanted and also have a nice UI to browse media saved in database.
      </p>
      <p>
        Project structure:
      </p>
      <ListedItems items={structParts} />
    </>
  )
}
  

type Section = {
  content: React.JSX.Element
  imageSrc?: string
}

const sections: Section[] = [
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
      setTimeout(() => setLocked(false), 600)
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    return () => window.removeEventListener("wheel", onWheel)
  }, [index, locked])

  const section = sections[index]

  return (
    <>
      <span className="progressBar" style={{ height: `${((index + 1)/ sections.length) * 100}%` }} />
      <div className="viewport">
        <div
          key={index}
          className="section fade"
        >
          <Page
            content={section.content}
            imageSrc={section.imageSrc}
            reverse={index % 2 === 1}
          />
        </div>
      </div>
    </>
  )
}

export default App
