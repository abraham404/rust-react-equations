import { useState, useEffect } from 'react'
import './App.css'
import init, { solve_quadratic } from './wasm/solve_ecuation.js'
import clearIcon from './assets/clear.svg';
import calculateIcon from './assets/calculate.svg'
import mathIcono from './assets/math.svg'

function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);


  const [solutions, setSolutions] = useState(null);
  const [isWasmLoaded, setIsWasmLoaded] = useState(false);

  // Cargar WASM al montar el componente
  useEffect(() => {
    async function loadWasm() {
      await init();
      setIsWasmLoaded(true);
    }
    loadWasm();
  }, []);

  const handleSolve = () => {
    if (!isWasmLoaded) return;
    
    const result = solve_quadratic(a, b, c);
    setSolutions(result);
    console.log(result);  
  };

  const handleClear = () => {
    setA(0);
    setB(0);
    setC(0);
    setSolutions(null);
  }
  return (
    <>
     <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>Quadratic Equations <img style={{height: '60px',  verticalAlign: 'middle',}} src={mathIcono} alt="" /></h1>
      <h1 style={{color: '#00FFFF'}}>𝑎𝑥²+𝑏𝑥+𝑐=0</h1>
      <div className="inputs">
        <label htmlFor="">(</label>
          <input type="number" placeholder="𝑎" value={a === 0 ? '' : a} onChange={e => setA(Number(e.target.value))} />

        <label htmlFor="">)</label>
        <label htmlFor="">𝑥²+</label>
        <label htmlFor="">(</label>
          <input type="number" placeholder="𝑏" value={b === 0 ? '' : b} onChange={e => setB(Number(e.target.value))} />

        <label htmlFor="">)</label>
        <label htmlFor="">𝑥+</label>  
        <label htmlFor="">(</label>
          <input type="number" placeholder="𝑐" value={c === 0 ? '' : c} onChange={e => setC(Number(e.target.value))} />
            <label htmlFor="">)</label>
        <label htmlFor=""> = 0</label>

      </div>

      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
        }}>
          <div style={{display: 'flex', flexDirection: 'row',  gap: '20px'}}>
          <button style={{display: 'flex', flexDirection: 'column', height: '80px', gap: '10px'}} onClick={handleClear}><img style={{height: '30px'}} src={clearIcon} alt="" /> Clear   </button>
          <button style={{display: 'flex', flexDirection: 'column', height: '80px', gap: '10px'}} onClick={handleSolve}> <img style={{height: '30px'}} src={calculateIcon} alt="" />Calculate</button>

          </div>
        <label htmlFor="">Solutions:</label>
        <p style={{color: '#39FF14', with: '100px', height: '50px', fontSize: '30px', marginTop: '5px'}}>{solutions}</p>
      </div>
    </>
  )
}

export default App
