import { useEffect, useState } from 'react';
import './App.css';
import getDivers from './queries/GetDivers';
import DefaultDivers from './default-data/DefaultDivers';
import updateDivers from './queries/UpdateDivers';
import DiveStatus from './components/DiveStatus';
import { diveCount, findClosestTime, isYesterday } from './utils/helper';
import DiverRow from './components/DiverRow';

function App() {
  const [divers, setDivers] = useState(DefaultDivers); 
  const [isLoading, setIsLoading] = useState(true); 


  useEffect(() => {
    getDivers().then((data: any) => {
      const yesterday = isYesterday(data.lastUpdated)
      if (yesterday) {
        setDivers(DefaultDivers);
      }else{
        setDivers(data.data)
      }
      setIsLoading(false)
    })
  }, []);

  const updateData = (newDivers: any) => {
    console.log('updating..')
    const data = {
      data: newDivers,
      lastUpdated: new Date()
    }
    updateDivers(data).then((data: any) => {
      // console.log(data)
    })
  }
  const toggleReactComp = (id: string, available: boolean) => {
    const newDivers = divers.map(diver => 
      diver.id === id ? { ...diver, available: !available, updatedAt: new Date() } : diver
    )
    setDivers(newDivers);
    updateData(newDivers);
  };
  const handleTimeChange = (id: string, e: any) => {
    const time = e.target.value;
    const newDivers = divers.map(diver => 
      diver.id === id ? { ...diver, availableFrom: time, updatedAt: new Date() } : diver
    )
    setDivers(newDivers);
    updateData(newDivers);
  };

  const handleReasonChange = (id: string, e: any) => {
    const reason = e.target.value;
    const newDivers = divers.map(diver => 
      diver.id === id ? { ...diver, reason: reason, updatedAt: new Date() } : diver
    )
    setDivers(newDivers);
    updateData(newDivers);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-orange-300 p-2">
          <img
            className="rounded-2xl border border-blue-800"
            src="/the_dive_boys.png"
            alt="the boys logo"
            width={450}
            height={258}
          />
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-5xl">
        Are we diving tonight?
      </h1>
      { isLoading ? <div className="spinner"> </div> :
      <>
        <DiveStatus diveCount={diveCount(divers)} closestTime={findClosestTime(divers)} />
  
        <div className="bg-white/30 md:p-12 p-4 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
          <div className="flex flex-col space-y-4">
            {
              divers.map((diver) => (
                <DiverRow
                  diver={diver}
                  toggleReactComp={toggleReactComp}
                  handleTimeChange={handleTimeChange}
                  handleReasonChange={handleReasonChange}
                />
              ))
            }
          </div>
        </div>
      </>
      }
    </main>
  );
}

export default App;
