import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { waLinkFor } from "@/content/settings";
import { StaffSection } from "@/components/pages/portal-shared/StaffCard";
import { StudentSection } from "@/components/pages/portal-shared/StudentCard";
import { getSettings } from "@/lib/content/store";
import { Img } from "@/components/content/Img";

export const metadata = { title: "Profil SMP Islam Modern Al Fakhir" };

export default async function SmpProfilPage() {
  const { contact, staff, students } = await getSettings();
  return (
    <Scope id="smp/profil">
    <div className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface-container-lowest pb-space-xl pt-space-lg">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] opacity-[0.035] text-primary">
          <svg className="w-full h-full fill-current" viewBox="0 0 200 200">
            <path d="M100 0 L122 28 L158 20 L166 56 L198 72 L185 106 L200 142 L166 154 L152 188 L116 182 L96 200 L76 182 L40 188 L26 154 L-8 142 L7 106 L-6 72 L26 56 L34 20 L70 28 Z">
            </path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="inline-flex items-start sm:items-center gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-surface-container text-primary font-label-md text-label-md mb-6 shadow-sm max-w-full">
            <span className="text-tertiary-container text-[12px] font-bold shrink-0">
              ✦
            </span>
            <span className="tracking-wide uppercase font-semibold text-pretty">
              <T>Profil Institusi &amp; Keunggulan Akademik · SMP Islam Modern Al Fakhir</T>
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg xl:text-5xl tracking-tight leading-[1.15] text-balance">
                <T>Membentuk Generasi</T>{" "}
                <span className="text-secondary-container">
                  <T>Qurani</T>
                </span>
                <T> &amp; Berprestasi: Tahfiz, Riset, &amp; Pembentukan Karakter.</T>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-pretty">
                <T>Berlokasi di Sawangan, Depok, SMP Islam Modern Al Fakhir mengusung konsep modern, mengadopsi model kelas dan program internasional, namun tetap mengutamakan pendidikan karakter, moral, akhlak, dan nilai-nilai keislaman.</T>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex flex-col justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm">
                  <span className="font-headline-sm text-headline-sm text-primary">
                    <T>2023</T>
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                    <T>Tahun Berdiri</T>
                  </span>
                </div>
                <div className="flex flex-col justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm">
                  <span className="font-headline-sm text-headline-sm text-primary">
                    <T>3 Medali</T>
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                    <T>Sains 2024–2025</T>
                  </span>
                </div>
                <div className="flex flex-col justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm">
                  <span className="font-headline-sm text-headline-sm text-primary">
                    <T>33 Siswa</T>
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                    <T>Research Contest 2025</T>
                  </span>
                </div>
                <div className="flex flex-col justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm">
                  <span className="font-headline-sm text-headline-sm text-secondary-container">
                    <T>Tahfiz</T>
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                    <T>Wisuda Juz 30 (2025)</T>
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4">
                <a className="px-6 py-3.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wide shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2 text-center" href="#visi-misi">
                  <span>
                    <T>Jelajahi Profil Lengkap</T>
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_downward
                  </span>
                </a>
                <a className="px-6 py-3.5 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg uppercase tracking-wide shadow-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2 text-center" href="#fasilitas">
                  <span className="material-symbols-outlined text-[18px]">
                    domain
                  </span>
                  <span>
                    <T>Tur Fasilitas Sekolah</T>
                  </span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-surface-container">
                <Img className="w-full h-[380px] object-cover" src="/photos/gedung-depan.jpg" alt="Gedung SMP Islam Modern Al Fakhir, Sawangan, Depok" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-on-primary">
                    <p className="font-label-md text-label-md text-tertiary-fixed uppercase tracking-wider">
                      <T>Sawangan, Depok</T>
                    </p>
                    <p className="font-headline-sm text-[18px] leading-tight font-bold">
                      <T>Modern Islamic Education: Tahfiz, Research, Character Building</T>
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 right-4 z-20 hidden sm:flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-lg max-w-[calc(100%-2rem)]">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">
                    psychology
                  </span>
                </div>
                <div>
                  <p className="font-headline-sm text-[16px] font-bold text-primary leading-none mb-1">
                    <T>Riset &amp; Sains</T>
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    <T>Research Class sejak 2024, Lab IPA &amp; Lab Komputer</T>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-space-xl bg-surface-container-lowest" id="visi-misi">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-space-lg">
            <span className="font-caption text-caption uppercase tracking-widest text-tertiary-container font-bold mb-2">
              <T>Fondasi Filosofis &amp; Cita-Cita Luhur</T>
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary text-balance">
              <T>Visi, Misi, &amp; Karakter Keunggulan</T>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">
              <T>Ruang formal membentuk generasi Islami Modern yang berpengetahuan luas, berakhlak baik, dan dapat menerapkan ilmu pengetahuan di berbagai aspek kehidupan untuk kesuksesan di dunia dan akhirat.</T>
            </p>
          </div>
          <div className="mb-space-lg p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-tertiary-fixed backdrop-blur-md">
                <span className="material-symbols-outlined text-[36px]">
                  visibility
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-tertiary-fixed font-bold">
                    <T>Visi Sekolah</T>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-secondary-container">
                  </span>
                  <span className="font-caption text-caption text-primary-fixed">
                    <T>SMP Islam Modern Al Fakhir</T>
                  </span>
                </div>
                <p className="font-subheading text-[18px] leading-relaxed sm:text-[22px] md:text-[24px] text-surface font-semibold text-pretty">
                  <T>“Terwujudnya pendidikan yang bermutu tinggi dalam membentuk siswa-siswi yang berakhlak, modern, dan menjadi kebanggaan orang tua, masyarakat, bangsa dan negara.”</T>
                </p>
              </div>
            </div>
          </div>
          <div className="mb-space-xl">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">
              <T>Misi Utama Sekolah</T>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
                  <T>1</T>
                </div>
                <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-2">
                  <T>Beribadah dengan Benar</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Salat Dhuha rutin menjadi bagian integral kurikulum untuk membiasakan siswa-siswi beribadah dengan benar.</T>
                </p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
                  <T>2</T>
                </div>
                <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-2">
                  <T>Berakhlak Mulia</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Pendidikan karakter, moral, dan akhlak diutamakan, antara lain lewat Deklarasi Anti-Bullying dan LDKS (Latihan Dasar Kepemimpinan Siswa).</T>
                </p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
                  <T>3</T>
                </div>
                <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-2">
                  <T>Cinta Al-Qur&apos;an</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Pembelajaran Tahsin (tajwid &amp; makhraj) dan Tahfiz Al-Qur&apos;an terstruktur, termasuk Wisuda Tahfidz Juz 30.</T>
                </p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
                  <T>4</T>
                </div>
                <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-2">
                  <T>Berfikir Kritis &amp; Kreatif</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Research Class sejak 2024: metodologi penelitian, pengumpulan dan analisis data, hingga penyusunan laporan ilmiah.</T>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-caption text-caption text-secondary uppercase tracking-wider font-bold">
                  <T>Karakter Khas Siswa-Siswi</T>
                </span>
                <h3 className="font-headline-md text-headline-md text-primary">
                  <T>Pilar Karakter Al Fakhir</T>
                </h3>
              </div>
              <span className="hidden sm:inline-block font-label-md text-label-md px-3 py-1 rounded-full bg-surface-container text-primary">
                <T>6 Pilar Misi</T>
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-5 rounded-2xl bg-surface-container flex flex-col items-center text-center">
                <span className="font-headline-lg text-[36px] font-extrabold text-secondary-container mb-1 leading-none">
                  <span className="material-symbols-outlined text-[36px]">mosque</span>
                </span>
                <span className="font-headline-sm text-[16px] text-primary font-bold">
                  <T>Beribadah dengan Benar</T>
                </span>
                <span className="font-caption text-caption text-on-surface-variant mt-1">
                  <T>Pembiasaan salat, termasuk Dhuha</T>
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-surface-container flex flex-col items-center text-center">
                <span className="font-headline-lg text-[36px] font-extrabold text-primary mb-1 leading-none">
                  <span className="material-symbols-outlined text-[36px]">favorite</span>
                </span>
                <span className="font-headline-sm text-[16px] text-primary font-bold">
                  <T>Berakhlak Mulia</T>
                </span>
                <span className="font-caption text-caption text-on-surface-variant mt-1">
                  <T>Adab, moral, dan karakter yang baik</T>
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-surface-container flex flex-col items-center text-center">
                <span className="font-headline-lg text-[36px] font-extrabold text-tertiary-container mb-1 leading-none">
                  <span className="material-symbols-outlined text-[36px]">menu_book</span>
                </span>
                <span className="font-headline-sm text-[16px] text-primary font-bold">
                  <T>Cinta Al-Qur&apos;an</T>
                </span>
                <span className="font-caption text-caption text-on-surface-variant mt-1">
                  <T>Tahsin, tahfiz, dan murajaah</T>
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-surface-container flex flex-col items-center text-center">
                <span className="font-headline-lg text-[36px] font-extrabold text-secondary-container mb-1 leading-none">
                  <span className="material-symbols-outlined text-[36px]">psychology</span>
                </span>
                <span className="font-headline-sm text-[16px] text-primary font-bold">
                  <T>Berfikir Kritis &amp; Kreatif</T>
                </span>
                <span className="font-caption text-caption text-on-surface-variant mt-1">
                  <T>Riset dan inovasi sejak dini</T>
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-surface-container flex flex-col items-center text-center">
                <span className="font-headline-lg text-[36px] font-extrabold text-primary mb-1 leading-none">
                  <span className="material-symbols-outlined text-[36px]">school</span>
                </span>
                <span className="font-headline-sm text-[16px] text-primary font-bold">
                  <T>Berpengetahuan Luas</T>
                </span>
                <span className="font-caption text-caption text-on-surface-variant mt-1">
                  <T>Menerapkan ilmu di berbagai aspek kehidupan</T>
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-surface-container flex flex-col items-center text-center">
                <span className="font-headline-lg text-[36px] font-extrabold text-tertiary-container mb-1 leading-none">
                  <span className="material-symbols-outlined text-[36px]">fitness_center</span>
                </span>
                <span className="font-headline-sm text-[16px] text-primary font-bold">
                  <T>Berbadan Sehat</T>
                </span>
                <span className="font-caption text-caption text-on-surface-variant mt-1">
                  <T>Olahraga, ekskul, dan UKS</T>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-12 mb-space-lg">
            <div className="max-w-2xl">
              <span className="font-caption text-caption uppercase tracking-wider text-primary font-bold">
                <T>Perjalanan Dedikasi &amp; Jejak Prestasi</T>
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-1 text-balance">
                <T>Milestone Sejarah SMP Al Fakhir</T>
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant md:max-w-md">
              <T>Perjalanan SMP Islam Modern Al Fakhir sejak berdiri pada Oktober 2023 hingga prestasi dan program terbarunya.</T>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="font-headline-md text-headline-md text-secondary-container">
                  <T>Okt 2023</T>
                </span>
                <h4 className="font-headline-sm text-[17px] font-bold text-primary mt-2 text-balance">
                  <T>Pendirian Sekolah</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>SMP Islam Modern Al Fakhir didirikan oleh Bpk. Deni Irawan, M.Pd pada bulan Oktober 2023.</T>
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container text-caption text-on-surface-variant flex items-start gap-1.5 font-medium md:min-h-[3.75rem]">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  location_city
                </span>
                {" "}<T>Sawangan, Depok</T>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="font-headline-md text-headline-md text-primary">
                  <T>Jul 2024</T>
                </span>
                <h4 className="font-headline-sm text-[17px] font-bold text-primary mt-2 text-balance">
                  <T>Angkatan Pertama &amp; AEP</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Al Fakhir Enrichment Program (AEP) perdana digelar 15–19 Juli 2024 untuk menyambut angkatan pertama siswa-siswi.</T>
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container text-caption text-on-surface-variant flex items-start gap-1.5 font-medium md:min-h-[3.75rem]">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  school
                </span>
                {" "}<T>Orientasi Siswa Baru</T>
              </div>
            </div>
            <div className="bg-primary text-on-primary p-6 rounded-2xl shadow-md flex flex-col justify-between">
              <div>
                <span className="font-headline-md text-headline-md text-tertiary-fixed">
                  <T>2024–25</T>
                </span>
                <h4 className="font-headline-sm text-[17px] font-bold text-surface-container-lowest mt-2 text-balance">
                  <T>Medali Sains Nasional</T>
                </h4>
                <p className="font-body-sm text-body-sm text-primary-fixed leading-relaxed mt-2">
                  <T>Medali perak NSIF 2024 (Denpasar, November 2024) dan medali silver IIF 2025 (Maret 2025) di ajang sains dan inovasi.</T>
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-primary-container text-caption text-tertiary-fixed flex items-start gap-1.5 font-bold md:min-h-[3.75rem]">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
                {" "}<T>Perak &amp; Silver</T>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="font-headline-md text-headline-md text-secondary-container">
                  <T>2025</T>
                </span>
                <h4 className="font-headline-sm text-[17px] font-bold text-primary mt-2 text-balance">
                  <T>Tahfidz &amp; OSIS Perdana</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Wisuda Tahfidz Juz 30 (22 Mei 2025) dan pemilihan Ketua &amp; Wakil OSIS pertama kali pada 8 Agustus 2025.</T>
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container text-caption text-on-surface-variant flex items-start gap-1.5 font-medium md:min-h-[3.75rem]">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  menu_book
                </span>
                {" "}<T>Qur&apos;an &amp; Kepemimpinan</T>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between sm:col-span-2 xl:col-span-1">
              <div>
                <span className="font-headline-md text-headline-md text-primary">
                  <T>Nov 2025</T>
                </span>
                <h4 className="font-headline-sm text-[17px] font-bold text-primary mt-2 text-balance">
                  <T>ISIF Emas &amp; Visitasi</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Medali emas ISIF 2025 di Bali (11–16 November) dan visitasi akreditasi oleh dua asesor pada 17–18 November 2025.</T>
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container text-caption text-on-surface-variant flex items-start gap-1.5 font-medium md:min-h-[3.75rem]">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  fact_check
                </span>
                {" "}<T>Visitasi Akreditasi</T>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StaffSection
        people={staff.smp}
        className="bg-surface-container-lowest"
        eyebrow={<T>Pendidik Berakhlak &amp; Berwawasan Luas</T>}
        title={<T>Dewan Pimpinan &amp; Jajaran Guru</T>}
        lead={<T>Dipimpin Ketua Yayasan Deni Irawan, M.Pd dan Kepala Sekolah Denny Rahmat, bersama jajaran guru dan staf yang mendampingi siswa-siswi dalam pendidikan karakter, tahfiz, dan riset.</T>}
      />
      <StudentSection students={students.smp} className="bg-surface" eyebrow={<T>Profil &amp; Prestasi Siswa</T>} title={<T>Cendekiawan Muda SMP Al Fakhir</T>} lead={<T>Potret siswa-siswi periset, pembelajar Al-Qur&apos;an, dan peraih medali kompetisi sains nasional &amp; internasional.</T>} />
      <section className="w-full py-space-xl bg-surface-container-low" id="fasilitas">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div className="max-w-2xl">
              <span className="font-caption text-caption uppercase tracking-wider text-secondary font-bold">
                <T>Infrastruktur Riset &amp; Ekosistem Pembelajaran</T>
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-1 text-balance">
                <T>Fasilitas Sawangan, Depok</T>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                <T>Area sekolah di Sawangan, Depok dikelilingi pepohonan sehingga terasa sejuk dan nyaman, dengan fasilitas untuk belajar, ibadah, dan olahraga.</T>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="font-label-md text-label-md px-4 py-2 rounded-full bg-surface-container text-primary font-bold inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                {" "}<T>Dikelilingi Pepohonan</T>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-52 w-full">
                <Img className="w-full h-full object-cover" src="/design/profil-smp/08.jpg" alt="Laboratorium IPA SMP Islam Modern Al Fakhir." />
                <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold">
                  <T>Lab IPA</T>
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-headline-sm text-[18px] font-bold text-primary">
                  <T>Laboratorium IPA (Sains)</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Laboratorium sains untuk praktik IPA dan pembelajaran sains bagi siswa-siswi SMP Al Fakhir.</T>
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-52 w-full">
                <Img className="w-full h-full object-cover" src="/design/profil-smp/09.jpg" alt="Lab Komputer SMP Islam Modern Al Fakhir." />
                <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-secondary font-caption text-caption px-2.5 py-1 rounded-full font-bold">
                  <T>Digital</T>
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-headline-sm text-[18px] font-bold text-primary">
                  <T>Lab Komputer &amp; Multimedia</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Lab Komputer dan Ruang Multimedia menunjang pembelajaran digital; siswa baru juga menerima tablet belajar.</T>
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-52 w-full">
                <Img className="w-full h-full object-cover" src="/photos/musala.jpg" alt="Mushola SMP Islam Modern Al Fakhir" />
                <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-tertiary font-caption text-caption px-2.5 py-1 rounded-full font-bold">
                  <T>Pusat Ruhaniyah</T>
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-headline-sm text-[18px] font-bold text-primary">
                  <T>Mushola Sekolah</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Sarana ibadah untuk salat Dhuha rutin dan pembiasaan ibadah, mendukung program tahsin, tahfiz, dan murajaah siswa-siswi.</T>
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-52 w-full">
                <Img className="w-full h-full object-cover" src="/design/profil-smp/11.jpg" alt="Perpustakaan SMP Islam Modern Al Fakhir." />
                <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold">
                  <T>Literasi</T>
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-headline-sm text-[18px] font-bold text-primary">
                  <T>Perpustakaan Sekolah</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Ruang baca untuk menumbuhkan budaya literasi; literasi juga menjadi bagian dari Al Fakhir Enrichment Program (AEP).</T>
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-52 w-full">
                <Img className="w-full h-full object-cover" src="/photos/aula.jpg" alt="Aula SMP Islam Modern Al Fakhir" />
                <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-secondary font-caption text-caption px-2.5 py-1 rounded-full font-bold">
                  <T>Aula</T>
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-headline-sm text-[18px] font-bold text-primary">
                  <T>Auditorium / Aula</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Ruang acara sekolah, antara lain pembukaan observasi PPDB, penampilan seni, dan hafalan Al-Qur&apos;an siswa-siswi.</T>
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-52 w-full">
                <Img className="w-full h-full object-cover" src="/photos/pool.jpg" alt="Kolam renang SMP Islam Modern Al Fakhir" />
                <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold">
                  <T>Olahraga</T>
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-headline-sm text-[18px] font-bold text-primary">
                  <T>Lapangan &amp; Kolam Renang</T>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  <T>Lapangan Utama dan Secondary untuk apel, upacara, dan ekskul, ditambah kolam renang serta sarana olahraga.</T>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="p-8 md:p-12 rounded-3xl bg-surface-container-low shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">
                    verified
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">
                  <T>Naungan, Kurikulum &amp; Akreditasi</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>SMP Islam Modern Al Fakhir berada di bawah naungan Yayasan Prestasi Belia Indonesia dan menerapkan Kurikulum Merdeka.</T>
                </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-caption text-caption uppercase text-secondary font-bold">
                      <T>Penyelenggara</T>
                    </span>
                    <p className="font-headline-sm text-headline-sm text-primary mt-1">
                      <T>Yayasan Prestasi Belia Indonesia</T>
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      <T>Ketua Yayasan: Deni Irawan, M.Pd, pendiri SMP Islam Modern Al Fakhir (Oktober 2023)</T>
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container flex items-center gap-1.5 text-caption text-primary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                    {" "}<T>Pendiri &amp; Ketua Yayasan</T>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-caption text-caption uppercase text-tertiary-container font-bold">
                      <T>Akreditasi</T>
                    </span>
                    <p className="font-headline-sm text-headline-sm text-primary mt-1">
                      <T>Visitasi 17–18 November 2025</T>
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      <T>Visitasi akreditasi oleh dua asesor: wawancara guru, kepala sekolah, pimpinan, dan yayasan, serta telaah dokumen</T>
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container flex items-center gap-1.5 text-caption text-primary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">
                      verified
                    </span>
                    {" "}<T>Wawancara &amp; Telaah Dokumen</T>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-caption text-caption uppercase text-secondary font-bold">
                      <T>Kurikulum</T>
                    </span>
                    <p className="font-headline-sm text-headline-sm text-primary mt-1">
                      <T>Kurikulum Merdeka</T>
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      <T>Implementasi dibahas dalam kunjungan Pengawas Sekolah dan tim Pembinaan Kombel pada 9 Mei 2025</T>
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container flex items-center gap-1.5 text-caption text-primary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">
                      fact_check
                    </span>
                    {" "}<T>Kunjungan Pengawas Sekolah</T>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-caption text-caption uppercase text-tertiary-container font-bold">
                      <T>Mitra Kegiatan</T>
                    </span>
                    <p className="font-headline-sm text-headline-sm text-primary mt-1">
                      <T>IYSA</T>
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      <T>Indonesian Young Scientist Association, mitra dalam Gebyar Ramadhan dan upacara HUT RI bersama Al Fakhir</T>
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container flex items-center gap-1.5 text-caption text-primary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">
                      handshake
                    </span>
                    {" "}<T>Kolaborasi Al Fakhir x IYSA</T>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary py-space-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl">
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl text-center lg:text-left">
              <span className="font-caption text-caption text-tertiary-fixed uppercase tracking-wider font-bold">
                <T>Langkah Awal Masa Depan Cemerlang</T>
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-surface-container-lowest mt-1 tracking-tight text-balance">
                <T>Ingin Melihat Langsung Atmosfer Belajar &amp; Kehidupan Siswa di Sekolah Kami?</T>
              </h2>
              <p className="font-body-lg text-body-lg text-primary-fixed leading-relaxed mt-3 text-pretty">
                <T>Kunjungi sekolah kami di Sawangan, Depok, kenali lingkungan dan program belajarnya, dan tanyakan seputar pendaftaran putra-putri Anda kepada tim kami.</T>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
              <SiteLink href="/smp/kontak" className="w-full sm:w-auto px-6 py-4 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg uppercase tracking-wide font-bold hover:bg-surface-container-low transition-all shadow-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  calendar_month
                </span>
                <span>
                  <T>Jadwalkan Kunjungan (Tour)</T>
                </span>
              </SiteLink>
              <a href={waLinkFor(contact, "Assalamu'alaikum, saya ingin bertanya tentang SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-4 rounded-full bg-secondary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wide font-bold hover:bg-secondary transition-all shadow-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  support_agent
                </span>
                <span>
                  <T>Hubungi Tim SMP</T>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    </Scope>
  );
}
