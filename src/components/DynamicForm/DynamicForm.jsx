import CardSection from "../CardSection/CardSection";
import FormField from "../FormField";

function DynamicForm({

    sections,
    values,
    onChange

}) {

    return (

        <>

            {sections.map(section => (

                <CardSection
                    key={section.id}
                    title={section.title}
                >

                    <div className="row">

                        {section.fields.map(field => (

                            <div
                                key={field.name}
                                className={`col-md-${field.col}`}
                            >

                                <FormField
                                    field={field}
                                    value={values[field.name]}
                                    onChange={onChange}
                                />

                            </div>

                        ))}

                    </div>

                </CardSection>

            ))}

        </>

    );

}

export default DynamicForm;