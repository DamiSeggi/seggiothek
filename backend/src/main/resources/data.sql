INSERT INTO categories (id, name, description) VALUES (1, 'Sci-Fi', 'Science Fiction Bücher') ON CONFLICT DO NOTHING;
INSERT INTO categories (id, name, description) VALUES (2, 'Krimi', 'Kriminalromane') ON CONFLICT DO NOTHING;

INSERT INTO books (id, title, author, category_id) VALUES (1, 'Dune', 'Frank Herbert', 1) ON CONFLICT DO NOTHING;
INSERT INTO books (id, title, author, category_id) VALUES (2, '1984', 'George Orwell', 1) ON CONFLICT DO NOTHING;
INSERT INTO books (id, title, author, category_id) VALUES (3, 'Der Name der Rose', 'Umberto Eco', 2) ON CONFLICT DO NOTHING;