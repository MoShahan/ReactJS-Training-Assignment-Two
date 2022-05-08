import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PageOne from './pages/PageOne';
import PageThree from './pages/PageThree';
import PageTwo from './pages/PageTwo';

const localStorageKey = "tempKey"

function App() {

  const [searchWord, setSearchWord] = useState("")

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value)
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="App">
      <Routes>

        <Route
          path="/home"
          element={
            <Home
              handleSubmitClick={handleSubmitClick}
              handleOnChange={handleOnChange}
              searchWord={searchWord}
            />
          }
        />

        <Route
          path="/pageOne"
          element={
            <PageOne
              handleSubmitClick={handleSubmitClick}
              handleOnChange={handleOnChange}
              searchWord={searchWord}
            />
          }
        />

        <Route
          path="/pageTwo"
          element={
            <PageTwo
              handleSubmitClick={handleSubmitClick}
              handleOnChange={handleOnChange}
              searchWord={searchWord}
            />
          }
        />

        <Route
          path="/pageThree"
          element={
            <PageThree
              handleSubmitClick={handleSubmitClick}
              handleOnChange={handleOnChange}
              searchWord={searchWord}
            />
          }
        />

        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </div>
  );
}

export default App;
