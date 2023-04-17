import { IUser, User } from "../models/user-model";

class UserRepositories {
    getAll() {
        return User.find();
    };

    getByDocument(document: string) {
        return User.findOne({ document: document });
    };

    create(user: IUser) {
        return User.create(user);
    };

    update(document: string, user: IUser) {
        return User.updateOne({ document: document }, { $set: user });
    };

    remove(document: string) {
        return User.deleteOne({ document: document });
    };
};

export default new UserRepositories();