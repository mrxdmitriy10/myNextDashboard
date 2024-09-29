import { Dispatch, SetStateAction } from "react";

type iFocus = {
        id: string | null;
        set_focus: Dispatch<SetStateAction<iFocus['id']>>
        add?: unknown


    }

export default iFocus