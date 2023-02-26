import { ActivityContextProvider } from "./providers/ActivityContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { EquipmentContextProvider } from "./providers/EquipmentContextProvider";
import { MealContextProvider } from "./providers/MealContextProvider";
import { ProductContextProvider } from "./providers/ProductContextProvider";
import { Composer } from "./Composer";

const providers = [
    ActivityContextProvider,
    UserContextProvider,
    EquipmentContextProvider,
    MealContextProvider,
    ProductContextProvider,
    ProgramContextProvider,
    ExerciseContextProvider,
    WorkOutContextProvider,
];

export const APIHandlerProvider = Composer(...providers);
