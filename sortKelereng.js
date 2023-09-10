// Inisialisasi berat kelereng
const beratKelereng = [100, 125, 100, 100, 100, 100, 100, 100];

// Proses pertama: Bagi kelereng menjadi dua kelompok, masing-masing berisi 4 kelereng
const kelompok1 = beratKelereng.slice(0, 4); // 4 kelereng pertama
const kelompok2 = beratKelereng.slice(4); // 4 kelereng terakhir

const beratKelompok1 = kelompok1.reduce((total, berat) => total + berat, 0);
const beratKelompok2 = kelompok2.reduce((total, berat) => total + berat, 0);

// Proses kedua: Timbang dua kelompok tersebut
if (beratKelompok1 === beratKelompok2) {
  // Jika berat kedua kelompok sama, maka kelereng terberat ada di kelompok sisanya (kelompok2)
  const kelerengTerberat = kelompok2.find((berat) => berat === 125);
  const indexKelerengTerberat = kelompok2.indexOf(kelerengTerberat);
  console.log(
    `Kelereng terberat ada di kelompok 2, pada posisi ${
      indexKelerengTerberat + 5
    }`
  );
} else if (beratKelompok1 > beratKelompok2) {
  // Jika berat kelompok 1 lebih besar, maka kelereng terberat ada di kelompok 1
  const kelerengTerberat = kelompok1.find((berat) => berat === 125);
  const indexKelerengTerberat = kelompok1.indexOf(kelerengTerberat);
  console.log(
    `Kelereng terberat ada di kelompok 1, pada posisi ${
      indexKelerengTerberat + 1
    }`
  );
} else {
  // Jika berat kelompok 2 lebih besar, maka kelereng terberat ada di kelompok 2
  const kelerengTerberat = kelompok2.find((berat) => berat === 125);
  const indexKelerengTerberat = kelompok2.indexOf(kelerengTerberat);
  console.log(
    `Kelereng terberat ada di kelompok 2, pada posisi ${
      indexKelerengTerberat + 5
    }`
  );
}
