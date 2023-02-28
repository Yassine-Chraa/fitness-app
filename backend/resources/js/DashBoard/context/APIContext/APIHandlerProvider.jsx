import { UserContextProvider } from "./providers/UserContextProvider";
import { EquipmentContextProvider } from "./providers/EquipmentContextProvider";
import { MealContextProvider } from "./providers/MealContextProvider";
import { ProductContextProvider } from "./providers/ProductContextProvider";
import { Composer } from "./Composer";

import { ProgramContextProvider } from "./providers/ProgramContextProvider";
import { ExerciseContextProvider } from "./providers/ExerciseContextProvider";
import { WorkOutContextProvider } from "./providers/WorkOutContextProvider";

import { FeedbackContextProvider } from "./providers/FeedbackContextControler";


const providers = [
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
