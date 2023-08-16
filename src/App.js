import { BrowserRouter, Routes, Route } from "react-router-dom"
import { EditPost } from './components/editField/editField';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editPost" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
