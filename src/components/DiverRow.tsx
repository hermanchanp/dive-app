import Diver from "../entities/Diver";
import classNames from 'classnames';
import moment from 'moment';

type DiverRowProps = {
    diver: Diver,
    toggleReactComp: (id: string, available: boolean) => void,
    handleTimeChange: (id: string, e: any) => void,
    handleReasonChange: (id: string, e: any) => void,
}
const DiveStatus = ({diver, toggleReactComp, handleTimeChange, handleReasonChange}: DiverRowProps) => {
    const imageSectionClass = classNames({
        'w-[30%]': true,
        'order-last': !diver.alignLeft
    });
    const contentClass = classNames({
        'p-2 flex flex-col  gap-y-2 w-[70%]': true,
        'text-right': !diver.alignLeft
    });
    return (
        <>
            <div className="flex flex-row">
              <div className={imageSectionClass}>
                  <img
                    className="rounded-2xl border border-blue-800"
                    src={`/${diver.id}.png`}
                    alt={diver.name}
                    width={130}
                    height={167}
                  />
              </div>
              <div className={contentClass}>
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
        </>)
}

export default DiveStatus;