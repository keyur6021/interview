import { Routes, Route, Link } from 'react-router-dom'
import CounterApp from './components/CounterApp.jsx'
import InterviewForm from './components/InterviewForm.jsx'
import './App.css'
import FetchApi from './components/FetchAPi.jsx'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Interview App</h1>
        <nav style={{ paddingTop: '20px' }}>
          <Link to="/counter" className="nav-link">Counter</Link>
          <Link to="/interview" className="nav-link">Interview Form</Link>
          <Link to="/fetch-api" className="nav-link">Fetch API</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterApp />} />
          <Route path="/interview" element={<InterviewForm />} />
          <Route path='/fetch-api' element={<FetchApi />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

function Home() {
  return (
    <div>
      <h2>Welcome to the Interview App</h2>
      <p>Select a component from the navigation above.</p>
    </div>
  )
}

export default App
