# language: id
Fitur: Menambahkan kue ke aplikasi

    Skenario konsep: Tidak diizinkan karena token tidak ada di header
        Diketahui pengguna <token> token akses
        Dan Authorization header <header>
        Ketika pengguna mengirimkan permintaan untuk membuat kue
        Maka status respons harus 401
        Dan pesan respons harus "Authorization header is missing or malformed!"

        Contoh:
            | token       | header      |
            | tidak punya | tidak valid |
            | punya       | tidak valid |
            | tidak punya | valid       |

    Skenario: Dilarang karena pengguna bukan pemilik
        Diketahui pengguna adalah pegawai
        Ketika pengguna mengirimkan permintaan untuk membuat kue
        Maka status respons harus 403
        Dan pesan respons harus "This user does not have authorization for this endpoint!"

    Skenario konsep: Gagal karena permintaan tidak valid
        Diketahui pengguna adalah pemilik
        Dan nama kue "<nama>"
        Dan harga "<harga>"
        Ketika pengguna mengirimkan permintaan untuk membuat kue
        Maka status respons harus 400
        Dan pesan respons harus "<pesan>"

        Contoh:
            | nama         | harga | pesan                                                                    |
            |              |       | Nama kue tidak boleh kosong!, Harga kue harus angka!                     |
            | Chiffon cake |       | Harga kue harus angka!                                                   |
            |              | 0     | Nama kue tidak boleh kosong!, Harga kue harus lebih besar dari 0 Rupiah! |
            |              | 1     | Nama kue tidak boleh kosong!                                             |
            | Chiffon cake | 0     | Harga kue harus lebih besar dari 0 Rupiah!                               |
    
    @cake
    Skenario: Gagal karena nama kue sudah terpakai
        Diketahui pengguna adalah pemilik
        Dan nama kue "Chiffon cake"
        Dan harga "100000"
        Dan kue dengan nama "Chiffon cake" dan harga 100000 telah ditambahkan
        Ketika pengguna mengirimkan permintaan untuk membuat kue
        Maka status respons harus 400
        Dan pesan respons harus "Nama kue sudah terpakai!"

    @cake
    Skenario: Berhasil menambahkan kue
        Diketahui pengguna adalah pemilik
        Dan nama kue "Chiffon cake"
        Dan harga "100000"
        Ketika pengguna mengirimkan permintaan untuk membuat kue
        Maka status respons harus 201
        Dan pesan respons harus kue yang ditambahkan