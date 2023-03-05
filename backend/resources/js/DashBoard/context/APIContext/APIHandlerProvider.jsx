import { UserContextProvider } from "./providers/UserContextProvider";
import { EquipmentContextProvider } from "./providers/EquipmentContextProvider";
import { ProductContextProvider } from "./providers/ProductContextProvider";
import { FeedbackContextProvider } from "./providers/FeedbackContextControler";
import {ProgramContextProvider} from './providers/ProgramContextProvider';
import {WorkOutContextProvider} from './providers/WorkOutContextProvider';
import {ExerciseContextProvider} from './providers/ExerciseContextProvider';
import { Composer } from "./Composer";


const providers = [
    UserContextProvider,
    EquipmentContextProvider,
    ProductContextProvider,
    FeedbackContextProvider,
    ProgramContextProvider,
    ExerciseContextProvider,
    WorkOutContextProvider,
];

export const APIHandlerProvider = Composer(...providers);
