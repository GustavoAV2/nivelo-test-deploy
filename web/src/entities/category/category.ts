export default class Category {
    private constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly name: string,
        public readonly type: string,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }

    static create(name: string, userId: string, type: string): Partial<Category> {
        return {
            name: name,
            type: type,
            created_at: new Date(),
            user_id: userId
        };
    }

    static edit(id: string, name: string): Partial<Category> {
        return {
            id: id,
            name: name,
            updated_at: new Date()
        };
    }
}
