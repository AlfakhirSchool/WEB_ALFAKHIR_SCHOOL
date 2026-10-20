"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { waLinkFor } from "@/content/settings";
import { useSettings } from "@/components/content/ContentProvider";
import { T } from "@/components/content/T";
import { sendLead } from "@/lib/lead";

const input =
  "w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary";
const SESI = ["Pagi (09.00 - 11.00 WIB)", "Siang (13.30 - 15.30 WIB)"];

export default function VisitModal() {
  const { contact } = useSettings();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [sesi, setSesi] = useState(SESI[0]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-surface-container-lowest text-primary hover:bg-surface-container px-8 py-4 rounded-full font-label-lg text-label-lg font-bold transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
        <span><T>Jadwalkan Kunjungan Offline</T></span>
      </button>
      {mounted && open && createPortal(
        <div
          data-site="smp"
          className="fixed inset-0 z-[100] font-body-md text-on-surface bg-on-surface/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[24px]">event_available</span>
                <h3 className="font-headline-sm text-headline-sm font-bold"><T>Jadwalkan Kunjungan Sekolah</T></h3>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Tutup" className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant"><T>Pilih tanggal kunjungan untuk school tour, konsultasi program belajar &amp; tahfiz, serta mengenal kegiatan siswa Al Fakhir.</T></p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const body = `Halo Tim PPDB SMP Al Fakhir, saya ingin menjadwalkan kunjungan sekolah.\nNama Orang Tua/Wali Calon Siswa: ${nama}\nNomor WhatsApp: ${wa}\nRencana Tanggal: ${tanggal}\nPilihan Sesi: ${sesi}`;
                sendLead("smp-ppdb-visit", { nama, wa, tanggal, sesi });
                window.open(waLinkFor(contact, body, "smp"), "_blank", "noopener,noreferrer");
                setOpen(false);
              }}
            >
              <div>
                <label className="font-label-md text-label-md text-primary font-bold block mb-1"><T>Nama Orang Tua/Wali Calon Siswa</T></label>
                <input className={input} placeholder="Nama lengkap orang tua/wali" required type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
              <div>
                <label className="font-label-md text-label-md text-primary font-bold block mb-1"><T>Nomor WhatsApp Aktif</T></label>
                <input className={input} placeholder="0812xxxxxxx" required type="tel" value={wa} onChange={(e) => setWa(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-md text-label-md text-primary font-bold block mb-1"><T>Rencana Tanggal</T></label>
                  <input className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary" required type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                </div>
                <div>
                  <label className="font-label-md text-label-md text-primary font-bold block mb-1"><T>Pilihan Sesi</T></label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary" value={sesi} onChange={(e) => setSesi(e.target.value)}>
                    {SESI.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button className="mt-2 bg-primary text-on-primary py-3 rounded-full font-label-lg text-label-lg font-bold hover:bg-primary-container transition-colors shadow" type="submit"><T>Konfirmasi Kunjungan Sekolah</T></button>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
