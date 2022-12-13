import React from 'react';
import { useState } from 'react';

const Headers = ({ titles, currentTab, selectTab }) => {
  const handleClick = (e) => {
    const idx = parseInt(e.target.id, 10);
    // console.log(idx, 'idx')
    selectTab(idx);
  }

  const tabs = titles.map((title, idx) => {
    const headerClass = (idx === currentTab) ? 'active' : '';

    return (
      <li
        key={idx}
        id={idx}
        onClick={handleClick}
        className={headerClass}
      >
        {title}
      </li>
    );
  });
  
  return (
    <ul className='tab-header'>
      {tabs}
    </ul>
  );
}

// class Folder extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentTab: 0
//     };
//   }
const Folder = ({folders}) => {
  const [currentTab, setCurrentTab] = useState(0);
  
  // const selectTab = (num) => {
  //   console.log(num, 'num')
  //   console.log(currentTab);
  //   // setCurrentTab((currentTab) => currentTab = num);
  // }
  
    const folder = folders[currentTab];
    // console.log(folders)
    const titles = folders.map((folder) => folder.title);
    // console.log(titles);
    // console.log(currentTab);
    
    return (
      <section className="tabs-section">
        <h1>Tabs</h1>
        <div className='tabs'>
          <Headers
            titles={titles}
            currentTab={currentTab}
            selectTab={setCurrentTab}
          />
          <div className='tab-content'>
            {folder.content}
          </div>
        </div>
      </section>
    );
}

export default Folder;