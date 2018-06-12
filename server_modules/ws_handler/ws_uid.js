const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();

// generate a new uid and return it
export const get_new_uid = async (users) => {
    let new_uid;
    do {
        new_uid = await uidgen.generate();
    } while (users.find((user) => (user.uid === new_uid)) !== undefined);
    return new_uid;
};
