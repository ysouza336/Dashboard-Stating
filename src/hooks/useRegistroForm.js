import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import registroSchema from "../schemas/registroSchema";
import createInitialValues from "../assets/utils/createInitialValues";
import formSections from "../data/formSections";

export default function useRegistroForm() {
    return useForm({
        resolver: zodResolver(registroSchema),
        defaultValues: createInitialValues(formSections),
        mode: "onBlur"
    });
}