// create a new user
export const create_user = (data, uid) => {
	const random_color = "#" +
		Math.floor(Math.random() * 16).toString(16) +
		Math.floor(Math.random() * 16).toString(16) +
		Math.floor(Math.random() * 16).toString(16);
    data.users.push({
        uid: uid,
		style: {
			backgroundColor: random_color
		}
    });
};

// remove an existing user
export const remove_user = async (data, value) => {
    const index = data.users.findIndex((user) => (user.uid === value));
    if (index === -1) {
        console.log("Error: could not delete item of index " + index);
        return;
    }
    data.users.splice(index, 1);
};
