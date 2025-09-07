# language: id
Fitur: Buat ulang token pengguna

    Skenario konsep: Tidak diizinkan karena token tidak ada di header
        Diketahui pengguna <token> token akses
        Dan Authorization header <header>
        Ketika pengguna mengirimkan permintaan untuk buat ulang token
        Maka status respons harus 401
        Dan pesan respons harus "Authorization header is missing or malformed!"

        Contoh:
            | token       | header      |
            | tidak punya | tidak valid |
            | punya       | tidak valid |
            | tidak punya | valid       |
    
    Skenario konsep: Berhasil membuat ulang token
        Diketahui pengguna akan membuat ulang token dengan <peran>
        Ketika pengguna mengirimkan permintaan untuk buat ulang token
        Maka status respons harus 200
        Dan respons harus berisi token JWT dengan izin <peran>

        Contoh:
            | peran   |
            | pemilik |
            | pegawai |
