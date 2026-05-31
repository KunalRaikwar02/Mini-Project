const counters = document.querySelectorAll(".count");

function formatNumber(number, separator) {
  let roundedNumber = Math.floor(number);

  if (separator) {
    return roundedNumber.toLocaleString("en-US").replace(/,/g, separator);
  }

  return roundedNumber;
}

function startCount(counter) {
  const from = Number(counter.dataset.from) || 0;
  const to = Number(counter.dataset.to);
  const duration = Number(counter.dataset.duration) || 2000;
  const separator = counter.dataset.separator || "";
  const direction = counter.dataset.direction || "up";

  let startValue = direction === "down" ? from : from;
  let endValue = direction === "down" ? to : to;

  let startTime = null;

  function animateCount(currentTime) {
    if (!startTime) startTime = currentTime;

    const progress = Math.min((currentTime - startTime) / duration, 1);

    const currentValue =
      startValue + (endValue - startValue) * progress;

    counter.textContent = formatNumber(currentValue, separator);

    if (progress < 1) {
      requestAnimationFrame(animateCount);
    } else {
      counter.textContent = formatNumber(endValue, separator);
    }
  }

  requestAnimationFrame(animateCount);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

counters.forEach((counter) => {
  observer.observe(counter);
});