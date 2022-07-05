/** 
there is a 2 type of components 

1-stateless functional components :
 js functions
 no this keyword
 no state
 use this as much as possible 
 statless/dumb/presentational 
 mainly responsible for UI
 hooks available

2-stateful class components :
 class extending component class and render method returning html 
maintaining their own private data
complex uı logic
provide lifecyle hooks
StateFull/Smart/Container 
 * **/


/**
 * 
 * functional componenets can excepts props
 * **/
//import react from "react"
//  function Greet(){
//      return <h1>hello w.</h1>
//  }
//  export default Greet;

/**
* 
* using arrow function is simplier 
* and when importin other component we can add 
* the functional component with the different name
* 
* **/


//  const Greet = () => { return <h1>hello w.</h1> } 
//  export default Greet;

import { render } from "@testing-library/react";
import React, { Component, createContext, useCallback, useEffect, useMemo } from "react"

// class Greet extends Component{
//     render(){
//         return <h1>hello w.</h1>
//     }
// }

//export default Greet;


/****
 * props
 * 
 * You cant assing to value to prop
 * 
 * <Greet name="Bruce"> in app js
 * <h1> children element belongs to prop</h1>
 * </Greet> 
 */

const Greet = (props) => { return <div><h1>hello {props.name}</h1>{props.children}</div> }
//  export default Greet;



/**
 * props vs state
 * 
 * props passed to component 
 * state is managed within the component
 * 
 * props are function parameters
 * variable declared in function body 
 * 
 * You cant assing to value to prop
 * state can change 
 * 
 * func component : props/ useState Hook 
 * class comp: this.props for acces / this.state
 */


class StateEx extends Component {
  constructor() {
    super()
    this.state = {
      message: "this is a state example"
    }
  }

  changeMessage() {
    this.setState({
      message: "this state change"
    })
  }

  render() {
    return <div>
      {this.message}
      <button onClick={() => this.changeMessage()}>change state</button>
    </div>
  }
}

/***
 * 
 * Note : dont modify state directly.
 *  if u do that its not gonna render in the u but console.
 * 
 * setstate is async method. Dont use it just after update. 
 * use in set state callback function. so u can use updated value. 
 */

class AsyncSetStateEx extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  changeMessage() {
    // dont do that value not gonna change: this.state.count = this.state.count +1; 

    // this.setState({
    //     count: this.state.count + 1
    // }, () => {
    //     console.log("callback value", this.state.count)
    // })

    // if this method call from other function multiple times we need prevstate to have updated value sync 
    this.setState(prevState => ({
      count: prevState.count + 1
    }))

  }

  render() {
    return <div>
      {this.message}
      <button onClick={() => this.changeMessage()}>change state</button>
    </div>
  }
}


/***
 * prop desctructing
 * 
 * in app js 
 */



class PropDesctructingEx extends Component {
  render() {
    const { name, surname } = this.props;

    return <div>
      {name}
      {surname}
    </div>
  }
}


/**
 * event handling 
 * 
 */


class EventEx extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: "message"
    }

    //best practise 1
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
    this.setState({
      message: "m changed"
    })
  }
  render() {
    return <div>
      {/* <button onClick={this.clickHandler}> no () in handlers that is not function</button> */}
      <button onClick={this.clickHandler.bind(this)}> no () in handlers that is not function</button>
      <button onClick={() => this.clickHandler}> best practise 1 </button>
      <button onClick={this.clickHandler}> best practise 2</button>
    </div>
  }


}

/**
 * fuction as a prop
 * 
 * we use this for change value like state from parent component
 * 
 * note: back thick altgr + , two time
*/


class ParentComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parentName: "parent"
    }
    this.greetPrent = this.greetPrent.bind(this)
  }

  greetPrent(childParameter) {
    alert(`Hello ${this.state.parentName} this is the child parameter ${childParameter}`);
  }
  render() {
    return (
      <div>
        <ChildComponent greetHandler={this.greetPrent} />
      </div>
    )
  }
}



function ChildComponent(props) {
  return (
    <div>
      {/* Whit no parameters only fuction call */}
      {/* <button onClick={props.greetHandler}>Greet Parent</button> */}
      <button onClick={() => props.greetHandler('this is the parmeter')}>Greet Parent</button>
    </div>
  )
}



