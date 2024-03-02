import { useState } from 'react'
import './Landing.css'

function Landing() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Hello World!</h1>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default Landing
