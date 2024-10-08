import { useMemo } from "react"



export default function ErrorPage({ status, message, data }: ErrorType) {

  const stringifiedData = useMemo(() => {
    if(typeof data === "object") return JSON.stringify(data);
    else return data;
  }, [ data ]);

  return (
    <div className="h-full w-full flex flex-col text-center">
      <h4>Error!!</h4>
      {status && <p className="font-semibold">Status: <span className="italic">{ status }</span></p>}
      <p className="font-semibold">Message: <span className="italic">{ message }</span></p>
      {data && <p className="font-semibold">Data: <span className="italic">{ stringifiedData }</span></p>}
    </div>
  )
}