import React from 'react'

function App() {
  const [state, setstate] = React.useState({ message: "initial msg" });

  const handleReq = () => {
    fetch(`http://localhost:5006/test`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setstate(res)
      })
  }
  return (
    <>
      <div>Frontend running in react from nginx</div>
      <div>{state.message}</div>
      <button onClick={handleReq}>Make request</button>
    </>)
}
export default App