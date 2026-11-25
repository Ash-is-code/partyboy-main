export const toOptions = (map) => Object.entries(map).map(([value, {label}]) => ({value, label}))
// {value, label}