import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState
} from "react";

export type LoadingContextType = {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType>(
    {} as LoadingContextType
);

export const LoadingProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
  