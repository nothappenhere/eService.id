INSERT INTO users (full_name, email, password_hash, nik, role) VALUES
('Super Admin', 'admin@example.com', 'hashed_admin_pw', '1234567890123456', 'admin'),
('Dinas Kesehatan', 'dinkes@example.com', 'hashed_dinkes_pw', '9876543210987654', 'agency'),
('Budi Santoso', 'budi@mail.com', 'hashed_budi_pw', '1111222233334444', 'citizen');

INSERT INTO letter_type (name, description, is_active) VALUES
('Surat Keterangan Domisili', 'Digunakan untuk membuktikan tempat tinggal warga.', TRUE),
('Surat Izin Usaha', 'Surat izin bagi pelaku usaha skala mikro.', TRUE),
('Surat Keterangan Tidak Mampu', 'Digunakan untuk keperluan beasiswa atau bantuan sosial.', TRUE);

-- Misal kita pakai subquery agar lebih rapi:
INSERT INTO request_letter (user_id, letter_id, status, admin_note) VALUES
(
    (SELECT user_id FROM users WHERE email = 'budi@mail.com'),
    (SELECT letter_id FROM letter_type WHERE name = 'Surat Keterangan Domisili'),
    'pending',
    'Menunggu verifikasi dokumen.'
);

INSERT INTO file_upload (request_id, file_name, file_path, file_type) VALUES
(
    (SELECT request_id FROM request_letter LIMIT 1),
    'ktp_budi.png',
    'uploads/ktp_budi.png',
    'KTP'
),
(
    (SELECT request_id FROM request_letter LIMIT 1),
    'kk_budi.png',
    'uploads/kk_budi.png',
    'KK'
);

INSERT INTO log_activity (user_id, activity) VALUES
(
    (SELECT user_id FROM users WHERE email = 'admin@example.com'),
    'Admin melakukan verifikasi dokumen.'
),
(
    (SELECT user_id FROM users WHERE email = 'budi@mail.com'),
    'Pengguna mengajukan permohonan surat domisili.'
);
