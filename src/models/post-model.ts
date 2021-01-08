export default interface PostModel {
    author: string,
    id: number,
    thread: number,
    parent: number,
    forum: string,
    message: string,
    isEdited: boolean,
    created: any,
}
