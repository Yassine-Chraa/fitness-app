import { UserContextProvider } from "./providers/UserContextProvider";
import { ProductContextProvider } from "./providers/ProductContextProvider";
import { FeedbackContextProvider } from "./providers/FeedbackContextControler";
import {ProgramContextProvider} from './providers/ProgramContextProvider';
import {WorkOutContextProvider} from './providers/WorkOutContextProvider';
import {ExerciseContextProvider} from './providers/ExerciseContextProvider';
import { Composer } from "./Composer";
import { categoryContextProvider } from "./providers/CategoryContextProvider";
import { WorkOutExerciseContextProvider } from "./providers/WorkOutExerciseContextProvider";

const providers = [
    UserContextProvider,
    ProductContextProvider,
    FeedbackContextProvider,
    FeedbackContextProvider,
    ProgramContextProvider,
    ExerciseContextProvider,
    WorkOutContextProvider,
    categoryContextProvider,
    WorkOutExerciseContextProvider
];

export const APIHandlerProvider = Composer(...providers);