/**
 * conditional Rendering
 * 
 * if/else render(){if(props.param == true) return  <div></div> else return  <div></div>}
 * Element variable render(){ler variable  if(param == true) variable = <div/> else var = <h1>}
 * Ternary conditional operator ?:;
 * short circuit operator ?? or &&
 * 
 */

/***
 * List rendering
 * 
 * map,filter
 * 
 * return namespace.map(name=>(<div>name</div>))
 * if there is no id col in rows. keys start with 0,1,2,3,,, namespace.map((name,index)=>(<div>name</div>))
 */


/***
 * Lifecycle mthods
 * mounting, updating,unmounting, errorhandling
 * 
 * constructor(props): 
 * You should not call setState() in the constructor(). Instead, if your component needs to use local state, assign the initial state to this.state directly in the constructor:
 * 
 * constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
 * 
 * 
 * constructor
 * If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.
 *  this will called whenever a new component is created.
 * initializing state, binding event handlers,
 * dont cause side effects: dont make http request or async method here 
 * super(props): directly owerwirte this.state
 * 
 * static getderivedstateFromProps(props,state): 
 * 
 * when state of component depends on change in props over time. 
 * set the state and dont use any async here so no side effects. 
 *  
 * 
 * render() : 
 * 
 * read props and state return jsx
 * dont change state or interact dom here no ajax calls.
 * also child comp.s render methods run here. 
 * 
 * ComponentDidMount: 
 * 
 * after initialization 
 * cause side effects. interact with dom or perform any ajax call here.
 * . If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
 * You may call setState() immediately in componentDidMount(). It will trigger an extra rendering 
 *  In most cases, you should be able to assign the initial state in the constructor() instead. 
 * 
 * 
 * componentDidUpdate(prevProps, prevState, snapshot):
 * 
 * this invoked immediately after updating occurs. This method is not called for the initial render.
 * Use this as an opportunity to operate on the DOM when the component has been updated.
 * This is also a good place to do network requests as long as you compare the current props to previous props
 * you may call setState() immediately in componentDidUpdate()
 * but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop.
 * 
 * 
 * componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
 * 


componentWillUnmount(): 

is invoked immediately before a component is unmounted and destroyed.
 Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().
 * You should not call setState() in componentWillUnmount() because the component will never be re-rendered. 
 * 
 */




/**
 * Life cycle ex: 
 * there is a parent comp and child comp. and ever lifecycle method console log. 
 * the order of methods run like this: 
 * 1- parent constructor
 * 2- parent getderivedstateFromProps
 * 3- parent render
 * 4- child constructor
 * 5- child getderivedstateFromProps
 * 6- child render
 * 7- child componentdidMount
 * 8- parent componentdidMount
 * 
 * when state or props change component rerender so also this method rerun
 * 
 */

/**
 * Fragment : 
 * 
 * use this for escape using extra div or component for render method.
 * render method requires one single element. escape for parent div render 
 * 
 */

class FragmentEx extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>element 1</h1>
        <p>element 2 </p>
      </React.Fragment>
    )
  }
}

/***
 * Pure Component:
 * 
 *  Pure Components restricts the re-rendering when there is no use of re-rendering of the component
 * 
 * 
 */

//  class ComponentTypes extends PureComponent {
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }

/**
 * memo: same as pure but its functional component
 * 
 */


function memoCompEx() {
  return (
    <div>

    </div>
  )
}

//export  default React.memo(memoCompEx);

/**
 * refs:
 * 
 *referancing elemnt in component. mostly used for modification 
 * Refs provide a way to access DOM nodes or React elements created in the render method.
 * 
 * When to Use Refs
There are a few good use cases for refs:

Managing focus, text selection, or media playback.
Triggering imperative animations.
Integrating with third-party DOM libraries.
 * 
 */

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}


/***this is the example of 
 * using child component refs in the parent component 
 * note: refs cant not attached to functional components!!!
 * */
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}


class CustomTextInputs extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => { // this is callbackref same as normal ref
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}



/*****
 * forvarding refs: sending it to child
 * 
 * 
 * 
 */


const InputText = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

