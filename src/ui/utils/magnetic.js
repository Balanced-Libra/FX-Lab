/**
 * Magnetic thumb effect for cards
 * Creates a magnetic hover effect on card thumbnails
 */
function addMagneticThumbEffect(card) {
  const thumb = card.querySelector('.thumb');
  if (!thumb) return;

  const onMove = (e) => {
    const rect = thumb.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    thumb.style.setProperty('--thumb-mx', `${xPercent}%`);
    thumb.style.setProperty('--thumb-my', `${yPercent}%`);

    const maxTilt = 12;
    const dx = ((x / rect.width) - 0.5) * maxTilt;
    const dy = ((y / rect.height) - 0.5) * maxTilt;

    thumb.style.setProperty('--thumb-dx', `${dx.toFixed(1)}px`);
    thumb.style.setProperty('--thumb-dy', `${dy.toFixed(1)}px`);
  };

  const onLeave = () => {
    thumb.style.removeProperty('--thumb-mx');
    thumb.style.removeProperty('--thumb-my');
    thumb.style.removeProperty('--thumb-dx');
    thumb.style.removeProperty('--thumb-dy');
  };

  thumb.addEventListener('pointermove', onMove);
  thumb.addEventListener('pointerleave', onLeave);

  thumb._magneticCleanup = () => {
    thumb.removeEventListener('pointermove', onMove);
    thumb.removeEventListener('pointerleave', onLeave);
  };
}

window.addMagneticThumbEffect = addMagneticThumbEffect;

