
type DiveStatusProps = {
    diveCount: number,
    closestTime: string | undefined,
}
const DiveStatus = ({diveCount, closestTime}: DiveStatusProps) => {
    return (
        <>
            {
                diveCount > 2 && <>
                <h1 className="pt-4 pb-8 text-7xl md:text-5xl text-green-500">
                    Yes
                </h1>
                </>
            }
            {
                diveCount === 2 && <>
                <h1 className="pt-4 pb-8 text-7xl  md:text-5xl text-orange-500">
                    Maybe
                </h1>
                </>
            }
            {
                diveCount <= 1  && <>
                <h1 className="pt-4 pb-8  text-7xl  md:text-5xl text-red-500">
                    No
                </h1>
                </>
            }
                    {
                diveCount >= 2 && 
                <>
                Diving at: {closestTime}
                </>
            }
        </>)
}

export default DiveStatus;