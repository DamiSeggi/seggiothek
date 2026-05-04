INSERT INTO categories (name, description) VALUES ('Sci-Fi', 'Science Fiction Bücher') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, description) VALUES ('Krimi', 'Kriminalromane') ON CONFLICT DO NOTHING;

INSERT INTO books (title, author, category_id) VALUES ('Dune', 'Frank Herbert', 1) ON CONFLICT DO NOTHING;
INSERT INTO books (title, author, category_id) VALUES ('1984', 'George Orwell', 1) ON CONFLICT DO NOTHING;
INSERT INTO books (title, author, category_id) VALUES ('Der Name der Rose', 'Umberto Eco', 2) ON CONFLICT DO NOTHING;