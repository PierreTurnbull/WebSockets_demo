export const create_user = (data, uid) => {
    data.users.push({
        uid: uid
    });
};

export const remove_user = async (data, value) => {
    const index = data.users.findIndex((user) => (user.uid === value));
    if (index === -1) {
        console.log("Error: could not delete item of index " + index);
        return;
    }
    data.users.splice(index, 1);
};
