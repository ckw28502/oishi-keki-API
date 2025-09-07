# language: id
Fitur: Menghapus kue di aplikasi

    Skenario konsep: Tidak diizinkan karena token tidak ada di header
        Diketahui pengguna <token> token akses
        Dan Authorization header <header>
        Dengan id kue valid
        Ketika pengguna mengirimkan permintaan untuk menghapus kue
        Maka status respons harus 401
        Dan pesan respons harus "Authorization header is missing or malformed!"

        Contoh:
            | token       | header      |
            | tidak punya | tidak valid |
            | punya       | tidak valid |
            | tidak punya | valid       |

    Skenario: Dilarang karena pengguna bukan pemilik
        Diketahui pengguna adalah pegawai
        Dengan id kue valid
        Ketika pengguna mengirimkan permintaan untuk menghapus kue
        Maka status respons harus 403
        Dan pesan respons harus "This user does not have authorization for this endpoint!"

    Skenario konsep: Gagal karena id kue tidak valid
        Diketahui pengguna adalah pemilik
        Dengan id kue tidak valid
        Ketika pengguna mengirimkan permintaan untuk menghapus kue
        Maka status respons harus 400
        Dan pesan respons harus "ID kue tidak valid!"
    
    Skenario: Gagal karena kue tidak ditemukan
        Diketahui pengguna adalah pemilik
        Dengan id kue valid
        Ketika pengguna mengirimkan permintaan untuk menghapus kue
        Maka status respons harus 400
        Dan pesan respons harus "Kue tidak ditemukan!"

    @cake
    Skenario: Berhasil menghapus kue
        Diketahui pengguna adalah pemilik
        Dengan id kue valid
        Dan kue dengan nama "Chiffon cake" dan harga 100000 telah ditambahkan
        Ketika pengguna mengirimkan permintaan untuk menghapus kue
        Maka status respons harus 204