export default function App() {
  const ref = React.useRef();

  function focus() {
    ref.current.focus();
  }

  return (
    <div className="App">
      <InputText ref={ref} placeholder="my input" />
      <button onClick={focus}>Focus</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


/**
 * Portals: 
 * we use it for adding another div other than root. its usefull for 
 * component like modals,popups
 * 
 * basic ussage: ReactDOM.createPortal(child, container)
 * <html>
<body>
 <div id="app-root"></div>
 <div id="modal-root"></div>
</body>
</html>
 * 
 */


export class PortalEx extends Component {

  render() {
    // React does *not* create a new div. It renders the children into `domNode`.
    // `domNode` is any valid DOM node, regardless of its location in the DOM.
    return ReactDOM.createPortal(
      <h1>
        return html
      </h1>,
      document.getElementById('portal-root')// this is the element our portal will insert to 
    );
  }
}


/***
 * Error Boundary
 * 
 * getDerivedstateFromError, componentDidCatch
 * 
 * normaly if there is a any error in any component react unmount all component
 * tree including root bu unless we handle the errors.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}


/***
 * <ErrorBoundary>
 * <MyWidget />
 * </ErrorBoundary>
 */



/**
 * Higher Order Component (HOC Pattern) sharing properties way 1;;;
 * 
 * 
 * we need this for escaping code duplication like down below. incrementCount method 
 * writing 2 times and same parent children. 
 * Also function lifting may not be a good idea for this.
 * so imlementation is like this; 
 * a pattern where function takes a component as an argument and returns a new component
 * ex: const NewComponent = higherOrderComponent(originalComponent)
 * {...props} this is important cause we send props to function comp not the return comp 
 * so if we gonna use props in childOne comp in the exp. {...props} we gotta sen rest of this 
 */

//import React, { Component } from 'react'

// the bad practise looks like those two..
export class ComponentTypes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  incrementCount = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    })
  }

  render() {
    return (
      <div>
        <butt onClick={this.incrementCount}>clicked {count} times</butt>
      </div>
    )
  }
}


class ComponentTypes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  incrementCount = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    })
  }

  render() {
    return (
      <div>
        <h2 onMouseOver={this.incrementCount}> hovered {count} count </h2>
      </div>
    )
  }
}

// the better way to do that ;
const UpdatedComponent = OriginalComponent => {
  class NewComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        count: 0
      }
    }

    incrementCount = () => {
      this.setState(prevState => {
        return { count: prevState.count + 1 }
      })
    }
    render() {
      return <OriginalComponent name='propData' count={this.state.count} incrementCount={this.incrementCount} />
    }
  }
  return NewComponent
}

// export default UpdatedComponent

class childOne extends Component {
  render() {
    const { count, incrementCount } = this.props
    return (
      <div>
        <h2 onMouseOver={incrementCount}> hovered {count} count </h2>
      </div>
    )
  }
}

// export Default UpdatedComponent(childOne)



class childTwo extends Component {
  render() {
    const { count, incrementCount } = this.props
    return (
      <div>
        <h2 onMouseOver={incrementCount}> hovered {count} count </h2>
      </div>
    )
  }
}

// export Default UpdatedComponent(childTwo)



/***
 * Render Prop Pattern:  sharing properties way 2;;;
 * 
 * the term of "render prop" refer to a technique for sharing code. between React components using a prop whose value is a function.
 * 
 * 
 */


/**
 * thşs şs the bad practice whic we will escape code duplication 
 * in the next steps
 */


class ClickCounterComp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  incrementCount = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    })

  }

  render() {
    const { count } = this.state
    return (
      <button onClick={this.incrementCount}>clicked {count} times</button>
    )
  }
}


class HoverCounterComp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  incrementCount = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    })
  }

  render() {
    return (
      <input onMouseOver={this.incrementCount}> hovered {count} times </input>
    )
  }
}


class parentComp extends Component {
  render() {
    return (<div>
      <HoverCounterComp />
      <ClickCounterComp />
    </div>

    )
  }
}


/** best practice  */

class renderpropcomponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  incrementCount = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    })
  }
  render() {
    return (<div>
      {this.props.render(this.setState.count, this.incrementCount)}
    </div>
    )/**this mean renderpropcomponent component says I will handel the work here u just render it**/
  }
}


