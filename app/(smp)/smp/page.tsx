import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Img } from "@/components/content/Img";

export const metadata = { title: "SMP Islam Modern Al Fakhir" };

export default async function SmpHomePage() {
  const { contact } = await getSettings();
  return (
    <Scope id="smp/home">
    <div className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)] -mb-space-xl">
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden bg-surface-bright py-space-lg md:py-space-xl">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none">
        </div>
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none">
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-start sm:items-center gap-2 bg-surface-container-high px-3.5 py-2 sm:py-1.5 rounded-2xl sm:rounded-full mb-space-md shadow-sm">
                <svg className="w-4 h-4 shrink-0 mt-px sm:mt-0 text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.4 7.6L20 8L16 12.4L17.2 18L12 15.2L6.8 18L8 12.4L4 8L9.6 7.6L12 2Z">
                  </path>
                </svg>
                <span className="font-label-md text-label-md text-primary font-semibold tracking-wide leading-snug">
                  <T>MODERN ISLAMIC EDUCATION · TAHFIZ • RESEARCH • CHARACTER BUILDING</T>
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight mb-space-md leading-tight text-balance">
                <T>Membentuk Generasi</T>{" "}
                <span className="text-primary font-extrabold">
                  <T>Islami Modern</T>
                </span>
                <T>, Berakhlak Baik, &amp; Berpengetahuan Luas.</T>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-lg max-w-2xl text-pretty">
                <T>SMP Islam yang mengusung konsep modern, mengadopsi model kelas dan program internasional, namun tetap mengutamakan pendidikan karakter, moral, akhlak dan nilai-nilai keislaman.</T>
              </p>
              <div className="grid w-full sm:w-fit gap-3 mb-space-lg">
                <SiteLink href="/smp/ppdb" className="block bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg px-6 sm:px-7 py-3.5 rounded-full shadow-md transition-all duration-300 text-center">
                  <span className="text-balance">
                    <T>Daftar PPDB Online</T>{" "}
                    <span className="whitespace-nowrap">
                      <T>SMP Al Fakhir</T>
                      <span className="material-symbols-outlined text-[18px] align-middle ml-2">
                        arrow_forward
                      </span>
                    </span>
                  </span>
                </SiteLink>
                <SiteLink href="/smp/akademik" className="block bg-surface-container-lowest text-primary hover:bg-surface-container font-label-lg text-label-lg px-6 sm:px-7 py-3.5 rounded-full shadow-sm transition-all duration-300 text-center">
                  <span className="text-balance">
                    <span className="whitespace-nowrap">
                      <span className="material-symbols-outlined text-[18px] align-middle mr-2">
                        menu_book
                      </span>
                      <T>Lihat</T>
                    </span>{" "}
                    <T>Kurikulum &amp; Program Sekolah</T>
                  </span>
                </SiteLink>
              </div>
              <div className="w-full pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full sm:w-fit">
                  <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[16px]">
                      verified
                    </span>
                    <span className="font-caption text-caption text-on-surface font-semibold">
                      <T>Medali Emas ISIF 2025 Bali</T>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-tertiary text-[16px]">
                      grade
                    </span>
                    <span className="font-caption text-caption text-on-surface font-semibold">
                      <T>Visitasi Akreditasi Nov 2025</T>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      menu_book
                    </span>
                    <span className="font-caption text-caption text-on-surface font-semibold">
                      <T>Tahsin &amp; Tahfiz Al-Qur&apos;an</T>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[16px]">
                      language
                    </span>
                    <span className="font-caption text-caption text-on-surface font-semibold">
                      <T>International Program</T>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <div className="relative bg-surface-container-lowest rounded-2xl p-3 shadow-xl">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-surface-container">
                  <Img className="w-full h-full object-cover" src="/photos/halaman-dalam.jpg" alt="Halaman dalam gedung SMP Islam Modern Al Fakhir, Sawangan, Depok" />
                  <div className="absolute top-12 left-4 right-4 flex justify-between items-start pointer-events-none">
                    <span className="bg-primary/90 backdrop-blur-md text-on-primary font-caption text-caption uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      <T>Sawangan, Depok</T>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        biotech
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-7 -right-3 sm:-right-6 bg-surface-container-lowest rounded-xl p-3 shadow-lg max-w-[270px]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        military_tech
                      </span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-bold leading-tight">
                        <T>Medali Emas</T>
                      </p>
                      <p className="font-caption text-caption text-on-surface-variant leading-snug">
                        <T>International Science Innovation Fair 2025</T>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-primary text-on-primary rounded-xl p-3 shadow-xl max-w-[260px]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-tertiary-fixed shrink-0">
                      <span className="material-symbols-outlined text-[18px]">
                        workspace_premium
                      </span>
                    </div>
                    <div>
                      <p className="font-caption text-caption text-tertiary-fixed font-bold tracking-wide uppercase">
                        <T>Kurikulum Nasional</T>
                      </p>
                      <p className="font-label-md text-label-md text-surface-container-lowest font-medium leading-tight">
                        <T>Kurikulum Merdeka</T>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-container-low py-space-xl relative">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col items-center text-center mb-space-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md mb-3">
              <span className="material-symbols-outlined text-[16px]">
                stars
              </span>
              <span>
                <T>EMPAT PILAR MISI SEKOLAH</T>
              </span>
            </div>
            <h2 className="font-headline-md text-2xl md:text-headline-md font-bold text-on-surface tracking-tight mb-3 max-w-3xl text-balance">
              <T>Misi Al Fakhir: Ibadah, Akhlak, Al-Qur&apos;an, &amp; Nalar Kritis</T>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl text-pretty">
              <T>Terwujudnya pendidikan yang bermutu tinggi dalam membentuk siswa-siswi yang berakhlak, modern, dan menjadi kebanggaan orang tua, masyarakat, bangsa dan negara.</T>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[24px]">
                    mosque
                  </span>
                </div>
                <span className="font-caption text-caption uppercase text-tertiary font-bold tracking-wider">
                  <T>Pilar I</T>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-3">
                  <T>Beribadah dengan Benar</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Pembiasaan ibadah sejak dini lewat Salat Dhuha rutin, murajaah, Pesantren Kilat Ramadhan, Tarhib Ramadhan, serta peringatan hari besar Islam di sekolah.</T>
                </p>
              </div>
              <div className="mt-6 pt-4 md:min-h-[3.5rem] flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-px">
                  task_alt
                </span>
                <span className="font-caption text-caption text-primary font-semibold">
                  <T>Salat Dhuha Rutin</T>
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[24px]">
                    volunteer_activism
                  </span>
                </div>
                <span className="font-caption text-caption uppercase text-secondary font-bold tracking-wider">
                  <T>Pilar II</T>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-3">
                  <T>Berakhlak Mulia</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Karakter dan adab dikuatkan lewat Deklarasi Anti-Bullying, LDKS, organisasi OSIS, serta pembiasaan nilai Islami dalam keseharian siswa.</T>
                </p>
              </div>
              <div className="mt-6 pt-4 md:min-h-[3.5rem] flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-px">
                  task_alt
                </span>
                <span className="font-caption text-caption text-primary font-semibold">
                  <T>Deklarasi Anti-Bullying</T>
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[24px]">
                    menu_book
                  </span>
                </div>
                <span className="font-caption text-caption uppercase text-tertiary font-bold tracking-wider">
                  <T>Pilar III</T>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-3">
                  <T>Cinta Al-Qur&apos;an</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Pembelajaran Tahsin (tajwid &amp; makhraj) dan Tahfiz Al-Qur&apos;an yang terstruktur menjadi bagian integral kurikulum, termasuk Wisuda Tahfidz Juz 30.</T>
                </p>
              </div>
              <div className="mt-6 pt-4 md:min-h-[3.5rem] flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-px">
                  task_alt
                </span>
                <span className="font-caption text-caption text-primary font-semibold">
                  <T>Wisuda Tahfidz Juz 30</T>
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[24px]">
                    science
                  </span>
                </div>
                <span className="font-caption text-caption uppercase text-tertiary-fixed-dim font-bold tracking-wider">
                  <T>Pilar IV</T>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-3">
                  <T>Berfikir Kritis &amp; Kreatif</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <T>Research Class, Research Contest kelas 8, dan P5 melatih siswa meneliti, berpikir kritis, dan berkarya; sebagian karya diikutkan ke NSIF, IIF, dan ISIF.</T>
                </p>
              </div>
              <div className="mt-6 pt-4 md:min-h-[3.5rem] flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-px">
                  task_alt
                </span>
                <span className="font-caption text-caption text-primary font-semibold">
                  <T>Research Contest Kelas 8</T>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-bright py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-space-lg gap-4">
            <div>
              <span className="font-label-md text-label-md uppercase text-primary font-bold tracking-wider">
                <T>Sinergi Tiga Matra</T>
              </span>
              <h2 className="font-headline-md text-2xl md:text-headline-md font-bold text-on-surface tracking-tight mt-1 text-balance">
                <T>Sumbu Kurikulum SMP Al Fakhir</T>
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl lg:max-w-md text-pretty">
              <T>Kurikulum nasional, model kelas dan program internasional, serta pembinaan keislaman sebagai ciri SMP Islam dengan konsep modern.</T>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-surface-container-high text-primary px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                    <T>Kemendikbudristek</T>
                  </span>
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    school
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 lg:min-h-[3.5rem]">
                  <T>Kurikulum Merdeka</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                  <T>Pembelajaran mengikuti Kurikulum Merdeka dengan pembinaan dari pengawas sekolah, serta pembelajaran digital berbantuan tablet belajar dan LMS.</T>
                </p>
                <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>Pembelajaran digital: tablet belajar &amp; LMS sekolah</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>Penilaian Siswa Akhir Semester (PSAS) tiap semester</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>Projek Penguatan Profil Pelajar Pancasila (P5) bertema Bhinneka Tunggal Ika</T>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-0.5">
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  <T>Target Luaran:</T>
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  <T>Siswa Berakhlak, Modern, &amp; Membanggakan</T>
                </span>
              </div>
            </div>
            <div className="bg-surface-container rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-xl">
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                    <T>Program Internasional</T>
                  </span>
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    language
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 lg:min-h-[3.5rem]">
                  <T>Model Kelas &amp; Program Internasional</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                  <T>Mengadopsi model kelas dan program internasional untuk memperluas wawasan siswa, termasuk keikutsertaan di ajang sains dan inovasi nasional maupun internasional.</T>
                </p>
                <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>NSIF 2024 Denpasar: medali perak</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>IIF 2025: medali silver &bull; ISIF 2025 Bali: medali emas</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>Sesi budaya bersama tamu dari Jepang (November 2025)</T>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 bg-surface-container-lowest rounded-xl p-3.5 flex flex-col gap-0.5 shadow-sm">
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  <T>Capaian Sains:</T>
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  <T>3 Medali Nasional &amp; Internasional</T>
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-tertiary-fixed text-tertiary px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                    <T>Pembinaan Qur&apos;ani</T>
                  </span>
                  <span className="material-symbols-outlined text-tertiary text-[22px]">
                    auto_stories
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 lg:min-h-[3.5rem]">
                  <T>Pembinaan Keislaman &amp; Tahfiz</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                  <T>Menanamkan kebiasaan ibadah, kecintaan pada Al-Qur&apos;an, dan akhlak mulia lewat pembelajaran Tahsin–Tahfiz serta kegiatan keagamaan sepanjang tahun.</T>
                </p>
                <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>Tahsin: tajwid &amp; makhraj bacaan Al-Qur&apos;an</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>Tahfiz terstruktur dengan Wisuda Tahfidz Juz 30</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <T>Salat Dhuha, murajaah, &amp; Pesantren Kilat Ramadhan</T>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-0.5">
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  <T>Target Capaian:</T>
                </span>
                <span className="font-label-md text-label-md text-tertiary font-bold">
                  <T>Siswa Cinta Al-Qur&apos;an</T>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-space-lg">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md mb-2">
                <span className="material-symbols-outlined text-[16px]">
                  biotech
                </span>
                <span>
                  <T>RESEARCH &amp; INNOVATION</T>
                </span>
              </div>
              <h2 className="font-headline-md text-2xl md:text-headline-md font-bold text-on-surface tracking-tight mb-3 text-balance">
                <T>Riset Nyata: Dari Ide Menjadi Karya Ilmiah</T>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl text-pretty">
                <T>Siswa SMP Al Fakhir belajar metodologi penelitian, mengumpulkan dan menganalisis data, menyusun laporan, lalu mempresentasikannya di Research Contest dan ajang inovasi.</T>
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <SiteLink href="/smp/kesiswaan" className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg px-5 py-2.5 rounded-full shadow-sm hover:bg-primary-container transition-all">
                <span>
                  <T>Lihat Kegiatan Siswa</T>
                </span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </SiteLink>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[22px]">
                  microbiology
                </span>
              </div>
              <h4 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface mb-1.5">
                <T>Lab IPA</T>
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Laboratorium Sains tempat siswa praktikum dan menyiapkan karya ilmiah untuk Research Class.</T>
              </p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[22px]">
                  precision_manufacturing
                </span>
              </div>
              <h4 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface mb-1.5">
                <T>Lab Komputer</T>
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Mendukung pembelajaran digital; siswa baru juga mendapat tablet belajar dan memakai LMS sekolah.</T>
              </p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[22px]">
                  local_library
                </span>
              </div>
              <h4 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface mb-1.5">
                <T>Perpustakaan</T>
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Perpustakaan sekolah untuk literasi dan referensi riset, dengan program literasi bersama Duta Baca Kota Depok.</T>
              </p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[22px]">
                  groups
                </span>
              </div>
              <h4 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface mb-1.5">
                <T>Aula &amp; Auditorium</T>
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Ruang sidang karya ilmiah Research Contest, debat kandidat OSIS, pembagian rapor, dan berbagai acara sekolah.</T>
              </p>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 lg:p-8 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-surface-container">
                  <Img className="w-full h-full object-cover" src="/photos/news/medali-silver-di-invention-and-innovation-fair-2025.webp" alt="Tim siswa SMP Islam Modern Al Fakhir meraih medali silver Invention and Innovation Fair 2025" />
                  <div className="absolute bottom-3 left-3 bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-caption text-caption px-3 py-1 rounded-full">
                    <T>Karya Ilmiah Siswa</T>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                  <span className="bg-secondary-fixed text-secondary font-label-md text-label-md px-3 py-1 rounded-2xl sm:rounded-full font-bold leading-snug">
                    <T>Medali Silver IIF 2025</T>
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    <T>Invention and Innovation Fair</T>
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
                  <T>&quot;Potensi Buah Bit (Beta Vulgaris) sebagai Alternatif Alami untuk Mengatasi Hiperpigmentasi Bibir&quot;</T>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed text-pretty">
                  <T>Karya ilmiah tim siswa SMP Islam Modern Al Fakhir yang dipresentasikan secara daring pada ajang nasional Invention and Innovation Fair (IIF) 2025, 10–12 Maret 2025, dan meraih medali silver.</T>
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-on-surface-variant font-caption text-caption">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      person
                    </span>
                    <T>Tim Peneliti: 6 siswa</T>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      badge
                    </span>
                    <T>Ajang: IIF 2025 (daring)</T>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      timer
                    </span>
                    <T>Tingkat: Nasional</T>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-bright py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="bg-primary text-on-primary rounded-2xl p-6 sm:p-8 mb-space-lg shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="font-display-hero text-headline-lg lg:text-display-hero text-tertiary-fixed font-black">
                  <T>3</T>
                </span>
                <p className="font-label-md text-label-md text-surface-container-lowest mt-1 max-w-[11rem] text-balance">
                  <T>Medali Sains &amp; Inovasi (NSIF, IIF, ISIF)</T>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-hero text-headline-lg lg:text-display-hero text-surface-container-lowest font-black">
                  <T>33</T>
                </span>
                <p className="font-label-md text-label-md text-surface-container-lowest mt-1 max-w-[11rem] text-balance">
                  <T>Siswa Kelas 8 Tampil di Research Contest 2025</T>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-hero text-headline-lg lg:text-display-hero text-tertiary-fixed font-black">
                  <T>8</T>
                </span>
                <p className="font-label-md text-label-md text-surface-container-lowest mt-1 max-w-[11rem] text-balance">
                  <T>Ekskul Dikenalkan Saat AEP 2025</T>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-hero text-headline-lg lg:text-display-hero text-surface-container-lowest font-black">
                  <T>2023</T>
                </span>
                <p className="font-label-md text-label-md text-surface-container-lowest mt-1 max-w-[11rem] text-balance">
                  <T>Tahun Berdiri (Oktober 2023)</T>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5">
              <span className="font-label-md text-label-md uppercase text-secondary font-bold tracking-wider">
                <T>Testimoni Resmi</T>
              </span>
              <h2 className="font-headline-md text-2xl md:text-headline-md font-bold text-on-surface tracking-tight mt-1 mb-4 text-balance">
                <T>Apresiasi dari Dinas Pendidikan Kota Depok</T>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-pretty">
                <T>Kepala Dinas Pendidikan Kota Depok dan Pengawas Sekolah memberikan testimoni video untuk SMP Islam Modern Al Fakhir, yang dapat ditonton di kanal YouTube Al Fakhir.</T>
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm relative">
                <span className="material-symbols-outlined text-[48px] text-primary/10 absolute top-6 right-6">
                  format_quote
                </span>
                <p className="font-body-lg text-base sm:text-body-lg text-on-surface italic mb-6 leading-relaxed text-pretty">
                  <T>&quot;Al Fakhir, Luar Biasa!&quot;</T>
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden bg-surface-container">
                    <Img className="w-full h-full object-cover" src="/photos/news/testimoni-kepala-dinas-pendidikan-kota-depok.webp" alt="Testimoni Kepala Dinas Pendidikan Kota Depok untuk SMP Islam Modern Al Fakhir" />
                  </div>
                  <div>
                    <h5 className="font-subheading text-subheading text-on-surface leading-tight font-bold">
                      <T>Hj. Siti Chaerijah Aurijah, S.Pd., MM</T>
                    </h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      <T>Kepala Dinas Pendidikan Kota Depok (testimoni video untuk Al Fakhir)</T>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-container py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 lg:p-12 shadow-md">
            <div className="text-center max-w-3xl mx-auto mb-space-lg">
              <span className="inline-block bg-secondary-fixed text-secondary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold mb-3">
                <T>PPDB SMP ISLAM MODERN AL FAKHIR</T>
              </span>
              <h2 className="font-headline-md text-2xl md:text-headline-md font-bold text-on-surface tracking-tight mb-3 text-balance">
                <T>Penerimaan Peserta Didik Baru (PPDB) SMP Al Fakhir</T>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant text-pretty">
                <T>Pendaftaran dilakukan secara online, dilanjutkan observasi calon siswa dan wawancara orang tua oleh tim guru.</T>
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-space-lg">
              <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-md text-label-md font-bold text-primary">
                      <T>TAHAP 1</T>
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      assignment
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2 lg:min-h-[3.5rem]">
                    <T>Pendaftaran Online</T>
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    <T>Orang tua mengisi formulir pendaftaran online di situs sekolah: nama lengkap, no. HP, jenis kelamin, tempat dan tanggal lahir, NIK, serta NISN.</T>
                  </p>
                </div>
                <div className="mt-6 pt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 font-caption text-caption text-on-surface-variant">
                  <span>
                    <T>Formulir:</T>
                  </span>
                  <span className="font-bold text-on-surface whitespace-nowrap">
                    <T>Online</T>
                  </span>
                </div>
              </div>
              <div className="bg-primary text-on-primary rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-md text-label-md font-bold text-tertiary-fixed">
                      <T>TAHAP 2</T>
                    </span>
                    <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
                      workspace_premium
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-surface-container-lowest mb-2 lg:min-h-[3.5rem]">
                    <T>Observasi &amp; Wawancara</T>
                  </h4>
                  <p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed">
                    <T>Calon siswa mengerjakan soal observasi sebagai pemetaan kemampuan awal, sementara orang tua diwawancarai tim guru untuk menyamakan persepsi nilai sekolah.</T>
                  </p>
                </div>
                <div className="mt-6 pt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 font-caption text-caption text-primary-fixed">
                  <span>
                    <T>Dilaksanakan:</T>
                  </span>
                  <span className="font-bold text-tertiary-fixed whitespace-nowrap">
                    <T>Per Gelombang</T>
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-md text-label-md font-bold text-secondary">
                      <T>TAHAP 3</T>
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      family_restroom
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2 lg:min-h-[3.5rem]">
                    <T>Pengumuman &amp; Seragam</T>
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    <T>Hasil observasi diumumkan di situs resmi sekolah pada menu PPDB, dan calon siswa mengukur seragam sekolah.</T>
                  </p>
                </div>
                <div className="mt-6 pt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 font-caption text-caption text-on-surface-variant">
                  <span>
                    <T>Pengumuman:</T>
                  </span>
                  <span className="font-bold text-on-surface whitespace-nowrap">
                    <T>Situs Sekolah</T>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-surface-container-high rounded-xl p-4 gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px] shrink-0">
                  info
                </span>
                <p className="font-body-sm text-body-sm text-on-surface">
                  <strong>
                    <T>Info Lengkap:</T>
                  </strong>
                  {" "}<T>Tanyakan biaya, jadwal gelombang, dan persyaratan langsung kepada panitia PPDB melalui WhatsApp atau kunjungi sekolah.</T>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 w-full lg:w-auto">
                <SiteLink href="/smp/ppdb" className="flex-1 lg:flex-none inline-flex items-center justify-center whitespace-nowrap text-center bg-primary text-on-primary font-label-lg text-label-lg px-6 py-2.5 rounded-full hover:bg-primary-container transition-all">
                  <T>Daftar PPDB Online</T>
                </SiteLink>
                <SiteLink href="/smp/kontak" className="flex-1 lg:flex-none inline-flex items-center justify-center whitespace-nowrap text-center bg-surface-container-lowest text-primary font-label-lg text-label-lg px-6 py-2.5 rounded-full hover:bg-surface transition-all">
                  <T>Jadwal Kunjungan Sekolah</T>
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-primary py-space-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-primary pointer-events-none">
        </div>
        <div className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin text-on-primary">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-tertiary flex items-center justify-center text-tertiary-fixed shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[32px]">
                  support_agent
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest font-bold text-balance">
                  <T>Konsultasikan Pendidikan Terbaik untuk Putra-Putri Anda</T>
                </h3>
                <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-1 text-pretty">
                  <T>Hubungi SMP Al Fakhir via WhatsApp resmi atau kunjungi sekolah kami di Sawangan, Depok.</T>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 w-full lg:w-auto">
              <a href={waLinkFor(contact, "Assalamu'alaikum, saya ingin bertanya mengenai SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-surface-container-lowest text-primary hover:bg-surface-container-low font-label-lg text-label-lg px-6 py-3 rounded-full font-bold shadow-md transition-all">
                <span className="material-symbols-outlined text-[18px]">
                  chat
                </span>
                <span>
                  <T>Tanya via WhatsApp</T>
                </span>
              </a>
              <SiteLink href="/smp/kontak" className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg px-6 py-3 rounded-full transition-all">
                <span>
                  <T>Lokasi Sekolah</T>
                </span>
                <span className="material-symbols-outlined text-[16px]">
                  location_on
                </span>
              </SiteLink>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    </Scope>
  );
}
