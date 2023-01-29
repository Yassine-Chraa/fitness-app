import { ActivityContextProvider } from "./providers/ActivityContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { EquipmentContextProvider } from "./providers/EquipmentContextProvider";
import { MealContextProvider } from "./providers/MealContextProvider";
import { ProductContextProvider } from "./providers/ProductContextProvider";
import { Composer } from "./Composer";
import { authContextProvider } from "./providers/AuthContextProvider";

const providers = [
    ActivityContextProvider,
    UserContextProvider,
    EquipmentContextProvider,
    MealContextProvider,
    ProductContextProvider,
    authContextProvider,
];

export const APIHandlerProvider = Composer(...providers);