class ClickCounterCompBestPrac extends Component {
  render() {
    const { count, incrementCount } = this.props
    return (
      <button onClick={incrementCount}>clicked {count} times</button>
    )
  }
}


class HoverCounterCompBestPrac extends Component {
  render() {
    const { count, incrementCount } = this.props
    return (
      <input onMouseOver={incrementCount}> hovered {count} times </input>
    )
  }
}

class parentComp extends Component {
  render() {
    return (<div>
      <renderpropcomponent
        render={(count, incrementCount) => (
          <ClickCounterCompBestPrac count={count} incrementCount={incrementCount}></ClickCounterCompBestPrac>
        )}
      />
      <renderpropcomponent
        render={(count, incrementCount) => (
          <HoverCounterCompBestPrac count={count} incrementCount={incrementCount}></HoverCounterCompBestPrac>
        )}
      />
    </div>

    )
  }
}


/***
 * context 
 * Context provides a way to pass data through the component tree without having to
 *  pass props down manually at every level.
 * Context is primarily used when some data needs to be accessible by many components
 *  at different nesting levels.
 *  Apply it sparingly because it makes component reuse more difficult.
 * Put the data top level component 
 * 
 */

class CompARootParent extends Component {
  render() {
    return (
      <div>
        <userProvider value="vishwas">
          <CompA />
        </userProvider>

      </div>
    )
  }
}

class CompA extends Component {
  render() {
    return (
      <div>
        <CompB />
      </div>
    )
  }
}

class CompB extends Component {
  render() {
    return (
      <div>
        <CompC />
      </div>
    )
  }
}


class CompC extends Component {
  render() {
    return (
      <userConsumer>
        {(username) => {
          return <div>the context parameter is {username}</div>
        }}
      </userConsumer>
    )
  }
}

/*** this is the userContexFile but we put here for better understainding */
const userContext = React.createContext()
/*** if we want to set default value use this : const userContext = React.createContext("vishvwas") */
userProvider = userContext.Provider
userConsumer = userContext.Consumer
//export {userProvider,userConsumer}




/**
 * React HTTP Request : axios 
 * 
 * 
 * 
 * 
 */

// import React, { Component } from 'react';
import axios from "axios";
export class GetExamle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      error: ''
    }
  }

  componentDidMount() {
    axios.get('https://jsonplacehlder.tyicode.com/posts')
      .then(response => {
        console.log(response);
        this.setState({ posts: response.data })
      })
      .error(err => {
        console.log(err);
        this.setState({ error: err })
      })
  }

  render() {
    const { posts } = this.state
    return <div>
      list of posts
      {
        posts.length ?
          posts.map(post => <div key={post.id}>{post.title}</div>) : null
      }
      {
        error ? <div>{error}</div> : null
      }

    </div>;
  }
}

import React, { Component } from 'react';

export class PsotExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      title: '',
      body: ''
    }
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  submitHandler = (e) => {
    e.preventdefaut()
    console.log(this.state)
    axios.post('https://jsonplacehlder.tyicode.com/posts', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(err => { console.log(err) })
  }

  render() {
    const { userId, title, body } = this.state


    return <div>
      <form onSubmit={this.submitHandler}>
        <div>
          <input type="text" name="userId" value={userId} onChange={this.changeHandler} />
        </div>
        <div>
          <input type="text" name="title" value={title} onChange={this.changeHandler} />
        </div>
        <div>
          <input type="text" name="body" value={body} onChange={this.changeHandler} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>;
  }
}




/*****
 * React hooks 
 * 
 * features whic alows us to use react features without having to write classes
 * for ex : state of components
 * hooks dont work inside classes
 * 
 * why we use it ?
 * understand how this keyword works in js 
 * remember to bind event handlers in class components
 * classes dont minfy very well and make hot reloading very unreliable 
 * !!
 * there is no particular wat to reuse statefull component logic
 * HOC and render props patterns do address this problem but its akward looking code 
 * !!
 * Creating components for complex scenerios such as daa fetching and subscriing events
 * Related code is not organized in one place its in differet life cycle methods
 * for example  data fecthing  ; in compdidMount and compDidUpdate
 * for example  event listeners; in compdidmount and cmpwillunmount
 * !!
 * Because of statefull logic cannot break components into smaller ones
 */


