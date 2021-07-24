import memories from "../Models/memories";

export const getMemory = (id) => {

    const result = memories.find(memory => memory.id === +id);

    return result;
};


