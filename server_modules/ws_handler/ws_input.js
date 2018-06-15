export const handle_input = (body, data, socket_uid) => {
	var user_index;
	for (let user in data.users) {
		if (data.users[user].uid === socket_uid) {
			user_index = user;
		}
	}
	if (!user_index) {
		console.log("Error: could not find user of uid " + socket_uid + " in data.");
		return;
	}
	var user_style = data.users[user_index].style;
	var user_top_value = Number(user_style.top.replace("px", ""));
	var user_left_value = Number(user_style.left.replace("px", ""));
	console.log(user_top_value, user_left_value);
	switch (body.key) {
		case "z":
			user_style.top = user_top_value - 10 + "px";
			break;
		case "q":
			user_style.left = user_left_value - 10 + "px";
			break;
		case "s":
			user_style.top = user_top_value + 10 + "px";
			break;
		case "d":
			user_style.left = user_left_value + 10 + "px";
			break;
		default:
			console.log("Error: input has no corresponding action.");
			break;
	}
}