/***
 * setState Hook  
 * in classes state is always an object in this state dont have to be 
 * prevState included
 * 
 */
import React, { useState } from 'react';

function Example() {
  // "count" adında yeni bir state değişkeni tanımlayın.
  const [count, setCount] = useState(0);
  const [name, setName] = useState({ firsName: 'asdasd', lastName: 'asdasdad' });
  const [items, setItems] = useState([]);
  const addItem = () => {
    setItems([...items, {
      id: tems.length,
      value: Math.floor(Math.random() * 10) + 1
    }])
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)} />
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        <input
          type='text'
          value={name.firsName}
          onChange={e => setName({ firstName: e.target.value })}
        />
        <input
          type='text'
          value={name.firsName}
          onChange={e => setName({ ...name, firstName: e.target.value })}
        />
        Click me
      </button>
    </div>
  );
}

/***
 * useEffect Hook 
 * 
 * we use insted of life cycle methods for
 * escaing dunlicate codes that udating same component at different lifecycle methods
 * 
 * let as side effects in fuctional comp.
 * 
 * its close repacement for compdidmount, didupdate, willunmmount
 * 
 * !! Runs every time after component reder 
 */
function ExampleuseEffect() {
  // "count" adında yeni bir state değişkeni tanımlayın.
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `cilickec ${count} times`
  }, [count])

  useEffect(() => {
    console.log("this use effect cals only one time at the render")
  }, [])

  useEffect(() => {
    console.log("this use effect cals only one time at the render")

    return () => {
      console.log("this part is works after component " +
        "unmount so we don get an eror after tryimg update unmounted component")
      //ve cleanup because even unmount event still there and they'll cause errors. 
    }
  }, [])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>

    </div>
  );
}

/***Fetching data */
function ExampleFechData() {
  // "count" adında yeni bir state değişkeni tanımlayın.
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('https://jsonplacehlder.tyicode.com/posts')
      .then(response => {
        this.setState({ posts: response.data })
      })
      .error(err => {
        console.log(err);
        this.setState({ error: err })
      })
  }, []) // call it only once after rendering


  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>

    </div>
  );
}


function ExampleFechData() {
  // "count" adında yeni bir state değişkeni tanımlayın.
  const [posts, setPosts] = useState({});
  const [id, setId] = useState(1);
  useEffect(() => {
    axios.get(`https://jsonplacehlder.tyicode.com/posts ${id}`)
      .then(response => {
        this.setState({ posts: response.data })
      })
      .error(err => {
        console.log(err);
        this.setState({ error: err })
      })
  }, [id]) // call it evey time input (id) changing

  return (
    <div>
      <p>You clicked {count} times</p>
      <input
        type='number'
        value={id}
        onChange={e => setName({ firstName: e.target.value })}
      />
      {
        posts.length ?
          posts.map(post => <div key={post.id}>{post.title}</div>) : null
      }
    </div>
  );
}

/****
 * Context  Hook
 * 
 * 
 * 
 */

function CA() {
  return (
    <div>
      <userProvider value="vishwas">
        <CB />
      </userProvider>

    </div>
  )
}

function CB() {
  return (
    <div>
      <CC />
    </div>
  )
}

function CC() {
  return (
    <div>
      <DD />
    </div>
  )
}

import { useContext } from 'react'

function DD() {
  const user = useContext(userContext)
  return (
    <di>{user}</di>
  )
}


/***
 * useRducer Hook
 * 
 * hook for stata management 
 * alternative to useState
 * when to use useRducer or useState ?
 * 
 * 
 * 
 * useReducer(reducer,initialState) related to js reducer function check it 
 * reducer(currentstate,action)
 * useReducer[newState,dispatch]
 */

import { useReducer } from 'react'
const initialState = 0
const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state + 1
    case 'reset':
      return initialState
    default:
      return state;
  }
};

function CounterComp(){
  const [count,dispatch] = useReducer(reducer,initialState)
  return(
<div>
  <div>Count - {count}</div>
  <button onClick={()=>dispatch('increment')}>+</button>
  <button onClick={()=>dispatch('decrement')}>-</button>
  <button onClick={()=>dispatch('reset')}>0</button>
</div>

  )
}

