# language: id
Fitur: Login pengguna

    Skenario: Login berhasil dengan kredensial yang valid
        Diketahui pengguna memiliki nama pengguna dan kata sandi yang valid untuk <peran>
        Ketika pengguna mencoba untuk login
        Maka status respons harus 200
        Dan respons harus berisi token JWT dengan izin <peran>

        Contoh:
            | peran   |
            | pemilik | 
            | pegawai |

    Skenario: Gagal login dengan kredensial yang tidak valid
        Diketahui pengguna memiliki nama pengguna atau kata sandi yang tidak valid
        Ketika pengguna mencoba untuk login
        Maka status respons harus 400
        Dan pesan respons harus "Nama pengguna atau kata sandi salah"

    Skenario: Login dengan kredensial yang tidak lengkap
        Diketahui nama pengguna "<nama pengguna>"
        Dan kata sandi "<kata sandi>"
        Ketika pengguna mencoba untuk login
        Maka status respons harus 400
        Dan pesan respons harus "<pesan>"

        Contoh:
            | nama pengguna | kata sandi      | pesan                                                             |
            |               |                 | Nama pengguna tidak boleh kosong!, Kata sandi tidak boleh kosong! |
            | nama          |                 | Kata sandi tidak boleh kosong!                                    |
            |               | sandi           | Nama pengguna tidak boleh kosong!                                 |
