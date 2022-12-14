import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// class AutoComplete extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputVal: '',
//       showList: false
//     };
//     this.inputRef = React.createRef();
//   }


const AutoComplete = ({names}) => {
  const[showList, setShowList] = useState(false);
  const[inputVal, setInputVal] = useState('');
  
  const inputRef = React.useRef();
  
  useEffect(()=>{
    if (showList) {
      document.addEventListener('click', handleOutsideClick);
      console.log('added event listener')
    } //else {
    //   console.log("Removing Autocomplete listener on update!");
    //   document.removeEventListener('click', handleOutsideClick);
    // }

    return(()=>{
      console.log("Cleaning up event listener from Autocomplete!");
      document.removeEventListener('click', handleOutsideClick);
    })
  }, [showList]);
  // componentDidUpdate() {
  //   if (this.state.showList) {
  //     document.addEventListener('click', this.handleOutsideClick);
  //     console.log('added event listener')
  //   } else {
  //     console.log("Removing Autocomplete listener on update!");
  //     document.removeEventListener('click', this.handleOutsideClick);
  //   }
  // }

  // componentWillUnmount () {
  //   console.log("Cleaning up event listener from Autocomplete!");
  //   document.removeEventListener('click', this.handleOutsideClick);
  // }

  const handleInput = (e) => {
    setInputVal(e.target.value);
  }

  const selectName = ({ target:  { innerText: name }}) => {
    // this.setState({ inputVal: name, showList: false });
    setInputVal(name);
    setShowList(false);
  }

  // Set focus to input field if user clicks anywhere inside the Autocomplete
  // section (unless they have selected a name from the dropdown list)
  const handleAutocompleteSectionClick = ({ target }) => {
    if (!target.classList.contains("nameLi")) {
      inputRef.current.focus();
    }
  }

  const handleOutsideClick = () => {
    // Leave dropdown visible as long as input is focused
    if (document.activeElement === inputRef.current) return;
    else setShowList(false);
  }

  const matches = () => {
    // const { inputVal } = inputVal;
    // const { names } = names;
    const inputLength = inputVal.length;
    const nameMatches = [];

    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
        nameMatches.push(name);
      }
    });

    if (nameMatches.length === 0) nameMatches.push('No nameMatches');

    return nameMatches;
  }

  // render() {
    const results = matches().map((result) => {
      const nodeRef = React.createRef();
      return (
        <CSSTransition
          nodeRef={nodeRef}
          key={result}
          classNames="result"
          timeout={{ enter: 500, exit: 300 }}
        >
          <li ref={nodeRef} className="nameLi" onClick={selectName}>
            {result}
          </li>
        </CSSTransition>
      )
    });

    return (
      <section 
        className="autocomplete-section" 
        onClick={handleAutocompleteSectionClick}
      >
        <h1>Autocomplete</h1>
        <div className="auto">
          <input
            placeholder="Search..."
            ref={inputRef}
            onChange={handleInput}
            value={inputVal}
            onFocus={() => setShowList(true)}
          />
          {showList && (
            <ul className="auto-dropdown">
              <TransitionGroup>
                {results}
              </TransitionGroup>
            </ul>
          )}
        </div>
      </section>
    );
  // }
}

export default AutoComplete;