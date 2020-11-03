export const compare = (property) => {
    return function (obj1, obj2) {
        let value1 = obj1[property];
        let value2 = obj2[property];
        // 升序
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}