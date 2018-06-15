// create a new user
export const create_user = (data, uid) => {
	var user_style = create_user_style();
    data.users.push({
        uid: uid,
		style: user_style
    });
};

// create_user_style
export const create_user_style = () => {
	var random_color = "#" +
		Math.floor(Math.random() * 16).toString(16) +
		Math.floor(Math.random() * 16).toString(16) +
		Math.floor(Math.random() * 16).toString(16);
	var random_top = Math.floor(Math.random() * 500) + "px";
	var random_left = Math.floor(Math.random() * 500) + "px";
	return {
		backgroundColor: random_color,
		position: "absolute",
		top: random_top,
		left: random_left,
		width: "38px",
		height: "38px"
	};
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
