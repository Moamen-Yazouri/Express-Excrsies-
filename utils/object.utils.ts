export const removeFields = <T, K extends keyof T>(obj: T, keys: K[]) => {
    const partialObj: Partial<T> = structuredClone(obj);
    for(const key of keys) {
        delete partialObj[key];
    }    
    return partialObj as Omit<T, K>
}