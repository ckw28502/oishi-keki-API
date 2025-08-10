# language: id
Fitur: Mengambil daftar kue dari basis data

    Skenario konsep: Tidak diizinkan karena token tidak ada di header
        Diketahui pengguna <token> token akses
        Dan Authorization header <header>
        Ketika pengguna mengirimkan permintaan untuk mendapatkan daftar kue
        Maka status respons harus 401
        Dan pesan respons harus "Authorization header is missing or malformed!"

        Contoh:
            | token       | header      |
            | tidak punya | tidak valid |
            | punya       | tidak valid |
            | tidak punya | valid       |

    @cake
    Skenario konsep: Berhasil dapatkan daftar kue
        Diketahui kue-kue di bawah telah terdaftar di basis data:
            | name           | price  |
            | Chiffon cake   | 150000 |
            | Chocolate cake | 125000 |
            | Pandan cake    | 130000 |
            | Marble cake    | 145000 |
            | Rainbow cake   | 175000 |
        Dan pengguna adalah pemilik
        Dengan halaman yang ke-<page>
        Dan jumlah kue per halaman adalah <limit>
        Dengan filter nama kue berisi "<name>"
        Dan parameter untuk mengurutkan adalah "<sort>" 
        Dengan urutan <direction>
        Ketika pengguna mengirimkan permintaan untuk mendapatkan daftar kue
        Maka status respons harus 200
        Dan jumlah halaman adalah <total>
        Dan jumlah kue adalah <count>
        Dan daftar kue yang didapat adalah "<cakes>"

        Contoh:
            | page | limit | name | sort  | direction | total | count | cakes                                     |
            | 1    | 3     |      | name  | ASC       | 2     | 5     | Chiffon cake, Chocolate cake, Marble cake |
            | 2    | 3     |      | name  | ASC       | 2     | 5     | Pandan cake, Rainbow cake                 |
            | 2    | 5     |      | name  | ASC       | 1     | 5     |                                           |
            | 1    | 3     | Ch   | name  | ASC       | 1     | 2     | Chiffon cake, Chocolate cake              |
            | 1    | 3     |      | name  | DESC      | 2     | 5     | Rainbow cake, Pandan cake, Marble cake    |
            | 1    | 3     |      | price | ASC       | 2     | 5     | Chocolate cake, Pandan cake, Marble cake  |
            | 1    | 3     |      | price | DESC      | 2     | 5     | Rainbow cake, Chiffon cake, Marble cake   |
