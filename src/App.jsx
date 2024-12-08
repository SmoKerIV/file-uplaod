import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Upload from './Components/fileUpload/Upload'
import Tour from './Components/Tour/Tour'
import RTE from './Components/RTE/RTE'

function App() {
  return (
    <Router>
      <div className="nav-buttons">
        <Link to="/upload"><button>Upload</button></Link>
        <Link to="/tour"><button>Tour</button></Link>
        <Link to="/"><button>RTE</button></Link>
      </div>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/" element={<RTE />} />
      </Routes>
    </Router>
  )
}

export default App
