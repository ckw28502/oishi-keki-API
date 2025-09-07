# language: id
Fitur: Mengambil data sebuah objek kue berdasarkan ID

    Skenario konsep: Tidak diizinkan karena token tidak ada di header
        Diketahui pengguna <token> token akses
        Dan Authorization header <header>
        Ketika pengguna mengirimkan permintaan untuk mendapatkan kue berdasarkan ID
        Maka status respons harus 401
        Dan pesan respons harus "Authorization header is missing or malformed!"

        Contoh:
            | token       | header      |
            | tidak punya | tidak valid |
            | punya       | tidak valid |
            | tidak punya | valid       |

    Skenario konsep: Gagal karena id kue tidak valid
        Diketahui pengguna adalah pemilik
        Dengan id kue tidak valid
        Ketika pengguna mengirimkan permintaan untuk mendapatkan kue berdasarkan ID
        Maka status respons harus 400
        Dan pesan respons harus "ID kue tidak valid!"
    
    Skenario konsep: Gagal karena kue tidak ditemukan
        Diketahui pengguna adalah pemilik
        Dengan id kue valid
        Ketika pengguna mengirimkan permintaan untuk mendapatkan kue berdasarkan ID
        Maka status respons harus 400
        Dan pesan respons harus "Kue tidak ditemukan!"

    @cake
    Skenario konsep: Berhasil mendapatkan kue berdasarkan ID
        Diketahui pengguna adalah pemilik
        Dengan id kue valid
        Dan kue dengan nama "Chiffon cake" dan harga 100000 telah ditambahkan
        Ketika pengguna mengirimkan permintaan untuk mendapatkan kue berdasarkan ID
        Maka status respons harus 200
        Dan respons harus berisi data kue dengan nama "Chiffon cake" dan harga 100000
