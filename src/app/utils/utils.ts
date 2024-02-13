import { RepoDetail } from "../models/repo_detail";
import { User } from "../models/user";

export default class Utils {
    public isUserObjectEmpty(user: User) {
        return (user && (Object.keys(user).length === 0));
    }

    public isRepoDetailsObjectEmpty(repoDetails: RepoDetail[]) {
        // console.log("isRepoDetailsObjectEmpty => ", repoDetails);
        // console.log("isRepoDetailsObjectEmpty Status => ", (repoDetails && (Object.keys(repoDetails).length === 0)));
        // console.log("isRepoDetailsObjectEmpty Keys => ", Object.keys(repoDetails));
        return (repoDetails && (Object.keys(repoDetails).length === 0));
    }
}