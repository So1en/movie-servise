export const updateSearchParams = (newParams: Record<string, string>, prev: URLSearchParams) => {
    const newPrev = Object.fromEntries(prev.entries())
    return { ...newPrev,  ...newParams }
}