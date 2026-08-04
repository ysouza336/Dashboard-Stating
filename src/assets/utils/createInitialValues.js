export default function createInitialValues(sections) {

    const values = {};

    sections.forEach(section => {

        section.fields.forEach(field => {

            values[field.name] = field.defaultValue ?? "";

        });

    });

    return values;

}