import { ActivityContextProvider } from "./providers/ActivityContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { EquipmentContextProvider } from "./providers/EquipmentContextProvider";
import { MealContextProvider } from "./providers/MealContextProvider";
import { ProductContextProvider } from "./providers/ProductContextProvider";
import { Composer } from "./Composer";
import { FeedbackContextProvider } from "./providers/FeedbackContextControler";

const providers = [
    ActivityContextProvider,
    UserContextProvider,
    EquipmentContextProvider,
    MealContextProvider,
    ProductContextProvider,
    FeedbackContextProvider
    ProgramContextProvider,
    ExerciseContextProvider,
    WorkOutContextProvider,
];

export const APIHandlerProvider = Composer(...providers);
