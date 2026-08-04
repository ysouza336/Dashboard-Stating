import CardSection from "../CardSection";

function DynamicForm({

    sections

}){

    return(

        <>

            {sections.map(section=>(

                <CardSection
                    key={section.id}
                    title={section.title}
                >

                    <div className="row">

                        {/* Próxima etapa */}

                    </div>

                </CardSection>

            ))}

        </>

    )

}

export default DynamicForm;