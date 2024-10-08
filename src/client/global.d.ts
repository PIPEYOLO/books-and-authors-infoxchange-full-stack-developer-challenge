
type AuthorCreationPayload = Omit<Author, "_id">
type AuthorEditionPayload = AuthorCreationPayload;


type BookEditionPayload = Omit<Book, "_id" | "author">;
type BookCreationPayload = BookEditionPayload & { author_id: string };
