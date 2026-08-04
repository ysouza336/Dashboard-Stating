import "./CardSection.css";

function CardSection({

    title,

    children

}){

    return(

        <div className="card shadow-sm mb-4">

            <div className="card-header fw-bold">

                {title}

            </div>

            <div className="card-body">

                {children}

            </div>

        </div>

    )

}

export default CardSection;