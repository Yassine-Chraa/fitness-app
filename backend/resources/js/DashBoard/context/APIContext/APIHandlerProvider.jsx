import { UserContextProvider } from "./providers/UserContextProvider";
import { EquipmentContextProvider } from "./providers/EquipmentContextProvider";
import { ProductContextProvider } from "./providers/ProductContextProvider";
import { Composer } from "./Composer";
import { FeedbackContextProvider } from "./providers/FeedbackContextControler";
import {ProgramContextProvider} from './providers/ProgramContextProvider';
import {WorkOutContextProvider} from './providers/WorkOutContextProvider';
import {ExerciseContextProvider} from './providers/ExerciseContextProvider';

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
