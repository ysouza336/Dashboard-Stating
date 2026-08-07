import CardSection from "../CardSection/CardSection";
import FormField from "../FormField/FormField";

function DynamicForm({
    sections,
    register,
    errors
}) {
    return (
        <>
            {sections.map((section) => (

                <CardSection
                    key={section.id}
                    title={section.title}
                >

                    <div className="row">

                        {section.fields.map((field) => (

                            <div
                                key={field.name}
                                className={`col-md-${field.col || 12}`}
                            >

                                <FormField
                                    field={field}
                                    register={register}
                                    error={errors?.[field.name]}
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