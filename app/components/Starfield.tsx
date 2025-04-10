const StarField = () => {
  const numberOfStars = 150;
  const stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    const top = `${Math.random() * 100}vh`;
    const left = `${Math.random() * 100}vw`;
    const size = `${Math.random() * 2 + 1}px`;
    const opacity = Math.random() * 0.5 + 0.3;
    const delay = `${Math.random() * 3}s`;
    const twinkleDuration = `${0 + Math.random() * 3}s`; // 2–5s
    const driftDuration = `${2 + Math.random() * 4}s`; // 8–12s

    stars.push(
      <div
        key={i}
        className="star"
        style={{
          top,
          left,
          width: size,
          height: size,
          opacity,
          animationName: "twinkle, drift-horizontal",
          animationDuration: `${twinkleDuration}, ${driftDuration}`,
          animationDelay: `${delay}, 0s`,
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out",
        }}
      />
    );
  }

  return (
    <div className="star-field fixed w-screen h-screen top-0 left-0">
      {stars}
    </div>
  );
};

export default StarField;
