import React, { useState, useEffect} from 'react'
import Project from './Project'

export default function ProjectView(props) { 
    const [entries, setEntries] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
      setEntries(loadProjects(true))
    },[])
  
    useEffect(() => {
      if (entries.length > 0 && !loaded)
        setLoaded(true)
    },[entries])
  
    useEffect(() => {
      if (entries && loaded)
        setEntries(loadProjects(props.isMinimized));
    }, [props.isMinimized])
  
    function loadProjects(mini) {
      let jsx = props.data.map((proj, idx) => 
        <Project name={proj.node.name} 
          langs={proj.node.langs} 
          desc={proj.node.desc} 
          type={proj.node.type}
          link={proj.node.link}
          isMini={mini}
          key={idx} />
      );

      return jsx
    }
  
    const loadingData = () => {
      let jsx = [];
      for (let i = 0; i < 5; i++)
        jsx.push(<div className='w-64 h-10 bg-gray-500' key={i}></div>)
      return jsx
    }
  
    return (
      <div className='overflow-auto space-y-4 h-full'>
        {loaded ? entries : loadingData()}
      </div>
    )
}
  