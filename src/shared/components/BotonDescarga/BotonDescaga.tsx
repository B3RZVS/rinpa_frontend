import { useEffect, useState } from "react";
import styles from "./BotonDescarga.module.css";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const BotonDescarga = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica si ya está instalada
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      return; // No mostramos nada
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); //toma el evento de descarga
      const installPrompt = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installPrompt);
      setIsVisible(true); //hacce visible el boton si el navegador permite la descarga
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    const promptEvent = deferredPrompt;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;

    console.log(`El usuario eligió: ${outcome}`);

    // Limpiamos estado
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;
  const onClose = () => {
    setIsVisible(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Descargar Gestion De Entregas</h1>
        <h2>Mejora tu acceso a la aplicación</h2>
        <div className={styles.contImg}>
          <img src="/logo/RinpaLogo.jpeg" alt="logo" />
        </div>
        <div className={styles.contentButton}>
          <button
            onClick={() => onClose()}
            className={`${styles.botonDescarga} ${styles.cancelar}`}
          >
            Cancelar
          </button>
          <button
            onClick={handleInstallClick}
            className={`${styles.botonDescarga} ${styles.aceptar}`}
          >
            Descargar App
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotonDescarga;
