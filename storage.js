
const FILTER_KEY = "monDexFilter";


export function saveFilter(type) {
    localStorage.setItem(FILTER_KEY, type);
}

export function getFilter() {
    return localStorage.getItem(FILTER_KEY) || "Tous";
}