/***More complex one 
 * 
 * we can generate new variable from initial or 
 * we can multiple use reducer for action reducer sharing second is better 
 */
// ex 1: using multiple initial value
import { useReducer } from 'react'
const initialState = {
  firstCounter:0,
  secondCounter:2
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment1':
      return {...state,firstCounter: state.firstCounter + action.value}
    case 'decrement1':
      return {...state,firstCounter:state.firstCounter - action.value}
      case 'increment2':
        return {...state,secondCounter: state.secondCounter + action.value}
      case 'decrement2':
        return {...state,secondCounter:state.secondCounter - action.value}  
    case 'reset':
      return initialState
    default:
      return state;
  }
};

function CounterOne(){
  const [count,dispatch] = useReducer(reducer,initialState)
  return(
<div>
  <div>Count - {count.firstCounter}</div>
  <div>Count - {count.secondCounter}</div>
  <button onClick={()=>dispatch({type:'increment1',value:4})}>+</button>
  <button onClick={()=>dispatch({type:'decrement1',value:2})}>-</button>
  <button onClick={()=>dispatch({type:'increment2',value:3})}>+</button>
  <button onClick={()=>dispatch({type:'decrement2',value:5})}>-</button>
  <button onClick={()=>dispatch({type:'reset',value:1})}>0</button>
</div>

  )
}

//ex 2: using multiple usereducer
import { useReducer } from 'react'
const initialState = 0
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + action.value
    case 'decrement':
      return state - action.value
    case 'reset':
      return initialState
    default:
      return state;
  }
};

function CounterOne(){
  const [count,dispatch] = useReducer(reducer,initialState)
  const [count2,dispatch] = useReducer(reducer,initialState)
  return(
<div>
  <div>Count - {count.count}</div>
  <div>Count2 - {count.count2}</div>
  <button onClick={()=>dispatch({type:'increment',value:4})}>+</button>
  <button onClick={()=>dispatch({type:'decrement',value:2})}>-</button>
  <button onClick={()=>dispatch({type:'increment2',value:3})}>+</button>
  <button onClick={()=>dispatch({type:'decrement2',value:5})}>-</button>
  <button onClick={()=>dispatch({type:'reset',value:1})}>0</button>
</div>

  )
}


/*****useRedcer with useContext  example 
 * if we need one same vairable object to share with different child components at differend levels?
 *  useContext is similier to context api 
 * store the data in parent component and share with child component with usecontext . Its better than props. cause 
 * child component which needs the data can be in deeper level
 * 
 */


import { useReducer,useContext } from 'react'
const initialState = 0
export const CountContext = createContext()
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + action.value
    case 'decrement':
      return state - action.value
    case 'reset':
      return initialState
    default:
      return state;
  }
};

function CompParent(){
  const [count,dispatch] = useReducer(reducer,initialState)
  return(
    <CountContext.Provider value={{countState:count,countDispatch:dispatch}}>
      <div>
      <CompA></CompA>
      <CompB></CompB>
      <CompC></CompC>
      </div>
    </CountContext.Provider>
  )
}


function CompA(){
  const CountContext = useContext(CountContext)
  return(
<div>
  <div>Count - {count}</div>
  <button onClick={()=>CountContext.countDispatch({type:'increment',value:4})}>+</button>
  <button onClick={()=>CountContext.countDispatch({type:'decrement',value:2})}>-</button>
  <button onClick={()=>CountContext.countDispatch({type:'reset',value:0})}>0</button>
</div>
  )
}


function CompB(){
  const CountContext = useContext(CountContext)
  return(
<div>
  <div>Count - {count}</div>
  <button onClick={()=>CountContext.countDispatch({type:'increment',value:4})}>+</button>
  <button onClick={()=>CountContext.countDispatch({type:'decrement',value:2})}>-</button>
  <button onClick={()=>CountContext.countDispatch({type:'reset',value:0})}>0</button>
</div>
  )
}


function CompC(){
  const CountContext = useContext(CountContext)
  return(
<div>
  <div>Count - {count}</div>
  <button onClick={()=>CountContext.countDispatch({type:'increment',value:4})}>+</button>
  <button onClick={()=>CountContext.countDispatch({type:'decrement',value:2})}>-</button>
  <button onClick={()=>CountContext.countDispatch({type:'reset',value:0})}>0</button>
</div>
  )
}




