import { useParams } from "react-router-dom";

export function CoinPage(){
    const { contactId } = useParams();
    return(
        <>
        <div>{contactId}</div>
        </>
    )
}