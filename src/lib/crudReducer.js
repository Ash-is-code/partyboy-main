export const initialCrudState = { items: [], status: "loading", error: null };

export function crudReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading", error: null };
    case "loaded":
      return { items: action.items, status: "ready", error: null };
    case "failed":
      return { ...state, status: "error", error: action.error };
    case "added":
      return { ...state, items: [...state.items, action.item] };
    case "updated":
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, ...action.changes } : i)),
      };
    case "removed":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "restored": {
      const items = [...state.items];
      items.splice(Math.min(action.index, items.length), 0, action.item);
      return { ...state, items };
    }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