/****daa fetch with useState vs use reducer */

import React, { Component } from 'react';

function DataFetch() {
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const [post,setPost] = useState({})

  useEffect(()=>{
    axios.get('http://jsonplaceholder.typicod.com/post/1')
    .then(response=>{
      setLoading(false)
      setPost(response.data)
      setError('')
    })
    .catch(error=>{
      setLoading(false)
      setPost({})
      setError('something went wrong')
    })
  },[])
  
  return(
     <div>
       {loading? 'Loading':post.title}
       {error? error:null}
     </div>
    )
}

export default ComponentTypes;


/****fetch with reducer */

import React from 'react';


initialState={
  error:'',
  loading:true,
  post:{}
}
export const CountContext = createContext()
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        error:'',
        loading:false,
        post:action.payload
      }
    case 'FETCH_ERROR':
      return {
        error:'something went wrong',
        loading:false,
        post:{}
      }
    default:
      return state;
  }
};


export default function ComponentTypes() {
const [state,dispatch] = useReducer(reducer,initialState)
useEffect(()=>{
  axios.get('http://jsonplaceholder.typicod.com/post/1')
  .then(response=>{
    dispatch({type:'FETCH_SUCCESS',payload:response.data})
  })
  .catch(error=>{
    dispatch({type:'FETCH_ERROR'})
  })
},[])
  return <div>
      {state.loading? 'Loading':state.post.title}
      {state.error? state.error:null}
        </div>;
}

/****
 * when the use comprassion: use state vs use reducer 
 *  
 * 1- type of State:  if we use primitiv types like int string number ... use state is better but if we woking with objects reducer is better
 * 2- number of State Transitions: if we updating 1-2 seperate variables use state is fine but for too many reducer logic is more manageble. 
 * It makes states more predictible and makes easy to understand for other develoers in one logic
 * 3- how related state transitions ? : useState=> no, useReducer => yes
 * 4- more complex are business logic reducer is getting better choise also bacwards of this term is true 
 * 5- local vs global states; for local =>setState, for global use Reducer   
 *   
 * 
 * 
 */

/**
 * callback hook :
 * hookthat will return a memorized version of callback function
 *  that only changes if one of the dependencies  has changed.
 * 
 * why we need that?
 * its usefull when pasing callbacks to optimized child components
 *  that rely on reference equality to prevent unneccessary renders.
 * 
 * use it for performans improvement
 * here is a example of bad and better schenarios
 * 
 */

//bad one 

import React, { Component } from 'react';

function ParentcomponentCallbackEx() {
    return <div>
     <parentOne/>
    </div>;
  }

function  parentOne(){
 const[age,setAge] = useState(25)
 const[salary,setSalary] = useState(50000)

 const incementAge=()=>{
   setAge(age+1)
 }
 const incrementSalary=()=>{
   setSalary(salary+1000)
 }
 
 return (
   <div>
   <Title/>
   <Count text='Age' count={age}/>
   <Button handleClick={incementAge}>Increment Age</Button>
   <Count text='salary' count={age}/>
   <Button handleClick={incrementSalary}>Increment Salary</Button>
   </div>
   )
}


function Title() {
  console.log('rendering Title')
  return <div>use callback hook</div>;
}
export default  React.memo(Title)

export default function Count({text,count}) {
  console.log( `rendering ${text}`)
  return <div>${text} - ${count}</div>;
}
export default  React.memo(Count)

export default function Button({handleClick,children}) {
  console.log( `rendering button ${children}`)
  return <button onClick={handleClick}>{children}</button>;
}
export default  React.memo(Button)

/****out put of this example  
 * 
 * rendering tittle, age, age button, salary,salarybutton
 * and if we clik the any button they all rerendering but 
 * it should be like only age count and button rerender when we click on incrementAge .
 * these is the issue that we will fix (optimize) by use callbackhook
 * 
 * even react.memo cant save us in this situation. for example if we click on increment Age 
 * still count, age button, salary buton rerender cause those two button excepting same props
 * 
 * 
 * better ussage;
*/

