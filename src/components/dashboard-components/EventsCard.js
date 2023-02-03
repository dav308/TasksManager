import React, { useContext } from "react";
import { DatesContext } from "../../app/datesContext";
import { UseFetch } from "../../custom-hooks/useFetch";

const image = 'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'

function EventsCard () {
    const {dateString} = useContext(DatesContext)
    const [event, updateEvent] = UseFetch(`api/v1/events/day-events/${dateString}`)

    if (event.length < 1){
        return <div className="cards-item">
            <p className="content">No tienes nada para hoy :D</p>
        </div>
    }

    return <ul>
        {event.map((elem)=>{
            return <div key={elem.id} className='cards-item'>
                <p className="content">{elem.content}</p>
                <p className="details">{elem.deatails}</p>
                <span>{elem.folderid}</span>
                    <div className="galery-container">
                        <div  className="galery-item" style={{backgroundImage: "url("+image+")"}}></div>
                        <div  className="galery-item" style={{backgroundImage: "url("+image+")"}}></div>
                        <div  className="galery-item" style={{backgroundImage: "url("+image+")"}}></div>
                    </div>
            </div>
        })}
    </ul>
}

export {EventsCard}