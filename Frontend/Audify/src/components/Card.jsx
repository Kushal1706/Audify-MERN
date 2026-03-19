function Card(props){
    return(
        <div className="card">
            <img src={props.img} alt="Album Cover" className="image"/>
            <div className="card-content">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-artist">Author: {props.author}</p>
            </div>
            <div>
                <button className="play-button" onClick={props.onPlay}>Play</button>
            </div>
        </div>
    );
}

export default Card;