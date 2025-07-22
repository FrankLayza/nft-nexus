import { createContext, useContext, useState } from "react";

type SearchQueryContextType = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

type SearchQueryProviderProps = {
    children: React.ReactNode;
};

const SearchQueryContext = createContext<SearchQueryContextType | undefined>(undefined);

export const SearchQueryProvider = ({ children }: SearchQueryProviderProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchQueryContext.Provider>
    );
}

export const useSearchQuery = () => {
    const context = useContext(SearchQueryContext);
    if (context === undefined) {
        throw new Error("useSearchQuery must be used within a SearchQueryProvider");
    }
    return context;
};