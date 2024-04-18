import { useEffect, useState } from 'react';
import './App.css';
import getDivers from './queries/GetDivers';
import DefaultDivers from './default-data/DefaultDivers';
import updateDivers from './queries/UpdateDivers';
import moment from 'moment';

function App() {
  const [divers, setDivers] = useState(DefaultDivers); 
  const [isLoading, setIsLoading] = useState(true); 


  const diveCount = () => {
    let count = divers.filter(diver => diver.available).length;
    return count;
  }

  const isYesterday = (lastUpdated: string) => {
    const lastUpdatedDate = new Date(lastUpdated);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    return lastUpdatedDate.getDate() === yesterday.getDate() &&
           lastUpdatedDate.getMonth() === yesterday.getMonth() &&
           lastUpdatedDate.getFullYear() === yesterday.getFullYear();
  };

  const findClosestTime = () => {
    try {

      const now = new Date();
      const closestDiver = divers.reduce((closest, diver) => {
        const diverTime = new Date(`1970-01-01T${diver.availableFrom}:00`);
        const closestTime = new Date(`1970-01-01T${closest.availableFrom}:00`);
        return Math.abs(now.getTime() - diverTime.getTime()) < Math.abs(now.getTime() - closestTime.getTime()) ? diver : closest;
      }, divers[0]);
      return closestDiver.availableFrom;
    } catch (e) {

    }
  
    return "";
  }

  useEffect(() => {
    getDivers().then((data: any) => {
      // console.log('Warmup')
      // console.log(data)
      const yesterday = isYesterday(data.lastUpdated)
      // console.log(yesterday)
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
    // console.log('clicked', id)

  };
  const handleTimeChange = (id: string, e: any) => {
    const time = e.target.value;
    const newDivers = divers.map(diver => 
      diver.id === id ? { ...diver, availableFrom: time, updatedAt: new Date() } : diver
    )
    setDivers(newDivers);
    updateData(newDivers);
    // console.log('clicked', id, e.target.value)
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
      {
        diveCount() > 2 && <>
          <h1 className="pt-4 pb-8 text-7xl md:text-5xl text-green-500">
            Yes
          </h1>
        </>
      }
      {
        diveCount() == 2 && <>
          <h1 className="pt-4 pb-8 text-7xl  md:text-5xl text-orange-500">
            Maybe
          </h1>
        </>
      }
      {
        diveCount() <= 1  && <>
          <h1 className="pt-4 pb-8  text-7xl  md:text-5xl text-red-500">
            No
          </h1>
        </>
      }
            {
        diveCount() >= 2 && 
        <>
        Diving at: {findClosestTime()}
        </>
      }
      
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">

        </div>
        <div className="flex flex-col space-y-4">
          {
            divers.map((diver) => (
              <>
                {
                  diver.alignLeft && (
                    <div className="flex flex-row">
                      <div>
                          <img
                            className="rounded-2xl border border-blue-800"
                            src={`/${diver.id}.png`}
                            alt={diver.name}
                            width={130}
                            height={167}
                          />
                      </div>
                      <div className="p-2 flex flex-col  gap-y-2">
                        <div className="font-bold text-2xl">{diver.name}</div>
                        <div>
                        <span className="pr-2">Diving:</span>
                        <button
                          onClick={() => toggleReactComp(diver.id, diver.available)}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 ${diver.available ? 'bg-green-600' : 'bg-red-600'}`}
                          >
                            <span
                              className={`inline-block w-4 h-4 transform bg-white rounded-full ${diver.available ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                            
                        </button>
                          <span className="pl-2">{diver.available ? "yes": "no"}</span>
                        </div>
                        {
                          !diver.available && (
                            <div className="pl-2">
                              <label htmlFor="reason">Reason:</label>
                              <input type="text" id="reason" name="reason" value={diver.reason} onChange={(e) => handleReasonChange(diver.id, e)} />
                            </div>
                          )
                        }
                        <div className="pl-2">
                          <label htmlFor="time">Select time:</label>
                          <input disabled={!diver.available} type="time" id="time" name="time" value={diver.availableFrom} onChange={(e) => handleTimeChange(diver.id, e)} />
                        </div>
                        <div className="pt-4 text-xs text-gray-600">Last updated: {moment(diver.updatedAt.toLocaleString()).format("MMMM Do YYYY, h:mm:ss a")}</div>
                      </div>
                    </div>
                  )
                }
                
                {
                  !diver.alignLeft && (
                    <div className="flex flex-row">
                      <div className="p-2 flex-grow flex flex-col text-right gap-y-2">
                      <div className="font-bold text-2xl">{diver.name}</div>
                        <div>
                        <span className="pr-2">Diving:</span>
                        <button
                          onClick={() => toggleReactComp(diver.id, diver.available)}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 ${diver.available ? 'bg-green-600' : 'bg-red-600'}`}
                          >
                            <span
                              className={`inline-block w-4 h-4 transform bg-white rounded-full ${diver.available ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                            
                        </button>
                          <span className="pl-2">{diver.available ? "yes": "no"}</span>
                        </div>
                        <div className="pl-2">
                          <label htmlFor="time">Select time:</label>
                          <input disabled={!diver.available} type="time" id="time" name="time" value={diver.availableFrom} onChange={(e) => handleTimeChange(diver.id, e)} />
                        </div>
                        {
                          !diver.available && (
                            <div className="pl-2">
                              <label htmlFor="reason">Reason:</label>
                              <input type="text" id="reason" name="reason" value={diver.reason} onChange={(e) => handleReasonChange(diver.id, e)} />
                            </div>
                          )
                        }
                        <div className="pt-4 text-xs text-gray-600">Last updated: {moment(diver.updatedAt.toLocaleString()).format("MMMM Do YYYY, h:mm:ss a")}</div>
                      </div>
                      <img
                          className="rounded-2xl border border-blue-800"
                          src={`/${diver.id}.png`}
                          alt={diver.name}
                          width={130}
                          height={167}
                        />
                    </div>
                  )
                }
              </>
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