function  parentOne(){
  const[age,setAge] = useState(25)
  const[salary,setSalary] = useState(50000)
 
  const incementAge=useCallback(()=>{ // only renrender when age is change
    setAge(age+1)
  },[age])
  const incrementSalary=useCallback(()=>{
    setSalary(salary+1000)
  },[salary])
  
  return (
    <div>
    <Title/>
    <Count text='Age' count={age}/>
    <Button handleClick={incementAge}>Increment Age</Button>
    <Count text='salary' count={age}/>
    <Button handleClick={incrementSalary}>Increment Salary</Button>
    </div>
    )
 }
 
 function Title2() {
  console.log('rendering Title')
  return <div>use callback hook</div>;
}
export default  React.memo(Title2)

export default function Count2({text,count}) {
  console.log( `rendering ${text}`)
  return <div>${text} - ${count}</div>;
}
export default  React.memo(Count2)

export default function Button2({handleClick,children}) {
  console.log( `rendering button ${children}`)
  return <button onClick={handleClick}>{children}</button>;
}
export default  React.memo(Button2)
 

/***usememo hook  */


export default function ComponentTypes() {
  const[count1,setCount1] = useState(0)
  const[count2,setCount2] = useState(0)


  const increment1=()=>{
    setCount1(count1+1)
  }
  const increment2=()=>{
    setCount1(count2+1)
  }
  const isEven= useMemo(()=>{ // its take time 
    let i = 0
    while(i<2000000000000) i++ // tihs part only for delay
      return counter %2 ===0
   },[count1]) // only change for count1
  return <div>

    <button handleClick={incement1}>Increment Age</button>
    <span>{isEven ? 'even':'odd'}</span>
    <button handleClick={incement2}>Increment Salary</button>


  </div>;
}

/***explaination:  increment1 and increment2buttons changes state so comp rerenders.
 * but when we clik button two odd or even method shouldnt recalculate and rerender
 * so  we use useMemo and şs even recalculate only if count1 is changed.
 */

/****Costom Hooks ;
 * is basicly a js function whose name starts wşth "use"
 * a custom hook can also call other hooks if required.
 * 
 * why ?
 * share logic . alternative for hoc and render props
 * 
 * 
 */
 
 const useCustomHook = (form) => {
 
   const request = useStoreActions(actions => actions.queryStore.request);
   const vehicleTypes = useStoreState(store => store.queryStore[requestNames.getVehicleTypes]);
   const [page, setPage] = React.useState(1);  
   const queryShipments = () => {
     let logisticCompanyID = filterData["logisticCompanyID"];
     if (!Array.isArray(logisticCompanyID)) {
       logisticCompanyID = logisticCompanyID ? [logisticCompanyID] : []
     }
     let vehicleTypeCode = filterData["vehicleTypeCode"];
     if (!Array.isArray(vehicleTypeCode)) {
       vehicleTypeCode = vehicleTypeCode ? [vehicleTypeCode] : []
     }
     let getShipmentByFiltersQueryInput = new QueryInputBuilder(requestNames.getShipmentByFilters, QueryTypeEnum.POST)
       .withData(data)
       .build();
     request(getShipmentByFiltersQueryInput)
     .then(res => {
       setShipmentList(res)
     }) ; 
 }
   const columns = [
     {
       title: 'description',
       dataIndex: 'description',
       key: 'description',
       render: (column, record) => {
         return <div className="text-overflow-ell" style={{ width: 300 }}>{record.description}</div>;
       }
     }
   ];
   function format(num) {
   
     var currency_symbol = "₺"
   
     var formattedOutput = new Intl.NumberFormat('tr-TR', {
         style: 'currency',
         currency: 'TRY',
         minimumFractionDigits: 2,
       });
   
     return formattedOutput.format(num).replace(currency_symbol, '')
   }
   return { request, vehicleTypes, columns, queryShipments
    ,page, setPage }
 };
 export default useCustomHook;

 
 const CustomComp = (props) => {
 
     const [form] = Form.useForm();
 
     const  { request, vehicleTypes, columns, queryShipments
      ,page, setPage } = useCustomHook(form);

     return <div>
                 <Table
                     dataSource={shipments}
                     columns={columns}
                 />
             </div>
 }
 
 export default CustomComp;


/****Type Script
 * 
 * 
 * 
 */